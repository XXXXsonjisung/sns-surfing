package team.gsk.project.mypage.model.service;

import org.springframework.web.multipart.MultipartFile;

import team.gsk.project.member.model.dto.Member;

public interface MyPageService {

	
	/** 프로필 이미지 수정 서비스
	 * @param profileImage
	 * @param loginMember
	 * @return
	 */
	int updateProfile(MultipartFile profileImage, Member loginMember) throws Exception;

	int changePw(String currentPw, String newPw, int memberNo);
	
	

}
