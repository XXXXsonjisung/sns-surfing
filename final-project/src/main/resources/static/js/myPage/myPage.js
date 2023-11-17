// 내 정보(수정) 페이지

const memberNickname = document.getElementById("memberNickname");
const memberTel = document.getElementById("memberTel");
const updateInfo = document.getElementById("updateInfo");

// 내 정보 수정 form태그가 존재할 때 (내 정보 페이지)
if(updateInfo != null){
    // 전역변수로 수정 전 닉네임/전화번호를 저장
    initNickname = memberNickname.value;
    initTel = memberTel.value;

    // 닉네임 유효성 검사
    memberNickname.addEventListener("input", () => {

        // 변경 전 닉네임과 입력 값이 같을 경우
        if(memberNickname.value == initNickname){ 
            memberNickname.removeAttribute("style");
            return;
        }

        // 정규 표현식으로 유효성 검사
        const regEx = /^[가-힣\w\d]{2,10}$/;

        if(regEx.test(memberNickname.value)){ // 유효
            memberNickname.style.color = "green";

        }else{ // 무효
            memberNickname.style.color = "red";
        }
    });


    // 전화번호 유효성 검사
    memberTel.addEventListener("input", () => {

        // 변경 전 전화번호와 입력 값이 같을 경우
        if(memberTel.value == initTel){ 
            memberTel.removeAttribute("style");
            return;
        }

        // 정규 표현식으로 유효성 검사
        const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

        if(regEx.test(memberTel.value)){ // 유효
            memberTel.style.color = "green";

        }else{ // 무효
            memberTel.style.color = "red";
        }
    });

    
    // form태그 제출 시 유효하지 않은 값이 있으면 제출 X
    updateInfo.addEventListener("submit", e => {

        // 닉네임이 유효하지 않을 경우
        if(memberNickname.style.color == "red"){
            alert("닉네임이 유효하지 않습니다.");
            memberNickname.focus(); // 포커스 이동
            e.preventDefault(); // 기본 이벤트 제거
            return;
        }

        // 전화번호가 유효하지 않을 경우
        if(memberTel.style.color == "red"){
            alert("전화번호가 유효하지 않습니다.");
            memberTel.focus(); // 포커스 이동
            e.preventDefault(); // 기본 이벤트 제거
            return;
        }
    });
} // if end



// 비밀번호 변경 제출 시
const changePwFrm = document.getElementById("changePwFrm");
const currentPw = document.getElementById("currentPw");
const newPw = document.getElementById("newPw");
const newPwConfirm = document.getElementById("newPwConfirm");


