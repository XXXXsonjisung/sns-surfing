const checkbox = document.getElementById('public');
const label = document.querySelector('.custom-checkbox');

label.addEventListener('click', function() {
  if (checkbox.checked) {
    checkbox.checked = false;
    label.classList.remove('checked');
  } else {
    checkbox.checked = true;
    label.classList.add('checked');
  }
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