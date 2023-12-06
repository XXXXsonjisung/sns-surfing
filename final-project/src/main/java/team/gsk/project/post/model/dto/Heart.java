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
public class Heart {
	
	private int heartId;
	private int postNo;
	private int memberNo;

}
