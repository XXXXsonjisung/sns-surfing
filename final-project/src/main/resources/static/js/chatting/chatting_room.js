const socket = new SockJS('/chat');
		const stompClient = Stomp.over(socket);
		let sessionId = getOrCreateSessionId(); // 세션 ID를 가져오거나 생성하는 함수
		const messageArea = document.getElementById('messageArea'); // 채팅 메시지를 표시할 영역

		stompClient.connect({ sessionId: sessionId }, frame => {
		    stompClient.subscribe('/topic/oldMessages', messages => {
		        displayMessages(JSON.parse(messages.body)); // 기존 메시지를 받아서 표시
		    });
		
		    stompClient.subscribe('/topic/publicChatRoom', message => {
		        const receivedMessage = JSON.parse(message.body);
		        showMessage(receivedMessage);
		    });
		
		    // 채팅방에 들어갈 때 기존 채팅을 요청
		    stompClient.send("/app/chat.getOldMessages", {}, '');
		
		    
		    // 채팅방 참여자 표시
		    stompClient.subscribe('/topic/connectedUsers', (message) => {
                document.getElementById('connectedUsers').innerText = `현재인원 : ${message.body}`;
            });
		    
		    
		    
		    // 사용자 입장 및 퇴장 메시지를 받아 처리
			stompClient.subscribe('/topic/userJoin', message => {
			    appendSystemMessage(message.body);
			    	    console.log("입장");
			});
		
			
			stompClient.subscribe('/topic/userLeave', message => {
			    appendSystemMessage(message.body);
			    	    console.log("퇴장");
			});
					    
		    
		    
		     // 연결되었을 때 서버로부터 최초 사용자 수 요청
        	stompClient.send("/app/getConnectedUsers", {});
		    
		    
		    
		});
		
// 사용자가 입장했을 때 UI 업데이트
function showUserJoin(username) {
    const userJoinMessage = `익명 ${username}가 입장 `;
    appendSystemMessage(userJoinMessage);
}

// 사용자가 퇴장했을 때 UI 업데이트
function showUserLeave(username) {
    const userLeaveMessage = `익명 ${username}가 퇴장`;
    appendSystemMessage(userLeaveMessage);
}

// 기존 메세지 추가
function displayMessages(messages) {
    messages.forEach(message => appendMessage(message));
}

// 메세지 보내기
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message !== '') {
		
		 const now = new Date();
   		 now.setHours(now.getHours() + 9); // 현재 시간에 9시간을 더함
		
		
        stompClient.send("/app/chat.sendMessage", { sessionId: sessionId }, JSON.stringify({
            content: message,
            sender: sessionId,
            sentAt: now.toISOString()
        }));
        messageInput.value = '';
    }
}
// ㅁ
function showMessage(message) {
    appendMessage(message);
}

// 메세지 화면에 추가
function appendMessage(message) {
    const li = document.createElement('li');
    const formattedTime = new Date(message.sentAt).toLocaleTimeString(); // 시간 형식 변환
  	if (message.sender === sessionId) { // 클라이언트의 메시지인 경우 오른쪽으로 추가
        li.style.textAlign = 'right';
        li.style.backgroundColor = '#cce6ff';
    }
  
  
    li.appendChild(document.createTextNode(`${message.sender} (${formattedTime}) : ${message.content} `)); // 메시지 및 시간 표시
    messageArea.appendChild(li);
    
    // 새 메시지가 추가될 때 스크롤을 최하단으로 이동
    messageArea.scrollTop = messageArea.scrollHeight;
}

function getOrCreateSessionId() {
    let sessionId = getCookie('sessionId'); // 쿠키에서 세션 ID 가져오기
    if (!sessionId) {
        sessionId = generateSessionId(); // 세션 ID가 없으면 생성
        setCookie('sessionId', sessionId, 365); // 생성한 세션 ID를 쿠키에 저장 (365일 동안 유효)
    }
    return sessionId;
}

// 쿠키에서 세션 ID를 가져오는 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// 쿠키에 세션 ID를 설정하는 함수
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function generateSessionId() {
    return '익명' + Math.random().toString(36).substring(2, 10);
}

       
       

function appendSystemMessage(message) {
    const li = document.createElement('li');
    li.style.color = 'gray'; // 시스템 메시지는 회색으로 표시
    li.appendChild(document.createTextNode(message)); // 메시지 표시
    messageArea.appendChild(li);
    messageArea.scrollTop = messageArea.scrollHeight; // 새 메시지가 추가될 때 스크롤을 최하단으로 이동
}     
       
       
       
       
const messageInput = document.getElementById("message"); 
       
messageInput.addEventListener("keyup", e => {
	if(e.key == "Enter"){ 
		if (!e.shiftKey) {
			sendMessage();
		}
	}
})
