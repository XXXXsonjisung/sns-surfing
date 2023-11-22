package team.gsk.project.chatting.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.member.model.dto.Member;

@Mapper
public interface ChattingMapper {
	
	// 채팅 초대 찾기
	List<Member> selectTarget(Map<String, Object> map);

}
