package team.gsk.project.chatting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/RoomMaking")
public class RoomMakingController {

	// 지역 태그 리스트
	@GetMapping("/region")
	public String regionList() {
		
		return null;
	}
	
	// 채팅방 만들기
	@PostMapping("/making")
	public String roomMaking() {
	
		
		return null;
	}
	
}
