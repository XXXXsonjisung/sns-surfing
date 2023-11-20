package team.gsk.project.chatting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import team.gsk.project.chatting.model.service.ChattingService;



@RequestMapping("/chatting")
@Controller
public class ChattingController {
	
	@Autowired
	private ChattingService service;
	
	//채팅선택 페이지 이동 
	@GetMapping("/chattingchoose")
	public String chattingChoose(){
			
		return"chatting/chatting_choose";
		
	}
	
	//그룹채팅 선택 페이지 이동 
	@GetMapping("/groupSetting")
	public String groupSetting() {
		
		return "chatting/group_setting";
		
	}
	
	// 전체 채팅 페이지 이동 
	@GetMapping("/chattingRoom")
	public String chattingRoom(){
		
		return "chatting/chatting_room";
		
		
	}
	
	
	
}
