


const socket = new SockJS('/ws-stomp'); // 웹 소켓 연결을 위한 SockJS 객체 생성
const stompClient = Stomp.over(socket); // SockJS를 이용해 Stomp 클라이언트 생성

const chatroomList = document.getElementById("room-list");
const messageArea = document.getElementById('messageArea'); // 채팅 메시지를 표시할 영역


const memberNo = document.getElementById('memberNoDiv').getAttribute('data-member-no');
const memberName = document.getElementById('memberNoDivv').getAttribute('data-member-name');

let roomNo = null;

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

	// 기존 채팅 지우기 
  	clearChatArea();
    // 기존 메시지 불러와 화면에 표시
    fetchAndDisplayOldMessages(roomNo);
    
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
     const messageElement = document.createElement('li');
        messageElement.className = 'target-chat';
	
		if(message.sender==memberNo){
			messageElement.style.textAlign = 'right';
	        messageElement.style.backgroundColor = '#cce6ff';
		}

     // 메시지 내용을 구성
        messageElement.innerHTML = `
            <img id="pro" src="images/${message.sender}.jpg">
            <div>
                <b>${message.memberName}</b><br>
                <p class="chat">${message.message}</p>
                <span class="chatDate">${message.time}</span>
            </div>
        `;

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

    // 입력된 메시지가 비어있지 않은 경우에만 전송
    if (message !== '') {
//        // 메시지 객체 생성 (서버에서 요구하는 형식에 맞춰 수정 필요)
//        const chatMessage = {
//            type: 'TALK', // 예시로 'TALK' 설정, 실제 사용에 맞게 조정 필요
//            // roomNo, sender 등 다른 필요한 정보 추가
//            message: message,
//            // time: 현재 시간 설정 (서버에서 처리할 수도 있음)
//        };

        // WebSocket을 통해 서버에 메시지 전송
        stompClient.send("/pub/ws-stomp.sendMessage", {}, JSON.stringify({
			type: 'TALK',
			roomNo : roomNo,
			memberName : memberName,
			message : message,
			sender : memberNo
		}));
        // 입력 필드 초기화
        messageInput.value = '';
    }
}



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

 var btn = document.getElementById("invite-btn");
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




////


const targetInput = document.querySelector("#targetInput"); // 사용자 검색
const resultArea = document.querySelector("#resultArea"); // 검색 결과

// 친구 리스트 전역변수 선언
let allFriends = [];

// 시작할때 리스트를 가져오기
document.addEventListener("DOMContentLoaded",()=>{
	
	fetch("/allFriends")
		.then(resp=>resp.json())
		.then(list=>{
			allFriends=list;
			displayFriends(list);
			console.log(allFriends)
		})
		.catch(err => console.log(err));
	
});


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
		if(member.profileImage == null) img.setAttribute("src", "/images/user.png");
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
	// 입력된게 있을 때
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
            
            
            // 성공적으로 처리된 후의 로직
        })
        .catch((error) => {
            console.error('Error:', error);
            // 에러 처리 로직
        });
    }
});








