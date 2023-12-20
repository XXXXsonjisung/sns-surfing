package team.gsk.project.post.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.post.model.dto.Heart;

@Mapper
public interface HeartMapper {

	public int insertHeart(Heart heart);

	public int deleteHeart(Heart heart);

	public List<Heart> getMemberPosts(int memberNo);

	public int getHeartCount(Heart heart);


}
