package team.gsk.project.post.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.post.model.dto.PostComment;

@Mapper
public interface CommentMapper {

	public int addComment(PostComment postCom);

	public List<PostComment> getComments(int postNo);

}
