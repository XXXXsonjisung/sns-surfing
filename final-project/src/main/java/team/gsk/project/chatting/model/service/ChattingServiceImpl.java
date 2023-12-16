package team.gsk.project.chatting.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.chatting.model.dao.ChattingMapper;
import team.gsk.project.chatting.model.dto.ChatRoomList;
import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.member.model.dto.Member;



@Service
public class ChattingServiceImpl implements ChattingService {
	
	@Autowired
	private ChattingMapper mapper;

	 //채팅초대 찾기
	@Override
	public List<Member> selectTarget(Map<String, Object> map) {
		return mapper.selectTarget(map);
	}

	// 회원의 채팅방 리스트 찾기
	@Override
	public List<ChatRoomList> selectRoomList(int memberNo) {
		return mapper.selectRoomList(memberNo);
	}

	// 채팅방의 메세지 리스트 찾기
	@Override
	public List<ChattingMessage> getOldMessage(int roomNo) {
		return mapper.getOldMessage(roomNo);
	}


	// 개인 채팅 메세지 저장
	@Override
	public void saveMessage(ChattingMessage chattingMessage) {
		mapper.saveMessage(chattingMessage);
		
	}

	// 채팅방 참여를 위한 친구 조회
	@Override
	public List<Member> allFriends(int roomNo) {
		return mapper.allFriends(roomNo);
	}

	// 친구 초대
	@Override
	public int invite(int currentRoomNo, List<Long> invitedFriends) {
		Map<String, Object> map = new HashMap<>();
		map.put("roomNo", currentRoomNo);
		map.put("frienIds", invitedFriends);
	
		return mapper.invite(map);
	}

	// 채팅방 친구 조회
	@Override
	public List<Member> displayFriend(int roomNo) {
		return mapper.displayFriend(roomNo);
	}

	// 채팅방 나가기
	@Override
	public int exitMember(String roomNo, String memberNo) {
		Map<String, Object>map =new HashMap<>();
		map.put("roomNo", roomNo);
		map.put("memberNo", memberNo);
		
		return mapper.exitMember(map);
	}

	// 채팅방 만들기 위한 친구 조회
	@Override
	public List<Member> findFriends(int memberNo) {
		return mapper.findFriends(memberNo);
	}



}
