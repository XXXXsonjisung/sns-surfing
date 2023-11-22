package team.gsk.project.chatting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import team.gsk.project.chatting.model.service.ChattingService;
import team.gsk.project.member.model.dto.Member;



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
	
	
	//개인 채팅 페이지 이동 
	@GetMapping("/chattinGroup")
	public String chattinGroup(){
		
		return "chatting/chatting_group";
		
		
	}
	
	
	//그룹 채팅 만들기 페이지 이동 
	@GetMapping("/roomMaking")
	public String roomMaking(){
		
		return "chatting/room_making";
		
		
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
    
// // 채팅 초대 검색
//    @GetMapping(value="/selectTarget", produces="application/json; charset=UTF-8")
//    @ResponseBody
//    public List<Member> selectTarget(String query){
//        // 세션에서 loginMember 정보를 사용하지 않고 직접 쿼리를 처리
//        return service.selectTarget(query); // 이 부분도 수정할 필요가 있을 수 있음
//    }
//    
	
	
}
