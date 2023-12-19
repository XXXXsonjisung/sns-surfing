package team.gsk.project.post.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import oracle.jdbc.proxy.annotation.Post;
import team.gsk.project.member.model.dto.Member;
import team.gsk.project.post.model.dto.Heart;
import team.gsk.project.post.model.dto.PostComment;
import team.gsk.project.post.model.dto.PostRequest;

public interface PostService {

	int insertPost(PostRequest postUser, MultipartFile imageUrls) throws Exception;

	List<PostRequest> getAllPosts();

	/** 게시물 값 가져오기
	 * @param postNo
	 * @return
	 */
	List<PostRequest> getPostBy(int postNo);

	/** 하트 정보 넣기
	 * @param heart
	 * @return
	 */
	int insertHeart(Heart heart);

	/** 하트 정보 제거하기
	 * @param heart
	 * @return
	 */
	int deleteHeart(Heart heart);

	/** 하트 목록 가져오기
	 * @param memberNo 
	 * @param memberNo
	 * @return
	 */
	List<Heart> getMemberPosts(int memberNo);

	/** 댓글 입력
	 * @param postCom
	 * @return
	 */
	int addComment(PostComment postCom);

	/** 뎃글 리스트 가져오기
	 * @param postNo
	 * @return
	 */
	List<PostComment> getComments(int postNo);

	/** 게시글의 닉네임 가져오기
	 * @param username
	 * @return
	 */
	String getMemberNicknameByUsername(String username);

	/** 게시물의 하트 수 가져오기
	 * @param heart
	 * @return
	 */
	int getHeartCount(Heart heart);

	/** 게시물의 하트 수 설정하기
	 * @param post
	 * @return
	 */
	int insertPostHeartCount(PostRequest post);

	/** 게시물의 댓글 수 가져오기
	 * @param postNo
	 * @return
	 */
	int getCommentCount(int postNo);

	/** 게시물의 댓글 수 대입하기
	 * @param post
	 * @return
	 */
	int insertCommentCount(PostRequest post);

	/** 게시물 삭제 
	 * @param postNo
	 * @return
	 */
	int deletePostByPostNo(int postNo);

	/** 수정 모달창에 값 넣기
	 * @param postNo
	 * @return
	 */
	PostRequest getPostQQ(int postNo);

}
