

// 공개 비공개 
const checkboxes = document.querySelectorAll('.public');
const labeles = document.querySelectorAll('.custom-checkbox');

// 비공개 체크시 비밀번호 입력창 뜸
const roomPw = document.getElementById("roomPw");

labeles.forEach((label,index)=>{

  label.addEventListener('click',()=>{

    const checkbox = checkboxes[index];

    if(!checkbox.checked){

      checkboxes.forEach((cb,i)=>{

          cb.checked=false;
          labeles[i].classList.remove('checked');

      });

      checkbox.checked = true;
      label.classList.add('checked');

    }


      if(checkboxes[1].checked){

        roomPw.style.display="block";

      }

      if(checkboxes[0].checked){

        roomPw.style.display="none";
      }


  });


});







// 태그 리스트 모달창

 var btn = document.getElementById("tag-btn");
 var modal = document.getElementById("modal-overlay");
 var span = document.getElementsByClassName("close")[0];

 btn.onclick = function() {
  modal.style.display = "block";
  event.preventDefault();
  // window.location.href = event.target.href; 이벤트를 막은걸 다시 수행해서 페이지 이동을 가능하게 해줌 

}

span.onclick = function() {
  modal.style.display = "none";
}



window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/////////////////////////////////////////////////////

//리스트 비동기 처리 
// document.getElementById("region-li").addEventListener('click', ()=>{

//       fetch('/RoomMaking/region')
  

// });


function showListItem(index) {
  const listItems = document.querySelectorAll('.list-item');
  
  // 모든 list-item 요소 숨기기
  listItems.forEach(item => {
      item.style.display = 'none';
  });
  
  if (index === 5) {
    listItems.forEach(item => {
      item.style.display = 'block';
    });
  } else {
    // 특정 인덱스의 list-item 요소만 보이게 하기
    listItems[index].style.display = 'block';
  }

  
}




// 태그 선택시 input창에 쌓이게 하기 

const tagsInput = document.getElementById("tagsInput");
const listItems = document.querySelectorAll(".detail-tiem");
const otherInputs = document.querySelectorAll('.other-inputs'); // 다른 input 요소 선택

listItems.forEach(item => {


  item.addEventListener('click', () => {
    const tag = item.textContent;
    const currentTags = tagsInput.value.trim(); // 입력 값에서 앞뒤 공백을 제거
    const tagsArray = currentTags === '' ? [] : currentTags.split(',').map(tag => tag.trim()); // 콤마(,)를 기준으로 배열로 변환
  
    // 중복 태그 확인
    if (tagsArray.includes(`#${tag}`)) {
     
      return;
    }
   
   
    // 태그 개수 제한 
    if (tagsArray.length === 5) {
      alert("5개만 선택 가능합니다.");
      return;
    }
  
    // 태그 추가
    if (tagsArray.length === 0) {
      tagsInput.value = '#' + tag;
    } else {
      tagsInput.value = `${tagsInput.value}, #${tag}`;
      tagsInput.style.width = (tagsInput.value.length * 10) + 'px'; // 예시로 글자 하나당 8px씩 너비 지정

    }

    
    otherInputs.forEach(input => {
      input.value = tagsInput.value;
      input.style.width = (tagsInput.value.length * 10) + 'px'; // 예시로 글자 하나당 10px씩 너비 지정
    });


  });
});

// 태그 지우기 
const cleanTagsButtons = document.querySelectorAll(".cleanTag");

cleanTagsButtons.forEach(button => {
  button.addEventListener("click", () => {
    tagsInput.value = null;
    otherInputs.forEach(input => {
      input.value = null;
    });
  });
});


/// 태그 



//프로필 이미지 프리뷰

function image(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('preview').src = "";
  }
}



//초대하기 

const targetInput = document.querySelector("#targetInput"); // 사용자 검색
const resultArea = document.querySelector("#resultArea"); // 검색 결과

targetInput.addEventListener("input", e => {

	const query = e.target.value.trim();

	// 입력된게 없을 때
	if(query.length == 0){
		resultArea.innerHTML = ""; // 이전 검색 결과 비우기
		return;
	}


	// 입력된게 있을 때
	if(query.length > 0){
		fetch("/chatting/selectTarget?query="+query)
		.then(resp => resp.json())
		.then(list => {
			//console.log(list);

			resultArea.innerHTML = ""; // 이전 검색 결과 비우기

			if(list.length == 0){
				const li = document.createElement("li");
				li.classList.add("result-row");
				li.innerText = "일치하는 회원이 없습니다";
				resultArea.append(li);
			}

			for(let member of list){
				// li요소 생성(한 행을 감싸는 요소)
				const li = document.createElement("li");
				li.classList.add("result-row");
				li.setAttribute("data-id", member.memberNo);

				// 프로필 이미지 요소
				const img = document.createElement("img");
				img.classList.add("result-row-img");
				
				// 프로필 이미지 여부에 따른 src 속성 선택
				if(member.profileImage == null) img.setAttribute("src", "/resources/images/user.png");
				else	img.setAttribute("src", member.profileImage);

				let nickname = member.memberNickname;
				let email = member.memberEmail;

				const span = document.createElement("span");
				span.innerHTML = `${nickname} ${email}`.replace(query, `<mark>${query}</mark>`);

				// 요소 조립(화면에 추가)
				li.append(img, span);
				resultArea.append(li);

				// li요소에 클릭 시 채팅방에 입장하는 이벤트 추가
				li.addEventListener('click', chattingEnter);
			}

		})
		.catch(err => console.log(err) );
	}
});












