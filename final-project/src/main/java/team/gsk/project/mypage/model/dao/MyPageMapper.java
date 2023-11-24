package team.gsk.project.mypage.model.dao;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.member.model.dto.Member;

@Mapper
public interface MyPageMapper {

	/** 프로필 이미지 수정
	 * @param loginMember
	 * @return
	 */
	public int updateProfileImage(Member loginMember);

	/** 회원 비밀번호 조회
	 * @param memberNo
	 * @return
	 */
	public String selectEncPw(int memberNo);

	/** 비밀번호 변경
	 * @param member
	 * @return
	 */
	public int changePw(Member member);

	/** 닉네임 변경
	 * @param updateNickname
	 * @return
	 */
	public int updateNickname(Member updateNickname);

	/** 회원 탈퇴 여부
	 * @param memberNo
	 * @return
	 */
	public int secession(int memberNo);

	
	
}
