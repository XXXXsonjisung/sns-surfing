package team.gsk.project.chatting.model.service;

import java.util.List;
import java.util.Map;

import team.gsk.project.member.model.dto.Member;

public interface ChattingService {

	// 채팅 초대 찾기
	List<Member> selectTarget(Map<String, Object> map);

}
