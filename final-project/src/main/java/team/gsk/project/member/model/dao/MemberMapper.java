package team.gsk.project.member.model.dao;

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




}
