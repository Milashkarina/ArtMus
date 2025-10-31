// Анимация карточек 
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки карточек
    const buttons = document.querySelectorAll('.advantage-card__button');
    const closeButtons = document.querySelectorAll('.advantage-card__close');
    
    // Добавляем обработчик для кнопок "Подробнее"
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            
            // Находим родительскую карточку
            const card = this.closest('.advantage-card__inner');
            if (card) {
                // Активируем карточку
                card.classList.add('active');
                
                // Блокируем прокрутку страницы когда карточка открыта (только на десктопе)
                if (window.innerWidth > 768) {
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    // Добавляем обработчик для кнопок закрытия
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            
            // Находим родительскую карточку
            const card = this.closest('.advantage-card__inner');
            if (card) {
                // Деактивируем карточку
                card.classList.remove('active');
                
                // Восстанавливаем прокрутку страницы
                document.body.style.overflow = '';
            }
        });
    });
    
    // Закрытие карточки при клике вне ее
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.advantage-card__inner')) {
            const activeCards = document.querySelectorAll('.advantage-card__inner.active');
            if (activeCards.length > 0) {
                activeCards.forEach(card => {
                    card.classList.remove('active');
                });
                // Восстанавливаем прокрутку страницы
                document.body.style.overflow = '';
            }
        }
    });
    
    // Закрытие карточки при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeCards = document.querySelectorAll('.advantage-card__inner.active');
            if (activeCards.length > 0) {
                activeCards.forEach(card => {
                    card.classList.remove('active');
                });
                // Восстанавливаем прокрутку страницы
                document.body.style.overflow = '';
            }
        }
    });
    
    // Плавная прокрутка для навигации
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
    
    // Предотвращаем закрытие при клике внутри карточки
    document.querySelectorAll('.advantage-card__info').forEach(info => {
        info.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Адаптивное поведение для мобильных устройств
    function handleMobileCards() {
        if (window.innerWidth <= 768) {
            // На мобильных устройствах добавляем возможность закрытия по тапу вне карточки
            document.addEventListener('touchstart', function(e) {
                if (!e.target.closest('.advantage-card__inner')) {
                    const activeCards = document.querySelectorAll('.advantage-card__inner.active');
                    if (activeCards.length > 0) {
                        activeCards.forEach(card => {
                            card.classList.remove('active');
                        });
                    }
                }
            });
        }
    }

    // Инициализация адаптивного поведения
    handleMobileCards();
    window.addEventListener('resize', handleMobileCards);
});

// Слайдер 
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider__slide');
    const dots = document.querySelectorAll('.slider__dot');
    const prevBtn = document.querySelector('.slider__button--prev');
    const nextBtn = document.querySelector('.slider__button--next');
    
    // Проверяем, существует ли слайдер на странице
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
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('slider__dot--active');
        }
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

    // Запуск автоматической смены слайдов (только на десктопе)
    function startSlideShow() {
        if (window.innerWidth > 768) {
            slideInterval = setInterval(nextSlide, 5000); // Смена каждые 5 секунд
        }
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

    // Пауза при наведении на слайдер (только на десктопе)
    const sliderContainer = document.querySelector('.slider__container');
    if (sliderContainer && window.innerWidth > 768) {
        sliderContainer.addEventListener('mouseenter', stopSlideShow);
        sliderContainer.addEventListener('mouseleave', startSlideShow);
    }

    // Запуск слайдера
    showSlide(currentSlide);
    startSlideShow();

    // Обработка клавиатуры (только на десктопе)
    if (window.innerWidth > 768) {
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
    }

    // Адаптивное поведение для мобильных устройств
    function handleMobileSlider() {
        if (window.innerWidth <= 768) {
            stopSlideShow(); // Останавливаем автопрокрутку на мобильных
        } else {
            startSlideShow(); // Запускаем автопрокрутку на десктопе
        }
    }

    // Свайпы для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
        }
    }

    // Добавляем обработчики свайпов для мобильных
    if (sliderContainer && window.innerWidth <= 768) {
        sliderContainer.addEventListener('touchstart', handleTouchStart, false);
        sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    }

    // Инициализация адаптивного поведения
    handleMobileSlider();
    window.addEventListener('resize', handleMobileSlider);
});

// Анимация аккордеон
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(item => {
        const accordionToggle = item.querySelector('.accordion__toggle');
        const accordionHeader = item.querySelector('.accordion__header');
        
        // Функция переключения аккордеона
        function toggleAccordion() {
            if (item.classList.contains('active')) {
                // Закрываем
                item.classList.remove('active');
            } else {
                // Закрываем все остальные аккордеоны
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Открываем текущий
                item.classList.add('active');
            }
        }
        
        // Клик на кнопку
        if (accordionToggle) {
            accordionToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleAccordion();
            });
        }
        
        // Клик на заголовок
        if (accordionHeader) {
            accordionHeader.addEventListener('click', function() {
                toggleAccordion();
            });
        }
    });

    // Адаптивное поведение для аккордеона на мобильных
    function handleMobileAccordion() {
        if (window.innerWidth <= 768) {
            // На мобильных можно добавить дополнительную логику если нужно
            accordionItems.forEach(item => {
                item.style.transition = 'all 0.3s ease';
            });
        }
    }

    handleMobileAccordion();
    window.addEventListener('resize', handleMobileAccordion);
});

// Оптимизация для мобильных устройств
document.addEventListener('DOMContentLoaded', function() {
    // Предотвращаем масштабирование при двойном тапе на iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Улучшаем производительность на мобильных
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
});