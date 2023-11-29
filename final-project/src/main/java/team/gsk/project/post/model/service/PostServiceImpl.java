package team.gsk.project.post.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import oracle.jdbc.proxy.annotation.Post;
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
	public boolean insertPost(PostRequest postUser) {
	    String imagePath = webPath + postUser.getImageUrls();
	    postUser.setImageUrls(imagePath);
	    
	    
	    return dao.insertPost(postUser);
	}

	@Override
	public List<PostRequest> getAllPosts() {
		
		return dao.getAllPosts();
	}


	


}
