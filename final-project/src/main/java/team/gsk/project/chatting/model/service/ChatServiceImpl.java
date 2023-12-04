package team.gsk.project.chatting.model.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
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

	    // 기존 채팅 불러오기
		@Override
		public List<ChatMessage> getOldMessages() {
			return mapper.getOldMessages();
		}

		// 메세지 개수 제한 
	    @Scheduled(fixedDelay = 60000) // 60초마다 실행되도록 설정
	    public void cleanupOldMessages() {
	        // 일정 메시지 수를 유지하기 위해 오래된 메시지 삭제
	        int maxMessageCount = 100; // 최대 메시지 수
	        List<ChatMessage> messages = mapper.findAll(); // 모든 메시지 가져오기

	        if (messages.size() > maxMessageCount) {
	            // 최신 메시지 수를 유지하고 오래된 메시지 삭제
	        	List<ChatMessage> messagesToDelete = messages.subList(0, messages.size() - maxMessageCount);
	            mapper.deleteAll(messagesToDelete);
	        }
	    }
		

}
