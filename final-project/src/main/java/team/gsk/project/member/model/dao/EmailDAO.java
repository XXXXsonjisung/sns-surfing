package team.gsk.project.member.model.dao;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EmailDAO {

	@Autowired
	private EmailMapper mapper;
	
	
	public int updateAuthKey(Map<String, String> map) {
		
		return mapper.updateAuthKey(map);
	}


	public int insertAuthKey(Map<String, String> map) {
		
		return mapper.insertAuthKey(map);
	}


	public int checkAuthKey(Map<String, Object> paramMap) {
		
		return mapper.checkAuthKey(paramMap);
	}


	public int dupCheck(String memberEmail) {
		
		return mapper.dupCheck(memberEmail);
	}


	public int sendAuthKey(String memberEmail) {
		
		return mapper.sendAuthKey(memberEmail);
	}


	public int checkAuth(Map<String, String> map) {
		
		return mapper.checkAuth(map);
	}

}
