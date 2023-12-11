var uploadBtn = document.querySelector('.Writing'); // 변경된 버튼 아이디에 맞게 수정
uploadBtn.addEventListener('click', function() {
    var modal = document.getElementById('myModalMM'); // 변경된 모달 아이디에 맞게 수정
    modal.style.display = "block";
});

//----------------------------------------------------

// 닫기 버튼 요소를 찾습니다.
var closeBtn = document.querySelector('.closeMM'); // 변경된 클래스에 맞게 수정

// 닫기 버튼에 클릭 이벤트를 추가합니다.
closeBtn.addEventListener('click', function() {
    var modal = document.getElementById('myModalMM');
    modal.style.display = "none"; // 모달을 숨깁니다.
});

/* ------------------------------------------*/

document.getElementById('imageInputXXMM').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '300px'; // 이미지의 최대 너비 설정
        img.style.maxHeight = '300px'; // 이미지의 최대 높이 설정

        const modalPostContent = document.getElementById('modalPostContentMM');
        modalPostContent.appendChild(img);
        modalPostContent.appendChild(document.createElement('br')); // 줄 바꿈 추가
    }

    reader.readAsDataURL(file);
});

document.getElementById('videoInputMM').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const video = document.createElement('video');
        video.src = e.target.result;
        video.controls = true;
        video.style.maxWidth = '300px'; // 동영상의 최대 너비 설정
        video.style.maxHeight = '300px'; // 동영상의 최대 높이 설정

        const modalPostContent = document.getElementById('modalPostContentMM');
        modalPostContent.appendChild(video);
        modalPostContent.appendChild(document.createElement('br')); // 줄 바꿈 추가
    }

    reader.readAsDataURL(file);
});

document.getElementById('imageInputXXMM').addEventListener('change', function(event) {
	    const file = event.target.files[0];
	    const reader = new FileReader();
	    const memberNickname = document.getElementById('P_memberNickname').value;
	
	    reader.onload = function(e) {
	        const img = document.createElement('img');
	        img.src = e.target.result;
	        img.style.maxWidth = '300px'; // 이미지의 최대 너비 설정
	        img.style.maxHeight = '300px'; // 이미지의 최대 높이 설정
	
	        const postContent = document.createElement('div');
	        postContent.classList.add('post');
	        
	        const postHead = document.createElement('div');
	        postHead.classList.add('post_head');
	
	        const profile = document.createElement('div');
	        profile.classList.add('profile');
	
	        const profileImg = document.createElement('img');
	        profileImg.src = "@{/images/post/555.jpg}"; // 사용자 이미지 경로
	
	        profile.appendChild(profileImg);
	
	        const username = document.createElement('h1');
	        username.textContent = memberNickname; // 사용자 이름
	
	        postHead.appendChild(profile);
	        postHead.appendChild(username);
	
	        const postContentDiv = document.createElement('div');
	        postContentDiv.classList.add('post_content');
	        postContentDiv.appendChild(img);
	
	        postContent.appendChild(postHead);
	        postContent.appendChild(postContentDiv);
	
	        const userPost = document.createElement('div');
	        userPost.classList.add('user_post');
	        userPost.appendChild(postContent);
	
	    }
	
	    reader.readAsDataURL(file);
	});








