package team.gsk.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletResponse;
import team.gsk.project.member.model.dto.Member;
import team.gsk.project.member.model.service.MemberService;

@Controller
@RequestMapping("/member")
@SessionAttributes({"loginMember"})
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	@PostMapping("/login")
	public String login(Member inputMember, Model model,
						@RequestHeader("referer") String referer,
						RedirectAttributes ra,
						HttpServletResponse resp) {
		
		Member loginMember = service.login(inputMember);
		
		String path = "redirect:";
		
		if(loginMember != null) { 	// 로그인 성공시
			path += "/";  // 메인페이지로 리다이렉트
			
			model.addAttribute("loginMember", loginMember);
		} else {
			
			path += referer;
			
			ra.addFlashAttribute("message", "아이디 또는 비밀번호 불일치");
		}	
		System.out.println(path);
		return path;
				
	}
	
	// 아이디/비밀번호 찾기 페이지 이동
	@GetMapping("/searchIdPw")
	public String searchIdPwForward(Model model) {
		

		return "member/searchIdPw";		

	}
	
	// 회원가입 페이지 이동
	@GetMapping("/signUp")
	public String signUpForward(Model model) {
		
		return "member/signUp";		

	}
	
	// 회원 가입 진행
	@PostMapping("/signUp")
	public String signUp(Member inputMember,
						 RedirectAttributes ra ) {
		
		int result = service.signUp(inputMember);
		
		String path = "redirect:";
		String message = null;
		
		if(result > 0) { // 가입 성공
			path += "/loginPage"; // 로그인페이지로
			
			message = inputMember.getMemberNickname() + "님의 가입을 환영합니다";
			
			
		}else { // 가입 실패
			
			// 회원 가입 페이지
			//path += "/member/signUp"; // 절대경로
			path += "signUp"; // 상대경로
			
			message = "회원 가입 실패";
			
		}
		
		// 리다이렉트 시 session에 잠깐 올라갔다 request로 복귀하도록 세팅
		ra.addFlashAttribute("message",message);
		
		return path;
		
	}

	
	
	
	
	
}
