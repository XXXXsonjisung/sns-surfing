package team.gsk.project.member.model.service;




import team.gsk.project.member.model.dto.Member;

public interface MemberService {
	
	Member login(Member inputMember);

	int signUp(Member inputMember);

	String findId(String memberName, String memberEmail);

	String checkMember(String email);

//	int kakaoSignUp(Map<String, String> map);
//
//	Member kakaoLoginMember(String email);

}
