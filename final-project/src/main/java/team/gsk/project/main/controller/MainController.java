<<<<<<< HEAD
//package team.gsk.project.main.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//
//@Controller
//public class MainController {
//	
//	@RequestMapping("/")
//	public String mainForward(Model model) {
//		
//		model.addAttribute("name","ㅋㅋㅋ");
//	
//		return "common/main";
//	}
//
//
//}
=======
package team.gsk.project.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MainController {
	
	@RequestMapping("/")
	public String mainForward(Model model) {
		
		model.addAttribute("name","ㅋㅋㅋ");
	
		return "common/main.html";
	}
	

}
>>>>>>> 8c898009e696fd3e7731b56f8c995e1489048695
