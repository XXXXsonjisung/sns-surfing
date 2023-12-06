package team.gsk.project.post.model.dao;

import org.apache.ibatis.annotations.Mapper;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.post.model.dto.Heart;

@Mapper
public interface HeartMapper {

	public int insertHeart(Heart heart);

	public int deleteHeart(Heart heart);

	public Post getMemberPosts(int memberNo);

}
