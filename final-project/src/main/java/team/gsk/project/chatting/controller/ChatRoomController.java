package team.gsk.project.chatting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.chatting.model.service.ChattingService;

// 개인 채팅

@Slf4j
@RestController
public class ChatRoomController {
	

	private final ChattingService service;
    private final SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    public ChatRoomController(SimpMessagingTemplate messagingTemplate,ChattingService service) {
    	
        this.messagingTemplate = messagingTemplate;
        this.service = service;
    }
    
    
	

	
	// 개인 채팅 불러오기 
	@GetMapping("/getOldMessage")
	public List<ChattingMessage> getOldMessage(@RequestParam("roomNo") int roomNo) {
		  //log.info("CHAT {}", chat);
		log.info("방번호  : "+ roomNo);
				List<ChattingMessage> messages	=service.getOldMessage(roomNo);
			
		return messages;

	}
	
//    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
//    public ChattingMessage sendMessage(@Payload ChattingMessage chatMessage) {
//        // 메시지를 처리하고 반환 (예: HTML 태그 방지)
//        chatMessage.setMessage(HtmlUtils.htmlEscape(chatMessage.getMessage()));
//        return chatMessage;
//    }
	
	
	// 메세지 보낸거 저장
	@MessageMapping("/ws-stomp.sendMessage")
	public void sendMessage(@Payload ChattingMessage chattingMessage) {
		log.info("채팅메세지 :"+ chattingMessage);
		//service.saveMessage(chattingMessage);
		messagingTemplate.convertAndSend("/sub/updateMessage", chattingMessage);
	}
	

}










