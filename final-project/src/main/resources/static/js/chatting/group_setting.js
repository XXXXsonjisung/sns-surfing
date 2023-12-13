
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




