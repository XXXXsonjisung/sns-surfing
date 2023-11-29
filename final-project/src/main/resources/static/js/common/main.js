

// 모달 닫는 함수
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function() {
    fetch('/getAllPosts') // 서버에서 모든 게시물 데이터를 가져오는 엔드포인트로 가정
        .then(response => response.json())
        .then(posts => {
            const userBox = document.getElementById('user_boxT');

            posts.forEach(posts => {
                const postElement = document.createElement('div');
                postElement.classList.add('user_post');
                
                
                console.log(posts);
                

                postElement.innerHTML = `
                    <div class="post">
                        <div class="post_head">
                            <div class="propile">
                                <img src="${posts.memberProfile}">
                            </div>
                            <h1 id="user01">${posts.username}</h1>
                        </div>
                        <div class="post_content" id="postContentInput">
                            <h1>
                            	${posts.content}
                            	${posts.imageUrls}
                            	<img src="${posts.imageUrls}">
                            </h1>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment_left">
                            <i class="fa-solid fa-heart" id="heart"></i>
                        </div>
                        <div class="comment_right">
                            <a>하트수 : ${posts.heartCount}</a>
                            <a>조회수 : </a>
                            <a>댓글수 : ${posts.commentsCount}</a>
                            <button class="commentBtn">댓글달기</button>
                        </div>
                    </div>
                `;

                userBox.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});






