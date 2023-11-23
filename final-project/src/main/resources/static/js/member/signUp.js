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
        idCheck.classList.add("error");

        checkObj.inputId = false; // 빈칸 == 유효 X
        return;
        
    } else { 


		
		fetch("/dupCheck/id?id=" + inputId.value)
		.then(res => res.text() )
		.then(count => {
		
			// count : 중복되면 1, 아니면 0
			if(count == 0) {
				 idCheck.innerText = "사용 가능한 아이디입니다";
				 idCheck.classList.add("confirm");
				 idCheck.classList.remove("error");
				 checkObj.inputId = true;
			} else {
			 idCheck.innerText = "이미 사용중입니다";
			 idCheck.classList.add("error");
			 idCheck.classList.remove("confirm");
			}	
			
		})
		.catch(err => console.log(err));


    }
    

});



const inputPw = document.getElementById("inputPw");
const btnShowHide = document.getElementById("btnShowHide");
const pwCheck = document.getElementById("pwCheck");
const inputPwConfirm = document.getElementById("inputPwConfirm");
const pwConfirmCheck = document.getElementById("pwConfirmCheck");

inputPw.addEventListener("input", () => {
	
	// 비밀번호가 입력되지 않은 경우
    if(inputPw.value.trim().length == 0){
        inputPw.value = ""; // 띄어쓰지 못넣게 하기

        pwCheck.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
        pwCheck.classList.add("error"); 
        
        checkObj.inputPw = false; // 빈칸 == 유효 X
        return;
    } 
    
     // 영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이
     const regEx = /^[a-zA-Z0-9\!\@\#\-\_]{6,20}$/;
     
     if(regEx.test(inputPw.value)){
        checkObj.inputPw = true; 
        
        // 비밀번호가 유효하게 작성된 상태에서
        // 비밀번호 확인이 입력되지 않았을 때
        if(inputPwConfirm.value.trim().length == 0){

            pwCheck.innerText = "유효한 비밀번호 형식입니다";
            pwCheck.classList.add("confirm");
            pwCheck.classList.remove("error");
        
        }else{
            // 비밀번호가 유효하게 작성된 상태에서
            // 비밀번호 확인이 입력되어 있을 때

            // 비밀번호 == 비밀번호 확인  (같을 경우)
            if(inputPw.value == inputPwConfirm.value){
                pwCheck.innerText = "비밀번호가 일치합니다";
                pwCheck.classList.add("confirm");
                pwCheck.classList.remove("error");
                checkObj.inputPwConfirm = true;
                
            } else{ // 다를 경우
                pwCheck.innerText = "비밀번호가 일치하지 않습니다";
                pwCheck.classList.add("error");
                pwCheck.classList.remove("confirm");
                checkObj.inputPwConfirm = false;
            }
        }

        
    } else{ // 유효하지 않은 경우
        
        pwCheck.innerText = "비밀번호 형식이 유효하지 않습니다";
        pwCheck.classList.add("error");
        pwCheck.classList.remove("confirm");
        checkObj.inputPw = false; 
    }
     
	
});


// 비밀번호 확인 유효성 검사
inputPwConfirm.addEventListener('input', ()=>{

    if(checkObj.memberPw){ // 비밀번호가 유효하게 작성된 경우에

        // 비밀번호 == 비밀번호 확인  (같을 경우)
        if(memberPw.value === inputPwConfirm.value){
            pwConfirmCheck.innerText = "비밀번호가 일치합니다";
            pwConfirmCheck.classList.add("confirm");
            pwConfirmCheck.classList.remove("error");
            checkObj.inputPwConfirm = true;
            
        } else{ // 다를 경우
            pwConfirmCheck.innerText = "비밀번호가 일치하지 않습니다";
            pwConfirmCheck.classList.add("error");
            pwConfirmCheck.classList.remove("confirm");
            checkObj.inputPwConfirm = false;
        }

    } else { // 비밀번호가 유효하지 않은 경우
        checkObj.inputPwConfirm = false;
    }
});
