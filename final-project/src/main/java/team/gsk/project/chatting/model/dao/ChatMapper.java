package team.gsk.project.chatting.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.chatting.model.dto.ChatMessage;

@Mapper
public interface ChatMapper {

//	ChatRoom findRoomNo(String roomNo);


	// 전체 채팅 메세지 저장
	void save(ChatMessage message);

	// 전체 채팅 기존 메세지조회
	List<ChatMessage> getOldMessages();

	// 메세지 제한을 위한 메세지 찾기
	List<ChatMessage> findAll();

	// 메세지 삭제 
	void deleteAll(List<ChatMessage> messagesToDelete);



}
