


const socket = new SockJS('/ws-stomp'); // 웹 소켓 연결을 위한 SockJS 객체 생성
const stompClient = Stomp.over(socket); // SockJS를 이용해 Stomp 클라이언트 생성

const chatroomList = document.getElementById("room-list");
const messageArea = document.getElementById('messageArea'); // 채팅 메시지를 표시할 영역

const memberNo = document.getElementById('memberNoDiv').getAttribute('data-member-no');
const memberName = document.getElementById('memberNoDivv').getAttribute('data-member-name');

let currentRoomNo = '';

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

//	
//		if(message.sender==memberNo){
//			li.style.textAlign = 'right';
//	        li.style.backgroundColor = '#cce6ff';
//		}

     // 메시지 내용을 구성
        messageElement.innerHTML = `
            <img id="pro" src="images/${message.sender}.jpg">
            <div>
                <b>${message.sender}</b><br>
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




// 메시지를 화면에 표시하는 함수
//function displayChat(messages) {
//    // messageArea 초기화
//    messageArea.innerHTML = '';
//
//    // messages를 JSON 객체로 변환
//    //const parsedMessages = JSON.parse(messages);
//
//    // 각 메시지를 순회하면서 화면에 추가
//    messages.forEach(message => {
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
//}


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
			sender : memberName,
			message : message
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


