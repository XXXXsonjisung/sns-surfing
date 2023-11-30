package team.gsk.project.chatting.controller;

import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import team.gsk.project.chatting.model.service.ChatService;

@RequiredArgsConstructor
@Controller
public class ChatController {

	 private final ChatService chatService;
	
}
