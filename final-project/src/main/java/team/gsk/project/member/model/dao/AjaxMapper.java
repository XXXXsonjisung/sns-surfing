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
}
