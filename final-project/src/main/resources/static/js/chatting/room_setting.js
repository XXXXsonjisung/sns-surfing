// 공개 비공개 
const checkboxes = document.querySelectorAll('.public');
const labeles = document.querySelectorAll('.custom-checkbox');

// 비공개 체크시 비밀번호 입력창 뜸
const roomPw = document.getElementById("roomPw");

labeles.forEach((label,index)=>{

  label.addEventListener('click',()=>{

    const checkbox = checkboxes[index];

    if(!checkbox.checked){

      checkboxes.forEach((cb,i)=>{

          cb.checked=false;
          labeles[i].classList.remove('checked');

      });

      checkbox.checked = true;
      label.classList.add('checked');

    }


      if(checkboxes[1].checked){

        roomPw.style.display="block";

      }

      if(checkboxes[0].checked){

        roomPw.style.display="none";
      }


  });


});






// 태그 리스트 모달창

 var btn = document.getElementById("tag-btn");
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

/////////////////////////////////////////////////////

//리스트 비동기 처리 
// document.getElementById("region-li").addEventListener('click', ()=>{

//       fetch('/RoomMaking/region')
  

// });


function showListItem(index) {
  const listItems = document.querySelectorAll('.list-item');
  
  // 모든 list-item 요소 숨기기
  listItems.forEach(item => {
      item.style.display = 'none';
  });
  
  if (index === 5) {
    listItems.forEach(item => {
      item.style.display = 'block';
    });
  } else {
    // 특정 인덱스의 list-item 요소만 보이게 하기
    listItems[index].style.display = 'block';
  }

  
}




// 태그 선택시 input창에 쌓이게 하기 

const tagsInput = document.getElementById("tagsInput");
const listItems = document.querySelectorAll(".detail-tiem");
const otherInputs = document.querySelectorAll('.other-inputs'); // 다른 input 요소 선택

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

    
    otherInputs.forEach(input => {
      input.value = tagsInput.value;
      input.style.width = (tagsInput.value.length * 10) + 'px'; // 예시로 글자 하나당 10px씩 너비 지정
    });


  });
});



document.addEventListener('DOMContentLoaded', function() {
    const displayTagsInput = document.getElementById('displayTagsInput');

    // tagsInput의 값을 displayTagsInput에 복사
    displayTagsInput.value = tagsInput.value;

});





// 태그 지우기 
const cleanTagsButtons = document.querySelectorAll(".cleanTag");

cleanTagsButtons.forEach(button => {
  button.addEventListener("click", () => {
    tagsInput.value = null;
    otherInputs.forEach(input => {
      input.value = null;
    });
  });
});


/// 태그 



//프로필 이미지 프리뷰

function image(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('preview').src = "";
  }
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////


 let selectedMembers = [];
 let roomNo = getRoomNoFromURL();

 	 

// 방번호 냠냠
function getRoomNoFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('roomNo');
}

// 페이지 로드 시 roomNo 값을 숨겨진 필드에 설정
window.onload = function() {
    let roomNo = getRoomNoFromURL();
    document.getElementById('roomNoInput').value = roomNo;
};



//체크한 회원 찾기 
function selectedMember(){
	
		selectedMembers = [];
  	 // 체크박스를 순회하면서 선택된 항목들의 memberNo를 수집합니다.
	 document.querySelectorAll('#np-ul .memberCheckbox:checked').forEach(function(checkbox) {
     
        let memberNo = checkbox.closest('.np-list').getAttribute('data-member-no');
        selectedMembers.push(memberNo);
    });
	  // selectedMembers 배열에 있는 멤버 번호를 사용하여 처리합니다.
    console.log("강퇴를 위한 회원 번호:", selectedMembers);
		
}




// 강퇴 

function kickMembers(){
	
     selectedMember()
	
	if(selectedMembers==[]){
		alert("회원을 선택해주세요")
	}else{
		fetch('/RoomMaking/kickMembers',{
			method:'POST',
			headers:{
				'Content-Type': 'application/json',
			},
			 body: JSON.stringify({ 
				  roomNo: roomNo,
       			  selectedMembers: selectedMembers
				})	
			
		})
			.then(resp=>resp.json())
			.then(result=>{
				  console.log('성공 :', result);	
				  if(result>0){
					  alert("강퇴 성공");
					  removeKickMembers(selectedMembers)
					  
				  }	
				  			
			})
			.catch(err => console.log(err));
		
		
	}
	
	
}


// 강퇴 회원 지우기
function  removeKickMembers(selectedMembers){
		
		selectedMembers.forEach(memberNo => {
	    // 여기서 memberNo는 selectedMembers 배열의 현재 원소를 나타냄
	   	 const memberElement = document.querySelector(`li[data-member-no="${memberNo}"]`);
		    if (memberElement) {
		        memberElement.remove(); // 해당 회원 요소 제거
		    }
		});
	
}

// 방장 넘기기
function authorizeManger(){
		
		   selectedMember()
		   
		  if(selectedMembers.length==0){
			  alert("회원을 선택해주세요");
		  }else if(selectedMembers.length!=1){
			  alert("한명의 회원만 선택해주세요");
		  }else{
			  fetch('/RoomMaking/authorizeManger',{
				  method:'POST',
				  headers:{
				  	'Content-Type': 'application/json',
				  },
				  body:JSON.stringify({
					  roomNo:roomNo,
					  selectedMembers:selectedMembers
					  
				  })
			  	  
			  	})
			  	 .then(resp=>resp.json())
				 .then(result=>{
					  console.log('성공 :', result);	
					  if(result>0){
						  alert("방장을 넘기셨습니다. 채팅페이지로 이동합니다.");
						   window.location.href = '/chatting/chattinGroup';							  
					  }	
					  			
				})
				.catch(err => console.log(err));
			  
		  }
		  
		  
	
	
}













