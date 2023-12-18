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
      redirectUri: 'https://localhost',
    });
  }

  // 아래는 데모를 위한 UI 코드입니다.
  displayToken()
  function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
      Kakao.Auth.setAccessToken(token);
      Kakao.Auth.getStatusInfo()
        .then(function(res) {
          if (res.status === 'connected') {
            document.getElementById('token-result').innerText
              = 'login success, token: ' + Kakao.Auth.getAccessToken();
          }
        })
        .catch(function(err) {
          Kakao.Auth.setAccessToken(null);
        });
    }
  }

  function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }



