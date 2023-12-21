package team.gsk.project.chatting.model.service;

import java.util.List;

import team.gsk.project.chatting.model.dto.ChatMessage;


public interface ChatService {


	// 채팅 메세지 저장
	void saveMessage(ChatMessage chatMessage);

	// 기존 채팅 불러오기
	List<ChatMessage> getOldMessages();



}
