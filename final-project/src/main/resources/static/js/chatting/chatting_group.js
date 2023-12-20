


const socket = new SockJS('/ws-stomp'); // 웹 소켓 연결을 위한 SockJS 객체 생성
const stompClient = Stomp.over(socket); // SockJS를 이용해 Stomp 클라이언트 생성

const chatroomList = document.getElementById("room-list");
const messageArea = document.getElementById('messageArea'); // 채팅 메시지를 표시할 영역
const chatPrivateList = document.getElementById("private-list");

const memberNo = document.getElementById('memberNoDiv').getAttribute('data-member-no');
const memberNickname = document.getElementById('memberNoDivv').getAttribute('data-member-name');




let roomNo = null;
let managerNoN=0;

// 서버에 연결
stompClient.connect({}, frame=> {

	// 서버로부터 메시지 수신 대기
//    stompClient.subscribe('/topic/roomNo', function(message) {
//        // 메시지 처리
//        displayChat(message.body);
//    });

	stompClient.subscribe('/sub/updateMessage',chattingMessage => {
			
			const receivedMessage = JSON.parse(chattingMessage.body);
			showMessage(receivedMessage);
	});
	
	
	stompClient.subscribe('/sub/updatePrivateMessage',chattingMessage => {
			
			const receivedMessage = JSON.parse(chattingMessage.body);
			showMessage(receivedMessage);
	});
	
    
});




// 채팅방 리스트 눌렀을때 메세지 나오는 함수
//chatroomList.addEventListener('click', function(event) {
//  // 클릭된 요소 또는 그 부모 요소 중 LI 요소 찾기
//  let li = event.target.closest('li');
//  
//  // LI 요소가 클릭되었는지 확인
//  if (li) {
//    // 선택한 채팅방의 데이터 속성 값 가져오기
//    	 roomNo = li.getAttribute('room-no');
//   
//    fetch('/getOldMessage?roomNo=' + roomNo)
//      .then(response => response.text())
//      .then(messages => {
//        // 채팅 내역을 받아와서 화면에 표시하기
//        console.log(messages);
//        displayChat(messages);
//      })
//      .catch(error => {
//        console.error('에러 :', error);
//      });
//    
//    console.log('방번호 :', roomNo);
//  }
//});


// 클릭된 채팅방 처리 이벤트 리스너
chatroomList.addEventListener('click', function(event) {
  // 클릭된 요소 또는 그 부모 요소 중 LI 요소 찾기
  let li = event.target.closest('li');

  // LI 요소가 클릭되었는지 확인
  if (li) {
    // 선택한 채팅방의 데이터 속성 값 가져오기
    roomNo = li.getAttribute('room-no');

  	clearChatArea();
    // 기존 메시지 불러와 화면에 표시
    fetchAndDisplayOldMessages(roomNo);
    
    displayFriend();
    
    findManger()
    
    console.log('방번호:', roomNo);
  }
});










// 방번호로 기존 메시지를 가져오기
function fetchAndDisplayOldMessages(roomNo) {
  fetch('/getOldMessage?roomNo=' + roomNo)
    .then(response => response.json())
    .then(messages => {
      // 채팅 내역을 받아와서 화면에 표시하기
      console.log(messages);
      displayChat(messages);
    })
    .catch(error => {
      console.error('에러:', error);
    });
}



/// 기존 메세지 추가
function displayChat(messages){
	
	messages.forEach(message=>appendMessage(message));
}


