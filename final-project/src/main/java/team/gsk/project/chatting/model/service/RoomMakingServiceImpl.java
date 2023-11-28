package team.gsk.project.chatting.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	@Override
	public int roomMaking(Chatting inputChatting,String[] tagName) {

		System.out.println(inputChatting);
		
		// 채팅방 생성 
		int result= mapper.roomMaking(inputChatting);
		
		// 해소 테이블에 태그 넣기 
		if(result>0) {
			
			// 채팅방 번호 가져오기
			int roomNo =mapper.roomNumber();
		
			// 태그 번호 가져오기
			List<Integer> tagNo = mapper.tagNumber(tagName);
		
			List<Map<String, Object>> listOfMaps = new ArrayList<>();
			
			for (int i = 0; i < tagNo.size(); i++) {
			
			Map<String, Object> map = new HashMap<>();	
			
			map.put("roomNo", roomNo);
			map.put("tagNo", tagNo.get(i));
			
			listOfMaps.add(map);
		
			}
			
//			
			
//			Map<String, Object> map = new HashMap<>();	
//			
//			map.put("roomNo", roomNo);
//			map.put("tagName", tagName);
			

			// 태그 집어넣기 
			System.out.println(listOfMaps);
		
			int addTag =mapper.addTag(listOfMaps);
			
			return result;
			
		}
		
		
	
		return 0;
	

	}
}
