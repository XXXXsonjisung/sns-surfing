package team.gsk.project.chatting.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.member.model.dto.Member;

@Mapper
public interface RoomMakingMapper{

	// 채팅방 만들기
	int roomMaking(Chatting inputChatting);

	// 채팅방 번호 가져오기
	int roomNumber();


	// 태그 번호 찾기
	//List<Integer> tagNumber(String[] tagName);
	
	// 태그 넣기 
	//int addTag(@Param("listOfMaps") List<Map<String, Object>> listOfMaps);
	int addTag(List<Map<String, Object>> listOfMaps);

	// 방장 넣기 
	int addMember(Map<String, Object> map2);

	
	// 채팅방 찾기
	List<Chatting> findRoom();

	// 채팅방 태그찾기
	List<String> findRoomTag(int roomNo);
	
	// 회원 채팅방 가입
	int insertMemberRoom(Map<String, Object> map);

	//채팅방 설정을 위해 다시 찾기
	Chatting refindRoom(int roomNo);

	// 채팅방 회원 찾기
	List<Member> refindMember(int roomNo);

	// 강퇴
	int kickMembers(Map<String, Object> map);

	// 방장 찾기
	int findManger(int roomNo);
	
	// 방장 넘기기
	int authorizeManger(Map<String, Object> map);

	// 채팅방 수정
	int updateRoom(Chatting inputChatting);

	// 채팅방 검색
	//List<Chatting> searchRoom(@Param("listOfMaps")List<Map<String, Object>> listOfMaps);

	List<Chatting> searchRoom(Map<String, Object> params);

	// 채팅방 회원수 찾기
	List<Chatting> findMemberCount(@Param("listOfMaps")List<Map<String, Object>> listOfMaps);


	
}






