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
inputPwConfirm.addEventListener("input", ()=>{

    if(checkObj.inputPw){ // 비밀번호가 유효하게 작성된 경우에

        // 비밀번호 == 비밀번호 확인  (같을 경우)
        if(inputPw.value == inputPwConfirm.value){
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


const btnShowHide = document.getElementById("btnShowHide");


btnShowHide.addEventListener("click", () => {
	
	const currentImage = btnShowHide.style.backgroundImage;
	
	if(currentImage.includes("/images/slashEye.png") ) {
		
			btnShowHide.style.backgroundImage = "url(/images/eye.png)"
			inputPw.type = "text";
			
		} else {
			
		btnShowHide.style.backgroundImage = "url(/images/slashEye.png)"
		inputPw.type = "password";
	}

	
}); 


// 이름 유효성 검사
const inputName = document.getElementById("inputName");
const nameCheck = document.getElementById('nameCheck');

// 이름이 입력이 되었을 때
inputName.addEventListener("input", ()=>{

    // 이름 입력이 되지 않은 경우
    if(inputName.value.trim() == ''){
        nameCheck.innerText = "한글,영어로만 2~10글자";
        nameCheck.classList.remove("confirm", "error");
        checkObj.inputName = false;
        inputName.value = ""; 
        return;
    }

// 정규표현식으로 유효성 검사
const regEx = /^[가-힣\w]{2,10}$/;

if(regEx.test(inputName.value)){// 유효
			nameCheck.innerText = "";
			checkObj.inputName = true;
		} else {
    nameCheck.innerText = "이름 형식이 유효하지 않습니다";
    nameCheck.classList.add("error");
    nameCheck.classList.remove("confirm");
    checkObj.inputName = false;
		}
	
});



// 닉네임 유효성 검사
const inputNickname = document.getElementById("inputNickname");
const nicknameCheck = document.getElementById('nicknameCheck');

// 닉네임이 입력이 되었을 때
inputNickname.addEventListener("input", ()=>{

    // 닉네임 입력이 되지 않은 경우
    if(inputNickname.value.trim() == ''){
        nicknameCheck.innerText = "한글,영어,숫자로만 2~10글자";
        nicknameCheck.classList.remove("confirm", "error");
        checkObj.inputNickname = false;
        inputNickname.value = ""; 
        return;
    }

    // 정규표현식으로 유효성 검사
    const regEx = /^[가-힣\w\d]{2,10}$/;

    if(regEx.test(inputNickname.value)){// 유효

        /* fetch() API를 이용한 ajax(비동기 통신) : 닉네임 중복검사 */
		// url : /dupCheck/nickname
		fetch("/dupCheck/nickname?nickname=" + inputNickname.value)
		.then(resp => resp.text())
		.then(count => {
			// count : 중복되면 1, 아니면 0
			if(count == 0) {
				nicknameCheck.innerText = "사용 가능한 닉네임입니다";
       		 	nicknameCheck.classList.add("confirm"); // .confirm 스타일 적용
        		nicknameCheck.classList.remove("error"); // .error 스타일 제거
				checkObj.inputNickname = true;
			} else {
			 nicknameCheck.innerText = "사용 중인 닉네임입니다";
        	 nicknameCheck.classList.add("error"); // .error 스타일 적용
        	 nicknameCheck.classList.remove("confirm"); // .confirm 스타일 제거
			}
		
		})
		.catch(err => console.log(err));
		
    } else{ // 무효
        nicknameCheck.innerText = "닉네임 형식이 유효하지 않습니다";
        nicknameCheck.classList.add("error");
        nicknameCheck.classList.remove("confirm");
        checkObj.inputNickname = false;
    }

});


// 전화번호 유효성 검사
const inputTel = document.getElementById("inputTel");
const telCheck = document.getElementById("telCheck");

// 전화번호가 입력 되었을 때
inputTel.addEventListener("input", ()=>{

    // 전화번호가 입력이 되지 않은 경우
    if(inputTel.value.trim() == ''){
        telCheck.innerText = "전화번호를 입력해주세요.(- 제외)";
        telCheck.classList.remove("confirm", "error");
        checkObj.inputTel = false;
        inputTel.value = ""; 
        return;
    }

    // 정규표현식으로 유효성 검사
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

    if(regEx.test(inputTel.value)){// 유효
        telCheck.innerText = "유효한 전화번호 형식입니다";
        telCheck.classList.add("confirm");
        telCheck.classList.remove("error");
        checkObj.inputTel = true;
        
    } else{ // 무효
        telCheck.innerText = "전화번호 형식이 유효하지 않습니다";
        telCheck.classList.add("error");
        telCheck.classList.remove("confirm");
        checkObj.inputTel = false;
    }


});

// 생년월일 유효성 검사
const inputBirth = document.getElementById("inputBirth");
const birthCheck = document.getElementById("birthCheck");

inputBirth.addEventListener("input", () => {
	
	var today = new Date();

	var inputDate = new Date(inputBirth.value);
	var inputYear = inputDate.getFullYear();
	var inputMonth = inputDate.getMonth() + 1;
	var inputDay = inputDate.getDate();

   //날짜 지정을 하지 않았을 때 NaN이 발생하여 0으로 처리
	if (isNaN(inputYear) || isNaN(inputMonth) || isNaN(inputDay)){
		inputYear  = 0;
    	inputMonth = 0;
		inputDay   = 0;
  }
	dateFrom = inputYear +'-'+ inputMonth +'-'+inputDay;
	
	if(!(dateFrom == "0-0-0" || dateFrom > today)) {
		checkObj.inputBirth = true;
		birthCheck.classList.add("confirm");
        birthCheck.classList.remove("error");
		birthCheck.innerText = "유효한";
		
	} else {
		checkObj.inputBirth = false;
		birthCheck.classList.remove("confirm");
        birthCheck.classList.add("error");
		birthCheck.innerText = "유효하지 않은 ";
	}
	
			//오늘날짜 날짜 형식으로 지정
			  var todayYear  = today.getFullYear(); 	//2020
			  var todayMonth = today.getMonth() + 1;    	//06
			  var todayDay   = today.getDate();  		//11
			  var todayString = todayYear + '-' + todayMonth + '-' + todayDay;
			
			
			  if(dateFrom > todayString){
			  	checkObj.inputBirth = false;
			  	birthCheck.classList.remove("confirm");
		        birthCheck.classList.add("error");
				birthCheck.innerText = "유효하지 않은 ";
			  	alert("해당 기간의 조회가 불가능합니다.");
			  } else {
			 	 checkObj.inputBirth = true;
			  }	


});

// 이메일 유효성 검사
const inputEmail = document.getElementById("inputEmail");
const emailCheck = document.getElementById("emailCheck");

// 이메일이 입력될 때 마다
inputEmail.addEventListener("input", () => {

    // 입력된 이메일이 없을 경우
    if(inputEmail.value.trim().length == 0){
        inputEmail.value = ""; 

        emailCheck.innerText = "메일을 받을 수 있는 이메일을 입력해주세요.";

        // confirm, error 클래스 삭제해서 검정 글씨로 만들기
        emailCheck.classList.remove("confirm", "error");

        checkObj.inputEmail = false; // 빈칸 == 유효 X
        return;
    }


    // 정규 표현식을 이용해서 유효한 형식이지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;

    // 2) 입력 받은 이메일과 정규식 일치 여부 판별
    if(   regEx.test(inputEmail.value)  ){ // 유효한 경우

        /* fetch() API를 이용한 ajax(비동기 통신) : 이메일 중복*/
		// url : /dupCheck/email
		
		fetch("/dupCheck/email?email=" + inputEmail.value)
		.then(res => res.text() )
		.then(count => {
		
			// count : 중복되면 1, 아니면 0
			if(count == 0) {
				 emailCheck.innerText = "사용 가능한 이메일입니다";
       		 	 emailCheck.classList.add("confirm"); // .confirm 스타일 적용
        		 emailCheck.classList.remove("error"); // .error 스타일 제거
				 checkObj.inputEmail = true;
			} else {
			 emailCheck.innerText = "이미 사용중입니다";
        	 emailCheck.classList.add("error"); // .error 스타일 적용
        	 emailCheck.classList.remove("confirm"); // .confirm 스타일 제거
			}
			
		})
		.catch(err => console.log(err));


    } else{ // 유효하지 않은 경우(무효인 경우)
        emailCheck.innerText = "이메일 형식이 유효하지 않습니다";
        emailCheck.classList.add("error"); // .error 스타일 적용
        emailCheck.classList.remove("confirm"); // .confirm 스타일 제거

        checkObj.inputEmail = false; // 유효 X
    }
});




// 인증번호 발송
const pushAuthBtn = document.getElementById("pushAuthBtn");
const authCheck = document.getElementById("authCheck");
let authTimer;
let authMin = 4;
let authSec = 59;

// 인증번호를 발송한 이메일 저장
let tempEmail;

pushAuthBtn.addEventListener("click", function(){
    authMin = 4;
    authSec = 59;

    checkObj.authKey = false;

    if(checkObj.inputEmail){ // 중복이 아닌 이메일인 경우


        /* fetch() API 방식 ajax */
        fetch("/sendEmail/signUp?email="+inputEmail.value)
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                console.log("인증 번호가 발송되었습니다.")
                tempEmail = inputEmail.value;
            }else{
                console.log("인증번호 발송 실패")
            }
        })
        .catch(err => {
            console.log("이메일 발송 중 에러 발생");
            console.log(err);
        });
        

        alert("인증번호가 발송 되었습니다.");

        
        authCheck.innerText = "05:00";
        authCheck.classList.remove("confirm");

        authTimer = window.setInterval(()=>{
													// 삼항연산자  :  조건 	  ?   	true : false
            authCheck.innerText = "0" + authMin + ":" + (authSec < 10 ? "0" + authSec : authSec);
            
            // 남은 시간이 0분 0초인 경우
            if(authMin == 0 && authSec == 0){
                checkObj.authKey = false;
                clearInterval(authTimer);
                return;
            }

            // 0초인 경우
            if(authSec == 0){
                authSec = 60;
                authMin--;
            }


            authSec--; // 1초 감소

        }, 1000)

    } else{
        alert("중복되지 않은 이메일을 작성해주세요.");
        inputEmail.focus();
    }

});

// 인증 확인
const authKey = document.getElementById("authKey");
const authBtn = document.getElementById("authBtn");

authBtn.addEventListener("click", function(){

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
        /* fetch API */
        const obj = {"inputKey":authKey.value, "email":tempEmail}
        const query = new URLSearchParams(obj).toString()
        // inputKey=123456&email=user01

        fetch("/sendEmail/checkAuthKey?" + query)
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                clearInterval(authTimer);
                authCheck.innerText = "인증되었습니다.";
                authCheck.classList.add("confirm");
                checkObj.authKey = true;

            } else{
                alert("인증번호가 일치하지 않습니다.")
                checkObj.authKey = false;
            }
        })
        .catch(err => console.log(err));


    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }

});

