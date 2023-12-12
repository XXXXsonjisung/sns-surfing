package team.gsk.project.chatting.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import team.gsk.project.chatting.model.dao.RoomMakingMapper;
import team.gsk.project.chatting.model.dto.Chatting;
import team.gsk.project.member.model.dto.Member;

@Service
public class RoomMakingServiceImpl implements RoomMakingService {

	@Autowired
	private RoomMakingMapper mapper;

	// 채탱방 만들기
	@Override
	public int roomMaking(Chatting inputChatting,Member loginMember) {

		
		int memberNo = loginMember.getMemberNo();
		
				inputChatting.setRoomManager(memberNo);
				
	
		
		// 채팅방 생성 
		int result= mapper.roomMaking(inputChatting);
		
		// 해소 테이블에 태그 넣기 
		if(result>0) {
			
			// 채팅방 번호 가져오기
			int roomNo =mapper.roomNumber();
		
			// 태그 번호 가져오기
			String tagString = inputChatting.getTagName(); 
			String[] tagName = tagString.split(",\\s*");
//			String[] tagName = inputChatting.getTagName().split("[,]");
			
			
		//	List<Integer> tagNo = mapper.tagNumber(tagName);
		
			List<Map<String, Object>> listOfMaps = new ArrayList<>();
			
			for (int i = 0; i < tagName.length; i++) {
			
			Map<String, Object> map = new HashMap<>();	
			
			map.put("roomNo", roomNo);
			map.put("tagName", tagName[i]);
			
			listOfMaps.add(map);

			}		
			// 방장 번호 해소 테이블에 넣기 
			Map<String, Object> map2 = new HashMap<>();	
			
			map2.put("memberNo", memberNo);
			map2.put("roomNo", roomNo);
		
			
//			
			
//			Map<String, Object> map = new HashMap<>();	
//			
//			map.put("roomNo", roomNo);
//			map.put("tagName", tagName);
			

			// 태그 집어넣기 
			System.out.println(listOfMaps);	
			int addTag =mapper.addTag(listOfMaps);
			// 방장 집어넣기 
			int addMember = mapper.addMember(map2);
			
			return result;
			
		}
		
		
	
		return 0;
	

	}

	// 서버 유효성 검사 
	@Transactional
	public Map<String, String> validateHandling(Errors errors) {
		Map<String, String> validatorResult = new HashMap<>();
		for (FieldError error : errors.getFieldErrors()) 
		{String validKeyName = String.format("valid_%s", error.getField());
		validatorResult.put(validKeyName, error.getDefaultMessage());
		}
		
		return validatorResult;
	}

	
	
	// 채팅방 찾기 
	@Override
	public List<Chatting> findRoom() {
		return mapper.findRoom();
	}

	// 채팅방 태그 찾기
	@Override
	public List<String> findRoomTag(int roomNo) {
		return mapper.findRoomTag(roomNo);
	}
	
	
	
}
