const loginFrm = document.getElementById("loginFrm");

const memberId = document.querySelector("#loginFrm input[name='memberId']");
const memberPw = document.querySelector("#loginFrm input[name='memberPw']");

if(loginFrm != null) {
    // 로그인 시도를 할 때
    loginFrm.addEventListener("submit", e => {

        // 이메일이 입력되지 않은 경우
        // 문자열.trim() : 문자열 좌우 공백 제거
        if(memberId.value.trim().length == 0){
            alert("아이디를 입력해주세요.");

            memberId.value = ""; // 잘못 입력된 값(공백) 제거
            memberId.focus(); // 이메일 input태그에 초점을 맞춤

            e.preventDefault(); // (기본이벤트 제거 : 제출 못하게하기)
            return; 
        }


        // 비밀번호가 입력되지 않은 경우
        if(memberPw.value.trim().length == 0){
            alert("비밀번호를 입력해주세요.");

            memberPw.value = ""; // 잘못 입력된 값(공백) 제거
            memberPw.focus(); // 이메일 input태그에 초점을 맞춤

            e.preventDefault(); // 제출 못하게하기
            return; 
        }


    });
}


  function loginWithKakao() {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost/member/kakao',
      state: 'userme'
    });
  }
  
// 사용자 정보 요청
Kakao.API.request({
  url: '/v2/user/me',
})
  .then(function(response) {
    // 사용자 정보 출력 (닉네임 및 프로필 이미지)
    console.log('Nickname:', response.properties.nickname);
    console.log('Profile Image:', response.properties.profile_image);
    
    // 클라이언트 측에서 사용자 정보 저장 (예: localStorage)
    localStorage.setItem('kakaoUserId', response.id);
    localStorage.setItem('kakaoNickname', response.properties.nickname);
    localStorage.setItem('kakaoProfileImage', response.properties.profile_image);

  })
  .catch(function(error) {
    console.error('Failed to request user information:', error);
  });
  
  Kakao.API.request({
  url: '/v1/user/update_profile',
  data: {
    properties: {
      '${CUSTOM_PROPERTY_KEY}': '${CUSTOM_PROPERTY_VALUE}',
    },
  },
})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  // 아래는 데모를 위한 UI 코드입니다.
  displayToken()
  function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
      Kakao.Auth.setAccessToken(token);
      document.querySelector('#token_result').innerText = 'login success, ready to request API';
      document.querySelector('button.api-btn').style.visibility = 'visible';
    }
  }

  function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }



