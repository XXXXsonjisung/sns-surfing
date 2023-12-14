package team.gsk.project.member.model.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import team.gsk.project.member.model.dto.Follow;
import team.gsk.project.member.model.dto.Member;



@Repository
public class MemberDAO {

	@Autowired
	private MemberMapper mapper; // MemberMapper 인터페이스를 상속받은 자식 객체
										// 자식객체가 sqlSessionTemplate 이용

	@Autowired
	private FollowMapper Fmapper;
	
	
	public Member login(Member inputMember) {
		return mapper.login(inputMember);
	}


	public int signUp(Member inputMember) {
		
		return mapper.signUp(inputMember);
	}


	public String memberId(String string) {
		
		return mapper.memberId(string);
	}


	public String profileImage(String string) {
		
		return mapper.profile(string);
	}


	public Member getMemberX(String memberId) {
		
		return mapper.getMemberX(memberId);
	}


	public int saveFollow(Follow follow) {
		
		return Fmapper.saveFollow(follow);
	}


	public int unFollow(Follow follow) {
		
		return Fmapper.unFollow(follow);
	}


	public int checkFollow(Follow follow) {
		
		return Fmapper.checkFollow(follow);
	}


	public List<Follow> getFollowDataByMemberId(String memberId) {
		
		return Fmapper.getFollowDataByMemberId(memberId);
	}


	public Member getMemberById(String h_memberId) {
		
		return mapper.getMemberById(h_memberId);
	}


	public List<Follow> getFolloingDataByMemberId(String memberId) {
		
		return Fmapper.getFolloingDataByMemberId(memberId);
	}


	public Member getMemberByIdP(String p_memberId) {
		
		return mapper.getMemberByIdP(p_memberId);
	}


	public List<Member> searchHeader(String value) {
		
		return mapper.searchHeader(value);
	}


	public boolean checkNicknameX(String nickname) {
		
		return mapper.checkNicknameX(nickname);
	}


	public int getCount(String memberId) {
		
		return Fmapper.getCount(memberId);
	}


	public Member search(String value) {
		
		return mapper.search(value);

	}




}
