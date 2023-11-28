package team.gsk.project.post.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import team.gsk.project.member.model.dto.Member;
import team.gsk.project.post.model.dto.PostRequest;
import team.gsk.project.post.model.service.PostService;

@Controller
public class PostController {

	private  PostService service;
	
	
	@Autowired
    public PostController(PostService service) {
        this.service = service;
    }

	   
	   
	 @PostMapping("/savePost")
	    public String savePost(PostRequest postRequest) {
	        // 여기서 postRequest 객체는 자동으로 요청 데이터를 매핑한 것입니다.
	        boolean isPostSaved = service.insertPost(postRequest);
	        if (isPostSaved) {
	            return "common/main"; // 성공 시 common/main으로 이동
	        } else {
	            return "error-page"; // 실패 시 에러 페이지로 이동
	        }
	    }
	   
	   
	   
	   
	   
}