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

	
	// 회원 채팅방 가입
	@Override
	public int insertMemberRoom(int memberNo, int roomNo) {
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("memberNo", memberNo);
		map.put("roomNo", roomNo);
		
		return mapper.insertMemberRoom(map);
	}

	// 채팅방 설정을 위해 다시 찾기
	@Override
	public Chatting refindRoom(int roomNo) {
		
		
		return mapper.refindRoom(roomNo);
	}

	// 채팅방 회원 찾기
	@Override
	public List<Member> refindMember(int roomNo) {
		return mapper.refindMember(roomNo);
	}

	// 강퇴
	@Override
	public int kickMembers(String roomNo, List<Long> selectedMembers) {
		Map<String, Object> map = new HashMap<>();
		map.put("roomNo", roomNo);
		map.put("selectedMembers", selectedMembers);
		return mapper.kickMembers(map);
	}

	// 방장찾기
	@Override
	public int findManger(int roomNo) {
		return mapper.findManger(roomNo);
	}

	// 방장 넘기기
	@Override
	public int authorizeManger(String roomNo, String member) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("roomNo", roomNo);
		map.put("member", member);
		
		return mapper.authorizeManger(map);
	}

	// 채팅방 수정
	@Override
	public int updateRoom(Chatting inputChatting) {
		
		int result =mapper.updateRoom(inputChatting);
		
		
		return 0;
	}

	// 채팅방 검색
	@Override
	public List<Chatting> searchRoom(String tags) {
		
		String[] tagName = tags.split(", ");	
		

		
		List<Map<String, Object>> listOfMaps = new ArrayList<>();
		
	

		for (String tag : tagName) {
		    Map<String, Object> map = new HashMap<>();    
		    map.put("tagName", tag);
		    listOfMaps.add(map);
		}
		
		int tagLength = tagName.length;
		
		Map<String, Object> params = new HashMap<>();
		params.put("listOfMaps", listOfMaps);
		params.put("tagLength", tagLength);
		
		List<Chatting> result= mapper.searchRoom(params);
			
		
		
		return mapper.searchRoom(params);
	}
	
	
	
}
