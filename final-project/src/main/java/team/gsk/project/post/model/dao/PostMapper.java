package team.gsk.project.post.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.post.model.dto.Heart;
import team.gsk.project.post.model.dto.PostRequest;

@Mapper
public interface PostMapper {

	int insertPost(PostRequest postUser);

	List<PostRequest> getAllPosts();

	List<PostRequest> getPostBy(int postNo);

	int updatedHeartCountP(int postNo);

	int updatedHeartCountM(int postNo);



	


	
	
	
}
