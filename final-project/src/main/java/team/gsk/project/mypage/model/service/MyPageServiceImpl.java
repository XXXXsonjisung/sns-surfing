package team.gsk.project.mypage.model.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import team.gsk.project.common.utility.Util;
import team.gsk.project.member.model.dto.Member;
import team.gsk.project.mypage.model.dao.MyPageMapper;

@Service
@PropertySource("classpath:/config.properties")
public class MyPageServiceImpl implements MyPageService{
	
	
	@Value("${my.member.webpath}")
	private String webPath;
	
	@Value("${my.member.location}")
	private String filePath;
	
	
	@Autowired
	private MyPageMapper mapper;
	
	

	// 프로필 이미지 수정 서비스
	@Override
	public int updateProfile(MultipartFile profileImage, Member loginMember) throws Exception {
		
		
				// 프로필 이미지 변경 실패 대비
				String temp = loginMember.getProfileImage(); // 기존에 가지고 있던 이전 이미지 저장
				
				
				String rename = null; // 변경 이름 저장 변수
				
				if(profileImage.getSize() > 0) { // 업로드된 이미지가 있을 경우
					
					// 1) 파일 이름 변경
					rename = Util.fileRename(profileImage.getOriginalFilename());
					
					// 2) 바뀐 이름 loginMember에 세팅
					loginMember.setProfileImage(webPath + rename);
					
					
					
				} else { // 업로드된 이미지가 없는 경우 (x버튼) 
					
					loginMember.setProfileImage(null);
					
				}
				
				
				// 프로필 이미지 수정 DAO 메서드 호출
				int result = mapper.updateProfileImage(loginMember);
				
				
				if(result > 0) { // DB에 이미지 경로 업데이트 성공했다면
					
					// 업로드된 새 이미지가 있을 경우
					if(rename != null) {
						
						// 메모리에 임시 저장되어있는 파일을 서버에 진짜로 저장하는 것
						profileImage.transferTo(new File(filePath + rename));
					}
					
					
				} else { // 실패
					
					// 이전 이미지로 프로필 다시 세팅
					loginMember.setProfileImage(temp);
					
					
				}
		
		
		
		return result;
	}

}
