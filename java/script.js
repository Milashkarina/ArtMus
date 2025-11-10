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
class DownloadModal {
    constructor() {
        this.modal = document.getElementById('downloadModal');
        this.closeBtn = this.modal.querySelector('.modal__close');
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
        
        if (appStoreButton) {
            appStoreButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Перенаправление в App Store
                window.open('https://www.apple.com/app-store/', '_blank');
            });
        }
        
        if (playMarketButton) {
            playMarketButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Перенаправление в Google Play
                window.open('https://play.google.com/store', '_blank');
            });
        }
        
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

// Аккордеон
document.addEventListener('DOMContentLoaded', function() {
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
});

// Карточки преимуществ
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
});

// Плавная прокрутка для всех ссылок с якорями
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Слайдер
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider__slide');
    const dots = document.querySelectorAll('.slider__dot');
    const prevBtn = document.querySelector('.slider__button--prev');
    const nextBtn = document.querySelector('.slider__button--next');
    
    if (slides.length === 0) return;
    
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
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Остановка автоматической смены
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Обработчики событий для кнопок
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

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
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideShow);
        sliderContainer.addEventListener('mouseleave', startSlideShow);
    }

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

// Инициализация модального окна
document.addEventListener('DOMContentLoaded', () => {
    new DownloadModal();
});
// Обработка отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.form');
    const successModal = document.getElementById('successModal');
    const successClose = successModal.querySelector('.modal-success__close');
    const successButton = successModal.querySelector('.modal-success__button');
    
    // Функция показа модального окна
    function showSuccessModal() {
        successModal.classList.add('modal-success--active');
        document.body.style.overflow = 'hidden';
    }
    
    // Функция скрытия модального окна
    function hideSuccessModal() {
        successModal.classList.remove('modal-success--active');
        document.body.style.overflow = '';
    }
    
    // Обработчик отправки формы
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь обычно отправка данных на сервер
            // Для демонстрации просто показываем модальное окно
            
            // Валидация формы
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageTextarea = contactForm.querySelector('.form__textarea');
            
            let isValid = true;
            
            // Простая валидация
            if (!nameInput.value.trim()) {
                isValid = false;
                highlightError(nameInput);
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                highlightError(emailInput);
            } else {
                removeError(emailInput);
            }
            
            if (!messageTextarea.value.trim()) {
                isValid = false;
                highlightError(messageTextarea);
            } else {
                removeError(messageTextarea);
            }
            
            if (isValid) {
                // Показываем модальное окно успеха
                showSuccessModal();
                
                // Очищаем форму
                contactForm.reset();
            }
        });
    }
    
    // Функции для валидации
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function highlightError(element) {
        element.style.borderColor = '#ff4444';
        element.style.backgroundColor = 'rgba(255, 68, 68, 0.05)';
    }
    
    function removeError(element) {
        element.style.borderColor = '';
        element.style.backgroundColor = '';
    }
    
    // Закрытие модального окна
    successClose.addEventListener('click', hideSuccessModal);
    successButton.addEventListener('click', hideSuccessModal);
    
    // Закрытие по клику на фон
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('modal-success--active')) {
            hideSuccessModal();
        }
    });
});