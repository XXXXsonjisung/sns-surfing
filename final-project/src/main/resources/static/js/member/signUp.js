const checkObj = {
    "inputId" : false,
    "inputPw" : false,
    "inputPwConfirm" : false,
    "inputName" : false,
    "inputNickname" : false,
    "inputTel" : false,
    "inputBirth" : false,
    "inputEmail" : false,
    "authKey" : false
};

const inputId = document.getElementById("inputId");
const idCheck = document.getElementById("idCheck");
const duplicateBtn = document.getElementById("duplicateBtn");


duplicateBtn.addEventListener("click", function() {

    // 입력된 아이디가 없을 경우
    if(inputId.value.trim().length == 0){
        inputId.value = ""; 

        idCheck.innerText = " 아이디를 입력해주세요.";

        checkObj.inputId = false; // 빈칸 == 유효 X
        return;
        
    } else { 

        /* fetch() API를 이용한 ajax(비동기 통신) : 이메일 중복*/
		// url : /dupCheck/email
		
		fetch("/dupCheck/id?id=" + inputId.value)
		.then(res => res.text() )
		.then(count => {
		
			// count : 중복되면 1, 아니면 0
			if(count == 0) {
				 idCheck.innerText = "사용 가능한 아이디입니다";
				 checkObj.memberId = true;
			} else {
			 idCheck.innerText = "이미 사용중입니다";
			}	
			
		})
		.catch(err => console.log(err));


    }
});