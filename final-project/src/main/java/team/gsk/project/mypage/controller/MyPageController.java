package team.gsk.project.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import team.gsk.project.member.model.dto.Member;
import team.gsk.project.mypage.model.service.MyPageService;

@Controller
@SessionAttributes({"loginMember"})
public class MyPageController {
	
	
	@Autowired
	private MyPageService service;

	
	@GetMapping("/profile")
	public String sideProfileForward() {
		return "side/profile";
}
	
	
	
	// 프로필 이미지 수정
	@PostMapping("/profile")
	public String updateProfile(
			@RequestParam("profileImage") MultipartFile profileImage // 업로드 파일
			, @SessionAttribute("loginMember") Member loginMember
			, RedirectAttributes ra // 리다이렉 시 메세지 전달
			) throws Exception{
		
		
		// 프로필 이미지 수정 서비스 호출
		int result = service.updateProfile(profileImage, loginMember);
		
		
		String message = null;
		if(result > 0) message = "프로필 이미지가 변경되었습니다";
		else			message = "프로필 변경 실패";
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:profile";
	}
	
	
	
	// 비밀번호 변경
		@PostMapping("/changePw")
		public String changePw(String currentPw, String newPw
			,@SessionAttribute("loginMember") Member loginMember
			,RedirectAttributes ra) {
			
			// 로그인한 회원 번호(DB에서 어떤 회원을 조회, 수정하는지 알아야 되니까)
			int memberNo = loginMember.getMemberNo();
			
			// 비밀번호 변경 서비스 호출
			int result = service.changePw(currentPw, newPw, memberNo);
			
			
			String message = null;
			
			if(result > 0) { // 변경 성공
				message = "비밀번호가 변경 되었습니다.";
				
				
			}else { // 변경 실패
				message = "현재 비밀번호가 일치하지 않습니다.";
				
			}
			
			ra.addFlashAttribute("message", message);
			
			return "redirect:profile";
		}
		
		
		// 회원 정보 수정
		@PostMapping("/nickName")
		public String updateInfo(@SessionAttribute("loginMember") Member loginMember,
								Member updateNickname,
								RedirectAttributes ra) {

			updateNickname.setMemberNo( loginMember.getMemberNo() );

			// DB 회원 정보 수정 (update) 서비스 호출
			int result = service.updateNickname(updateNickname);
			
			String message = null;
			
			// 결과값으로 성공
			if(result > 0) {
				loginMember.setMemberNickname( updateNickname.getMemberNickname() );
				
				message = "회원 정보 수정 성공";
				
				
			} else {
				// 실패에 따른 처리 

				message = "회원 정보 수정 실패";
				
			}
			
			ra.addFlashAttribute("message", message);
			
			return "redirect:profile"; 
		}
		
	
	
	
	
	
	

}
