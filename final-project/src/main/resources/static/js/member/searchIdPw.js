idForPhone = document.getElementById("idForPhone");
idForEmail = document.getElementById("idForEmail");
pwForPhone = document.getElementById("pwForPhone");
pwForEmail = document.getElementById("pwForEmail");
sendAuth = document.querySelectorAll("sendAuth");
checkAuth = document.querySelectorAll("checkAuth");
searchBtn = document.querySelectorAll("searchBtn");


 // 라디오 버튼 변경 시 이벤트 리스너 추가
idForPhone.addEventListener('change', function() {
    // 라디오 버튼이 체크되어 있지 않으면 입력란 비활성화
    if (!this.checked) {
        idForPhone.disabled = true;
    } else {
        idForPhone.disabled = false;
    }
});

// 버튼 클릭 시 입력란 상태 변경
document.getElementById('disableButton').addEventListener('click', function() {
    inputText.disabled = true;
});

document.getElementById('enableButton').addEventListener('click', function() {
    inputText.disabled = false;
});