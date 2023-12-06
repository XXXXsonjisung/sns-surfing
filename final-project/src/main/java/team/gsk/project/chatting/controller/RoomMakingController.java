package team.gsk.project.chatting.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.service.RoomMakingService;
import team.gsk.project.member.model.dto.Member;

@Slf4j
@Controller
@RequestMapping("/RoomMaking")
@SessionAttributes({"loginMember"})
public class RoomMakingController {

	@Autowired
	private RoomMakingService service;
	
	

	// 채팅방 만들기
	@PostMapping("/making")
	public String roomMaking(@Valid Chatting inputChatting, BindingResult bindingResult,Model model,@SessionAttribute("loginMember") Member loginMember) {
		
		// 서버에서 유효성 검사
		if(bindingResult.hasErrors()) {
			//   model.addAttribute("errors", errors.getAllErrors());
			   model.addAttribute("inputChatting", inputChatting);
			   
			
			//	유효성 통과 못한 필드와 메시지를 핸들링        
//			Map<String, String> validatorResult = service.validateHandling(errors);
//			for (String key : validatorResult.keySet()) {
//				model.addAttribute(key, validatorResult.get(key));
//			
//			}
//			
			return "chatting/room_making";
		}
	
		// 태그이름에 ',' 제거 후 리스트로 저장
	
//		
//		for (String tag : tagName) {
//	    System.out.println(tag.trim()); // 각 요소를 출력하고 공백 제거
//	}
//		String[] tagName = inputChatting.getTagName().split("[,]");
		
		
		log.info("보내기전 : "+inputChatting+loginMember);
		
		// 채팅방 생성
		int result = service.roomMaking(inputChatting,loginMember);
		
		// 채팅방이 제대로 생성됐다면 
		if(result !=0) {

		 log.info("성공");
			
		}else {
			
			return "chatting/room_making";
		}
		
		model.addAttribute("roomName",result);
		
		return "chatting/chatting_group";
	}
	
}
