const checkbox = document.getElementById('public');
const label = document.querySelector('.custom-checkbox');

label.addEventListener('click', function() {
  if (checkbox.checked) {
    checkbox.checked = false;
    label.classList.remove('checked');
  } else {
    checkbox.checked = true;
    label.classList.add('checked');
  }
});



document.getElementByname("public").addEventListener('click',()=>{

    
  
    checkboxes.forEach((cb) => {
      cb.checked = false;
    })
    
    element.checked = true;
});