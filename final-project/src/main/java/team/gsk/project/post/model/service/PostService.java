package team.gsk.project.post.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.member.model.dto.Member;
import team.gsk.project.post.model.dto.PostRequest;

public interface PostService {

	int insertPost(PostRequest postUser, MultipartFile imageUrls) throws Exception;

	List<PostRequest> getAllPosts();

	/** 게시물 값 가져오기
	 * @param postNo
	 * @return
	 */
	List<PostRequest> getPostBy(int postNo);

}
