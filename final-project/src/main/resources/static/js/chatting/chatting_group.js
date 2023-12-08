


const socket = new SockJS('/ws-stomp'); // 웹 소켓 연결을 위한 SockJS 객체 생성
const stompClient = Stomp.over(socket); // SockJS를 이용해 Stomp 클라이언트 생성

const chatroomList = document.getElementById("room-list");
const messageArea = document.getElementById('messageArea'); // 채팅 메시지를 표시할 영역


// 채팅방 리스트 눌렀을때 메세지 나오는 함수
chatroomList.addEventListener('click', function(event) {
  // 클릭된 요소가 li 요소인지 확인
  if (event.target.tagName === 'LI') {
    // 선택한 채팅방의 데이터 속성 값 가져오기
    const roomNo = event.target.getAttribute('room-no');
    
    
 	 fetch('/getOldMessage?roomNo=' + roomNo)
     .then(response => response.text())
	 .then( messages => {
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

// 채팅방 메세지 보여주는 함수
function displayChat(messages){
	
  	messageArea.innerHTML = messages; // 이전 채팅 내용을 표시

	
}