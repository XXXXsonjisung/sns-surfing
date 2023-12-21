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
  { radio: idForEmail, elements: [idEmailName, idEmailNum, idEmailAuthNum] },
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


// 이메일로 아이디 / 비밀번호 찾기
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
const idEmailCheck = document.getElementById("idEmailCheck");





//전화번호로 아이디 / 비밀번호 찾기
/*
for (let i = 0; i < sendAuth.length; i += 2) {
	
	sendAuth[i].addEventListener('click', function() {

	});
}
*/

// 이메일로 아이디 찾기

for (let i = 0; i < sendAuth.length; i += 1) {  
	
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
	sendAuth[i].addEventListener('click', function(e) { 
		

		// 입력된 이메일이 없을 경우
		if(memberEmail.value.trim().length == 0) {
			memberEmail.value = "";
			
			memberEmail.placeholder = "이메일을 입력해주세요";
			
			checkIdObj.memberEmail = false;
			return;
		}else {			
			fetch("/sendEmail/sendAuth?memberEmail=" + memberEmail.value)
			.then(res => res.text())
			.then(result => { 
				if(result > 0) {
					alert("인증번호가 발송 되었습니다.");
					
					tempEmail = memberEmail.value;

               		checkIdObj.memberEmail = true;
		           
               		idEmailCheck.innerText = "4:59";
		               		
               		authTimer = window.setInterval(()=>{

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
        });
    	}	
	});
	
	// 이메일로 아이디 찾기 인증 확인
	const secondCheckAuth = checkAuth[0];
	
	secondCheckAuth.addEventListener("click",  () => {
	
	    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
	        /* fetch API */
	        const obj = {"inputKey":idEmailAuthNum.value, "memberEmail":tempEmail}
	        const query = new URLSearchParams(obj).toString()
	
	        fetch("/sendEmail/searchId/checkAuthKey?" + query)
	        .then(resp => resp.text())
	        .then(result => {
	            if(result > 0){
	                clearInterval(authTimer); 
	                idEmailCheck.innerText = "인증되었습니다";
	                idEmailCheck.classList.add("confirm");
	                checkIdObj.authKey =true;
	            } else{
	                alert("인증번호가 일치하지 않습니다.")
	            }
	        })
	        .catch(err => console.log(err));
	
	
	    } else{
	        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
	    }
	
	});
		
}


// 모달창
const searchIdForEmail = document.getElementById("searchIdForEmail");
const modal = document.querySelector('.modal');
const back_btn = document.getElementById("back_btn");
const body = document.body;

searchIdForEmail.addEventListener("click", e => {
	
	const name = document.getElementById("idEmailName").value;
	const email = document.getElementById("idEmailNum").value;
	
     // 아이디 값 받고 출력하는 ajax
	const id_value = document.getElementById("id_value");
	
	fetch("/member/findId", {
	method: "POST",
	headers: {
      "Content-Type": "application/json",
    },
	body: JSON.stringify({memberName: name, memberEmail: email})
	})
	.then(response => response.text()) // 서버에서 문자열로 응답하므로 text()로 받음
	.then(data => {
	    id_value.innerText = data; 
	})
	.catch(err => console.log(err));
	
	modal.classList.toggle('show');
	body.style.overflow = 'hidden';
    e.stopPropagation();
 

});


modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('show');
        body.style.overflow = 'auto';
    }
});

back_btn.addEventListener('click', () => {
    modal.classList.remove('show');
    body.style.overflow = 'auto';
    
    
   
});

	

// 이메일로 비밀번호 재발급

const checkIdObj2 = {
    "memberName2" : false,
    "memberEmail2" : false,
    "authKey2" : false
};

const memberName2 = document.getElementById("pwEmailName");
const memberEmail2 = document.getElementById("pwEmailNum");
const authKey2 = document.getElementById("pwEmailAuthNum");
const pwEmailCheck = document.getElementById("pwEmailCheck");

