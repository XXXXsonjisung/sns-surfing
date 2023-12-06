package team.gsk.project.chatting.model.dto;

import java.util.HashMap;

import lombok.Data;

// 개인채팅을 위한 dto

//Stomp 를 통해 pub/sub 를 사용하면 구독자 관리가 알아서 된다!!
//따라서 따로 세션 관리를 하는 코드를 작성할 필도 없고,
//메시지를 다른 세션의 클라이언트에게 발송하는 것도 구현 필요가 없다!

@Data
public class ChatRoom {
	
		// 방번호
		private String roomNo;
	    private String roomName;
	    private long userCount; // 채팅방 인원수

	    private HashMap<String, String> userlist = new HashMap<String, String>();

	    public ChatRoom create(String roomName){
	        ChatRoom chatRoom = new ChatRoom();
	        chatRoom.roomNo = roomNo;
	        chatRoom.roomName = roomName;

	        return chatRoom;
	    }
	
	
}
