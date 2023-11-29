package team.gsk.project.chatting.model.service;

import java.util.Map;

import org.springframework.validation.Errors;

import team.gsk.project.chatting.model.dto.Chatting;

public interface RoomMakingService {

	// 채팅방 만들기 
	int roomMaking(Chatting inputChatting);

	Map<String, String> validateHandling(Errors errors);

}
