package team.gsk.project.chatting.model.service;

import team.gsk.project.chatting.model.dto.Chatting;

public interface RoomMakingService {

	// 채팅방 만들기 
	int roomMaking(Chatting inputChatting, String[] tagName);

}