if(changePwFrm != null){ // 비밀번호 변경 페이지인 경우

    changePwFrm.addEventListener("submit", e => {
        
        // 현재 비밀번호 미작성 시
        if(currentPw.value.trim() == ""){
            alert("현재 비밀번호를 입력해주세요");
            e.preventDefault();
            currentPw.focus();
            return;
        }

        // 비밀번호 유효성 검사
        const regEx = /^[a-zA-Z0-9\!\@\#\-\_]{6,20}$/;
        if(!regEx.test(newPw.value)){
            alert("비밀번호가 유효하지 않습니다");
            e.preventDefault();
            newPw.focus();
            return;
        }

        // 비밀번호 == 비밀번호 확인
        if(newPw.value != newPwConfirm.value){
            alert("비밀번호가 일치하지 않습니다");
            e.preventDefault();
            newPwConfirm.focus();
            return;
        }
    });
}



const secessionFrm = document.getElementById("secessionFrm");

if(secessionFrm != null){ // 탈퇴 페이지인 경우

    const memberPw = document.getElementById("memberPw");
    const agree = document.getElementById("agree");

    secessionFrm.addEventListener("submit", e => {

        if(memberPw.value.trim() == ""){ // 비밀번호 미작성
            alert("비밀번호를 작성해주세요");
            e.preventDefault();
            memberPw.focus();
            return;
        }

        if(!agree.checked){ // 동의 체크가 되지 않은 경우
            alert("약관 동의 후 탈퇴 버튼을 눌러주세요");
            e.preventDefault();
            agree.focus();
            return;
        }

        if(!confirm("정말 탈퇴 하시겠습니까?")){ // 취소 클릭 시
            alert("탈퇴 취소");
            e.preventDefault();
            return;
        }
    });



}



//----------------------------------------------------

// 프로필 이미지 추가/변경/삭제
const profileImage = document.getElementById("profileImage"); // img 태그
const imageInput = document.getElementById("imageInput"); // input 태그
const deleteImage = document.getElementById("deleteImage"); // x버튼


let initCheck; // 초기 프로필 이미지 상태를 저장하는 변수
                // false == 기본 이미지,  true == 이전 업로드 이미지

let deleteCheck = -1; 
// 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 나타내는 변수
// -1 == 초기값 ,  0 == 프로필 삭제(x버튼),  1 == 새 이미지 업로드


let originalImage; // 초기 프로필 이미지 파일 경로 저장

if(imageInput != null){ // 화면에 imageInput이 있을 경우 ( if 굳이 안해도 되긴 함 ) 

    // 프로필 이미지가 출력되는 img태그의 src 속성을 저장
    originalImage = profileImage.getAttribute("src"); 


    // 회원 프로필 화면 진입 시 
    // 현재 회원의 프로필 이미지 상태를 확인
    if(profileImage.getAttribute("src") == "/resources/images/user.png"){
        // 기본 이미지인 경우
        initCheck = false;
    }else{
        initCheck = true;
    }
    



    // change 이벤트 : 값이 변했을 때
    // - input type="file", "checkbox", "radio" 에서 많이 사용
    // - text/number 형식 사용 가능
    //   -> 이 때 input값 입력 후 포커스를 잃었을 때 
    //      이전 값과 다르면 change 이벤트 발생

    imageInput.addEventListener("change", e => {

        // 2MB로 최대 크기 제한 
        const maxSize = 1 * 1024 * 1024 * 2; // 파일 최대 크기 지정(바이트 단위)

        console.log(e.target); // input
        console.log(e.target.value); // 업로드된 파일 경로
        console.log(e.target.files); // 업로드된 파일의 정보가 담긴 배열

        const file = e.target.files[0]; // 업로드한 파일의 정보가 담긴 객체


        // 파일을 한번 선택한 후 취소했을 때 ( file이 undefined가 된다 ) 
        if(file == undefined){ 
            console.log("파일 선택이 취소됨");
            deleteCheck = -1; // 취소 == 파일 없음 == 초기상태

            // 취소 시 기존 프로필 이미지로 변경 ( 기존 이미지에서 변경되는게 없게 하겠다는거죠 ) 
            profileImage.setAttribute("src", originalImage);

            return;
        }

        if( file.size > maxSize){ // 선택된 파일의 크기가 최대 크기를 초과한 경우
            alert("2MB 이하의 이미지를 선택해주세요.");
            imageInput.value = ""; 
            // input type="file" 태그에 대입할 수 있는 value는 "" (빈칸) 뿐이다!
            deleteCheck = -1; // 취소 == 파일 없음 == 초기상태

            // 기존 프로필 이미지로 변경
            profileImage.setAttribute("src", originalImage);

            return;
        }

	
        // JS에서 파일을 읽는 객체
        // - 파일을 읽고 클라이언트 컴퓨터에 파일을 저장할 수 있음 
        const reader = new FileReader();

        reader.readAsDataURL(file);
        // 매개변수에 작성된 파일을 읽어서 저장 후
        // 파일을 나타내는 URL을 result 속성으로 얻어올 수 있게 함.

        // 다 읽었을 때
        reader.onload = e => {
            //console.log(e.target);
            console.log(e.target.result); // 읽은 파일의 URL 
            /* 개발자도구에서 Application탭에서 Frames > top > images 안에서 확인가능 */

            const url = e.target.result;

            // 프로필이미지(img) 태그에 src 속성으로 추가
            profileImage.setAttribute("src", url);

            deleteCheck = 1;
        }
    });


    // x버튼 클릭 시
    deleteImage.addEventListener('click', () => {
        imageInput.value = ""; // input type="file"의 value 삭제

        profileImage.setAttribute("src", "/resources/images/user.png");
        // 프로필 이미지를 기본 이미지로 변경

        deleteCheck = 0;
    });


    // #profileFrm이 제출 되었을 때
    document.getElementById("profileFrm").addEventListener("submit", e => {

        // initCheck
        // 초기 프로필 이미지 상태를 저장하는 변수
        // false == 기본 이미지,  true == 이전 업로드 이미지

        // deleteCheck
        // 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 나타내는 변수
        // -1 == 초기값 ,  0 == 프로필 삭제(x버튼),  1 == 새 이미지 업로드

        let flag = true; // 제출하면 안되는 경우의 초기값 플래그 true로 지정

        // 이전 프로필 이미지가 없으면서, 새 이미지 업로드를 했다 -> 처음으로 이미지 추가
        if(!initCheck && deleteCheck == 1)  flag = false;

        // 이전 프로필 이미지가 있으면서, 새 이미지 업로드를 했다 -> 새 이미지로 변경
        if(initCheck && deleteCheck == 1)   flag = false;
        
        // 이전 프로필 이미지가 있으면서, 프로필 삭제 버튼을 눌렀다 -> 삭제
        if(initCheck && deleteCheck == 0)   flag = false;

        
        if(flag){ // flag == true -> 제출하면 안되는 경우
            e.preventDefault(); // form 기본 이벤트 제거
            alert("이미지 변경 후 클릭하세요");
        }

	    return true;
    });




}