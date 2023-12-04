

// JavaScript
document.addEventListener("DOMContentLoaded", function() {
    fetch('/getAllPosts') // 서버에서 모든 게시물 데이터를 가져오는 엔드포인트로 가정
        .then(response => response.json())
        .then(posts => {
            const userBox = document.getElementById('user_boxT');

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('user_post');

                postElement.innerHTML = `
                    <div class="post">
                        <div class="post_head">
                            <div class="propile">
                                <img src="${post.memberProfile}">
                            </div>
                            <h1 id="user01">${post.username}</h1>
                        </div>
                        <div class="post_content" id="postContentInput">
                            <h1>${post.content}</h1>
                            ${post.imageUrls ? `<img src="${post.imageUrls}">` : ''}
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment_left">
                            <i class="fa-solid fa-heart" id="heart" data-item-id="${post.postNo}" data-liked="N"></i>
                        </div>
                        <div class="comment_right">
                            <a>하트수 : ${post.heartCount}</a>
                            <a>조회수 : </a>
                            <a>댓글수 : ${post.commentsCount}</a>
                            <button class="commentBtn" data-post-id="${post.postNo}">댓글달기</button>
                        </div>
                    </div>
                `;

                userBox.appendChild(postElement);
            });
           
           	
           
           

            // 게시물 내 댓글 달기 버튼 클릭 시 이벤트 처리
            userBox.addEventListener('click', function(event) {
                const clickedButton = event.target;

                // '댓글달기' 버튼인 경우
                if (clickedButton.classList.contains('commentBtn')) {
                    const postNo = clickedButton.getAttribute('data-post-id'); // 게시물의 고유 ID
                    console.log('Clicked on post No:', postNo);


                    // 여기서 모달창 열기 등 게시물에 대한 작업을 할 수 있습니다.
                    
                   } 
          
            });
        })
        
        
        .catch(error => console.error('Error fetching data:', error));
});




