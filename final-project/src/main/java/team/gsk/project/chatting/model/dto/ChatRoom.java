package team.gsk.project.chatting.model.dto;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Builder;
import lombok.Data;


@Data
public class ChatRoom {
	
		// 방번호
		private String roomNo;
	    private String name;
	    private Set<WebSocketSession> sessions = new HashSet<>();
	    @Builder
	    public ChatRoom(String roomNo, String name) {
	        this.roomNo = roomNo;
	        this.name = name;
	    }
	
}
