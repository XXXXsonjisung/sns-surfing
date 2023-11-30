package team.gsk.project.chatting.model.websocket;

import java.io.IOException;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dto.ChatMessage;
import team.gsk.project.chatting.model.dto.ChatRoom;
import team.gsk.project.chatting.model.service.ChatService;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {

	private final ObjectMapper objectMapper;
    private final ChatService chatService;

   // 웹소켓 연결을 처리하는 메서드
   @Override
   public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }
   
   // 텍스트 메시지를 받을때 처리하는 메서드
   @Override
   protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
	   
	   // 전송한 메세지를 변수에 저장 
	   String payload = message.getPayload();
	   
	   // 메세제를 java 객체로 변환하고 그다음 chatMessage 객체에 저장 
	   ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
	   
	   ChatRoom room = chatService.findRoomNo(chatMessage.getRoomNo()); 
	   Set<WebSocketSession> sessions=room.getSessions();
	   
	   if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
           //사용자가 방에 입장하면  Enter메세지를 보내도록 해놓음.  이건 새로운사용자가 socket 연결한 것이랑은 다름.
           //socket연결은 이 메세지 보내기전에 이미 되어있는 상태
           sessions.add(session);
           chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");  //TALK일 경우 msg가 있을 거고, ENTER일 경우 메세지 없으니까 message set
           sendToEachSocket(sessions,new TextMessage(objectMapper.writeValueAsString(chatMessage)) );
       }else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {
           sessions.remove(session);
           chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다..");
           sendToEachSocket(sessions,new TextMessage(objectMapper.writeValueAsString(chatMessage)) );
       }else {
           sendToEachSocket(sessions,message ); //입장,퇴장 아닐 때는 클라이언트로부터 온 메세지 그대로 전달.
       }
   	}
	
	   private  void sendToEachSocket(Set<WebSocketSession> sessions, TextMessage message){
	       sessions.parallelStream().forEach( roomSession -> {
	           try {
	               roomSession.sendMessage(message);
	           } catch (IOException e) {
	               throw new RuntimeException(e);
	           }
	       });
	   }	   
		   
	   @Override
	   public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
	      //javascript에서  session.close해서 연결 끊음. 그리고 이 메소드 실행.
	       //session은 연결 끊긴 session을 매개변수로 이거갖고 뭐 하세요.... 하고 제공해주는 것 뿐
	   }
	   
		
	}
