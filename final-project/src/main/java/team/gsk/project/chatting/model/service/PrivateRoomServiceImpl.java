package team.gsk.project.chatting.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.chatting.model.dao.PrivateRoomMapper;

import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.chatting.model.dto.ChattingMessage;
import team.gsk.project.chatting.model.dto.PrivateRoomList;
import team.gsk.project.member.model.dto.Member;

@Service
public class PrivateRoomServiceImpl implements PrivateRoomService {
	
	
	
	@Autowired
	private PrivateRoomMapper mapper;
	
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
	
		
	// 채팅방 친구 조회
	@Override
	public List<Member> displayFriend(int roomNo) {
		return mapper.displayFriend(roomNo);
	}

	
	// 채팅방 참여를 위한 친구 조회
	@Override
	public List<Member> allFriends(int roomNo) {
		return mapper.allFriends(roomNo);
	}

	//친구끼리 채팅방 만들기 
	@Override
	public int createPrivateRoom(int memberNo, List<Long> invitedFriends) {
		
		
		// 먼저 방 생성
	  int createRoom = mapper.createRoom();
	     	
	  if(createRoom==1) {
		  
		  int roomNo =mapper.selectRoomNo();
		  
		  
		  if (!invitedFriends.contains(memberNo)) {
		    	 invitedFriends.add((long) memberNo);
		    	}
		     
			Map<String, Object> map = new HashMap<>();

			map.put("frienIds", invitedFriends);	
			map.put("roomNo", roomNo);
			return mapper.createPrivateRoom(map);
		  
		  
	  }
	  
	  
	  return 0;
	    
	}

		
		
		
}
