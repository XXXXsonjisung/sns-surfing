package team.gsk.project.post.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;   
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import oracle.jdbc.proxy.annotation.Post;
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
	    public String savePost(@RequestParam(value="username") String username,
	    						@RequestParam(value="memberProfile") String memberProfile,
	    						@RequestParam(value="content") String content
	    						, @RequestParam(value="imageUrls", required = false) MultipartFile imageUrls
	    						) throws Exception{
	        // 여기서 postRequest 객체는 자동으로 요청 데이터를 매핑한 것입니다.
		 	
		 	System.out.println("username::" + username);
		 	System.out.println("memberProfile:" +  memberProfile);
		 	System.out.println("content:"+content);
		 	System.out.println("img:"+imageUrls);
		 	
		 	PostRequest postRequest = new PostRequest();
		 	postRequest.setUsername(username);
		 	postRequest.setMemberProfile(memberProfile);
		 	postRequest.setContent(content);
		 	//System.out.println("postRequest::"+postRequest);
		 	
		 	
	        int isPostSaved = service.insertPost(postRequest, imageUrls);
	        if (isPostSaved > 0) {
	            return "common/main"; // 성공 시 common/main으로 이동
	        } else {
	            return "error-page"; // 실패 시 에러 페이지로 이동
	        }
	    }
	 

	 

	 @GetMapping("/getAllPosts")
	 @ResponseBody
	 public List<PostRequest> getAllPosts() {
		 
		 List<PostRequest> posts = service.getAllPosts();

		 System.out.println(posts);
		 
		 
		 return posts;
	 }
	 
	 
	 
	 
	 @GetMapping("/getPostData")
	 @ResponseBody
	 public List<PostRequest> getPostData(@RequestParam("postNo") int postNo, Model model, PostRequest posts) {
	     // postNo를 사용하여 해당 게시물 정보를 가져옵니다.
		 List<PostRequest> post = service.getPostBy(postNo);

	     // 가져온 게시물 정보를 담은 뷰로 이동합니다. 해당 뷰에서 모달에 데이터를 표시할 수 있습니다.
	     return post;
	 }
	   
	   
	   
	   
}