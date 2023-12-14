package team.gsk.project.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import team.gsk.project.member.model.dto.Member;
import team.gsk.project.member.model.service.MemberService;
import team.gsk.project.member.model.service.UserService;


@Controller
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MainController {
	

	@Autowired
	private UserService service;
	
	
	@RequestMapping("/")
	public String mainForward(Model model) {
		
//	return "chatting/chatting_choose";

		return "common/main";
		
//		return "common/searchPage";


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
	
	@GetMapping("/myPage")
	public String myPageForward(@RequestParam(value="memberId", required=false) String memberId,
									Model model) {
		
		int count = service.getCount(memberId);
		
		model.addAttribute("count", count);
		
		return "common/myPage";
	}
	
	
	@GetMapping("/searchPage")
	public String searchPageTForward(@RequestParam(value="searchValue", required=false) String value,
	                                    Model model) {

	    Member member = service.search(value);
	    
	    System.out.println(value);

	    System.out.println("이것은 member의 값입니다. :" +member);

	    if (member != null) {
	        model.addAttribute("value", value);


	        if (member.getProfileImage() == null || member.getProfileImage().isEmpty()) {
	        	
	            member.setProfileImage("/common/images/profile/profile.jpg");
	        }

	        model.addAttribute("member", member);
	    }

	    return "common/searchPage";
	}

}