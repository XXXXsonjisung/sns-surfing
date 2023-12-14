package team.gsk.project.member.model.service;

import java.util.Map;

import team.gsk.project.member.model.dto.Member;

public interface MemberService {

	Member login(Member inputMember);

	int signUp(Member inputMember);

	String findId(Map<String, Object> map);




}