for (let i = 1; i < sendAuth.length; i += 1) {  
	
	// 이름 유효성 검사
	memberName2.addEventListener("input", () => {
		
	// 이름이 입력되지 않은 경우
	if(memberName2.value.trim().length == 0) {
		memberName2.value = "";
		
		memberName2.placeholder = "이름을 입력해주세요";
		
		checkIdObj2.memberName2 = false;
		return; 
	} else {
		checkIdObj2.memberName2 = true;
		
	}
	
	});
	

	// 이메일 유효성 검사
	// 홀수번째 i의 인증번호 받기를 누르면 
	sendAuth[i].addEventListener('click', function(e) { 
		

		// 입력된 이메일이 없을 경우
		if(memberEmail2.value.trim().length == 0) {
			memberEmail2.value = "";
			
			memberEmail2.placeholder = "이메일을 입력해주세요";
			
			checkIdObj2.memberEmail2 = false;
			return;
		}else {			
			fetch("/sendEmail/sendAuth?memberEmail=" + memberEmail2.value)
			.then(res => res.text())
			.then(result => { 
				if(result > 0) {
					alert("인증번호가 발송 되었습니다.");
					
					tempEmail = memberEmail2.value;

               		checkIdObj2.memberEmail2 = true;
		           
               		pwEmailCheck.innerText = "4:59";
		               		
               		authTimer = window.setInterval(()=>{

	                pwEmailCheck.innerText = "0" + authMin + ":" + (authSec < 10 ? "0" + authSec : authSec);
	                
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
	                checkIdObj2.memberEmail2 = false;
	                return;
	            }
    		})
        .catch(err => {
            console.log("이메일 발송 중 에러 발생");
            console.log(err);
        });
    	}	
	});
	
	// 이메일로 비밀번호 찾기 인증 확인
	const secondCheckAuth = checkAuth[1];
	
	secondCheckAuth.addEventListener("click",  () => {
	
	    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
	        /* fetch API */
	        const obj = {"inputKey":pwEmailAuthNum.value, "memberEmail2":tempEmail}
	        const query = new URLSearchParams(obj).toString()
	
	        fetch("/sendEmail/searchId/checkAuthKey?" + query)
	        .then(resp => resp.text())
	        .then(result => {
	            if(result > 0){
	                clearInterval(authTimer); 
	                pwEmailCheck.innerText = "인증되었습니다";
	                pwEmailCheck.classList.add("confirm");
	                checkIdObj2.authKey2 =true;
	            } else{
	                alert("인증번호가 일치하지 않습니다.")
	            }
	        })
	        .catch(err => console.log(err));
	
	
	    } else{
	        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
	    }
	
	});
		
}


// 모달창
const searchPwForEmail = document.getElementById("searchPwForEmail");
const modal2 = document.querySelector('.modal2');
const back_btn2 = document.getElementById("back_btn2");

searchPwForEmail.addEventListener("click", e => {

    const name = document.getElementById("pwEmailName").value;
    const email = document.getElementById("pwEmailNum").value;
    
    	const pw_value = document.getElementById("pw_value");

	fetch("/member/changePw", {
	method: "POST",
	headers: {
      "Content-Type": "application/json",
    },
	body: JSON.stringify({memberName2: name, memberEmail2: email})
	})
	.then(response => response.text()) // 서버에서 문자열로 응답하므로 text()로 받음
	.then(data => {
	    pw_value.innerText = data; 
	})
	.catch(err => console.log(err));
	
	modal2.classList.toggle('show');
	body.style.overflow = 'hidden';
    e.stopPropagation();
    
 
});
	   
modal2.addEventListener('click', e => {
    if (e.target === modal2) {
        modal2.classList.remove('show');
        body.style.overflow = 'auto';
    }
	
back_btn2.addEventListener('click', () => {
    modal2.classList.remove('show');
    body.style.overflow = 'auto';
    
 

});



    
   
});
