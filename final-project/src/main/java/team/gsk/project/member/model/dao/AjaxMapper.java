package team.gsk.project.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AjaxMapper {

	/** 아이디 중복검사
	 * @param id
	 * @return
	 */
	int checkId(String id);
}
