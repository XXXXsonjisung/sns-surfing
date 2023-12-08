package team.gsk.project.chatting.model.dto;

import java.sql.Timestamp;

import lombok.Data;

// 채팅방 리스트를 위한 객체
@Data
public class ChatRoomList {

	private int roomNo;
	
	private String roomName;
	
	private String roomImg;
	
	private String sender;
	
	private String chattingMessage;
	
	private Timestamp time;
	
	
	
}
