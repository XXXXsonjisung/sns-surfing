

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
                            <a class="user-link" th:href="@{@{/getUserInfo(username=${post.username})}}" id="user01" data-username="${post.username}">
							    ${post.userNickname}
							</a>
							<button class="postBtn" data-post-id="${post.postNo}">수정</button>
							<span class="delete" data-post-id="${post.postNo}">&times;</span>
                        </div>
                        <div class="post_content" id="postContentInput">
                            <h1>${post.content}</h1>
                            ${post.imageUrls ? `<img src="${post.imageUrls}">` : ''}
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment_left">
                            <i class="fa-solid fa-heart" id="heart" data-item-id="${post.postNo}"></i>
                        </div>
                        <div class="comment_right">
                            <a>하트수 : ${post.heartCount}</a>
                            <a>댓글수 : ${post.commentsCount}</a>
                            <button class="commentBtn" data-post-id="${post.postNo}">댓글달기</button>
                        </div>
                    </div>
                `;

                userBox.appendChild(postElement);
            });

            
            
            
            document.querySelectorAll('.user-link').forEach(link => {
		    link.addEventListener('click', function(event) {
		        event.preventDefault(); // 기본 동작 방지 (페이지 새로고침 등)
		        
		        const username = this.getAttribute('data-username');
		        window.location.href = `/getUserInfo?username=${username}`;
		    });
		});
		
		
		// 동적으로 생성된 HTML에 적용하기
		// 예를 들어, postBtn과 delete 클래스를 가진 요소를 순회하며 조건에 따라 보이거나 숨기기
		var postBtns = document.querySelectorAll('.postBtn');
		var deleteSpans = document.querySelectorAll('.delete');
		const memberId = document.getElementById('S_memberId').value;
		
		postBtns.forEach(function(btn, index) {
		    // 여기서 post 변수를 다시 가져와야 합니다.
		    const post = posts[index]; // 루프의 인덱스에 해당하는 post 객체 가져오기
		
		    if (memberId === post.username) {
		        btn.style.display = 'block'; // 보이게 설정
		        deleteSpans[index].style.display = 'block'; // 보이게 설정
		    } else {
		        btn.style.display = 'none'; // 숨기기
		        deleteSpans[index].style.display = 'none'; // 숨기기
		    }
		    
		    
		    if (!memberId) {
				btn.style.display = 'none';
				deleteSpans[index].style.display = 'none';
			}
		    
		    
		    
		    
		    
		    
		});
		
		
		document.querySelectorAll('.delete').forEach(deleteButton => {
	    deleteButton.addEventListener('click', function() {
	        const postNo = this.getAttribute('data-post-id');
	        const postIdentifier = this.getAttribute('data-post-identifier');
	        
	        // 여기서 postNo와 postIdentifier를 사용하여 서버로 삭제 요청을 보냅니다.
	        // fetch 또는 XMLHttpRequest를 사용하여 DELETE 요청을 보낼 수 있습니다.
	        // 서버로 요청을 보내 삭제 작업을 수행하는 컨트롤러를 호출합니다.
	       fetch(`/deletePost/${postNo}`, {
		    method: 'DELETE',
		})
		.then(response => {
		    if (response.ok) {
		        alert('게시물이 삭제되었습니다.');
		    } else {
		        console.error('Failed to delete post');
		    }
		})
		.catch(error => {
		    console.error('Error deleting post:', error);
		});
	    });
	});
	
	
	

	
	
	
	      document.querySelectorAll('.postBtn').forEach(btn => {
		    btn.addEventListener('click', function(event) {
		        const postNo = this.getAttribute('data-post-id');
		        
		        // 서버로 해당 게시물 정보 요청
		        fetch(`/getPostQ?postNo=${postNo}`, {
		            method: 'POST',
		            headers: {
		                'Content-Type': 'application/json'
		            }
		        })
		        .then(response => {
		            if (!response.ok) {
		                throw new Error('Network response was not ok');
		            }
		            return response.json();
		        })
		        .then(postData => {
		            // 모달에 데이터 채우기 예시
		            const modalPostContent = document.getElementById('modalPostContentQQ');
		            modalPostContent.textContent = postData.content; // 게시글 내용 채우기
		            
		            // 이미지를 표시할 요소
		            const imageElement = document.createElement('img');
		            imageElement.src = postData.imageUrls; // 이미지 URL 설정
		            // 이미지를 추가할 모달 내 적절한 위치에 추가
		            modalPostContent.appendChild(imageElement);
		            
		            // 모달 창 보이게 하기
		            const modal = document.getElementById('myModalQQ');
		            modal.style.display = 'block';
		            
		            // 닫기 버튼에 postNo 속성 추가
		            const closeButton = document.querySelector('.close');
		            closeButton.setAttribute('data-post-id', postData.postNo);
		        })
		        .catch(error => {
		            console.error('Error:', error);
		        });
		    });
		});
		
		document.querySelectorAll('.close').forEach(closeBtn => {
	    closeBtn.addEventListener('click', function() {
	        const postNo = this.getAttribute('data-post-id'); // 어떤 게시물의 모달인지 확인
	        // postNo를 사용하여 어떤 게시물과 연관된 모달인지 확인하고 작업 수행
	
	        closeModal(); // 모달 닫기
	    });
	});


	
	document.getElementById('imageInputXXQQ').addEventListener('change', function(event) {
		    const file = event.target.files[0];
		    const reader = new FileReader();
		
		    reader.onload = function(e) {
		        const img = document.createElement('img');
		        img.src = e.target.result;
		        img.style.maxWidth = '300px'; // 이미지의 최대 너비 설정
		        img.style.maxHeight = '300px'; // 이미지의 최대 높이 설정
		
		        const modalPostContent = document.getElementById('modalPostContentQQ');
		        modalPostContent.appendChild(img);
		        modalPostContent.appendChild(document.createElement('br')); // 줄 바꿈 추가
		    }
		
		    reader.readAsDataURL(file);
		});
		
		document.getElementById('videoInputQQ').addEventListener('change', function(event) {
		    const file = event.target.files[0];
		    const reader = new FileReader();
		
		    reader.onload = function(e) {
		        const video = document.createElement('video');
		        video.src = e.target.result;
		        video.controls = true;
		        video.style.maxWidth = '300px'; // 동영상의 최대 너비 설정
		        video.style.maxHeight = '300px'; // 동영상의 최대 높이 설정
		
		        const modalPostContent = document.getElementById('modalPostContentQQ');
		        modalPostContent.appendChild(video);
		        modalPostContent.appendChild(document.createElement('br')); // 줄 바꿈 추가
		    }
		
		    reader.readAsDataURL(file);
		});
	
		
		function closeModal() {
		    const modal = document.getElementById('myModalQQ');
		    modal.style.display = 'none';
		}
   
            
            
	    const memberNo = document.getElementById('H_memberNo').value;
	    // 서버에 해당 회원의 게시물 목록을 요청하는 함수
		
		    const formData = new FormData();
		    formData.append('memberNo', memberNo);
		
		    fetch('/getMemberPosts', {
		        method: 'POST',
		        body: formData
		    })
		    .then(response => response.json())
		    .then(posts => {
				
				console.log(posts);
		        // 받아온 게시물 목록(posts)을 기반으로 하트를 변경하는 작업 수행
		        posts.forEach(post => {
		            const heartElement = document.querySelector(`[data-item-id="${post.postNo}"]`);
		            
		            if (heartElement) {
		                heartElement.style.color = '#ff0000'; // 빨간색으로 변경
		            }
		        });
		    })
		    .catch(error => {
		        console.error('Error:', error);
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
		currentPostNo = postNo;
		
	    var commentForm = document.getElementById('commentFormXC'); // 댓글을 달기 위한 form element
	    var commentText = document.getElementById('commentTextXC'); // 댓글 텍스트를 입력하는 textarea element
	
	    // postId를 이용해 댓글 작성할 게시물 식별
	    console.log('Clicked on post No:', postNo);
	
	    // 댓글 모달 열기
	    modalXC.style.display = 'block';
	    
	      fetch(`/getComments?postNo=${postNo}`)
		    .then(response => {
		        if (!response.ok) {
		            throw new Error('Network response was not ok');
		        }
		        return response.json();
		    })
		    .then(comments => {
		        const commentListContainer = modalXC.querySelector('.commentList');
		        
		        // comments 배열을 순회하면서 각 댓글을 HTML로 만들어서 commentListContainer에 추가
		        comments.forEach(comment => {
		            const newCommentElement = document.createElement('div');
		            newCommentElement.classList.add('commentItem');
		            
		            // 댓글 HTML 생성
		            newCommentElement.innerHTML = `
		                <div class="commentContentTT">
		                    <div class="commentProfileTT">
		                        <img src="${comment.memberProfile}" alt="Profile Image">
		                    </div>
		                    <div class="commentDetailsRR">
		                        <p id="comNick">${comment.memberNickname}</p>
		                        <p>${comment.postComment}</p>
		                    </div>
		                </div>
		            `;
		            
		            // 생성한 댓글 HTML을 commentListContainer에 추가
		            commentListContainer.appendChild(newCommentElement);
		        });
		    })
		    .catch(error => {
		        console.error('Error fetching comments:', error);
		    });
	    

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
		        

	        
	        console.log('this postNo : ', postNo);
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
	  const currentDisplay = window.getComputedStyle(commentInputSection).getPropertyValue('display');

		
	  // display 속성 값이 'none'이면 보이도록, 그렇지 않으면 숨기도록 토글
	  if (currentDisplay === 'none') {
	    commentInputSection.style.display = 'block'; // 또는 원하는 스타일로 변경하여 보이도록 설정
	  } else {
	    commentInputSection.style.display = 'none';
	  }
	  
	  
	const commentSubmitBtn = document.querySelector('.commentSubmitBtn'); // 댓글 입력 버튼 선택

	commentSubmitBtn.addEventListener('click', function() {
	  const currentDisplay = window.getComputedStyle(commentInputSection).getPropertyValue('display');
	  const memberNo = document.getElementById('H_memberNo').value;
	  const postNo = currentPostNo;
	  const commentInput = document.querySelector('.commentInput'); 
	  const postComment = commentInput.value; // 입력된 댓글 값 가져오기
	  const memberProfile = document.getElementById('P_profileImage').value;
	  const memberNickname = document.getElementById('P_memberNickname').value;
	
	  console.log(memberNo);
	  console.log(postNo);
	  console.log('Member Profile:', memberProfile);
	  console.log('commentInput :', postComment);

	
	  // display 속성 값이 'none'이면 보이도록, 그렇지 않으면 숨기도록 토글
	  if (currentDisplay === 'none') {
	    commentInputSection.style.display = 'block';
	  } else {
	    commentInputSection.style.display = 'none';
	  }
	    
		      // 폼 데이터 구성
	  const formData = new FormData();
	  formData.append('memberNo', memberNo);
	  formData.append('postNo', postNo);
	  formData.append('comment', postComment);
	  formData.append('memberProfile', memberProfile);
	  formData.append('memberNickname', memberNickname);
	  
	  
	
	  fetch('/addComment', {
	    method: 'POST',
	    body: formData
	  })
	  .then(response => response.json())
	  .then(postCom => {
	    // 새로운 댓글 HTML 생성
	    const newCommentElement = document.createElement('div');
	    newCommentElement.classList.add('commentItem');
	    newCommentElement.innerHTML = `
	      <div class="commentContentTT">
	        <div class="commentProfileTT">
	          <img src="${postCom.memberProfile}" alt="Profile Image">
	        </div>
	        <div class="commentDetailsRR">
	          <p id="comNick">${postCom.memberNickname}</p>
	          <p>${postCom.postComment}</p>
	        </div>
	      </div>
	    `;
	
	    // 새로운 댓글을 모달의 댓글 목록에 추가
	    const commentListContainer = modalXC.querySelector('.commentList');
	    commentListContainer.appendChild(newCommentElement);
	  })
	  .catch(error => {
	    console.error('Error adding comment:', error);
	  });
	  
	  commentInput.value = '';
	  
	});

	});
	


	
	//---------------------------------------------------------------------
	
	document.addEventListener('click', function(event) {
	    const clickedElement = event.target;
	
	    if (clickedElement.matches('.fa-heart')) {
	        const postNo = clickedElement.getAttribute('data-item-id');
	        const memberNoValue = document.getElementById('H_memberNo').value;
	        
	        // 현재 하트의 색깔을 읽어옴
       		const isLiked = window.getComputedStyle(clickedElement).getPropertyValue('color');
	        
	        // 서버에 데이터 전송
	        const formData = new FormData();
	        formData.append('memberNo', memberNoValue);
	        formData.append('postNo', postNo);
	        
	        
	         if (isLiked === 'rgb(254, 180, 180)') {
            clickedElement.style.color = 'rgb(255, 0, 0)'; // 빨간색으로 변경
		        
		        fetch('/updateHeart', {
		            method: 'POST',
		            body: formData
		        })
		        .then(response => response.json())
		        .then(result => {
		            console.log(result); // 성공적으로 전송되었을 때의 작업
		        })
		        .catch(error => {
		            console.error('Error:', error); // 에러 발생 시의 작업
		        });
		        
	        } else {
			clickedElement.style.color = 'rgb(254, 180, 180)';
			
			
				fetch('/deleteHeart', {
		            method: 'POST',
		            body: formData
		        })
		        .then(response => response.json())
		        .then(result => {
		            console.log(result); // 성공적으로 전송되었을 때의 작업

		        })
		        .catch(error => {
		            console.error('Error:', error); // 에러 발생 시의 작업
		        });

			}
  

	    }else if (clickedElement.classList.contains('commentBtn')) {
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
				const XimageUrls = modalXC.querySelector('.post-media img');      
	            
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











	