// 메세지 추가 
function appendMessage(message) {
	
	console.log("메세지 확인" +message);
	
     const messageElement = document.createElement('li');
        messageElement.className = 'target-chat';
	
		if(message.sender==memberNo){
	        messageElement.style.display = 'flex';
        	messageElement.style.justifyContent = 'flex-end';
	          // 메시지 내용을 구성
        messageElement.innerHTML = `
            <div>
                <p class="chat">${message.message}</p>
                <span class="chatDate">${message.time}</span>
            </div>
        `;
		
		
	        ///<img id="pro" src="/common/images/${message.profile}.jpg">
	        //    <img id ="pro" src="${message.profile != null ? message.profile : '/common/images/profile/profile.jpg'}">
	        // <img id="pro" src="${message.profile}" onerror="this.onerror=null; this.src='/common/images/profile/profile.jpg';">
	        
		}else{
		     //let profileImageSrc = message.profile ? message.profile : '/common/images/profile/profile.jpg';

        // 메시지 내용을 구성
      	const img = document.createElement("img");
		if (message.profile) {
		    img.setAttribute("src", message.profile);
		} else {
		    img.setAttribute("src", '/common/images/profile/profile.jpg');
		}

		img.id = "pro";
      
        messageElement.innerHTML = `
             ${img.outerHTML}
            <div>
                <b>${message.memberNickname}</b><br>
                <p class="chat">${message.message}</p>
                <span class="chatDate">${message.time}</span>
            </div>
        `;	
        	
        		/*const div = document.createElement("div");
        		const b = document.createElement("b");
				 messageElement.append(img,div);*/
		}

   
		
        // messageArea에 메시지 요소 추가
        messageArea.appendChild(messageElement);
    
    // 새 메시지가 추가될 때 스크롤을 최하단으로 이동
    messageArea.scrollTop = messageArea.scrollHeight;
}



// 메세지 보여주기 
function showMessage(message) {
    appendMessage(message);
}


// 메시지 전송 함수
function sendMessage() {
	 console.log('sendMessage 내부의 roomNo:', roomNo);
	    const messageInput = document.getElementById('message');
	    const message = messageInput.value.trim();
	    
	//     const now = new Date();
   		// now.setHours(now.getHours() + 9); // 현재 시간에 9시간을 더함
   		
   		
   		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
   		const timeString = `${hours}:${minutes}`;
	    

    // 입력된 메시지가 비어있지 않은 경우에만 전송
    if (message !== '') {
//        // 메시지 객체 생성 (서버에서 요구하는 형식에 맞춰 수정 필요)
//        const chatMessage = {
//            type: 'TALK', // 예시로 'TALK' 설정, 실제 사용에 맞게 조정 필요
//            // roomNo, sender 등 다른 필요한 정보 추가
//            message: message,
//            // time: 현재 시간 설정 (서버에서 처리할 수도 있음)
//        };
	if(chatActive){
		

		
		stompClient.send("/pub/ws-stomp.sendPrivateMessage", {}, JSON.stringify({
			type: 'TALK',
			roomNo : roomNo,
			memberNickname : memberNickname,
			message : message,
			sender : memberNo,
			time: timeString
			
			
		}));
        // 입력 필드 초기화
        messageInput.value = '';
		
		
	}else{
		
        stompClient.send("/pub/ws-stomp.sendMessage", {}, JSON.stringify({
			type: 'TALK',
			roomNo : roomNo,
			memberNickname : memberNickname,
			message : message,
			sender : memberNo,
			time: timeString
		}));
        // 입력 필드 초기화
        messageInput.value = '';
    }
		
	}
  
}


// 메세지 입력창
const messageInput = document.getElementById('message');

messageInput.addEventListener("keyup", e => {
	if(e.key == "Enter"){ 
		if (!e.shiftKey) {
			sendMessage();
		}
	}
})


document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.shiftKey) {
        messageInput.focus(); // Ctrl + Shift 키 조합을 눌렀을 때 messageInput에 포커스
    }
});



// 이전 채팅 내용을 지우는 함수
function clearChatArea() {
  messageArea.innerHTML = ''; // 이전 채팅 내용을 지움
}




