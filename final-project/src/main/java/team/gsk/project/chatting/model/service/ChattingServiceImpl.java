package team.gsk.project.chatting.model.service;

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


}
