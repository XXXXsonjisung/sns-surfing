package team.gsk.project.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MainController {
	
	@RequestMapping("/")
	public String mainForward(Model model) {
		
		model.addAttribute("name","ㅋㅋㅋ");

		



//		return "chatting/room_making";




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