//function newMessage(newMessage){
//    const messageInput = document.getElementById('message');
//    const message = messageInput.value.trim();
//
// // 각 메시지를 순회하면서 화면에 추가
//    message.forEach(message => {
//        const messageElement = document.createElement('li');
//        messageElement.className = 'target-chat';
//
//        // 메시지 내용을 구성
//        messageElement.innerHTML = `
//            <img id="pro" src="images/${message.sender}.jpg">
//            <div>
//                <b>${message.sender}</b><br>
//                <p class="chat">${message.message}</p>
//                <span class="chatDate">${message.time}</span>
//            </div>
//        `;
//
//        // messageArea에 메시지 요소 추가
//        messageArea.appendChild(messageElement);
//    });
//	
//}



// 전송 버튼 이벤트 리스너
//document.getElementById('submit').addEventListener('click', sendMessage);
//
//// 폼에서 엔터 키 누르면 메시지 전송 (선택 사항)
//document.querySelector('form').addEventListener('submit', function(event) {
//    event.preventDefault();
//    sendMessage();
//});
//


/////////////////////////////////////////////////////

// 모달 창

 let btn = document.getElementById("invite-btn");
 let modal = document.getElementById("modal-overlay");
 let span = document.getElementsByClassName("close")[0]; 


 btn.onclick = function() {
  modal.style.display = "block";
  event.preventDefault();
  // window.location.href = event.target.href; 이벤트를 막은걸 다시 수행해서 페이지 이동을 가능하게 해줌 

}

span.onclick = function() {
  modal.style.display = "none";
}



/*window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

*/

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == friendOverlay) {
    friendOverlay.style.display = "none";
  }
}




/////// 개인 채팅 ////////////////////////////////////////////////////////

let friendFindBtn =document.getElementById("friend-FindBtn");
let friendOverlay = document.getElementById("friend-overlay");

friendFindBtn.onclick = function() {
 friendOverlay.style.display = "block";


}


const friendInput = document.querySelector("#friendInput"); // 사용자 검색
const friendsArea = document.querySelector("#friendsArea"); // 검색 결과

// 개인 채팅 친구 리스트 전역변수 선언
let friends = [];


// 개인 친구 채팅 
function displayInvite(list){
	
	friendsArea.innerHTML="";
	list.forEach(member=> {
		const li = document.createElement("li");
	    li.classList.add("friend-row");
        li.setAttribute("friend-id", member.memberNo);
		
		const img = document.createElement("img");
		img.classList.add("friend-row-img");
		
		// 프로필 이미지 여부에 따른 src 속성 선택
		/*if(member.profileImage == null) img.setAttribute("src", "/images/user.png");
		else img.setAttribute("src", member.profileImage);
*/
	     img.src = member.profileImage ? member.profileImage : '/common/images/profile/profile.jpg';


		let nickname = member.memberNickname;

		const span = document.createElement("span");
		span.innerHTML = `${nickname}`;

	
	
	  	const checkbox = document.createElement("input");
	    checkbox.type = "checkbox";
	    checkbox.classList.add("friend-checkbox");
	    checkbox.checked = member.selected || false;
	    checkbox.addEventListener("change", (e) => handleCheckboxFriendsChange(e, member));
	
	  	li.append(checkbox,img,span); // 체크박스 추가
        friendsArea.append(li);
		
	})
	
	
}



// 개인 채팅 친구 추가 버튼 리스트를 가져오기
friendFindBtn.addEventListener("click",()=>{
	
		fetch(`/findFriends`)
			.then(resp=>resp.json())
			.then(list=>{
				friends=list;
				displayInvite(list);
				console.log(friends)
			})
			.catch(err => console.log(err));

		
});


// 친구 체크박스 상태 변경 시 이벤트 처리
function handleCheckboxFriendsChange(event, member) {
    if (event.target.checked) {
        // 체크박스 선택 시, 선택된 친구 목록에 추가
        member.selected = true;
    } else {
        // 체크박스 해제 시, 선택된 친구 목록에서 제거
        member.selected = false;
    }
    updateSelectedFriendsPrivateDisplay();
}



