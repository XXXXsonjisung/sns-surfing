package team.gsk.project.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.member.model.dto.Follow;
import team.gsk.project.member.model.dto.Member;

@Mapper
public interface FollowMapper {

	int saveFollow(Follow follow);

	int unFollow(Follow follow);

	int checkFollow(Follow follow);

	List<Follow> getFollowDataByMemberId(String memberId);

	List<Follow> getFolloingDataByMemberId(String memberId);


}
