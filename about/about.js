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


//trends 
const buttons = document.querySelectorAll('[data-carousel-button]');

buttons.forEach(button =>{
    button.addEventListener('click',()=>{
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button.closest("[data-carousel]").querySelector('[data-slides]')

        const activeSlides = slides.querySelector("[data-active")
        let newIndex = [...slides.children].indexOf(activeSlides)+offset;
        if(newIndex < 0) newIndex = slides.children.length-1
        if(newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlides.dataset.active
    })
})



