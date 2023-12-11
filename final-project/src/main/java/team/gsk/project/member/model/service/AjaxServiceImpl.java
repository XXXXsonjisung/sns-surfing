package team.gsk.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.member.model.dao.AjaxDAO;

@Service
public class AjaxServiceImpl implements AjaxService{
	
	@Autowired
	private AjaxDAO dao;

	@Override
	public int checkId(String id) {
		
		return dao.checkId(id);
	}

	@Override
	public int checkNickname(String nickname) {
		
		return dao.checkNickname(nickname);
	}

	@Override
	public int checkEmail(String email) {
		
		return dao.checkEmail(email);
	}


	@Override
	public int checkIdEmailAuth(String memberEmail) {
		
		return dao.checkIdEmailAuth(memberEmail);

	}


}
