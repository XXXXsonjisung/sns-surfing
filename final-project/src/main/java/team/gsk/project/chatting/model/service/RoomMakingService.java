package team.gsk.project.chatting.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.validation.Errors;

import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.member.model.dto.Member;

public interface RoomMakingService {

	// 채팅방 만들기 
	int roomMaking(Chatting inputChatting, Member loginMember);
	
	// 서버 유효성 검사
	Map<String, String> validateHandling(Errors errors);

	//채팅방 찾기
	List<Chatting> findRoom();

	// 채팅방 태그 찾기
	List<String> findRoomTag(int roomNo);

}
