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
	
		// 태그이름에 ',' 제거 후 리스트로 저장
		String[] tagName = inputChatting.getTagName().split("[,]");
		
		// 채팅방 생성
		int result = service.roomMaking(inputChatting,tagName);
		
		// 채팅방이 제대로 생성됐다면 
		if(result !=0) {
			
			
			System.out.println("성공");
			
		}
		
		
		
		
//		for (String tag : tagName) {
//		    System.out.println(tag.trim()); // 각 요소를 출력하고 공백 제거
//		}
		
	
		
		
		return "chatting/chatting_group";
	}
	
}
