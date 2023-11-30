package team.gsk.project.common.utility;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Util {
	
	
	public static String fileRename(String originFileName) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = sdf.format(new Date(System.currentTimeMillis()));

		int ranNum = (int) (Math.random() * 100000); // 5자리 랜덤 숫자 생성

		String str = "_" + String.format("%05d", ranNum);

		String ext = originFileName.substring(originFileName.lastIndexOf("."));

		return date + str + ext;
	}

	
	// Cross Site Scripting (XSS) 방지 처리
	// - 웹 애플리케이션에서 발생하는 취약점
	// - 권한이 없는 사용자가 사이트에 악의적인 스크립트를 작성하는 것
	
	// XSS 공격은 입력값에 대한 검증이 이뤄지지 않아 발생하는 취약점
	// -> 모든 사용자에 대한 모든 입력값에 대하여 필터링 해야함.
	// '<'  '>'   와 같은 기호들을 엔티티코드 변환해줌
	
	// <  -  &lt;
	// >  -  &gt;
	// &  -  &amp;
	// "  -  &quot;
	
	public static String XSSHandling(String content) {
		
		content = content.replaceAll("&", "&amp;");
		content = content.replaceAll("<", "&lt;");
		content = content.replaceAll(">", "&gt;");
		content = content.replaceAll("\"", "&quot;");
		
		return content;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
