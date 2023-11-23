package team.gsk.project.chatting.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.gsk.project.chatting.model.dao.RoomMakingMapper;

@Service
public class RoomMakingServiceImpl implements RoomMakingService {

	@Autowired
	private RoomMakingMapper mapper;
	
}