// 헤더의 모달 내 게시 버튼을 눌렀을 때 실행되는 함수
function createPostMM() {
    fetch('/userinfo')
        .then(response => response.json())
        .then(data => {
            const username = data.memberId;
            const profileImageUrl = data.profileImage;

            const modalText = document.getElementById('modalPostContentMM').innerText;
            const imageFile = document.getElementById('imageInputXXMM').files[0];
            const videoFile = document.getElementById('videoInputMM').files[0];

            var userBox = document.querySelector('.user_boxMM');
            var firstPost = document.querySelector('.user_boxMM .user_post:first-child');
            var newUserPost = firstPost.cloneNode(true);
            var postContent = newUserPost.querySelector('.post_contentMM');
            postContent.textContent = '';

            userBox.prepend(newUserPost);

            var postContentDiv = document.querySelector('.post_contentMM');
            var textDiv = document.createElement('div');
            textDiv.textContent = modalText;
            postContentDiv.appendChild(textDiv);

            var profileImageElement = document.querySelector('.propile_bottom img');
            profileImageElement.src = profileImageUrl;

            const usernameElement = document.getElementById('user01MM');
            usernameElement.textContent = username;

            if (imageFile) {
                var imageElement = document.createElement('img');
                imageElement.src = URL.createObjectURL(imageFile);
                imageElement.onload = function () {
                    postContentDiv.appendChild(imageElement);
                    var modal = document.getElementById('myModalMM');
                    modal.style.display = 'none';
                };
                imageElement.onerror = function () {
                    console.error('모달 이미지 로드 에러');
                    var modal = document.getElementById('myModalMM');
                    modal.style.display = 'none';
                };
            } else {
                console.error('모달 이미지 파일이 없음');
                var modal = document.getElementById('myModalMM');
                modal.style.display = 'none';
            }

            const formData = new FormData();
            formData.append('username', username);
            formData.append('memberProfile', profileImageUrl);
            formData.append('content', modalText);

            if (imageFile) {
                console.log("imageFile::", imageFile);
                formData.append('imageUrls', imageFile);
            }

            if (videoFile) {
                formData.append('videoUrls', videoFile);
            }

            fetch('/savePost', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        alert('게시물을 저장하는 데 문제가 발생했습니다.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('게시물이 성공적으로 저장되었습니다:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => console.error('Error:', error));
}


/*---------------------------------------------------------------------*/

// Follow 버튼 클릭 시
document.querySelector('.w-btn-blue').addEventListener('click', function() {
    const p_memberId = document.querySelector('#M_memberId').value;
    const h_memberId = document.querySelector('#H_memberId').value;
    const memberNickname = document.querySelector('#M_memberNickname').value;

    alert(`${memberNickname}님을 팔로우 시작합니다.`);
    
    
    

	console.log(h_memberId);
	console.log(p_memberId);
    
    fetch(`/saveFollow?p_memberId=${p_memberId}&h_memberId=${h_memberId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        this.style.visibility = 'hidden';
        this.disabled = true;
    })
    .catch(error => {
        // 오류 처리
        console.error('Error:', error);
    });
});



// UnFollow 버튼 클릭 시
document.querySelector('.w-btn-pink').addEventListener('click', function() {
    const p_memberId = document.querySelector('#M_memberId').value; // p_memberId 가져오기
    const h_memberId = document.querySelector('#H_memberId').value; // h_memberId 가져오기
 	const memberNickname = document.querySelector('#M_memberNickname').value;

    alert(`${memberNickname}님의 팔로우를 취소하였습니다.`);


    // 서버로 데이터를 보내는 Ajax 요청
    fetch(`/unfollow?p_memberId=${p_memberId}&h_memberId=${h_memberId}`, {
        method: 'DELETE' // DELETE 메소드로 요청을 보냄
    })
    .then(response => {
        const followButton = document.querySelector('.w-btn-blue');
        followButton.style.visibility = 'visible'; // 숨겨진 버튼을 다시 보이게 함
        followButton.disabled = false; // 버튼을 활성화
    })
    .catch(error => {
        // 오류 처리
        console.error('Error:', error);
    });
});

/*---------렌더링 시 팔로우 버튼 효과------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const p_memberId = document.querySelector('#M_memberId').value; // p_memberId 가져오기
    const h_memberId = document.querySelector('#H_memberId').value; // h_memberId 가져오기
    const followButton = document.querySelector('.w-btn-blue'); // 팔로우 버튼 가져오기

    fetch(`/checkFollow?p_memberId=${p_memberId}&h_memberId=${h_memberId}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            if (data === '팔로우 중 확인') {
                followButton.style.visibility = 'hidden'; // 이미 팔로우 중인 경우 버튼 숨김
            } else {
                followButton.style.visibility = 'visible'; // 팔로우 중이 아닌 경우 버튼 보이기
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});