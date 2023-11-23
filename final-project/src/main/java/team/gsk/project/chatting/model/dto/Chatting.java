package team.gsk.project.chatting.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Chatting {
	
	private int roomNo; // 채팅방 번호 
	private Integer memberNo; // 참여자 번호
	private String roomName; // 채팅방 이름 
	private String roomIntrudece; // 채팅방 소개
	private Integer roomPersonnel; //채팅방 정원 
	private int roomManager; //방장 번호
	private String roomPwd; // 채팅방 비번
	private Integer tagNo; // 태그 번호 
	private String roomImg; // 채팅방 이미지
}