// 선택된 친구 목록 업데이트 및 표시
function updateSelectedFriendsPrivateDisplay() {
	const selectedFriendsArea = document.getElementById("selectedFriendsPrivateArea");
	selectedFriendsArea.innerHTML = "";

    const selectedFriends = friends.filter(member => member.selected);
    
    selectedFriends.forEach(member=> {
		const div = document.createElement("div");
		div.textContent=member.memberNickname;
		selectedFriendsArea.appendChild(div);
		
	});
	
}



// 입력창에 친구 입력시
friendInput.addEventListener("input", e => {

	const query = e.target.value.trim();
	if(query.length > 0){
		const filteredFriends = friends.filter(member => 
        member.memberNickname.includes(query));
    	displayInvite(filteredFriends);
		} else {
		    displayInvite(friends);
		}
	
});


// 친구끼리 채팅방 만들기
document.getElementById("inviteFriend").addEventListener("click", () => {
	
	 const selectedFriendIds = friends.filter(member => member.selected)
                                         .map(member => member.memberNo);
                                         
    if (selectedFriendIds.length > 0) {
     
        fetch('/private/createPrivateRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
				invitedFriends: selectedFriendIds,
				})
        })
        .then(response => response.json())
        .then(data => {
            console.log('성공 :', data);
            if(data>1){
				
				location.reload();
				
			} else {
		      console.error('서버 오류 발생');
		    }
            
        })
        .catch((error) => {
            console.error('Error:', error);
          
        });
    }
	
	
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
////// 채팅방 

const targetInput = document.querySelector("#targetInput"); // 사용자 검색
const resultArea = document.querySelector("#resultArea"); // 검색 결과
const inviteBtn = document.getElementById("invite-btn"); // 친구 추가 창

// 친구 리스트 전역변수 선언
let allFriends = [];

// 친구 추가 버튼 리스트를 가져오기
inviteBtn.addEventListener("click",()=>{


	if(chatActive){
		
		if(roomNo!==null){
		
		fetch(`/private/allFriends?roomNo=${roomNo}`)
			.then(resp=>resp.json())
			.then(list=>{
				allFriends=list;
				displayFriends(list);
				console.log(allFriends)
			})
			.catch(err => console.log(err));
		}
		
		
		
	}else{
		
		if(roomNo!==null){
		
		fetch(`/allFriends?roomNo=${roomNo}`)
			.then(resp=>resp.json())
			.then(list=>{
				allFriends=list;
				displayFriends(list);
				console.log(allFriends)
			})
			.catch(err => console.log(err));
		}
		
		
	}

		
});





// 시작할때 리스트를 가져오기
//document.addEventListener("DOMContentLoaded",()=>{
//	
//	fetch("/allFriends")
//		.then(resp=>resp.json())
//		.then(list=>{
//			allFriends=list;
//			displayFriends(list);
//			console.log(allFriends)
//		})
//		.catch(err => console.log(err));
//	
//});
//






// 리스트를 보여주기 
function displayFriends(list){
	resultArea.innerHTML="";
	list.forEach(member=>{
		const li = document.createElement("li");
	    li.classList.add("result-row");
        li.setAttribute("data-id", member.memberNo);
		
		const img = document.createElement("img");
		img.classList.add("result-row-img");
		
		// 프로필 이미지 여부에 따른 src 속성 선택
		if(member.profileImage == null) img.setAttribute("src", "/common/images/profile/profile.jpg");
		else img.setAttribute("src", member.profileImage);

		let nickname = member.memberNickname;

		const span = document.createElement("span");
		span.innerHTML = `${nickname}`;

		
		
		const checkbox = document.createElement("input");
	    checkbox.type = "checkbox";
	    checkbox.classList.add("friend-checkbox");
	    checkbox.checked = member.selected || false;
	    checkbox.addEventListener("change", (e) => handleCheckboxChange(e, member));
	
	  	li.append(checkbox,img,span); // 체크박스 추가
        resultArea.append(li);
		
	})
	
	
}



