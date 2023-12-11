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

	private String p_memberId;
	private String h_memberId;
	private String profileImage;
	
}
