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

	
	/** 비밀번호 변경 서비스
	 * @param currentPw
	 * @param newPw
	 * @param memberNo
	 * @return
	 */
	int changePw(String currentPw, String newPw, int memberNo);


	/** 닉네임 변경 서비스
	 * @param updateNickname
	 * @return
	 */
	int updateNickname(Member updateNickname);


	/** 회원 탈퇴 서비스
	 * @param memberPw
	 * @param memberNo
	 * @return
	 */
	int secession(String memberPw, int memberNo);


	/** 커버 이미지 수정 서비스
	 * @param coverImage
	 * @param loginMember
	 * @return
	 */
	int updateCover(MultipartFile coverImage, Member loginMember) throws Exception;
	
	

}
