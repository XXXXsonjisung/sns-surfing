package team.gsk.project.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AjaxMapper {

	/** 아이디 중복검사
	 * @param id
	 * @return
	 */
	int checkId(String id);

	/** 닉네임 중복검사
	 * @param nickname
	 * @return
	 */
	int checkNickname(String nickname);

	/** 이메일 중복검사
	 * @param email
	 * @return
	 */
	int checkEmail(String email);

	/** 이메일로 아이디 찾기
	 * @param memberEmail
	 * @return
	 */
	int checkIdEmailAuth(String memberEmail);

	/** 이메일 중복 확인
	 * @param memberEmail
	 * @return
	 */
	int dupCheck(String memberEmail);
}
