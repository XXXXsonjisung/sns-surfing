package team.gsk.project.chatting.model.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChatMessage {
	
    // 메시지 타입 : 입장, 채팅, 나감
	// enum : 세가지 동류 상수를 정의하는 열거형 
//    public enum MessageType {
//    	 CHAT,JOIN,LEAVE
//    }
//    private MessageType type; // 메시지 타입
    private String content;
    private String sender;
    private LocalDateTime sentAt; // 보낸 시간
}
