package team.gsk.project.member.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AjaxDAO {
	
	@Autowired
	private AjaxMapper mapper;
	
	// 이메일 중복검사
	public int checkId(String id) {
		
		return mapper.checkId(id);
	}

	// 닉네임 중복검사
	public int checkNickname(String nickname) {
		
		return mapper.checkNickname(nickname);
	}

	// 이메일 중복검사
	public int checkEmail(String email) {
		
		return mapper.checkEmail(email);
	}


	// 이메일로 아이디 찾기
	public int checkIdEmailAuth(String memberEmail) {

		
		return mapper.checkIdEmailAuth(memberEmail);
	}

	// 이메일 중복 체크
	public int dupCheck(String memberEmail) {
		
		return mapper.dupCheck(memberEmail);
	}
}