/** -------------------------------모달 관련------------------------- */
// JavaScript
	var modalXC = document.getElementById('commentModalXC');
	
	
	// 모달 열기 함수
	function openCommentModal(postNo) {
	    var commentForm = document.getElementById('commentFormXC'); // 댓글을 달기 위한 form element
	    var commentText = document.getElementById('commentTextXC'); // 댓글 텍스트를 입력하는 textarea element
	
	    // postId를 이용해 댓글 작성할 게시물 식별
	    console.log('Clicked on post No:', postNo);
	
	    // 댓글 모달 열기
	    modalXC.style.display = 'block';
	
	    // 여기서 추가적인 작업을 할 수 있습니다.
	    // 댓글을 작성하는 로직 등을 추가하세요.
	    // ex) commentForm.action = '/addComment/' + postId;
	    //     commentForm.submit(); // 예시로 댓글을 서버로 보내는 동작
	}
	
	// 모달 닫기 함수
	function closeCommentModal() {
	    modalXC.style.display = 'none';
	}
	
	// 게시물 내 댓글 달기 버튼 클릭 시 이벤트 처리
	document.getElementById('user_boxT').addEventListener('click', function(event) {
	    const clickedButton = event.target;
	
	    // '댓글달기' 버튼인 경우
	    if (clickedButton.classList.contains('commentBtn')) {
	        const postNo = clickedButton.getAttribute('data-post-id'); // 게시물의 고유 ID
	        console.log('Clicked on post ID:', postNo);
	
	        // 댓글 모달 열기 함수 호출
	        openCommentModal(postNo);
	    }
	});
	
	// 모달 닫기 버튼 이벤트 처리
	document.querySelector('.closeXC').addEventListener('click', function() {
	    closeCommentModal();
	});
	
	// 모달 외부 클릭 시 닫기
	window.addEventListener('click', function(event) {
	    var modalXC = document.getElementById('commentModalXC');
	    if (event.target == modalXC) {
	        closeCommentModal();
	    }
	});
	
	// HTML 요소 가져오기
	const commentInputBtn = document.getElementById('commentInputBtn');
	const commentInputSection = document.querySelector('.commentInputSection');
	
	// 댓글 입력 버튼에 클릭 이벤트 핸들러 추가
	commentInputBtn.addEventListener('click', function() {
	  // 현재 댓글 입력창의 display 속성 값 확인
	  const currentDisplay = window.getComputedStyle(commentInputSection).getPropertyValue('display');
	
	  // display 속성 값이 'none'이면 보이도록, 그렇지 않으면 숨기도록 토글
	  if (currentDisplay === 'none') {
	    commentInputSection.style.display = 'block'; // 또는 원하는 스타일로 변경하여 보이도록 설정
	  } else {
	    commentInputSection.style.display = 'none';
	  }
	});
	

	
	//---------------------------------------------------------------------
	
		document.addEventListener('click', function(event) {
	    const clickedElement = event.target;
	
	    if (clickedElement.matches('.fa-heart')) {
	        const postNo = clickedElement.getAttribute('data-item-id');
	        const isLiked = clickedElement.getAttribute('data-liked');
	
	        if (isLiked === 'N') {
	            clickedElement.style.color = '#ff0000'; // 빨간색으로 변경
	            clickedElement.setAttribute('data-liked', 'Y');
	        } else {
	            clickedElement.style.color = '#dbe8ff'; // 회색(옅은 색상)으로 변경
	            clickedElement.setAttribute('data-liked', 'N');
	        }
	
	        const memberNoValue = ''; // 사용자의 ID 등을 여기에 추가해주세요
	        fetch('/updateHeart', {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
	                postNo: postNo,
	                memberNo: memberNoValue,
	                isLiked: isLiked === 'Y' ? 'N' : 'Y' // 좋아요 상태 토글
	            })
	        })
	        .then(response => response.json())
	        .then(result => {
	            console.log(result);
	        })
	        .catch(error => {
	            console.error('Error:', error);
	        });
	    } else if (clickedElement.classList.contains('commentBtn')) {
	        const postNo = clickedElement.getAttribute('data-post-id');
	        fetchPostData(postNo);
	    }
	});
				
	
	
		function fetchPostData(postNo) {
	    fetch(`/getPostData?postNo=${postNo}`)
	        .then(response => {			
	            if (!response.ok) {
	                throw new Error('Network response was not ok');
	            }
	            return response.json();
	        })
	        .then(post => {

				
				console.log(post);
				
	            const postNo = post[0].postNo;
	            const username = post[0].username;
	            const content = post[0].content;
	            const commentsCount = post[0].commentsCount;
	            const heartCount = post[0].heartCount;
	            const postUploadDate = post[0].postUploadDate;
	            const memberProfile = post[0].memberProfile;
	            const imageUrls = post[0].imageUrls;
	            const videoUrls = post[0].videoUrls;
	            // 필요한 다른 변수들도 비슷하게 할당할 수 있습니다.
	
	            // 이후에 이 변수들을 모달이나 다른 곳에서 사용할 수 있습니다.
	            // 예시: console.log로 확인
	            console.log('Post No:', postNo);
	            console.log('Username:', username);
	            console.log('Content:', content);
	            console.log('commentsCount:', commentsCount);
	            console.log('heartCount:', heartCount);
	            console.log('postUploadDate:', postUploadDate);
	            console.log('memberProfile:', memberProfile);
	            console.log('imageUrls:', imageUrls);
	            console.log('videoUrls:', videoUrls);
	            
	            
	            const XprofileImage = modalXC.querySelector('.profile-image img');
			    const XuserId = modalXC.querySelector('.user-id');
			    const XpostText = modalXC.querySelector('.post-text');
			    const XheartCount = modalXC.querySelector('.heartCount');
			    const XcommentsCount = modalXC.querySelector('.commentsCount');
				const XimageUrls = modalXC.querySelector('.post-media img')      
	            
	            XprofileImage.src = memberProfile; // 프로필 이미지
			    XuserId.textContent = username; // 회원 아이디
			    XpostText.textContent = content; // 텍스트 내용
			    XheartCount.textContent = heartCount; // 하트 수
			    XcommentsCount.textContent = commentsCount;
			    XimageUrls.src = imageUrls;
			    
			    
			    const memberNo = session.loginMember.memberNo;
			    console.log('현재 로그인한 회원의 번호 : ', memberNo);
	            


	            
	        })
	        .catch(error => {
	            // 서버로부터 오류 응답을 받은 경우에 대한 처리를 추가할 수 있습니다.
	            console.error('Error fetching post data:', error);
	        });
	}

	//-----------------------------------------------------

	