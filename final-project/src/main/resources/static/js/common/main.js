

// 모달 닫는 함수
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


function createPost() {
    // 게시글을 감싸는 div 생성
    var newPost = document.createElement('div');
    newPost.className = 'user_post';

    // 게시글 내용
    var postContent = `
        <div class="post">
            <div class="post_head">
                <div class="propile">
                    <img th:src="@{/common/images/555.jpg}">
                </div>
                <h1 id="user01" th:text="${session.loginMember.memberId}">user01</h1>
            </div>
            <div class="post_content"></div>
        </div>
        <div class="comment">
            <div class="comment_left">
                <i class="fa-solid fa-heart" id="heart" ></i>
            </div>
            <div class="comment_right">
                <a>하트수</a>
                <a>조회수</a>
                <a>댓글수</a>
                <button class="commentBtn">댓글달기</button>
            </div>
        </div>`;

    // 생성한 HTML을 user_box에 추가
    var userBox = document.querySelector('.user_box');
    newPost.innerHTML = postContent;
    userBox.appendChild(newPost);
}