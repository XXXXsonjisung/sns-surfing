package team.gsk.project.post.model.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostRequest {
	
	private int postNo;
    private String username;
    private String content;
    private int commentsCount;
    private int heartCount;
    private LocalDateTime postUploadDate;
    private String memberProfile;
    
    private String imageUrls; // 이미지 URL들을 저장하는 리스트
    
    private String videoUrls;

}
