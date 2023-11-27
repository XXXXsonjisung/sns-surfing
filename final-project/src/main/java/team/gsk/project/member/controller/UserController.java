package team.gsk.project.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

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
	 
	 

}
