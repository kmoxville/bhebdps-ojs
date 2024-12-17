function resetActive(slides) {
    slides.forEach(slide => slide.classList.remove('rotator__case_active'));
  }
  
  function makeRotator(parent) {
    const slides = Array.from(parent.querySelectorAll('.rotator__case'));
    let activeSlide = 0;
  
    // Устанавливаем цвет для каждого слайда
    slides.forEach(slide => {
      slide.style.color = slide.dataset.color;
    });
  
    // Получаем скорость текущего активного слайда
    const getActiveSpeed = () => Number(slides[activeSlide].dataset.speed);
  
    // Функция для переключения слайдов
    const triggerSlides = () => {
      resetActive(slides);
      activeSlide = (activeSlide + 1) % slides.length; // Переход к следующему слайду
      slides[activeSlide].classList.add('rotator__case_active');
      setTimeout(triggerSlides, getActiveSpeed()); // Запускаем следующий слайд через заданное время
    };
  
    setTimeout(triggerSlides, getActiveSpeed()); // Запускаем первый слайд
  }
  
  // Инициализация ротатора для элементов с классами 'card' и 'card_2'
  makeRotator(document.querySelector('.card'));
  makeRotator(document.querySelector('.card_2'));