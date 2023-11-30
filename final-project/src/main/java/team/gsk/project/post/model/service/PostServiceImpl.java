package team.gsk.project.post.model.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.common.utility.Util;
import team.gsk.project.post.model.dao.PostDAO;
import team.gsk.project.post.model.dto.PostRequest;

@Service
public class PostServiceImpl implements PostService{

	@Value("${my.post.location}")
	private String filePath;
	
	@Value("${my.post.webpath}")
	private String webPath;
	
	
	
	@Autowired
	private PostDAO dao;

	@Override
	public int insertPost(PostRequest postUser, MultipartFile imageUrls) throws Exception {
	  
		String rename = null; // 변경 이름 저장 변수
		
		if(imageUrls.getSize() > 0) { // 업로드된 이미지가 있을 경우
			// 1) 파일 이름 변경
			rename = Util.fileRename(imageUrls.getOriginalFilename());
			
			// 2) 바뀐 이름 loginMember에 세팅
			postUser.setImageUrls(webPath + rename);
		} else {
			postUser.setImageUrls(null);
		}
		
		
	   int result = dao.insertPost(postUser);
	   
	   if(result > 0) {
		   imageUrls.transferTo(new File(filePath + rename));
	   }
	   
	   return result;
	   
	   
	}
	   
	  
	@Override
	public List<PostRequest> getAllPosts() {
		
		return dao.getAllPosts();
	}


	


}
