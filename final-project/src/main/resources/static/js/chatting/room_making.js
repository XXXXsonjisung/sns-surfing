

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
  
  // 특정 인덱스의 list-item 요소만 보이게 하기
  listItems[index].style.display = 'block';
}




// 태그 선택시 input창에 쌓이게 하기 

const tagsInput = document.getElementById("tagsInput");
const listItems = document.querySelectorAll(".list-item");

listItems.forEach(item=>{

  item.tagCount =0;

  item.addEventListener('click',()=>{


    const tag = item.textContent;
    const currentTags = tagsInput.value;
    const tagCount = item.tagCopublicunt;
    

      //태그 개수 제한 
      if(tagCount ===5){

          alert("5개만 선택 가능합니다.");
          return;
      }   
      // 태그 추가
      if (currentTags === '') {
          tagsInput.value = '#'+tag
      } else {
          tagsInput.value = `${currentTags}, ${'#'+tag}`;
      }

      tagCount++;

  

    });



});




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