    class Slider {
        // Визначення приватних статичних полів для зберігання елементів та змінних
        static #content = null; // Контейнер слайдера
        static #left = null; // Кнопка "Вліво"
        static #right = null; // Кнопка "Вправо"
        static #count = 1; // Лічильник слайдів (не використовується)
        static #max = 4; // Максимальна кількість слайдів (значення за замовчуванням)
    
        // Метод ініціалізації слайдера
        static init() {
            // Знаходимо елементи на сторінці за їхніми класами
            this.#content = document.querySelector('.slider__content'); // Контейнер слайдів
            this.#left = document.querySelector('.slider__button--left'); // Кнопка "Вліво"
            this.#right = document.querySelector('.slider__button--right'); // Кнопка "Вправо"
            
            // Отримуємо кількість дочірніх елементів контейнера, що визначає максимальну кількість слайдів
            this.#max = this.#content.childElementCount;
    
            // Додаємо обробники подій для кнопок "Вліво" та "Вправо"
            this.#left.onclick = () => this.#slide('left'); // При кліку вліво
            this.#right.onclick = () => this.#slide('right'); // При кліку вправо
        }
    
        // Приватний метод для здійснення прокрутки слайдів
        static #slide = (direction) => {
            // Отримуємо ширину видимої частини контейнера слайдера
            const offsetWidth = this.#content.offsetWidth;
            
            // Отримуємо поточне зміщення (scrollLeft) контейнера
            const scrollLeft = this.#content.scrollLeft;
    
            // Змінна для визначення зміщення при прокрутці
            let scroll = 0;
    
            // Визначаємо напрямок прокрутки на основі параметру 'direction'
            if (direction === 'left') {
                if(this.#count === 1) {
                    this.#count = this.#max;
                    scroll = (this.#count - 1) * offsetWidth;
                } else {
                    this.#count -= 1;
                    scroll = (this.#count - 1) * offsetWidth;
                }
            }
            if (direction === 'right') {
                if(this.#count === this.#max) {
                    this.#count = 1;
                    scroll = 0;
                } else {
                    this.#count += 1;
                    scroll = (this.#count - 1) * offsetWidth;
                }
            }
    
            // Викликаємо метод scrollBy для прокрутки контейнера
            this.#content.scrollTo({
                top: 0, // Прокручуємо вертикально на 0
                left: scroll, // Прокручуємо горизонтально на величину 'scroll'
                behavior: 'smooth' // Задаємо плавний ефект прокрутки
            });
        }
    }
    
Slider.init();

class Header {
    static #height = null;
    static #wrapper = null;
    static #button = null;
    static #isOpen = false;

    static init() {
        this.#height = document.querySelector('.header__bottom').offsetHeight;
        this.#wrapper = document.querySelector('.header__wrapper');
        this.#button = document.querySelector('.header__button');
        this.#button.onclick = () => this.#toggle();
    
    }
    static #toggle = () => {
        if(this.#isOpen) {
            this.#button.classList.replace('header__button--close', 'header__button--open');
            this.#wrapper.style.height = 0;

            
        }
        else {
            this.#button.classList.replace('header__button--open', 'header__button--close');
            this.#wrapper.style.height = `${this.#height}px`;      
        }

        this.#isOpen = !this.#isOpen;

    }

}

Header.init();  