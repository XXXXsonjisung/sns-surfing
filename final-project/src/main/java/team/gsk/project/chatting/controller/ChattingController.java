package team.gsk.project.chatting.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dto.ChatRoom;
import team.gsk.project.chatting.model.dto.ChatRoomList;
import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.service.ChatService;
import team.gsk.project.chatting.model.service.ChattingService;
import team.gsk.project.chatting.model.service.RoomMakingService;
import team.gsk.project.member.model.dto.Member;


@SessionAttributes({"loginMember"})
@RequestMapping("/chatting")
@Controller
@Slf4j
public class ChattingController {
	
	@Autowired
	private ChattingService service;
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private RoomMakingService roomService;
	
	
	
	//채팅선택 페이지 이동 
	@GetMapping("/chattingchoose")
	public String chattingChoose(){
			
		return"chatting/chatting_choose";
		
	}
	
	//그룹채팅 선택 페이지 이동 
	@GetMapping("/groupSetting")
	public String groupSetting(Model model) {
		
		List<Chatting> roomList=roomService.findRoom();
		
		log.info("채팅방 리스트 : " +roomList);
		
		List<String> tags= new ArrayList<>();
		
		for(Chatting room : roomList) {
			int roomNo = room.getRoomNo();
			List<String> tag =roomService.findRoomTag(roomNo);
			log.info("채팅방 번호 리스트 : " + tag);
			tags.addAll(tag);
		}
		log.info("채팅방 번호 리스트 : " + tags);
		
		
		
		model.addAttribute("roomList",roomList);
		
		return "chatting/group_setting";
		
	}
	
	// 전체 채팅 페이지 이동 
	@GetMapping("/chattingRoom")
	public String chattingRoom(){
	
		return "chatting/chatting_room";
		//return "chatting/chatting_test";
		
	}
	
	
	//개인 채팅 페이지 이동 
	@GetMapping("/chattinGroup")
	public String chattinGroup(@SessionAttribute("loginMember") Member loginMember, Model model){
		
		int memberNo =loginMember.getMemberNo();
		String memberName =loginMember.getMemberName();
		model.addAttribute("memberNo", memberNo);
		model.addAttribute("memberName", memberName);
		
		List<ChatRoomList>  roomList = service.selectRoomList(memberNo);
	
		
		model.addAttribute("roomList", roomList);
	
		return "chatting/chatting_group";
		
		
	}
	
	
	//그룹 채팅 만들기 페이지 이동 
	@GetMapping("/roomMaking")
	public String roomMaking(Model model){
		
		Chatting chatting = new Chatting();
		model.addAttribute("inputChatting", chatting);
		return "chatting/room_making";
		
		
	}
	
	
	//친구 초대(임시)
	@GetMapping("/invite")
	public String invite(){
	
		return "chatting/invite";
		
		
	}
	
	
	
	   // 채팅 초대 검색
    @GetMapping(value="/selectTarget", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<Member> selectTarget(String query, @SessionAttribute("loginMember") Member loginMember){
    	Map<String, Object> map = new HashMap<>();
    	map.put("memberNo", loginMember.getMemberNo());
    	map.put("query", query);
    	return service.selectTarget(map);
    }
    
//    //채팅 초대 검색
//    @GetMapping(value="/selectTarget", produces="application/json; charset=UTF-8")
//    @ResponseBody
//    public List<Member> selectTarget(String query){
//        // 세션에서 loginMember 정보를 사용하지 않고 직접 쿼리를 처리
//        return service.selectTarget(query); // 이 부분도 수정할 필요가 있을 수 있음
//    }
    
	
    // 채팅방 설정 
    @GetMapping("/roomSetting")
    public String roomSetting() {

    	return "chatting/room_setting";
    }
    
    
    
    
	
}
