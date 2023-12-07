package team.gsk.project.main.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import team.gsk.project.member.model.dto.Member;
import team.gsk.project.member.model.service.MemberService;


@Controller
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MainController {
	

	
	@RequestMapping("/")
	public String mainForward(Model model) {
		
//	return "chatting/chatting_choose";

		return "common/main";


  }
	
	// 로그인 페이지로 이동
	@GetMapping("/loginPage")
	public String loginPageForward(Model model) {
		

		return "common/login";		

	}
	

	
	@GetMapping("/follow")
	public String sideFollowForward() {


		
		return "side/follow";


}
	

	
	
	
	

}