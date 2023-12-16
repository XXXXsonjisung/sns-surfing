package team.gsk.project.chatting.model.service;

import java.util.List;
import java.util.Map;

import team.gsk.project.chatting.model.dto.ChatRoom;
import team.gsk.project.chatting.model.dto.ChatRoomList;
import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.member.model.dto.Member;

public interface ChattingService {

	// 채팅 초대 찾기
	List<Member> selectTarget(Map<String, Object> map);

	// 회원의 채팅방 리스트 찾기
	List<ChatRoomList> selectRoomList(int memberNo);

	// 채팅방의 메세지 리스트 찾기
	List<ChattingMessage> getOldMessage(int roomNo);


	// 개인 채팅 메세지 저장
	void saveMessage(ChattingMessage chattingMessage);

	// 채팅방 참여를 위한 친구 조회
	List<Member> allFriends(int roomNo);

	// 친구 초대
	int invite(int currentRoomNo, List<Long> invitedFriends);

	// 채팅방 친구 조회
	List<Member> displayFriend(int roomNo);

	// 채팅방 나가기
	int exitMember(String roomNo, String memberNo);

	// 채팅방 만들기 위한 친구 조회
	List<Member> findFriends(int memberNo);


	

}
