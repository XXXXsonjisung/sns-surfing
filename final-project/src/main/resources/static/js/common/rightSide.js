window.onload = function() {
    fetchAndRenderFollowers();
};

function fetchAndRenderFollowers() {
    fetch('/mutualFollowers')
        .then(response => response.json())
        .then(data => {
            const friendList = document.querySelector('.friend');
            friendList.innerHTML = ''; // 리스트 초기화

            data.forEach(user => {
                const listItem = document.createElement('li');
                const userLink = document.createElement('a');
                userLink.href = `/getUserInfo?username=${user}`;
                userLink.textContent = user;

                const messageLink = document.createElement('a');
                messageLink.href = `#`; // 메시지 링크

                listItem.appendChild(userLink);
                listItem.appendChild(messageLink);

                friendList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error:', error); // 에러 발생 시 처리
        });
}