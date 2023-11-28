package team.gsk.project.post.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import team.gsk.project.post.model.dto.PostRequest;

@Repository
public class PostDAO {
	
	
	@Autowired
	private PostMapper mapper;
	

	public boolean insertPost(PostRequest postUser) {
	
		return mapper.insertPost(postUser);
	}

}
