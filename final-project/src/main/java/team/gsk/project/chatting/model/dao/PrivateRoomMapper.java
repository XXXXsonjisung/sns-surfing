package team.gsk.project.chatting.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.member.model.dto.Member;

@Mapper
public interface PrivateRoomMapper {

	// 채팅방의 메세지 리스트 찾기
	List<ChattingMessage> getOldMessage(int roomNo);

	// 개인 채팅 메세지 저장
	void saveMessage(ChattingMessage chattingMessage);

	// 채팅방 친구 조회
	List<Member> displayFriend(int roomNo);

	// 초대를 위한 친구 조회
	List<Member> allFriends(Map<String, Object> map);

	//친구끼리 채팅방 만들기 
	int createPrivateRoom(Map<String, Object> map);

	//  방생성 
	int createRoom();

	// 방 조회
	int selectRoomNo();

}
