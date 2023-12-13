package team.gsk.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
  
import team.gsk.project.member.model.service.AjaxService;

@Controller
public class AjaxController {
	
	@Autowired
	private AjaxService service;

	@GetMapping("/dupCheck/id")
	@ResponseBody
	public int checkId(String id) {
		
		return service.checkId(id);
	}
	
	@GetMapping("/dupCheck/nickname")
	@ResponseBody
	public int checkNickname(String nickname) {
		return service.checkNickname(nickname);
	}
	
	@GetMapping("/dupCheck/email")
	@ResponseBody
	public int checkEmail(String email) {
		return service.checkEmail(email);
	}
	

}

