 // 모달
const modal = document.querySelector('.modal');
const searchAuthBtn = document.getElementsByClassName('searchBtn');
const body = document.body;

for (let i = 0; i < searchBtn.length; i++) {
  searchAuthBtn[i].addEventListener('click', () => {
    modal.classList.toggle('show');
	body.style.overflow = 'hidden';
  });

}

modal.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.classList.toggle('show');

    if (!modal.classList.contains('show')) {
      body.style.overflow = 'auto';
    }
  }
});


