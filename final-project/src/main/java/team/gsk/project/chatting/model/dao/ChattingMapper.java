package team.gsk.project.chatting.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.chatting.model.dto.ChatRoomList;
import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.chatting.model.dto.PrivateRoomList;
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


	// 초대를 위한 친구 조회
	List<Member> allFriends(int roomNo);


	// 친구 초대
	int invite(Map<String, Object> map);


	// 채팅방 친구 조회
	List<Member> displayFriend(int roomNo);


	// 채팅방 나가기
	int exitMember(Map<String, Object> map);


	// 채팅방 만들기 위한 친구 조회
	List<Member> findFriends(int memberNo);


	// 개인 채팅 리스트 조회
	List<PrivateRoomList> selectPrivateList(int memberNo);



}
