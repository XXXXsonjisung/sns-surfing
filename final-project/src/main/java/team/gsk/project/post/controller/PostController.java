package team.gsk.project.post.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;   
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import team.gsk.project.post.model.dto.Heart;
import team.gsk.project.post.model.dto.PostComment;
import team.gsk.project.post.model.dto.PostRequest;
import team.gsk.project.post.model.dto.PostRequest2;
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
	 public List<PostRequest2> getAllPosts() {
		 
		 List<PostRequest2> postsWithNickname = new ArrayList<>();
		 
		 List<PostRequest> posts = service.getAllPosts();
		 
		 for (PostRequest post : posts) {
		        PostRequest2 postWithNickname = new PostRequest2();
		        String memberNickname = service.getMemberNicknameByUsername(post.getUsername());
		        postWithNickname.setUserNickname(memberNickname);
		        postWithNickname.setPostNo(post.getPostNo());
		        postWithNickname.setUsername(post.getUsername());
		        postWithNickname.setContent(post.getContent());
		        postWithNickname.setCommentsCount(post.getCommentsCount());
		        postWithNickname.setHeartCount(post.getHeartCount());
		        postWithNickname.setPostUploadDate(post.getPostUploadDate());
		        postWithNickname.setMemberProfile(post.getMemberProfile());
		        postWithNickname.setImageUrls(post.getImageUrls());
		        postWithNickname.setVideoUrls(post.getVideoUrls());
		        
		        
		        postsWithNickname.add(postWithNickname);
		    }
		 
		 
		 return postsWithNickname;
	 }
	 
	 
	 
	 
	 @GetMapping("/getPostData")
	 @ResponseBody
	 public List<PostRequest> getPostData(@RequestParam("postNo") int postNo, Model model, PostRequest posts) {
	     // postNo를 사용하여 해당 게시물 정보를 가져옵니다.
		 List<PostRequest> post = service.getPostBy(postNo);

	     // 가져온 게시물 정보를 담은 뷰로 이동합니다. 해당 뷰에서 모달에 데이터를 표시할 수 있습니다.
	     return post;
	 }
	 
	 
	 
	 @PostMapping("/updateHeart")
	 public String updateHeart(@RequestParam(value="postNo") int postNo,
			 					@RequestParam(value="memberNo") int memberNo)  {
		 
		  System.out.println("postNo: " + postNo);
          System.out.println("memberNo: " + memberNo);
		 
          Heart heart = new Heart();
          heart.setPostNo(postNo);
          heart.setMemberNo(memberNo);
          
          int insertHeart = service.insertHeart(heart);
          
          System.out.println("인서트하트" +insertHeart);
          
          if (insertHeart > 0) {
        	  
        	  int heartCount = service.getHeartCount(heart);
        	  
        	  System.out.println(heartCount);
        	  
        	  PostRequest post = new PostRequest();
        	  post.setPostNo(postNo);
        	  post.setHeartCount(heartCount);
        	  
        	  int insertPostHeartCount = service.insertPostHeartCount(post);  
          }
        	  
        	  return "common/main";
        	  
	 }
	 
	 
	 @PostMapping("/deleteHeart")
	 public String deleteHeart(@RequestParam(value="postNo") int postNo,
			 					@RequestParam(value="memberNo") int memberNo)  {
		 
		  System.out.println("postNo: " + postNo);
          System.out.println("memberNo: " + memberNo);
		 
          Heart heart = new Heart();
          heart.setPostNo(postNo);
          heart.setMemberNo(memberNo);
          
          int deleteHeart = service.deleteHeart(heart);
          
          System.out.println("딜리트 :" +deleteHeart);

          if (deleteHeart > 0) {
        	  
        	  int heartCount = service.getHeartCount(heart);
        	  
        	  System.out.println("딜리트 하트 카운트 : " + heartCount);
        	  
        	  PostRequest post = new PostRequest();
        	  post.setPostNo(postNo);
        	  post.setHeartCount(heartCount);
        	  
        	  int insertPostHeartCount = service.insertPostHeartCount(post);
          }
        	  return "common/main";  
	 }
	 
	 @PostMapping("/getMemberPosts")
	 @ResponseBody
	 public List<Heart> getMemberPosts(@RequestParam(value="memberNo") int memberNo) {
		 
		 System.out.println("Received memberNo: " + memberNo);
		 
		 List<Heart> posts = service.getMemberPosts(memberNo);
		 
		 System.out.println("Received posts: " + posts);
		 
		 return posts;
	 }
	 

	 
	 @PostMapping("/addComment")
	 public ResponseEntity<?> addComment(@RequestParam(value="memberNo") int memberNo,
	                                     @RequestParam(value="memberProfile") String memberProfile,
	                                     @RequestParam(value="postNo") int postNo,
	                                     @RequestParam(value="comment") String postComment,
	                                     @RequestParam(value="memberNickname") String memberNickname) {
	     try {
	         System.out.println("Received comment : " + postComment);

	         PostComment postCom = new PostComment();
	         postCom.setMemberNo(memberNo);
	         postCom.setMemberProfile(memberProfile);
	         postCom.setPostNo(postNo);
	         postCom.setPostComment(postComment);
	         postCom.setMemberNickname(memberNickname);
	         
	         int newComment = service.addComment(postCom);
	         
	         int CommentCount = service.getCommentCount(postNo);
	         
	         PostRequest post = new PostRequest();
	       	  post.setPostNo(postNo);
	       	  post.setCommentsCount(CommentCount);
	         
	         
	         if( CommentCount > 0 ) {
	        
	        	 int insertCommentCount = service.insertCommentCount(post);
	        	 
	         }

	         
	         
	         System.out.println(postCom);

	         // 댓글 추가에 성공했다면 JSON 응답으로 성공 상태와 댓글 데이터를 반환합니다.
	         return ResponseEntity.ok().body(postCom);
	     } catch (Exception e) {
	         // 댓글 추가에 실패한 경우에는 예외 처리를 통해 실패 상태를 반환할 수 있습니다.
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	     }
	 }
	 
	 
	 @GetMapping("/getComments")
	 @ResponseBody
	 public List<PostComment> getComments(@RequestParam(value="postNo") int postNo) {
		 
		 System.out.println("Received postNo: " + postNo);
		 
		 List<PostComment> postComment = service.getComments(postNo);

		 System.out.println("Received postComment: " + postComment);
		 return postComment;
	 }
	 
	 
		@RequestMapping(value = "/deletePost/{postNo}", method = RequestMethod.DELETE)
		public ResponseEntity<String> deletePost(@PathVariable int postNo) {
        int deleteResult = service.deletePostByPostNo(postNo);
        if (deleteResult > 0) {
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시물을 찾을 수 없습니다.");
        }
    }
	 
	 
		
		@PostMapping("/getPostQ")
		@ResponseBody
	    public PostRequest getPost(@RequestParam("postNo") int postNo) {
			
			System.out.println("겟 포스트노랍니다." +postNo);
	      
	        PostRequest post = service.getPostQQ(postNo);
	        
	        System.out.println("포스트" +post);
	        		
	        		
	        		
	        return post;
	    }
		
		
	 
	 
}