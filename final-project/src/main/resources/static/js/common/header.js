
			   
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


//--------------------------------------------------
