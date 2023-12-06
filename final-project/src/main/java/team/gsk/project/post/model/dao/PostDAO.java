package team.gsk.project.post.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.post.model.dto.Heart;
import team.gsk.project.post.model.dto.PostRequest;

@Repository
public class PostDAO {
	
	
	@Autowired
	private PostMapper mapper;
	
	@Autowired
	private HeartMapper Hmapper;
	

	public int insertPost(PostRequest postUser) {
	
		return mapper.insertPost(postUser);
	}


	public List<PostRequest> getAllPosts() {
		
		return mapper.getAllPosts();
	}


	public List<PostRequest> getPostBy(int postNo) {
		
		return mapper.getPostBy(postNo);
	}


	public int insertHeart(Heart heart) {
		
		return Hmapper.insertHeart(heart);
	}


	public int deleteHeart(Heart heart) {
		
		return Hmapper.deleteHeart(heart);
	}


	public int updatedHeartCountP (int postNo) {
		
		return mapper.updatedHeartCountP(postNo);
	}


	public int updatedHeartCountM(int postNo) {
		
		return mapper.updatedHeartCountM(postNo);
	}


	public Post getMemberPosts(int memberNo) {
		
		return Hmapper.getMemberPosts(memberNo);
	}









}
