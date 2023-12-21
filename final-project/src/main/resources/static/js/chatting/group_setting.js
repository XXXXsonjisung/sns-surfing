
function join(doooo) {
	
	const roomNo = doooo.getAttribute('data-room-no');
	const roomPwd = doooo.getAttribute('data-room-Pwd');
	
    
    console.log("가입할 채팅방 정보:", roomNo,roomPwd);
    
	if(roomPwd===null){
		
		joinRoom(roomNo)
		
	}else{
		
		const pwd =prompt('비밀번호를 입력하세요');
		
		if(pwd==roomPwd){
			joinRoom(roomNo)
			
		}else{
			
			alert("비밀번호가 다릅니다.");
			
		}
		
		
	}
    	

}


function joinRoom(roomNo){
	
	 fetch('/RoomMaking/joinRoom?roomNo=' + roomNo)
	    .then(response => response.json())
	    .then(result => {
			if(result>0){
				alert("가입 성공");
			}else{
				alert("이미 가입되어있습니다.");
			}
			
	    })
	    .catch(error => {
	      console.error('에러:', error);
	    });
	

}



function changeRoomList(cca){
	
	fetch('/chatting/groupSetting?cca='+cca)
		.then(response=> response.text())
		.then(result=>{
			
			console.log(cca);
			
		})
		 .catch(error => {
	      console.error('에러:', error);
	    });
	
}


/*//////////////////그룹선택///////////////////*/




const tagsInput = document.getElementById("tag-box");
const listItems = document.querySelectorAll(".tag-li");


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

    


  });
});

// 태그 지우기 
const cleanTagsButtons = document.querySelectorAll(".cleanTag");

cleanTagsButtons.forEach(button => {
  button.addEventListener("click", () => {
    tagsInput.value = null;
    
  });
});










// 선택한 그룹 태그로 검색하기
function searchRoom(){
	
	 document.getElementById('roomList').innerHTML = '';
	
		const tagBox = document.getElementById('tag-box');
    	const tagName = tagBox.value; // input에서 태그 데이터 가져오기

		 fetch('/RoomMaking/searchRoom', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({ tagName: tagName })
		})
		.then(response => response.json()) // 응답을 JSON 형태로 변환
		.then(data => {
		   
		   console.log("선택한 채팅방 확인 : " +data);
		     updateRoomList(data);
		})
		.catch(error => {
		    console.error('Error:', error);
		});
}



function updateRoomList(data) {
    const roomList = document.getElementById('roomList');
    data.forEach(room => {
        const roomElement = document.createElement('li');
        roomElement.className = 'room-li';
        roomElement.innerHTML = `
    
                <div class="room-img">
                    <img src="${room.roomImg ? room.roomImg : '/common/images/profile/profile.jpg'}">
                </div>
                <div class="room-title">${room.roomName}</div>
                <div class="room-headCount">정원:${room.roomPersonnel}</div>
                <div class="room-signUp">
                    ${room.roomPwd ? '<div>비공개</div>' : '<div>공개</div>'}
                    <button data-room-no="${room.roomNo}" data-room-pwd="${room.roomPwd}" onclick="join(this)">가입</button>
                </div>
                <div class="room-chatNum">회원수:${room.memberCount}</div>
                <div class="room-tag">${room.tagName}</div>
                <div class="room-introduce">${room.roomIntrudece}</div>
     
            
            
        `;
        roomList.appendChild(roomElement);
    });
}








