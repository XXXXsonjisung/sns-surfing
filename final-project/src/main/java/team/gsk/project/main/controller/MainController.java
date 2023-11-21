<<<<<<< HEAD
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
=======

>>>>>>> 89180ce51836a194411a075b508ef3f1a8b7337e
package team.gsk.project.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MainController {
	
	@RequestMapping("/")
	public String mainForward(Model model) {
		
		model.addAttribute("name","ㅋㅋㅋ");
	
<<<<<<< HEAD
		return "common/main.html";
=======
		//return "common/main.html";
		
		
		return "chatting/chatting_choose";
		
>>>>>>> 89180ce51836a194411a075b508ef3f1a8b7337e
	}
	

}
<<<<<<< HEAD
>>>>>>> 8c898009e696fd3e7731b56f8c995e1489048695
=======

>>>>>>> 89180ce51836a194411a075b508ef3f1a8b7337e
