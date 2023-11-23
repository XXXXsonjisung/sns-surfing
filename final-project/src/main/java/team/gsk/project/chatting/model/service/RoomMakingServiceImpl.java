package team.gsk.project.chatting.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.chatting.model.dao.RoomMakingMapper;
import team.gsk.project.chatting.model.dto.Chatting;

@Service
public class RoomMakingServiceImpl implements RoomMakingService {

	@Autowired
	private RoomMakingMapper mapper;

	@Override
	public int roomMaking(Chatting inputChatting) {
	
		System.out.println(inputChatting);
		return mapper.roomMaking(inputChatting);
	}


	
}
