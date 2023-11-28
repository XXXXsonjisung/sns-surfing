package team.gsk.project.post.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.gsk.project.post.model.dao.PostDAO;
import team.gsk.project.post.model.dto.PostRequest;

@Service
public class PostServiceImpl implements PostService{

	@Autowired
	private PostDAO dao;

	@Override
	public boolean insertPost(PostRequest postUser) {
		
		return  dao.insertPost(postUser);
	}
	

	
	
//	@Override
//	public PostRequest insertPost(PostRequest postUser) {
//		
//		return dao.insertPost(postUser);
//	}

}
