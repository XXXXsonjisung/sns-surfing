package team.gsk.project.member.model.service;

import java.util.Map;

public interface EmailService {

	int signUp(String email, String string);

	int checkAuthKey(Map<String, Object> paramMap);

	int dupCheckEmail(String memberEmail);

	int sendAuthKey(String memberEmail);

	int checkAuth(String inputKey, String memberEmail);

}
