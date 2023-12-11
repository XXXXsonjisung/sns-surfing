package team.gsk.project.member.model.service;

import java.util.List;

import team.gsk.project.member.model.dto.Follow;
import team.gsk.project.member.model.dto.Member;

public interface UserService {

	String getMemberId(String string);

	String getProfileImage(String string);

	Member getMemberX(String memberId);

	int saveFollow(Follow follow);

	int unFollow(Follow follow);

	int checkFollow(Follow follow);

	List<Follow> getFollowDataByMemberId(String memberId);

	Member getMemberById(String h_memberId);

}
