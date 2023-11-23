package team.gsk.project.chatting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.service.RoomMakingService;

@Controller
@RequestMapping("/RoomMaking")
public class RoomMakingController {

	@Autowired
	private RoomMakingService service;
	
	
	// 지역 태그 리스트
	@GetMapping("/region")
	public String regionList() {
		
		return null;
	}
	
	// 채팅방 만들기
	@PostMapping("/making")
	public String roomMaking(Chatting inputChatting,Model model ) {
	
		//inputChatting.getTagNo().split
		// let numbers = input.replace(/#|\s|,/g, "").match(/\d+/g);
		
		int result = service.roomMaking(inputChatting);
		
		
		return "chatting/chatting_group";
	}
	
}
