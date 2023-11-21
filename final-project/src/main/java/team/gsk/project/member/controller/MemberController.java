package team.gsk.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletResponse;
import team.gsk.project.member.model.dto.Member;
import team.gsk.project.member.model.service.MemberService;

@Controller
@RequestMapping("/login")
@SessionAttributes({"loginMember"})
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	@PostMapping("/login")
	public String login(Member inputMember, Model model,
						@RequestHeader("referer") String referer,
						RedirectAttributes ra, HttpServletResponse resp) {
		
		Member loginMember = service.login(inputMember);
		
		String path = "redirect:";
		
		if(loginMember != null) { 	// 로그인 성공시
			path += "/";  // 메인페이지로 리다이렉트
			
			model.addAttribute("loginMember", loginMember);
		} else {
			
			path += referer;
			
			ra.addFlashAttribute("message", "아이디 또는 비밀번호 불일치");
		}	
		
		return path;
				
	}
	
	// 아이디/비밀번호 찾기 페이지 이동
	@GetMapping("/searchIdPw")
	public String searchIdPw() {
		
		return "member/searchIdPw";
	}
	
	// 회원 가입 페이지 이동
	@GetMapping("/signUp")
	public String signUp() {
		
		return "member/signUp";
	}
}
