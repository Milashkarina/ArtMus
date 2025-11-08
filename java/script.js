// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;

    // Функция переключения меню
    function toggleMenu() {
        const isActive = nav.classList.contains('nav--active');
        
        if (!isActive) {
            // Открываем меню
            burgerMenu.classList.add('burger-menu--active');
            nav.classList.add('nav--active');
            body.classList.add('no-scroll');
            burgerMenu.setAttribute('aria-expanded', 'true');
        } else {
            // Закрываем меню
            burgerMenu.classList.remove('burger-menu--active');
            nav.classList.remove('nav--active');
            body.classList.remove('no-scroll');
            burgerMenu.setAttribute('aria-expanded', 'false');
        }
    }

    // Закрытие меню
    function closeMenu() {
        burgerMenu.classList.remove('burger-menu--active');
        nav.classList.remove('nav--active');
        body.classList.remove('no-scroll');
        burgerMenu.setAttribute('aria-expanded', 'false');
    }

    // Обработчик клика на бургер
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Для плавной прокрутки
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Закрываем меню после клика
                closeMenu();
            }
        });
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('nav--active') && 
            !e.target.closest('.nav') && 
            !e.target.closest('.burger-menu')) {
            closeMenu();
        }
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('nav--active')) {
            closeMenu();
        }
    });

    // Закрытие меню при изменении размера окна (если перешли на десктоп)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('nav--active')) {
            closeMenu();
        }
    });
});
// Модальное окно скачивания
// Модальное окно скачивания
class DownloadModal {
    constructor() {
        this.modal = document.getElementById('downloadModal');
        this.closeBtn = this.modal.querySelector('.modal__close');
        // Только кнопка "СКАЧАТЬ" в геро-блоке открывает модальное окно
        this.downloadButton = document.querySelector('.button--download');
        
        this.init();
    }
    
    init() {
        // Открытие модального окна только для главной кнопки скачать
        this.downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });
        
        // Кнопки в блоке скачать теперь ведут напрямую в магазины приложений
        const appStoreButton = document.querySelector('.button--appstore');
        const playMarketButton = document.querySelector('.button--playmarket');
        
        appStoreButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Перенаправление в App Store
            window.open('https://www.apple.com/app-store/', '_blank');
        });
        
        playMarketButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Перенаправление в Google Play
            window.open('https://play.google.com/store', '_blank');
        });
        
        // Закрытие модального окна
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('modal--active')) {
                this.close();
            }
        });
    }
    
    open() {
        document.body.style.overflow = 'hidden';
        this.modal.classList.add('modal--active');
    }
    
    close() {
        document.body.style.overflow = '';
        this.modal.classList.remove('modal--active');
    }
}

// Инициализация модального окна при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new DownloadModal();
});

// Остальной код для аккордеонов, карточек преимуществ и т.д.
document.addEventListener('DOMContentLoaded', function() {
    // Аккордеон
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        const content = item.querySelector('.accordion__content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закрываем все элементы
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Открываем текущий, если он был закрыт
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Карточки преимуществ
    const advantageCards = document.querySelectorAll('.advantage-card__inner');
    
    advantageCards.forEach(card => {
        const button = card.querySelector('.advantage-card__button');
        const closeBtn = card.querySelector('.advantage-card__close');
        
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.add('active');
        });
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.remove('active');
        });
        
        // Закрытие при клике вне карточки
        document.addEventListener('click', (e) => {
            if (!card.contains(e.target)) {
                card.classList.remove('active');
            }
        });
    });
    
    // Бургер-меню
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    
    if (burgerMenu && nav) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('burger-menu--active');
            nav.classList.toggle('nav--active');
            document.body.classList.toggle('no-scroll');
        });
    }
});
        

// Анимация карточек 
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.advantage-card__button');
    const closeButtons = document.querySelectorAll('.advantage-card__close');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const card = this.closest('.advantage-card__inner');
            if (card) {
                card.classList.add('active');
                
                if (window.innerWidth > 768) {
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const card = this.closest('.advantage-card__inner');
            if (card) {
                card.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.advantage-card__inner')) {
            const activeCards = document.querySelectorAll('.advantage-card__inner.active');
            activeCards.forEach(card => {
                card.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeCards = document.querySelectorAll('.advantage-card__inner.active');
            activeCards.forEach(card => {
                card.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    document.querySelectorAll('.advantage-card__info').forEach(info => {
        info.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});

// Анимация аккордеон
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(item => {
        const accordionToggle = item.querySelector('.accordion__toggle');
        const accordionHeader = item.querySelector('.accordion__header');
        
        function toggleAccordion() {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.add('active');
            }
        }
        
        if (accordionToggle) {
            accordionToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleAccordion();
            });
        }
        
        if (accordionHeader) {
            accordionHeader.addEventListener('click', function() {
                toggleAccordion();
            });
        }
    });
});
// Слайдер 
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider__slide');
    const dots = document.querySelectorAll('.slider__dot');
    const prevBtn = document.querySelector('.slider__button--prev');
    const nextBtn = document.querySelector('.slider__button--next');
    let currentSlide = 0;
    let slideInterval;

    // Функция для показа слайда
    function showSlide(n) {
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('slider__slide--active'));
        dots.forEach(dot => dot.classList.remove('slider__dot--active'));
        
        // Корректируем индекс если выходим за границы
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // Показываем текущий слайд
        slides[currentSlide].classList.add('slider__slide--active');
        dots[currentSlide].classList.add('slider__dot--active');
    }

    // Следующий слайд
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    // Предыдущий слайд
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    // Запуск автоматической смены слайдов
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Смена каждые 5 секунд
    }

    // Остановка автоматической смены
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    // Обработчики для точек навигации
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideShow();
            startSlideShow();
        });
    });

    // Пауза при наведении на слайдер
    const sliderContainer = document.querySelector('.slider__container');
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);

    // Запуск слайдера
    showSlide(currentSlide);
    startSlideShow();

    // Обработка клавиатуры
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        }
    });
});
