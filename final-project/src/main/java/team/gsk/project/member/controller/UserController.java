package team.gsk.project.member.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import team.gsk.project.member.model.dto.UserPost;

@RestController
public class UserController {
	

//	  @GetMapping("/userinfo")
//	    public UserPost getUserInfo() {
//	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//	        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
//	            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//	            
//	            // 여기에서 userDetails에서 필요한 정보를 가져와 UserPost 객체에 담아 반환합니다.
//	            // 예를 들어, 아래와 같이 가져와서 UserPost 객체에 담을 수 있습니다.
//	            UserPost userPost = new UserPost();
//	            userPost.setMemberNo(SecurityContextHolder.loginMember.getMemberNo()); // 사용자 번호
//	            userPost.setMemberProfile("URL"); // 프로필 이미지 URL을 가져오는 방법에 따라 설정해야 합니다.
//	            // 다른 필드도 사용자의 정보에 맞게 설정해주세요.
//
//	            return userPost;
//	        } else {
//	            // 사용자 정보를 찾을 수 없는 경우 에러 처리
//	            throw new RuntimeException("User information not found");
//	        }
//	    }
	
}
