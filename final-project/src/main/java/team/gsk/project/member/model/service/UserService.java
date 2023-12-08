package team.gsk.project.member.model.service;

import team.gsk.project.member.model.dto.Member;

public interface UserService {

	String getMemberId(String string);

	String getProfileImage(String string);

	Member getMemberX(String memberId);

}
