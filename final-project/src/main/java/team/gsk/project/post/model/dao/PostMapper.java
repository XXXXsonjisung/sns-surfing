package team.gsk.project.post.model.dao;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.post.model.dto.PostRequest;

@Mapper
public interface PostMapper {

	boolean insertPost(PostRequest postUser);



	
	
	
}
