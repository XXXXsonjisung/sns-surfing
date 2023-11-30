const idForPhone = document.querySelector("#idForPhone");
const idForEmail = document.querySelector("#idForEmail");
const pwForPhone = document.querySelector("#pwForPhone");
const pwForEmail = document.querySelector("#pwForEmail");

const idPhoneName = document.querySelector("#idPhoneName");
const idPhoneTel = document.querySelector("#idPhoneTel");
const idPhoneAuthNum = document.querySelector("#idPhoneAuthNum");

const idEmailName = document.querySelector("#idEmailName");
const idEmailTel = document.querySelector("#idEmailTel");
const idEmailAuthNum = document.querySelector("#idEmailAuthNum");

const pwPhoneName = document.querySelector("#pwPhoneName");
const pwPhoneTel = document.querySelector("#pwPhoneTel");
const pwPhoneAuthNum = document.querySelector("#pwPhoneAuthNum");

const pwEmailName = document.querySelector("#pwEmailName");
const pwEmailTel = document.querySelector("#pwEmailTel");
const pwEmailAuthNum = document.querySelector("#pwEmailAuthNum");

const sendAuth = document.querySelectorAll(".sendAuth");
const checkAuth = document.querySelectorAll(".checkAuth");
const searchBtn = document.querySelectorAll(".searchBtn");

const radioGroups = [
  { radio: idForPhone, elements: [idPhoneName, idPhoneTel, idPhoneAuthNum] },
  { radio: idForEmail, elements: [idEmailName, idEmailTel, idEmailAuthNum] },
  { radio: pwForPhone, elements: [pwPhoneName, pwPhoneTel, pwPhoneAuthNum] },
  { radio: pwForEmail, elements: [pwEmailName, pwEmailTel, pwEmailAuthNum] },
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



// 전화번호로 아이디/ 비밀번호 찾기
let authTimer;
let authMin = 4;
let authSec = 59;

let tempEmail;



const checkObj = {
    "memberName" : false,
    "memberEmail" : false,
    "authKey" : false
};


for (let i = 0; i < sendAuth.length; i += 2) {
	
	sendAuth[i].addEventListener('click', function() {
	   const checkObj = {
		    "memberName" : false,
		    "memberTel" : false,
		    "authKey" : false
		    	    
		};
	});
}



// 이메일로 아이디/ 비밀번호 찾기

for (let i = 1; i < sendAuth.length; i += 2) {
	
	sendAuth[i].addEventListener('click', function() {
	
	
		    
  	
		
	});
}

