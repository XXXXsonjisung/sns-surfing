package team.gsk.project.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyPageController {

	
	@GetMapping("/profile")
	public String sideProfileForward() {
		return "side/profile";
}

}
