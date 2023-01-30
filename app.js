const open = document.getElementById ('open');
const close = document.getElementById ('close');
const active = document.querySelector ('.active');


open.addEventListener('click', () => {
        open.style.display = "none";
        active.classList.add('show-nav')
        close.style.display = "inline-block";

    })
close.addEventListener('click', () =>{ 
        open.style.display = "inline-block";
        active.classList.remove('show-nav')
        close.style.display = "none";
    })