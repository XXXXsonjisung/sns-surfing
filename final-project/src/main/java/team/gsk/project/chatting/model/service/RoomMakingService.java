package team.gsk.project.chatting.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.validation.Errors;

import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.member.model.dto.Member;

public interface RoomMakingService {

	// 채팅방 만들기 
	int roomMaking(Chatting inputChatting, Member loginMember);
	
	// 서버 유효성 검사
	Map<String, String> validateHandling(Errors errors);

	//채팅방 찾기
	List<Chatting> findRoom();

	// 채팅방 태그 찾기
	List<String> findRoomTag(int roomNo);

	// 회원 채팅방 가입
	int insertMemberRoom(int memberNo, int roomNo);

	// 채팅방 설정을 위해 다시 찾기
	Chatting refindRoom(int roomNo);

	// 채팅방 회원 찾기
	List<Member> refindMember(int roomNo);

	// 강퇴
	int kickMembers(String roomNo, List<Long> selectedMembers);

}
