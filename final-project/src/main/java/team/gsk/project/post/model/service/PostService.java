package team.gsk.project.post.model.service;

import java.util.List;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.post.model.dto.PostRequest;

public interface PostService {

	boolean insertPost(PostRequest postUser);

	List<PostRequest> getAllPosts();


}
