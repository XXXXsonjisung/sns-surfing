package team.gsk.project.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import team.gsk.project.member.model.dto.Follow;


@Mapper
public interface FollowMapper {

	int saveFollow(Follow follow);

	int unFollow(Follow follow);

	int checkFollow(Follow follow);

	List<Follow> getFollowDataByMemberId(String memberId);

	List<Follow> getFolloingDataByMemberId(String memberId);

	int getCount(String memberId);

	List<String> getFollower(String memberId);

	List<String> getFolloing(String memberId);


}