// 회원 가입 form태그가 제출 되었을 때
document.getElementById("signUpFrm").addEventListener("submit", e=>{

    // checkObj에 모든 value가 true인지 검사

    // (배열용 for문)
    // for ... of : 향상된 for문
	// -> iterator(반복자) 속성을 지닌 배열, 유사 배열 사용 가능
    
    // (객체용 for문)
    // ** for ... in 구문 ***
    // -> JS 객체가 가지고 있는 key를 순서대로 하나씩 꺼내는 반복문

    for(let key in checkObj){

        if(!checkObj[key]){ // 각 key에 대한 value(true/false)를 얻어와
                            // false인 경우 == 유효하지 않다!

            switch(key){
            case "inputId": 
                alert("아이디가 유효하지 않습니다"); break;

            case "inputPw": 
                alert("비밀번호가 유효하지 않습니다"); break;

            case "inputPwConfirm":
                alert("비밀번호가 확인되지 않았습니다"); break;
                
            case "inputName":
                alert("이름이 확인되지 않았습니다"); break;
            
            case "inputNickname" : 
                alert("닉네임이 유효하지 않습니다"); break;
                
            case "inputTel" : 
                alert("전화번호가 유효하지 않습니다"); break;
                
            case "inputBirth" : 
                alert("생년월일이 유효하지 않습니다"); break
                ;
            case "inputEmail" : 
                alert("이메일이 유효하지 않습니다"); break;
            }

            // 유효하지 않은 input 태그로 focus 이동
            // - key를 input의 id와 똑같이 설정했음!
            document.getElementById(key).focus();

            e.preventDefault(); // form 태그 기본 이벤트 제거
            return; // 함수 종료
        }
    }
});