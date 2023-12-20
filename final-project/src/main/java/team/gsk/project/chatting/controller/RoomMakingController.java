package team.gsk.project.chatting.controller;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
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
import org.springframework.web.multipart.MultipartFile;
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
@PropertySource("classpath:/config.properties")
public class RoomMakingController {

	@Autowired
	private RoomMakingService service;
	
	@Value("${my.chatting.webpath}")
	private String webPath;
	
	@Value("${my.chatting.location}")
	private String filePath;
	

	// 채팅방 만들기
	@PostMapping("/making")
	public String roomMaking(@Valid Chatting inputChatting, BindingResult bindingResult,Model model,@SessionAttribute("loginMember") Member loginMember) throws Exception {
		
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
	
	
		  MultipartFile roomImgFile = inputChatting.getRoomImgFile();
		  
		  String originalFileName = roomImgFile.getOriginalFilename();
		  
		  String fileExtension = Objects.requireNonNull(originalFileName).substring(originalFileName.lastIndexOf("."));

		  // 현재 시간을 밀리초로 변환하여 파일명 생성
		  String fileName = System.currentTimeMillis() + fileExtension;
		  
		  
		  // 파일 저장 경로 설정
		  String fullFilePath = filePath + fileName;
		  
		  File dest = new File(fullFilePath);
		  roomImgFile.transferTo(dest);
		  
		  String fullWebPath = webPath + fileName;
		  
		  inputChatting.setRoomImg(fullWebPath);
		
		
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
			 RedirectAttributes redirectAttributes) throws Exception {
				if(bindingResult.hasErrors()) {

					   model.addAttribute("inputChatting", inputChatting);
					
					return "chatting/room_setting";
				}
				
				  MultipartFile roomImgFile = inputChatting.getRoomImgFile();
				  
				  String originalFileName = roomImgFile.getOriginalFilename();
				  
				  String fileExtension = Objects.requireNonNull(originalFileName).substring(originalFileName.lastIndexOf("."));

				  // 현재 시간을 밀리초로 변환하여 파일명 생성
				  String fileName = System.currentTimeMillis() + fileExtension;
				  
				  
				  // 파일 저장 경로 설정
				  String fullFilePath = filePath + fileName;
				  
				  File dest = new File(fullFilePath);
				  roomImgFile.transferTo(dest);
				  
				  String fullWebPath = webPath + fileName;
				  
				  inputChatting.setRoomImg(fullWebPath);
						
				
				
				int roomNo = inputChatting.getRoomNo();
				
				int result =  service.updateRoom(inputChatting); 
				
				
				redirectAttributes.addFlashAttribute("message", "채팅방 수정 완료.");
		
				return "redirect:/chatting/roomSetting?roomNo="+roomNo;
		
	}
	
	
	 
	
	
	
	
}
