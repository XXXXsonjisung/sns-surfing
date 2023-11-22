package team.gsk.project.member.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Member {

	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberTel;
	private String memberNickname;
	private String memberIntro;
	private String ProfileImage;
	private String CoverImage;
	private String enrollDate;
	private String DeleteFlag;
	private int authority; // 1 일반 2 관리자
	private String memberEmail;
	private String memberBirth;
	


}
