package team.gsk.project.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserPost {
	
	private int postNo;
	private int memberNo;
	private String postContent;
	private String postUploadDate;
	private String memberProfile;
	
	
}
