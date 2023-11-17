package edu.kh.project.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class MainController {

	@RequestMapping("/")
	public String mainForward(Model model) {
		
		model.addAttribute("name","홍길동");
		
		// Spring MVC : /webapp/WEB-INF/views/common/main.jsp
		
		// Spring Boot (+ thymeleaf 템플릿 엔진)
		// src/main/resources/templates/common/main.html
	
		return "common/main";
	}
	
}
