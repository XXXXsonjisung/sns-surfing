package team.gsk.project.post.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.post.model.dto.PostRequest;

@Repository
public class PostDAO {
	
	
	@Autowired
	private PostMapper mapper;
	

	public int insertPost(PostRequest postUser) {
	
		return mapper.insertPost(postUser);
	}


	public List<PostRequest> getAllPosts() {
		
		return mapper.getAllPosts();
	}


	public List<PostRequest> getPostBy(int postNo) {
		
		return mapper.getPostBy(postNo);
	}






}
