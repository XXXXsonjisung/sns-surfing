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

	List<Follow> getFolloingDataByMemberId(String memberId);

	Member getMemberByIdP(String p_memberId);

	List<Member> searchHeader(String value);

	boolean checkNicknameX(String nickname);

	int getCount(String memberId);

	Member search(String memberId);

	List<String> getFollower(String memberId);

	List<String> getFolloing(String memberId);

}
