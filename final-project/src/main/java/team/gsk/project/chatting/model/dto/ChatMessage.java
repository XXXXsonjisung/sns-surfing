package team.gsk.project.chatting.model.dto;

import lombok.Data;

@Data
public class ChatMessage {
	
    // 메시지 타입 : 입장, 채팅, 나감
	// enum : 세가지 동류 상수를 정의하는 열거형 
    public enum MessageType {
        ENTER, TALK,QUIT
    }
    private MessageType type; // 메시지 타입
    private String roomNo; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지
}
