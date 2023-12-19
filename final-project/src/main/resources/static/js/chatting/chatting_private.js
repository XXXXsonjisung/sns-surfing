const socket = new SockJS('/ws-stomp'); // 웹 소켓 연결을 위한 SockJS 객체 생성
const stompClient = Stomp.over(socket); // SockJS를 이용해 Stomp 클라이언트 생성


/*const chatPrivateList = document.getElementById("private-list");

let roomNo = null;



/// 기존 메세지 추가
function displayChat(messages){
	
	messages.forEach(message=>appendMessage(message));
}



// 메세지 추가 
function appendMessage(message) {
	
	
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
		
		
	        
	        
		}else{
			  // 메시지 내용을 구성
        messageElement.innerHTML = `
            <img id="pro" src="/images/${message.sender}.jpg">
            <div>
                <b>${message.memberName}</b><br>
                <p class="chat">${message.message}</p>
                <span class="chatDate">${message.time}</span>
            </div>
        `;	
			
		}

   
		
        // messageArea에 메시지 요소 추가
        messageArea.appendChild(messageElement);
    
    // 새 메시지가 추가될 때 스크롤을 최하단으로 이동
    messageArea.scrollTop = messageArea.scrollHeight;
}











function clearChatArea() {
  messageArea.innerHTML = ''; // 이전 채팅 내용을 지움
}

*/