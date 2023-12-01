package team.gsk.project.chatting.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.chatting.model.dto.ChatMessage;
import team.gsk.project.chatting.model.dto.ChatRoom;

@Mapper
public interface ChatMapper {

//	ChatRoom findRoomNo(String roomNo);

	// 전체 채팅 메세지 찾기
	List<ChatMessage> findAll();

	// 전체 채팅 메세지 저장
	void save(ChatMessage message);



}
