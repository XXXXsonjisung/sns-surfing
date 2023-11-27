package team.gsk.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.member.model.dao.MemberDAO;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private MemberDAO dao;



	@Override
	public String getMemberId(String string) {
		// TODO Auto-generated method stub
		return dao.memberId(string);
	}

	@Override
	public String getProfileImage(String string) {
		// TODO Auto-generated method stub
		return dao.profileImage(string);
	}

}
