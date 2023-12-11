document.addEventListener('DOMContentLoaded', function() {
    const memberId = document.getElementById('H_memberId').value;

    fetch(`/followPageData?memberId=${memberId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const userBox = document.querySelector('.XXProfile');

            data.forEach(item => {
                // 대상 요소를 생성합니다.
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('xProfile'); // 원하는 클래스로 설정합니다.

                const uProfileDiv = document.createElement('div');
                uProfileDiv.classList.add('uProfile');

                const img = document.createElement('img');
                img.setAttribute('src', item.profileImage);
                uProfileDiv.appendChild(img);

                const followNavDiv = document.createElement('div');
                followNavDiv.classList.add('FollowNav');

                const aTag = document.createElement('a');
                aTag.textContent = item.h_memberId;
                followNavDiv.appendChild(aTag);

                // 그룹화된 요소들을 합쳐서 구조를 형성합니다.
                profileDiv.appendChild(uProfileDiv);
                profileDiv.appendChild(followNavDiv);

                // userBox에 추가합니다.
                userBox.appendChild(profileDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

/*--------------------버튼 관련 -------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    const followBtn = document.getElementById('followBtn');
    const followDiv = document.querySelector('.XXProfile');
    const followingBtn = document.getElementById('fingBtn');
    const followingDiv = document.querySelector('.TTProfile');

    followBtn.addEventListener('click', function() {
        followDiv.style.display = 'block'; // 팔로워 버튼 클릭 시 XXProfile 보이기
        followingDiv.style.display = 'none'; // 팔로워 버튼 클릭 시 TTProfile 숨기기
    });

    followingBtn.addEventListener('click', function() {
        followDiv.style.display = 'none'; // 팔로잉 버튼 클릭 시 XXProfile 숨기기
        followingDiv.style.display = 'block'; // 팔로잉 버튼 클릭 시 TTProfile 보이기
    });
});