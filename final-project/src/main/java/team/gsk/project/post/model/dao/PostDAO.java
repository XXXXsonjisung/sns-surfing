package team.gsk.project.post.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.member.model.dao.MemberMapper;
import team.gsk.project.post.model.dto.Heart;
import team.gsk.project.post.model.dto.PostComment;
import team.gsk.project.post.model.dto.PostRequest;

@Repository
public class PostDAO {
	
	
	@Autowired
	private PostMapper mapper;
	
	@Autowired
	private HeartMapper Hmapper;
	
	@Autowired
	private CommentMapper Cmapper;
	
	@Autowired
	private MemberMapper Mmapper;
	

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




	public List<Heart> getMemberPosts(int memberNo) {
	
		return Hmapper.getMemberPosts(memberNo);
	}


	public int addComment(PostComment postCom) {
		
		return Cmapper.addComment(postCom);
	}


	public List<PostComment> getComments(int postNo) {
		
		return Cmapper.getComments(postNo);
	}


	public String getMemberNicknameByUsername(String username) {
		
		return Mmapper.getMemberNicknameByUsername(username);
	}


	public int getHeartCount(Heart heart) {
		
		return Hmapper.getHeartCount(heart);
	}


	public int insertPostHeartCount(PostRequest post) {
		
		return mapper.insertPostHeartCount(post);
	}


	public int getCommentCount(int postNo) {
		
		return Cmapper.getCommentCount(postNo);
	}


	public int insertCommentCount(PostRequest post) {
		
		return mapper.insertCommentCount(post);
	}









}
