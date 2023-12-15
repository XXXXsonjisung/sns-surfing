package team.gsk.project.member.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.member.model.dto.Follow;
import team.gsk.project.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	Member login(Member inputMember);
	
	int signUp(Member inputMember);

	String memberId(String string);

	String profile(String string);

	Member getMemberX(String memberId);

	Member getMemberById(String h_memberId);

	Member getMemberByIdP(String p_memberId);

	String getMemberNicknameByUsername(String username);

	List<Member> searchHeader(String value);

	boolean checkNicknameX(String nickname);

	Member search(String value);

	String findId(String memberName, String memberEmail);






}
