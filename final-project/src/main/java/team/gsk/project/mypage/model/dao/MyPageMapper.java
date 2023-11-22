package team.gsk.project.mypage.model.dao;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.member.model.dto.Member;

@Mapper
public interface MyPageMapper {

	public int updateProfileImage(Member loginMember);

	
	
}
