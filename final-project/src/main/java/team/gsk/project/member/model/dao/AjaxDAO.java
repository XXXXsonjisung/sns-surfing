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
}
