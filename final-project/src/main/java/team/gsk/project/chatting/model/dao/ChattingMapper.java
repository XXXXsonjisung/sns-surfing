package team.gsk.project.chatting.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.chatting.model.dto.ChatRoomList;
import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.member.model.dto.Member;

@Mapper
public interface ChattingMapper {
	
	// 채팅 초대 찾기
	List<Member> selectTarget(Map<String, Object> map);



	// 회원의 채팅방 리스트 찾기
	List<ChatRoomList> selectRoomList(int memberNo);


	// 채팅방의 메세지 리스트 찾기
	List<ChattingMessage> getOldMessage(int roomNo);


	// 개인 채팅 메세지 저장
	void saveMessage(ChattingMessage chattingMessage);








}
