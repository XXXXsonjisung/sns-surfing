package team.gsk.project.post.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostComment {

	private int postCommentId;
	private int memberNo;
	private String memberProfile;
	private int postNo;
	private String postComment;
	private String memberNickname;
	
}
