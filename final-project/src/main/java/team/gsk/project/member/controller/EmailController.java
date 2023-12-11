package team.gsk.project.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import team.gsk.project.member.model.service.EmailService;

@Controller
@RequestMapping("/sendEmail")
public class EmailController {
	
	@Autowired
	private EmailService service;
	
	/** 회원가입
	 * @param email
	 * @return
	 */
	@GetMapping("/signUp")
	@ResponseBody
	public int signUp(String email) {
		return service.signUp(email, "회원 가입");
	}
	
    @GetMapping("/checkAuthKey")
    @ResponseBody
    public int checkAuthKey(@RequestParam Map<String, Object> paramMap){

    	System.out.println(paramMap); // {inputKey=wc3rxG, email=knbdh@nate.com}
        
        return service.checkAuthKey(paramMap);
    }
   
    
	/** 이메일로 아이디 찾기
	 * @param memberEmail
	 * @return
	 */
	@GetMapping("/sendAuth")
	@ResponseBody
	public String sendIdEmailAuth(@RequestParam(value="memberEmail", required=false) String memberEmail) {
		
		System.out.println(memberEmail);
		
	    int dupCheck = service.dupCheck(memberEmail);
	    int result = 0;
	    
	    
	    if (dupCheck > 0) {
	    	 result = service.sendAuthKey(memberEmail);

	    }
	

	    return "common/searchIdPw";
	}
	
    @GetMapping("/sendEmail/sendAuthKey")
    @ResponseBody
    public int sendAuthKey(String memberEmail) {
    	return service.sendAuthKey(memberEmail);
    }
	
	/** 이메일로 아이디 찾기 인증 확인
	 * @param inputKey
	 * @param memberEmail
	 * @return
	 */
	public int checkAuth(String inputKey, String memberEmail) {
		
		return service.checkAuth(inputKey, memberEmail);
	}

}
