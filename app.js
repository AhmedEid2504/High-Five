const open = document.getElementById ('open');
const close = document.getElementById ('close');
const active = document.querySelector ('.active');

open.addEventListener('click', () => {
    if (open.classList.contains('fa-bars')) {
        open.classList.remove('fa-bars');
        open.classList.add('fa-chevron-up');
        active.classList.add('show-nav')
    } else if (open.classList.contains('fa-chevron-up')) {
        open.classList.remove('fa-chevron-up');
        open.classList.add('fa-bars');
        active.classList.remove('show-nav')
    }
})

    



