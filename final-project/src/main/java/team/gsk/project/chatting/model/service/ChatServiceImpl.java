package team.gsk.project.chatting.model.service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dto.ChatRoom;


@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

	
	private final ObjectMapper objectMapper;
    private Map<String, ChatRoom> chatRooms;
	
    // chatRooms이 호출될때마다 새로 초기화해주는 메서드
    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

	
	//채팅방 번호 찾기 
	@Override
	public ChatRoom findRoomNo(String roomNo) {
		  return chatRooms.get(roomNo);
	}

}
