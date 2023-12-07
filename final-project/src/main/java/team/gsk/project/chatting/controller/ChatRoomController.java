package team.gsk.project.chatting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
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
	
	
	@Autowired
	private ChattingService service;
	
	// 개인 채팅 불러오기 
	@GetMapping("/getOldMessage")
	public List<ChattingMessage> getOldMessage(@RequestParam("roomNo") int roomNo) {
		
		log.info("방번호  : "+ roomNo);
				List<ChattingMessage> messages	=service.getOldMessage(roomNo);
			
		return messages;

	}
	
	
	   // "/app/chat" 엔드포인트로 메시지가 전송되면 이 메서드가 호출됩니다.
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChattingMessage sendMessage(@Payload ChattingMessage chatMessage) {
        // 메시지를 처리하고 반환 (예: HTML 태그 방지)
        chatMessage.setMessage(HtmlUtils.htmlEscape(chatMessage.getMessage()));
        return chatMessage;
    }

	

}
