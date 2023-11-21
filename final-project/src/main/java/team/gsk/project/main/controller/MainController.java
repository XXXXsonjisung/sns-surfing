
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
	
		
		return "common/main";
		
		
//		return "chatting/chatting_choose";
		
	}
	
	
	@GetMapping("/profile")
	public String sideForward() {

		
		return "side/profile";
	

}

}