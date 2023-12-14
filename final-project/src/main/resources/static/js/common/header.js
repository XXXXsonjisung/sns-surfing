
			   
			var uploadBtn = document.querySelector('.w-btn-neon2');
			uploadBtn.addEventListener('click', function() {
			    var modal = document.getElementById('myModal');
			    modal.style.display = "block";
			});
			
			//----------------------------------------------------
			

			// 닫기 버튼 요소를 찾습니다.
			var closeBtn = document.querySelector('.close');
			
			// 닫기 버튼에 클릭 이벤트를 추가합니다.
			closeBtn.addEventListener('click', function() {
			    var modal = document.getElementById('myModal');
			    modal.style.display = "none"; // 모달을 숨깁니다.
			});
		
		/* ------------------------------------------*/
		
		document.getElementById('imageInputXX').addEventListener('change', function(event) {
		    const file = event.target.files[0];
		    const reader = new FileReader();
		
		    reader.onload = function(e) {
		        const img = document.createElement('img');
		        img.src = e.target.result;
		        img.style.maxWidth = '300px'; // 이미지의 최대 너비 설정
		        img.style.maxHeight = '300px'; // 이미지의 최대 높이 설정
		
		        const modalPostContent = document.getElementById('modalPostContent');
		        modalPostContent.appendChild(img);
		        modalPostContent.appendChild(document.createElement('br')); // 줄 바꿈 추가
		    }
		
		    reader.readAsDataURL(file);
		});
		
		document.getElementById('videoInput').addEventListener('change', function(event) {
		    const file = event.target.files[0];
		    const reader = new FileReader();
		
		    reader.onload = function(e) {
		        const video = document.createElement('video');
		        video.src = e.target.result;
		        video.controls = true;
		        video.style.maxWidth = '300px'; // 동영상의 최대 너비 설정
		        video.style.maxHeight = '300px'; // 동영상의 최대 높이 설정
		
		        const modalPostContent = document.getElementById('modalPostContent');
		        modalPostContent.appendChild(video);
		        modalPostContent.appendChild(document.createElement('br')); // 줄 바꿈 추가
		    }
		
		    reader.readAsDataURL(file);
		});
		
		
		
		
		//00000000000000000000000000000000000000000000000000000
		
		document.getElementById('imageInputXX').addEventListener('change', function(event) {
	    const file = event.target.files[0];
	    const reader = new FileReader();
	
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
	        username.textContent = "@{session.loginMember}"; // 사용자 이름
	
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
	
	
	document.getElementById('videoInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

	    reader.onload = function(e) {
	        const video = document.createElement('video');
	        video.src = e.target.result;
	        video.controls = true;
	        video.style.maxWidth = '300px'; // 동영상의 최대 너비 설정
	        video.style.maxHeight = '300px'; // 동영상의 최대 높이 설정
	
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
	        username.textContent = "@{session.loginMember}"; // 사용자 이름
	
	        postHead.appendChild(profile);
	        postHead.appendChild(username);
	
	        const postContentDiv = document.createElement('div');
	        postContentDiv.classList.add('post_content');
	        postContentDiv.appendChild(video);
	
	        postContent.appendChild(postHead);
	        postContent.appendChild(postContentDiv);
	
	        const userPost = document.createElement('div');
	        userPost.classList.add('user_post');
	        userPost.appendChild(postContent);
	    }
	
	    reader.readAsDataURL(file);
	});


//--------------------------------------------------


// 헤더의 모달 내 게시 버튼을 눌렀을 때 실행되는 함수
function createPost() {
	
	 function modalClose() {
        const modalPostContent = document.getElementById('modalPostContent');
        modalPostContent.innerText = ''; // 모달 텍스트 초기화

        const imageInput = document.getElementById('imageInputXX');
        imageInput.value = ''; // 이미지 입력란 초기화

        const videoInput = document.getElementById('videoInput');
        videoInput.value = ''; // 비디오 입력란 초기화
    }
	
	
    fetch('/userinfo')
        .then(response => response.json())
        .then(data => {
            const username = data.memberId; 
            const profileImageUrl = data.profileImage; 

            const modalText = document.getElementById('modalPostContent').innerText; 
            const imageFile = document.getElementById('imageInputXX').files[0]; 
            const videoFile = document.getElementById('videoInput').files[0]; 

            var userBox = document.querySelector('.user_boxT');
            var firstPost = document.querySelector('.user_boxT .user_post:first-child');
            var newUserPost = firstPost.cloneNode(true);
            var postContent = newUserPost.querySelector('.post_content');
            postContent.textContent = '';

            userBox.prepend(newUserPost);

            var postContentDiv = document.querySelector('.post_content');
            var textDiv = document.createElement('div');
            textDiv.textContent = modalText;
            postContentDiv.appendChild(textDiv);

            var profileImageElement = document.querySelector('.propile img');
            profileImageElement.src = profileImageUrl;
        
            const usernameElement = document.getElementById('user01');
            usernameElement.textContent = username; 

            if (imageFile) {
                var imageElement = document.createElement('img');
                imageElement.src = URL.createObjectURL(imageFile);
                imageElement.onload = function() {
                    postContentDiv.appendChild(imageElement);
                    var modal = document.getElementById('myModal');
                    modal.style.display = 'none';
                };
                imageElement.onerror = function() {
                    console.error('모달 이미지 로드 에러');
                    var modal = document.getElementById('myModal');
                    modal.style.display = 'none';
                };
            } else {
                console.error('모달 이미지 파일이 없음');
                var modal = document.getElementById('myModal');
                modal.style.display = 'none';
            }
        
            const formData = new FormData();
            formData.append('username', username);
            formData.append('memberProfile', profileImageUrl);
            formData.append('content', modalText);
            
   
   			 if (imageFile) {
		        formData.append('imageUrls', imageFile);
		    } else {
		        // 이미지 파일이 없는 경우에는 빈 Blob을 추가합니다.
		        const emptyBlob = new Blob([''], { type: 'text/plain' });
		        formData.append('imageUrls', emptyBlob);
		    }
		
		    // 비디오 파일이 있는 경우에만 FormData에 추가
		    if (videoFile) {
		        formData.append('videoUrls', videoFile);
		    } else {
		        // 비디오 파일이 없는 경우에는 빈 Blob을 추가합니다.
		        const emptyBlob = new Blob([''], { type: 'text/plain' });
		        formData.append('videoUrls', emptyBlob);
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



/*-------------------- 검색 ------------------------------------*/


function sendSearch() {
    var searchValue = document.getElementById("search_id").value;
    window.location.href = "/searchPage?searchValue=" + encodeURIComponent(searchValue);
}

