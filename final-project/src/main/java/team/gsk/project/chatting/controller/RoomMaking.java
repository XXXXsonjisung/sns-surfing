package team.gsk.project.chatting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/RoomMaking")
public class RoomMaking {

	// 지역 태그 리스트
	@GetMapping("/region")
	public String regionList() {
		
		return null;
	}
	
	
}
