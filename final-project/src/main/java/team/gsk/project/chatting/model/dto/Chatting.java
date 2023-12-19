package team.gsk.project.chatting.model.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Chatting {
	
	// 채팅방 테이블
	// 채팅방 만들기
	
	private int roomNo; // 채팅방 번호 
	
	@NotBlank(message = "필수 입력 항목입니다.")
	private String roomName; // 채팅방 이름 
	
	@NotBlank(message = "필수 입력 항목입니다.")
	private String roomIntrudece; // 채팅방 소개
	
	@NotNull(message = "인원 설정은 필수입니다.")
	private Integer roomPersonnel; //채팅방 정원 

	private int roomManager; //방장 번호
	
	//@Pattern(regexp = "(?=.*[a-zA-Z])(?=.*[\\W_]).{4,6}", message = "비밀번호 형식이 유효하지 않습니다")
	private String roomPwd; // 채팅방 비번
	
	private String roomImg; // 채팅방 이미지
	
	private String tagName; // 태그 이름 
	
	//해소 테이블
	private Integer memberName; // 참여자 번호
	private int tagNo; // 태그 번호

	private int memberCount; // 채팅방 인원수
	
	
	// 이미지 저장 객체
	private MultipartFile roomImgFile;
	
	
	
	
}