// 친구 체크박스 상태 변경 시 이벤트 처리
function handleCheckboxChange(event, member) {
    if (event.target.checked) {
        // 체크박스 선택 시, 선택된 친구 목록에 추가
        member.selected = true;
    } else {
        // 체크박스 해제 시, 선택된 친구 목록에서 제거
        member.selected = false;
    }
    updateSelectedFriendsDisplay();
}



// 선택된 친구 목록 업데이트 및 표시
function updateSelectedFriendsDisplay() {
	const selectedFriendsArea = document.getElementById("selectedFriendsArea");
	selectedFriendsArea.innerHTML = "";

    const selectedFriends = allFriends.filter(member => member.selected);
    
    selectedFriends.forEach(member=> {
		const div = document.createElement("div");
		div.textContent=member.memberNickname;
		selectedFriendsArea.appendChild(div);
		
	});
	
}



// 입력창에 친구 입력시
targetInput.addEventListener("input", e => {

	const query = e.target.value.trim();
	if(query.length > 0){
		const filteredFriends = allFriends.filter(member => 
        member.memberNickname.includes(query));
    	displayFriends(filteredFriends);
		} else {
		    displayFriends(allFriends);
		}
	
});


// 친구 초대
document.getElementById("invite").addEventListener("click", () => {
    // 선택된 친구들의 ID를 배열로 수집
    const selectedFriendIds = allFriends.filter(member => member.selected)
                                         .map(member => member.memberNo);
                                         
    if (selectedFriendIds.length > 0 && roomNo !=null) {
        // AJAX 요청을 사용하여 서버에 초대 정보 전송
        fetch('/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
				invitedFriends: selectedFriendIds,
				currentRoomNo: Number(roomNo)
				})
        })
        .then(response => response.json())
        .then(data => {
            console.log('성공 :', data);
            displayFriend();
            
            
        })
        .catch((error) => {
            console.error('Error:', error);
          
        });
    }
});


// 현재 채팅방에 있는 친구 찾기 
function displayFriend(){
	
	if(chatActive){
		if(roomNo!==null){
		
		fetch(`/private/displayFriend?roomNo=${roomNo}`)
			.then(resp=>resp.json())
			.then(list=>{
				
				console.log('현재 개인채팅방 인원',list)
				appendFriend(list)
			})
			.catch(err => console.log(err));
		}

		
		
	}else{
		
		if(roomNo!==null){
		
		fetch(`/displayFriend?roomNo=${roomNo}`)
			.then(resp=>resp.json())
			.then(list=>{
				
				console.log('현재 채팅방 인원',list)
				appendFriend(list)
			})
			.catch(err => console.log(err));
		}

		
		
	}
	
	
	

}


// 현재 채팅방 친구 추가
function appendFriend(list) {
  
  	const friendAreas = document.querySelectorAll('.friendArea');

    friendAreas.forEach(friendArea => {
        friendArea.innerHTML = ''; // 각 friendArea 내용을 초기화

        list.forEach(member => {
            const li = document.createElement('li');
            li.className = 'friendList';

            const p = document.createElement('p');
            p.textContent = member.memberNickname;

            const img = document.createElement('img');
            img.classList.add('friendAreasImages');
            img.src = member.profileImage ? member.profileImage : '/common/images/profile/profile.jpg';

            li.appendChild(img);
            li.appendChild(p);
            friendArea.appendChild(li); 
        });
    });
 
}

// 방장 찾기
function findManger(){
		fetch('/RoomMaking/findManger?roomNo='+roomNo)
		 .then(response => response.json())
    	 .then(managerNo => {
			 managerNoN=managerNo;
			 console.log("방장번호 :"+managerNo);
		})
		.catch(err => console.log(err));
	
}





