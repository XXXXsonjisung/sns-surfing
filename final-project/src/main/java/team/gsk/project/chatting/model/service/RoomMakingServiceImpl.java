package team.gsk.project.chatting.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import team.gsk.project.chatting.model.dao.RoomMakingMapper;
import team.gsk.project.chatting.model.dto.Chatting;

@Service
public class RoomMakingServiceImpl implements RoomMakingService {

	@Autowired
	private RoomMakingMapper mapper;

	// 채탱방 만들기
	@Transactional
	public int roomMaking(Chatting inputChatting,String[] tagName) {

		System.out.println(inputChatting);
		
		// 채팅방 생성 
		int result= mapper.roomMaking(inputChatting);
		
		// 해소 테이블에 태그 넣기 
		if(result>0) {
			
			// 채팅방 번호 가져오기
			int roomNum =mapper.roomNumber();
			
			// 태그 집어넣기 
			int addTag =mapper.addTag(tagName,roomNum);
			
			return result;
			
		}
		
		
	
		return 0;
	

	}
}
