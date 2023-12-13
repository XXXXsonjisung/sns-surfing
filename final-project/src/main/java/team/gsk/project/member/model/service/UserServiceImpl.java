package team.gsk.project.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.member.model.dao.MemberDAO;
import team.gsk.project.member.model.dto.Follow;
import team.gsk.project.member.model.dto.Member;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private MemberDAO dao;



	@Override
	public String getMemberId(String string) {
		
		return dao.memberId(string);
	}

	@Override
	public String getProfileImage(String string) {
		
		return dao.profileImage(string);
	}

	@Override
	public Member getMemberX(String memberId) {
		
		return dao.getMemberX(memberId);
	}

	@Override
	public int saveFollow(Follow follow) {
		
		return dao.saveFollow(follow);
	}

	@Override
	public int unFollow(Follow follow) {
		
		return dao.unFollow(follow);
	}

	@Override
	public int checkFollow(Follow follow) {
		
		return dao.checkFollow(follow);
	}

	@Override
	public List<Follow> getFollowDataByMemberId(String memberId) {
	
		return dao.getFollowDataByMemberId(memberId);
	}

	@Override
	public Member getMemberById(String h_memberId) {
		
		return dao.getMemberById(h_memberId);
	}

	@Override
	public List<Follow> getFolloingDataByMemberId(String memberId) {
		
		return dao.getFolloingDataByMemberId(memberId);
	}

	@Override
	public Member getMemberByIdP(String p_memberId) {
		
		return dao.getMemberByIdP(p_memberId);
	}

	@Override
	public List<Member> searchHeader(String value) {
		
		return dao.searchHeader(value);
	}

	@Override
	public boolean checkNicknameX(String nickname) {
		
		return dao.checkNicknameX(nickname);
	}

	@Override
	public int getCount(String memberId) {
		
		return dao.getCount(memberId);
	}

}
