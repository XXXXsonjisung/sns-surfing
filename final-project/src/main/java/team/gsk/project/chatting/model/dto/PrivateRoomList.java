package team.gsk.project.chatting.model.dto;

import java.sql.Timestamp;

import lombok.Data;

// 개인 채팅방 리스트
@Data
public class PrivateRoomList {
	
	private int roomNo;
	
	private String sender;
	
	private String memberNickname;
	
	private String memberProfile;
	
	private String chattingMessage;
	
	private Timestamp time;
	
	
}
