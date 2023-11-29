package team.gsk.project.chatting.model.service;

import java.util.Map;

import org.springframework.validation.Errors;

import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.member.model.dto.Member;

public interface RoomMakingService {

	// 채팅방 만들기 
	int roomMaking(Chatting inputChatting, Member loginMember);

	Map<String, String> validateHandling(Errors errors);

}
