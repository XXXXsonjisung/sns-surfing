package team.gsk.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import team.gsk.project.member.model.dao.MemberMapper;
import team.gsk.project.member.model.dto.Member;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberMapper mapper;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	@Override
	public Member login(Member inputMember) {
		
		return null;
	}

}
