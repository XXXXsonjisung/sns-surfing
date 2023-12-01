package team.gsk.project.chatting.model.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import team.gsk.project.chatting.model.dao.ChatMapper;
import team.gsk.project.chatting.model.dto.ChatMessage;
import team.gsk.project.chatting.model.dto.ChatRoom;



@Service
public class ChatServiceImpl implements ChatService {

	
	private final ChatMapper mapper;

	
		@Autowired
	    public ChatServiceImpl(ChatMapper mapper) {
	        this.mapper = mapper;
	    }

	  	// 채팅 메세지 가져오기
	    public List<ChatMessage> getAllMessages() {
	        return mapper.findAll();
	    }

	    // 메세지 저장
	    public void saveMessage(ChatMessage message) {
	    	mapper.save(message);
	    }


}
