package team.gsk.project.member.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import team.gsk.project.member.model.dao.MemberDAO;
import team.gsk.project.member.model.dto.Member;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;


	@Override
	public Member login(Member inputMember) {
		
		Member loginMember = dao.login(inputMember);
	
		if(loginMember != null) { // 아이디가 일치하는 회원이 조회된 경우
			
			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
		
			} else {
				loginMember = null;
			}
			
		}
		return loginMember;
	}


	// 회원 가입 서비스
	@Transactional
	@Override
	public int signUp(Member inputMember) {
		
		
		// 비밀번호 암호화 (Bcrypt) 후 다시 inputMember 세팅
		
 		String encPw = bcrypt.encode(inputMember.getMemberPw());
	
		inputMember.setMemberPw(encPw);
		
		
		return dao.signUp(inputMember);
		
	}


	@Override
	public String findId(Map<String, Object> map) {
		
		return dao.findId(map);
	}


}
