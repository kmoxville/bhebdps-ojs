(() => {
    let currentSubMenu = null; // Хранит текущее активное подменю
  
    // Функция для обработки клика по элементу меню
    const handleMenuItemClick = (event) => {
      event.preventDefault(); // Отменяем стандартное поведение ссылки
      const subMenu = event.target.parentElement.querySelector('.menu_sub');
  
      if (subMenu.classList.contains('menu_active')) {
        // Если подменю активно, скрываем его
        subMenu.classList.remove('menu_active');
        currentSubMenu = null;
      } else {
        // Если есть активное подменю, скрываем его
        if (currentSubMenu) {
          currentSubMenu.classList.remove('menu_active');
        }
        // Показываем текущее подменю и обновляем ссылку на него
        subMenu.classList.add('menu_active');
        currentSubMenu = subMenu;
      }
    };
  
    // Находим все элементы меню и добавляем обработчики событий
    document.querySelectorAll('.menu_main > .menu__item:has(.menu_sub) > a')
      .forEach(menuItem => menuItem.addEventListener('click', handleMenuItemClick));
  })();