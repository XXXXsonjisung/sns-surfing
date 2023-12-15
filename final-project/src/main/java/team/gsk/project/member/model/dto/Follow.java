package team.gsk.project.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Follow {

	private String p_memberId;	 //팔로우를 당한사람
	private String h_memberId;  //팔로우를 한사람 
	private String profileImage;
	
}
