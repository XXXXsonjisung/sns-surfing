const idForPhone = document.querySelector("#idForPhone");
const idForEmail = document.querySelector("#idForEmail");
const pwForPhone = document.querySelector("#pwForPhone");
const pwForEmail = document.querySelector("#pwForEmail");

const idPhoneName = document.querySelector("#idPhoneName");
const idPhoneTel = document.querySelector("#idPhoneTel");
const idPhoneAuthNum = document.querySelector("#idPhoneAuthNum");

const idEmailName = document.querySelector("#idEmailName");
const idEmailNum = document.querySelector("#idEmailNum");
const idEmailAuthNum = document.querySelector("#idEmailAuthNum");

const pwPhoneName = document.querySelector("#pwPhoneName");
const pwPhoneTel = document.querySelector("#pwPhoneTel");
const pwPhoneAuthNum = document.querySelector("#pwPhoneAuthNum");

const pwEmailName = document.querySelector("#pwEmailName");
const pwEmailNum = document.querySelector("#pwEmailNum");
const pwEmailAuthNum = document.querySelector("#pwEmailAuthNum");

const sendAuth = document.querySelectorAll(".sendAuth");
const checkAuth = document.querySelectorAll(".checkAuth");
const searchBtn = document.querySelectorAll(".searchBtn");

const radioGroups = [
  { radio: idForPhone, elements: [idPhoneName, idPhoneTel, idPhoneAuthNum] },
  { radio: idForEmail, elements: [idEmailName, idEmailNum, idEmailAuthNum] },
  { radio: pwForPhone, elements: [pwPhoneName, pwPhoneTel, pwPhoneAuthNum] },
  { radio: pwForEmail, elements: [pwEmailName, pwEmailNum, pwEmailAuthNum] },
];

function handleRadioChange(checkedIndex) {
  radioGroups.forEach((group, index) => {
    const { radio, elements } = group;
    const isDisabled = checkedIndex !== index;

    elements.forEach((element) => {
      element.disabled = isDisabled;
    });

    [sendAuth, checkAuth, searchBtn].forEach((btnGroup) => {
      btnGroup[index].disabled = isDisabled;
    });
  });
}

radioGroups.forEach((group, index) => {
  group.radio.addEventListener('change', () => handleRadioChange(index));
});



// 전화번호로 아이디 / 비밀번호 찾기
let authTimer;
let authMin = 4;
let authSec = 59;

let tempEmail;



const checkIdObj = {
    "memberName" : false,
    "memberEmail" : false,
    "authKey" : false
};

const memberName = document.getElementById("idEmailName");
const memberEmail = document.getElementById("idEmailNum");
const authKey = document.getElementById("idEmailAuthNum");

for (let i = 0; i < sendAuth.length; i += 2) {
	
	sendAuth[i].addEventListener('click', function() {

	});
}



// 이메일로 아이디 / 비밀번호 찾기
for (let i = 1; i < sendAuth.length; i += 2) {  
	
	// 이름 유효성 검사
	memberName.addEventListener("input", () => {
		
	// 이름이 입력되지 않은 경우
	if(memberName.value.trim().length == 0) {
		memberName.value = "";
		
		memberName.placeholder = "이름을 입력해주세요";
		
		checkIdObj.memberName = false;
		return; 
	} else {
		checkIdObj.memberName = true;
		
	}
	
	});
	

	// 이메일 유효성 검사
	// 홀수번째 i의 인증번호 받기를 누르면 
	sendAuth[i].addEventListener('click', function() { 
		
		// 이름과 이메일이 일치하는 회원이 있을 경우
		// if() {}
		
		// 입력된 이메일이 없을 경우
		if(memberEmail.value.trim().length == 0) {
			memberEmail.value = "";
			
			memberEmail.placeholder = "이메일을 입력해주세요";
			
			checkIdObj.memberEmail = false;
			return;
		}else {
			
			fetch("/sendAuth/memberEmail?="+memberEmail.value)
			.then(res => res.text())
			.then(result => {
				if(result > 0) {
					alert("인증번호가 발송 되었습니다.");
					
					tempEmail = memberEmail.value;
               		checkObj.memberEmail = true;
               		
               		idEmailCheck.innertext = "5:00";
               		
               		authTimer = window.setInterval(()=>{
														// 삼항연산자  :    조건   ?   	 	  true : false
	                idEmailCheck.innerText = "0" + authMin + ":" + (authSec < 10 ? "0" + authSec : authSec);
	                
	                // 남은 시간이 0분 0초인 경우
	                if(authMin == 0 && authSec == 0){
	                    clearInterval(authTimer);
	                    e.preventDefault();
	                    return;
	                }
	
	                // 0초인 경우
	                if(authSec == 0){
	                    authSec = 60;
	                    authMin--;
	                }
	
	                authSec--; // 1초 감소
	
	            }, 1000)
	
	            }else if(result == 0 ){ 
	                console.log("인증번호 발송 실패")
	            }else{
	                alert("가입 정보가 없는 이메일입니다.")
	                checkIdObj.memberEmail = false;
	                return;
	            }	
			})	
			.catch(err => {
            console.log("이메일 발송 중 에러 발생");
            console.log(err);								
			})
		}
	})

	// 인증 확인
	checkAuth.addEventListener("click", function(){

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
        /* fetch API */
        const obj = {"inputKey":idPhoneAuthNum.value, "email":tempEmail}
        const query = new URLSearchParams(obj).toString()
        // inputKey=123456&email=user01

        fetch("/sendEmail/checkAuthKey?" + query)
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                clearInterval(authTimer);
                idEmailCheck.innerText = "인증되었습니다.";
                idEmailCheck.classList.add("confirm");
                checkIdObj.idPhoneAuthNum = true;

            } else{
                alert("인증번호가 일치하지 않습니다.")
                checkIdObj.idPhoneAuthNum = false;
            }
        })
        .catch(err => console.log(err));

 
    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
		}

	});	
}
