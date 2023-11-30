

// 모달 닫는 함수
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


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
                            <i class="fa-solid fa-heart" id="heart"></i>
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
                    const postId = clickedButton.getAttribute('data-post-id'); // 게시물의 고유 ID
                    console.log('Clicked on post ID:', postId);

                    // 여기서 모달창 열기 등 게시물에 대한 작업을 할 수 있습니다.
                    
                    
                    
                    
                    
                    // 모달 열기 함수
					function openCommentModal(postId) {
					    var modalXC = document.getElementById('commentModalXC');
					    var commentForm = document.getElementById('commentFormXC'); // 댓글을 달기 위한 form element
					    var commentText = document.getElementById('commentTextXC'); // 댓글 텍스트를 입력하는 textarea element
					
					    // postId를 이용해 댓글 작성할 게시물 식별
					    console.log('Clicked on post ID:', postId);
					
					    // 댓글 모달 열기
					    modalXC.style.display = 'block';
					
					    // 여기서 추가적인 작업을 할 수 있습니다.
					    // 댓글을 작성하는 로직 등을 추가하세요.
					    // ex) commentForm.action = '/addComment/' + postId;
					    //     commentForm.submit(); // 예시로 댓글을 서버로 보내는 동작
					}
					
					// 모달 닫기 함수
					function closeCommentModal() {
					    var modalXC = document.getElementById('commentModalXC');
					    modalXC.style.display = 'none';
					}
					
					// 댓글달기 버튼 클릭 시 모달 열기
					var commentBtnsXC = document.querySelectorAll('.commentBtn');
					commentBtnsXC.forEach(function(commentBtn) {
					    commentBtn.addEventListener('click', function() {
					        var postId = this.getAttribute('data-post-id');
					        openCommentModal(postId);
					    });
					});
					
					// 모달 닫기 버튼
					var closeModalXC = document.querySelector('.closeXC');
					closeModalXC.addEventListener('click', function() {
					    closeCommentModal();
					});
					
					// 모달 외부 클릭 시 닫기
					window.addEventListener('click', function(event) {
					    var modalXC = document.getElementById('commentModalXC');
					    if (event.target == modalXC) {
					        closeCommentModal();
					    }
					});
					
				
                   } 
          
            });
        })
        
        
        .catch(error => console.error('Error fetching data:', error));
});



/** -------------------------------모달 관련------------------------- */
// JavaScript
	
