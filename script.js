document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const burgerIcon = document.querySelector('.burger-icon');
    const menuButtons = document.querySelectorAll('.menu-btn');
    const submenuButtons = document.querySelectorAll('.submenu-btn');
    const infoTriggers = document.querySelectorAll('.info-trigger');
    const menuLinks = document.querySelectorAll('.menu-content a');
    
    // Функціонал бургер-меню
    burgerMenu.addEventListener('click', () => {
        burgerIcon.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    // Закриття меню при кліку поза ним
    document.addEventListener('click', (e) => {
        if (!menuOverlay.contains(e.target) && !burgerMenu.contains(e.target)) {
            menuOverlay.classList.remove('active');
            burgerIcon.classList.remove('active');
        }
    });

    // Функціонал акордеону для головного меню
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Закриваємо всі активні меню
            document.querySelectorAll('.menu-content').forEach(item => {
                item.classList.remove('active');
            });

            // Знімаємо активний стан з усіх кнопок
            menuButtons.forEach(btn => btn.classList.remove('active'));

            // Якщо меню не було активним, відкриваємо його
            if (!isActive) {
                content.classList.add('active');
                button.classList.add('active');
            }
        });
    });

    // Функціонал акордеону для підменю
    submenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Закриваємо всі активні підменю в поточному розділі
            const currentSubmenu = button.closest('.menu-content');
            currentSubmenu.querySelectorAll('.submenu-content').forEach(item => {
                if (item !== content) {
                    item.classList.remove('active');
                }
            });

            // Перемикаємо стан поточного підменю
            content.classList.toggle('active');
        });
    });

    // Функціонал інфо-блоків
    infoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // Закриття інфо-блоків при кліку поза ними
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.info-trigger') && !e.target.closest('.info-popup')) {
            document.querySelectorAll('.info-popup').forEach(popup => {
                popup.classList.remove('active');
            });
        }
    });

    // Обробка звичайних посилань
    menuLinks.forEach(link => {
        if (!link.classList.contains('info-trigger')) {
            link.addEventListener('click', (e) => {
                if (link.hasAttribute('target')) {
                    // Якщо це зовнішнє посилання, дозволяємо перехід
                    return true;
                }
            });
        }
    });
});
