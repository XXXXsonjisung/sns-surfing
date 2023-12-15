package team.gsk.project.chatting.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
		
		
		
		// 채팅방 생성
		int result = service.roomMaking(inputChatting,loginMember);
		
		// 채팅방이 제대로 생성됐다면 
		if(result !=0) {

		 log.info("성공");
			
		}else {
			
			return "chatting/room_making";
		}
		
		model.addAttribute("roomName",result);
		
		return "redirect:/chatting/chattinGroup";
	}
	
	// 채팅방 가입
	@GetMapping("/joinRoom")
	@ResponseBody
	public int joinRoom(@RequestParam("roomNo") int roomNo,
			@SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo = loginMember.getMemberNo();
						
		int result = service.insertMemberRoom(memberNo,roomNo);
		
		return result;
		
	}
	
	
	
	//채팅방 리스트 다시 정렬
//	@GetMapping("/changeRoomList")
//	@ResponseBody
//	public String changeRoomList(@RequestParam("cca")int cca) {
//		
//		
//		return result;
//	}
	
	
	// 강퇴
	@PostMapping("/kickMembers")
	@ResponseBody
	public int kickMembers(@RequestBody Map<String, Object> payload) {
			
			String roomNo =(String)payload.get("roomNo");
			List<Long> selectedMembers =(List<Long>)payload.get("selectedMembers");
			
			log.info("강퇴 방번호"+ roomNo);
			log.info("강퇴 회원번호"+ selectedMembers);
			
			int result = service.kickMembers(roomNo,selectedMembers);
			
		
		return result;
	}
	
	
	
	//방장 찾기 
	@GetMapping("/findManger")
	@ResponseBody
	public int findManger(@RequestParam("roomNo") int roomNo) {
		
		
		int managerNo=service.findManger(roomNo);
		
		return managerNo;
	}
	
	
	// 방장 넘기기
	@PostMapping("/authorizeManger")
	@ResponseBody
	public int authorizeManger(@RequestBody Map<String, Object> payload) {
			String roomNo =(String)payload.get("roomNo");
			List<String> selectedMembers =(List<String>)payload.get("selectedMembers");
			String member=	selectedMembers.get(0);
			log.info("방번호"+ roomNo);
			log.info("방장예정번호"+  member);
			int result =service.authorizeManger(roomNo,member);
			
		
		return 1;
	}
	
	// 채팅방 수정 
	@PostMapping("/update")
	public String updateRoom(@Valid Chatting inputChatting, BindingResult bindingResult,Model model,
			 RedirectAttributes redirectAttributes) {
				if(bindingResult.hasErrors()) {

					   model.addAttribute("inputChatting", inputChatting);
					
					return "chatting/room_setting";
				}
				int roomNo = inputChatting.getRoomNo();
				
				int result =  service.updateRoom(inputChatting); 
				
				
				redirectAttributes.addFlashAttribute("message", "채팅방 수정 완료.");
		
				return "redirect:/chatting/roomSetting?roomNo="+roomNo;
		
	}
	
	
	 
	
	
	
	
}
