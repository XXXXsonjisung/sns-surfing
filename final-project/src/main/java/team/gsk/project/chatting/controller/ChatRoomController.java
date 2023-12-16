package team.gsk.project.chatting.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.util.HtmlUtils;


import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.chatting.model.service.ChattingService;
import team.gsk.project.member.model.dto.Member;

// 개인 채팅
@SessionAttributes({"loginMember"})
@Slf4j
@RestController
public class ChatRoomController {
	


	private final ChattingService service;
    private final SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    public ChatRoomController(SimpMessagingTemplate messagingTemplate,ChattingService service) {
    	
        this.messagingTemplate = messagingTemplate;
        this.service = service;
    }
    

	
	// 개인 채팅 불러오기 
	@GetMapping("/getOldMessage")
	public List<ChattingMessage> getOldMessage(@RequestParam("roomNo") int roomNo) {

		log.info("방번호  : "+ roomNo);
				List<ChattingMessage> messages	=service.getOldMessage(roomNo);
			
		return messages;

	}
	

//    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
//    public ChattingMessage sendMessage(@Payload ChattingMessage chatMessage) {
//        // 메시지를 처리하고 반환 (예: HTML 태그 방지)
//        chatMessage.setMessage(HtmlUtils.htmlEscape(chatMessage.getMessage()));
//        return chatMessage;
//    }
	
	
	// 메세지 보낸거 저장
	@MessageMapping("/ws-stomp.sendMessage")
	public void sendMessage(@Payload ChattingMessage chattingMessage) {
		log.info("채팅메세지 :"+ chattingMessage);
		service.saveMessage(chattingMessage);
		messagingTemplate.convertAndSend("/sub/updateMessage", chattingMessage);
	}
	
	
	// 친구 초대를 위한 전부 조회
	@GetMapping("/allFriends")
	public List<Member> allFriends(@RequestParam("roomNo")int roomNo) {
		
		log.info("친구 조회를 위한 방번호 :"+roomNo);
		
		
		List<Member> allFriends = service.allFriends(roomNo);
		
		return allFriends;
	}
	
	
	
	// 채팅방 참여중인 친구 조회
	@GetMapping("/displayFriend")
	public List<Member> displayFriend(@RequestParam("roomNo")int roomNo) {
		
		log.info("채팅방을 위한 방번호 :"+roomNo);
		
		List<Member> displayFriend = service.displayFriend(roomNo);
		
		return displayFriend;
	}
	
	
//	// 채팅방 참여중인 친구 조회
//	@GetMapping("/displayFriend")
//	public List<Member> displayFriend(@SessionAttribute("loginMember") Member loginMember,
//			@RequestParam("roomNo")int roomNo) {
//		
//		log.info("채팅방을 위한 방번호 :"+roomNo);
//		
//     	int memberNo = loginMember.getMemberNo();
//		
//		List<Member> displayFriend = service.displayFriend(memberNo,roomNo);
//		
//		return displayFriend;
//	}
//	
	
	
	
	// 친구 초대 
	@PostMapping("/invite")
	public int invite(@RequestBody Map<String, Object> payload){
		
	// 받는 값 검사	
//		Object roomNoObj = payload.get("currentRoomNo");
//		if (roomNoObj instanceof Integer) {
//		    int currentRoomNo = (Integer) roomNoObj;
//		    // 처리 로직
//		} else {
//		    log.error("currentRoomNo is not an integer, it is " + (roomNoObj != null ? roomNoObj.getClass().getName() : "null"));
//		}
//		
//		
//		if (roomNoObj instanceof String) {
//		    try {
//		        int currentRoomNo = Integer.parseInt((String) roomNoObj);
//		        // 처리 로직
//		    } catch (NumberFormatException e) {
//		        log.error("currentRoomNo is a string but cannot be parsed as an integer");
//		    }
//		}
//		
//	
		        int currentRoomNo = (Integer) payload.get("currentRoomNo");
		        List<Long> invitedFriends = (List<Long>) payload.get("invitedFriends");
		        log.info("초대받은 회원 : "+invitedFriends);
		        log.info("초대받은 방번호 :"+currentRoomNo);
		        
		        int result = service.invite(currentRoomNo,invitedFriends);
		
		       
	
		return result;
	}
	
	
	// 채팅방 나가기
	@PostMapping("/exitMember")
	public int exitMember(@RequestBody Map<String, Object> payload) {
		
		String roomNo =(String)payload.get("roomNo");
		String memberNo =(String)payload.get("memberNo");
	    log.info("초대받은 회원 : "+roomNo);
        log.info("초대받은 방번호 :"+memberNo);
        
        int result	=service.exitMember(roomNo,memberNo);
        
	
		return result;
	}
	
	
	// 채팅방 만들기 위해 친구 찾기 
	@GetMapping("/findFriends")
	public List<Member> findFriends(@SessionAttribute("loginMember") Member loginMember) {
	
				int memberNo =loginMember.getMemberNo();
	
				List<Member> result= service.findFriends(memberNo);
					
		return result;
	}
	

}

























