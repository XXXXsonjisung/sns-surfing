


const socket = new SockJS('/ws-stomp'); // 웹 소켓 연결을 위한 SockJS 객체 생성
const stompClient = Stomp.over(socket); // SockJS를 이용해 Stomp 클라이언트 생성

const chatroomList = document.getElementById("room-list");
const messageArea = document.getElementById('messageArea'); // 채팅 메시지를 표시할 영역


// 서버에 연결
stompClient.connect({}, frame=> {

/*    // 서버로부터 메시지 수신 대기
    stompClient.subscribe('/topic/roomNo', function(message) {
        // 메시지 처리
        displayChat(message.body);
    });*/
    
});




// 채팅방 리스트 눌렀을때 메세지 나오는 함수
chatroomList.addEventListener('click', function(event) {
  // 클릭된 요소 또는 그 부모 요소 중 LI 요소 찾기
  let li = event.target.closest('li');
  
  // LI 요소가 클릭되었는지 확인
  if (li) {
    // 선택한 채팅방의 데이터 속성 값 가져오기
    const roomNo = li.getAttribute('room-no');
    
    fetch('/getOldMessage?roomNo=' + roomNo)
      .then(response => response.text())
      .then(messages => {
        // 채팅 내역을 받아와서 화면에 표시하기
        console.log(messages);
        displayChat(messages);
      })
      .catch(error => {
        console.error('에러 :', error);
      });
    
    console.log('방번호 :', roomNo);
  }
});


// 메시지를 화면에 표시하는 함수
function displayChat(messages) {
    // messageArea 초기화
    messageArea.innerHTML = '';

    // messages를 JSON 객체로 변환
    const parsedMessages = JSON.parse(messages);

    // 각 메시지를 순회하면서 화면에 추가
    parsedMessages.forEach(message => {
        const messageElement = document.createElement('li');
        messageElement.className = 'target-chat';

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
    });
}


// 메시지 전송 함수
function sendMessage() {
    const messageInput = document.querySelector('form input[type="text"]');
    const message = messageInput.value;

    // 입력된 메시지가 비어있지 않은 경우에만 전송
    if (message.trim() !== '') {
        // 메시지 객체 생성 (서버에서 요구하는 형식에 맞춰 수정 필요)
        const chatMessage = {
            type: 'TALK', // 예시로 'TALK' 설정, 실제 사용에 맞게 조정 필요
            // roomNo, sender 등 다른 필요한 정보 추가
            message: message,
            // time: 현재 시간 설정 (서버에서 처리할 수도 있음)
        };

        // WebSocket을 통해 서버에 메시지 전송
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));

        // 입력 필드 초기화
        messageInput.value = '';
    }
}

// 전송 버튼 이벤트 리스너
document.getElementById('submit').addEventListener('click', sendMessage);

// 폼에서 엔터 키 누르면 메시지 전송 (선택 사항)
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendMessage();
});



