package team.gsk.project.chatting.model.service;

import java.util.List;

import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.member.model.dto.Member;


public interface PrivateRoomService {

	// 채팅방의 메세지 리스트 찾기
	List<ChattingMessage> getOldMessage(int roomNo);

	// 개인 채팅 메세지 저장
	void saveMessage(ChattingMessage chattingMessage);

	// 채팅방 친구 조회
	List<Member> displayFriend(int roomNo);

	// 채팅방 참여를 위한 친구 조회
	List<Member> allFriends(int roomNo);

	//친구끼리 채팅방 만들기 
	int createPrivateRoom(int memberNo, List<Long> invitedFriends);

}
