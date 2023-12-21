package team.gsk.project.chatting.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import team.gsk.project.chatting.model.dto.ChatMessage;
import team.gsk.project.chatting.model.service.ChatService;

// 전체 채팅
@Controller
public class ChatController {
	
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }
    
    // 기존 채팅 불러오기
    @MessageMapping("/chat.getOldMessages")
    public void getOldMessages() {
        List<ChatMessage> oldMessages = chatService.getOldMessages(); // 기존 채팅 메시지 가져오기
        messagingTemplate.convertAndSend("/topic/oldMessages", oldMessages); // 클라이언트에게 전송
    }
 
    // 메세지 보내기 
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        chatService.saveMessage(chatMessage); // 메시지 저장
        messagingTemplate.convertAndSend("/topic/publicChatRoom", chatMessage); // WebSocket으로 클라이언트에 전송
    }
    

    @MessageMapping("/chat.addUser") // 새로운 사용자가 채팅에 참여할 때 사용하는 endpoint
    public void addUser(@Payload ChatMessage chatMessage) {
        messagingTemplate.convertAndSend("/topic/publicChatRoom", chatMessage); // 새로운 사용자에게 입장 메시지 전송
    }

}