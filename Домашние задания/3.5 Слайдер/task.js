(() => {

    const slides = document.querySelectorAll('.slider__item');
    const leftButton = document.querySelector('.slider__arrow_prev');
    const rightButton = document.querySelector('.slider__arrow_next');
    
    let currentSlideIndex = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('slider__item_active', index === currentSlideIndex);
        });
    }

    function goToSlide(slideIndex) {
        currentSlideIndex = (currentSlideIndex + slideIndex + slides.length) % slides.length;
        updateSlides();
    }

    leftButton.addEventListener('click', () => goToSlide(-1));
    rightButton.addEventListener('click', () => goToSlide(1));

    updateSlides();
  
  })();