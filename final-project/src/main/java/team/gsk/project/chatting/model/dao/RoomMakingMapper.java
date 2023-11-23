package team.gsk.project.chatting.model.dao;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.chatting.model.dto.Chatting;

@Mapper
public interface RoomMakingMapper{

	// 채팅방 만들기
	int roomMaking(Chatting inputChatting);
	
	
}
