//package team.gsk.project.chatting.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//
//import team.gsk.project.chatting.model.dto.ChatMessage;
//import team.gsk.project.chatting.model.service.ChatService;
//
//@Controller
//public class ChatController {
//	
//    private final SimpMessagingTemplate messagingTemplate;
//    private final ChatService chatService;
//
//    @Autowired
//    public ChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
//        this.messagingTemplate = messagingTemplate;
//        this.chatService = chatService;
//    }
//    
//    @MessageMapping("/chat.sendMessage")
//    public void sendMessage(@Payload ChatMessage chatMessage) {
//        chatService.saveMessage(chatMessage); // 메시지 저장
//        messagingTemplate.convertAndSend("/topic/publicChatRoom", chatMessage); // WebSocket으로 클라이언트에 전송
//    }
//    
//    
//    @MessageMapping("/chat.addUser") // 새로운 사용자가 채팅에 참여할 때 사용하는 endpoint
//    public void addUser(@Payload ChatMessage chatMessage) {
//        messagingTemplate.convertAndSend("/topic/publicChatRoom", chatMessage); // 새로운 사용자에게 입장 메시지 전송
//    }
//
//}