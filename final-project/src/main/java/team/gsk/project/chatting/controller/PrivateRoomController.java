package team.gsk.project.chatting.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.chatting.model.service.PrivateRoomService;
import team.gsk.project.member.model.dto.Member;


@SessionAttributes({"loginMember"})
@Slf4j
@RequestMapping("/private")
@RestController
public class PrivateRoomController {
	

	private final PrivateRoomService service;
    private final SimpMessagingTemplate messagingTemplate;
    
    public  PrivateRoomController (SimpMessagingTemplate messagingTemplate,PrivateRoomService service) {
    	
        this.messagingTemplate = messagingTemplate;
        this.service = service;
    }
    
    @GetMapping("/getOldMessage")
	public List<ChattingMessage> getOldMessage(@RequestParam("roomNo") int roomNo) {

		log.info("방번호  : "+ roomNo);
				List<ChattingMessage> messages	=service.getOldMessage(roomNo);
				log.info("개인채팅을 위한 메세지  : "+ messages);
		return messages;

	}
    
    
	// 메세지 보낸거 저장
	@MessageMapping("/ws-stomp.sendPrivateMessage")
	public void sendMessage(@Payload ChattingMessage chattingMessage) {
		log.info("개인 채팅 보낼때 채팅메세지 :"+ chattingMessage);
		service.saveMessage(chattingMessage);
		messagingTemplate.convertAndSend("/sub/updatePrivateMessage", chattingMessage);
		
	}
    
    
	
	// 채팅방 참여중인 친구 조회
	@GetMapping("/displayFriend")
	public List<Member> displayFriend(@RequestParam("roomNo")int roomNo) {
		
		log.info("채팅방을 위한 방번호 :"+roomNo);
		
		List<Member> displayFriend = service.displayFriend(roomNo);
		
		return displayFriend;
	}
	
	
	
	// 친구 초대를 위한 전부 조회
	@GetMapping("/allFriends")
	public List<Member> allFriends(@RequestParam("roomNo")int roomNo,@SessionAttribute("loginMember") Member loginMember) {
		
		log.info("친구 조회를 위한 방번호 :"+roomNo);
		int memberNo =loginMember.getMemberNo();
		
		List<Member> allFriends = service.allFriends(roomNo,memberNo);
		
		log.info("팔로우 친구만을 조회 :"+allFriends);
		
		return allFriends;
	}
	
	//친구끼리 채팅방 만들기 
	@PostMapping("/createPrivateRoom")
	public int createPrivateRoom(@RequestBody Map<String, Object> payload,@SessionAttribute("loginMember") Member loginMember) {
		
		int memberNo =loginMember.getMemberNo();

        List<Long> invitedFriends = (List<Long>) payload.get("invitedFriends");
        
        log.info("친구 초대 냠냠" + invitedFriends);
        
        int result = service.createPrivateRoom(memberNo,invitedFriends);
		
		return result;
	}
	
	

}


















