const socket = new SockJS('/ws-stomp'); // 웹 소켓 연결을 위한 SockJS 객체 생성
const stompClient = Stomp.over(socket); // SockJS를 이용해 Stomp 클라이언트 생성


const chatPrivateList = document.getElementById("private-list");




chatPrivateList.addEventListener('click', function(event) {
  // 클릭된 요소 또는 그 부모 요소 중 LI 요소 찾기
  let li = event.target.closest('li');

  // LI 요소가 클릭되었는지 확인
  if (li) {
    // 선택한 채팅방의 데이터 속성 값 가져오기
    roomNo = li.getAttribute('private-no');

  	clearChatArea();
    // 기존 메시지 불러와 화면에 표시
    fetchAndDisplayOldMessages(roomNo);
    
    displayFriend();
    
    console.log('방번호:', roomNo);
  }
});
