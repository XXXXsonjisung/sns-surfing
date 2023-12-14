document.addEventListener('DOMContentLoaded', function() {
    // 숨겨진 필드로부터 멤버 정보 가져오기
    const memberInfo = document.getElementById('S_memberId').value;

    // memberId, memberNickname, profileImage 값 추출
    const memberIdIndex = memberInfo.indexOf('memberId=');
    const memberNicknameIndex = memberInfo.indexOf('memberNickname=');
    const profileImageIndex = memberInfo.indexOf('profileImage=');

    // 값이 존재하는지 확인 후 추출
    let memberId = '';
    let memberNickname = '';
    let profileImage = '';

    if (memberIdIndex !== -1) {
        const memberIdStart = memberIdIndex + 'memberId='.length;
        const memberIdEnd = memberInfo.indexOf(',', memberIdStart);
        memberId = memberInfo.substring(memberIdStart, memberIdEnd !== -1 ? memberIdEnd : undefined);
    }

    if (memberNicknameIndex !== -1) {
        const memberNicknameStart = memberNicknameIndex + 'memberNickname='.length;
        const memberNicknameEnd = memberInfo.indexOf(',', memberNicknameStart);
        memberNickname = memberInfo.substring(memberNicknameStart, memberNicknameEnd !== -1 ? memberNicknameEnd : undefined);
    }

    if (profileImageIndex !== -1) {
        const profileImageStart = profileImageIndex + 'profileImage='.length;
        const profileImageEnd = memberInfo.indexOf(',', profileImageStart);
        profileImage = memberInfo.substring(profileImageStart, profileImageEnd !== -1 ? profileImageEnd : undefined);
    }

    // 값들을 출력 또는 활용할 수 있음
    console.log(memberId);
    console.log(memberNickname);
    console.log(profileImage);

    // 새로운 프로필 정보를 생성
    const newProfileDiv = document.createElement('div');
    newProfileDiv.classList.add('profile');

    const profilePictureDiv = document.createElement('div');
    profilePictureDiv.classList.add('profile-picture');

    // 프로필 이미지가 있을 때만 추가
    if (profileImage) {
        const profileImageElement = document.createElement('img');
        profileImageElement.setAttribute('src', profileImage); // 프로필 이미지 소스 설정
        profileImageElement.setAttribute('alt', '프로필 사진');
        profilePictureDiv.appendChild(profileImageElement);
    }

    const profileInfoDiv = document.createElement('div');
    profileInfoDiv.classList.add('profile-info');

    const idParagraph = document.createElement('p');
    idParagraph.classList.add('id');
    idParagraph.innerHTML = `ID: <span id="userId">${memberId}</span>`;

    const nicknameParagraph = document.createElement('p');
    nicknameParagraph.innerHTML = `Nickname: <span id="userNickname">${memberNickname}</span>`;

    profileInfoDiv.appendChild(idParagraph);
    profileInfoDiv.appendChild(nicknameParagraph);

    newProfileDiv.appendChild(profilePictureDiv);
    newProfileDiv.appendChild(profileInfoDiv);

    // searchList에 새로운 프로필 정보 추가
    const searchList = document.getElementById('searchList');
    searchList.appendChild(newProfileDiv);
});