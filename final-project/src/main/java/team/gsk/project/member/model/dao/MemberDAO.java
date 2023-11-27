package team.gsk.project.member.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import team.gsk.project.member.model.dto.Member;



@Repository
public class MemberDAO {

	@Autowired
	private MemberMapper mapper; // MemberMapper 인터페이스를 상속받은 자식 객체
										// 자식객체가 sqlSessionTemplate 이용

	
	
	public Member login(Member inputMember) {
		return mapper.login(inputMember);
	}


	public int signUp(Member inputMember) {
		
		return mapper.signUp(inputMember);
	}


	public String memberId(String string) {
		
		return mapper.memberId(string);
	}


	public String profileImage(String string) {
		
		return mapper.profile(string);
	}




}
