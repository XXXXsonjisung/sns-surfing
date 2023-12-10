package team.gsk.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.member.model.dao.MemberDAO;
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

}