//채팅방 설정 페이지로
function roomSetting(){
	

	if(roomNo===null){
		
		alert("채팅방을 선택하세요");
		
		}else if(memberNo==managerNoN){
			  window.location.href = '/chatting/roomSetting?roomNo='+roomNo;				 
		 }else{
			 
			 alert("방장만 설정을 할 수 있습니다.")
		 }	


		
	}
	

	



// 나가기 
function exit(){
	console.log("나가는사람 번호 :"+memberNo);
	console.log("방장 번호 :"+managerNoN);
	
	if(roomNo===null){
		alert("채팅방을 선택하십시오");
	}else if(memberNo==managerNoN){
		console.log("방장장 번호 확인 : " + managerNoN);
		alert("채팅방을 나기 위해서는 먼저 방장을 다른사람에게 주십시오");	
	}else{
		fetch('/exitMember',{
			method:'POST',
			headers:{
				'Content-Type': 'application/json',
			},
			 body: JSON.stringify({ 
				  roomNo: roomNo,
       			  memberNo: memberNo
				})	
			
			})
			.then(resp=>resp.json())
			.then(result=>{
				  console.log('성공 :', result);	
				  if(result>0){
					  alert("채팅방을 나갔습니다");
					  
				  }	
				  			
			})
			.catch(err => console.log(err));
		
		
	}
	
}
// 설정
 let settingButton = document.querySelector('.button-room-setting');
 let inviteButton = document.querySelector('.invite-btn');

// 채팅방 선택에 그룹채팅과 개인채팅을 구별 짓는 중요한 지표
let chatActive = false;


// 채팅방 목록 표시
function showRoomList() {
    let card = document.querySelector('.card');
	
	chatActive = false;

    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    }
       settingButton.style.display = 'block';
       	inviteButton.style.display = 'none';

}

// 개인 채팅 목록 표시
function showPrivateList() {
    let card = document.querySelector('.card');
    
    chatActive = true;
    
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
    }
    settingButton.style.display = 'none';
  
   	 inviteButton.style.display = 'block';
}








chatPrivateList.addEventListener('click', function(event) {
  // 클릭된 요소 또는 그 부모 요소 중 LI 요소 찾기
  let li = event.target.closest('li');

  // LI 요소가 클릭되었는지 확인
  if (li) {
    // 선택한 채팅방의 데이터 속성 값 가져오기
    roomNo = li.getAttribute('private-no');

  	clearChatArea();
    // 기존 메시지 불러와 화면에 표시
    fetchAndDisplayOldMessagesPrivate(roomNo);
    
    displayFriend();
    
    console.log('방번호:', roomNo);
  }
});




// 방번호로 기존 메시지를 가져오기
function fetchAndDisplayOldMessagesPrivate(roomNo) {
  fetch('/private/getOldMessage?roomNo=' + roomNo)
    .then(response => response.json())
    .then(messages => {
      // 채팅 내역을 받아와서 화면에 표시하기
      console.log(messages);
      displayChat(messages);
    })
    .catch(error => {
      console.error('에러:', error);
    });
}




const aside = document.getElementById("aside");
const sideBarOut = document.getElementById("sideBarOut");

function toggleSidebar() {
    if (aside.style.display === 'none') {
        aside.style.display = 'block';
       sideBarOut.textContent = '사이드바 숨기기';
    } else {
        aside.style.display = 'none';
        sideBarOut.textContent = '사이드바 펼치기';
    }
}

// sideBarOut 버튼 클릭 시 toggleSidebar 함수 실행
sideBarOut.addEventListener('click', toggleSidebar);

// 키보드 이벤트 리스너 추가
document.addEventListener('keydown', function(event) {
    // Ctrl + Enter 키 조합이 눌렸는지 확인
    if (event.ctrlKey && event.key === 'Enter') {
        // 해당 조합이 눌렸으면 toggleSidebar 함수 실행
        toggleSidebar();
    }
});




