package team.gsk.project.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import team.gsk.project.member.model.dto.Follow;
import team.gsk.project.member.model.dto.Member;
import team.gsk.project.member.model.service.UserService;

@Controller
@SessionAttributes({"loginMember"})
public class UserController {
	
	@Autowired
	private UserService service; // UserService를 주입 받아 사용

	@GetMapping("/userinfo")
	@ResponseBody
	public ResponseEntity<Map<Object, String>> getUserInfo(@ModelAttribute("loginMember") Member loginMember) {
	    Map<Object, String> userInfo = new HashMap<>();
	    
	    // UserService의 메소드 호출을 통해 아이디와 프로필 이미지를 가져옴
	    String memberId = service.getMemberId(loginMember.getMemberId());
	    String profileImage = service.getProfileImage(loginMember.getMemberId());
	    
	    // 가져온 값을 userInfo에 넣어줍니다.
	    userInfo.put("memberId", memberId);
	    userInfo.put("profileImage", profileImage);
	    
	    // JSON 형태로 데이터 반환
	    return ResponseEntity.ok(userInfo);
	}
	
	
	@GetMapping("/getUserInfo")
	public String userPageForward(@RequestParam("username") String memberId, Model model) {

	    Member member = service.getMemberX(memberId);
	    
	    model.addAttribute("member", member);
	    
	    
	    return "common/userPage";
	}
	
	
	 @PostMapping("/saveFollow")
	    public ResponseEntity<String> saveFollow(@RequestParam(value="p_memberId") String p_memberId,
	    										  @RequestParam(value="h_memberId") String h_memberId) {
	        
		 Follow follow = new Follow();
		 follow.setH_memberId(h_memberId);
		 follow.setP_memberId(p_memberId);
		 
	        
	        int saveFollow = service.saveFollow(follow);
	        
	        return ResponseEntity.ok("Follow 저장 성공");
	    }
	

	 @DeleteMapping("/unfollow")
	    public ResponseEntity<String> unFollow(@RequestParam(value = "p_memberId") String p_memberId,
	                                            @RequestParam(value = "h_memberId") String h_memberId) {
		 
		 Follow follow = new Follow();
		 follow.setH_memberId(h_memberId);
		 follow.setP_memberId(p_memberId);
		 
		 	int unFollow = service.unFollow(follow);

	        return ResponseEntity.ok("UnFollow 성공");
	    }
	 
	 
	 @GetMapping("/checkFollow")
	 public ResponseEntity<String> checkFollow(@RequestParam("p_memberId") String p_memberId,
	                                            @RequestParam("h_memberId") String h_memberId) {

		 Follow follow = new Follow();
		 follow.setH_memberId(h_memberId);
		 follow.setP_memberId(p_memberId);
		 
	     int checkFollow = service.checkFollow(follow);
	     
	     String message = "";
	     
	     if(checkFollow > 0) {
	    	 message += "팔로우 중 확인";
	     }
	     

	     return ResponseEntity.ok(message);
	 }
	 
	 
	 @GetMapping("/followPageData")
	 @ResponseBody
	 public List<Follow> getFollowPageData(@RequestParam("memberId") String memberId) {
	     // memberId를 이용하여 Follow 테이블에서 데이터를 가져옴
	     List<Follow> followData = service.getFollowDataByMemberId(memberId);
	     
	     System.out.println(memberId);
	     
	     System.out.println(followData);

	     // Follow 테이블에서 가져온 데이터의 memberId를 이용하여 Member 테이블에서 프로필 이미지 가져오기
	     for (Follow follow : followData) {
	         Member member = service.getMemberById(follow.getH_memberId()); // MemberService를 통해 memberId로 Member 정보 가져오기
	         follow.setProfileImage(member.getProfileImage()); // 가져온 프로필 이미지를 Follow 객체에 설정
	     }

	     return followData; // Follow 테이블 데이터와 프로필 이미지를 포함한 JSON 형태로 반환
	 }
	 
 }