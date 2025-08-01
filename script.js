// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // === Вступительная анимация ===
    const introScreen = document.querySelector('.intro-screen');
    const viewFilmsButton = document.querySelector('.view-films-button');

    if (introScreen && viewFilmsButton) {
        // Проверяем, был ли экран уже показан (для предотвращения повторного показа при навигации)
        const introShown = sessionStorage.getItem('introShown');

        if (!introShown) {
            // Показываем вступительный экран
            introScreen.style.display = 'flex';
            
            // Если кнопка есть, привязываем к ней прокрутку или скрытие
            viewFilmsButton.addEventListener('click', () => {
                introScreen.classList.add('hidden');
                // Устанавливаем флаг, что вступительный экран был показан
                sessionStorage.setItem('introShown', 'true');
                // Прокрутка к основной части сайта (если она на той же странице)
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    setTimeout(() => {
                        const mainContent = document.getElementById('main-content');
                        if (mainContent) {
                            mainContent.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 1000); // Задержка, чтобы анимация скрытия успела пройти
                }
            });
            // Альтернативно, можно скрыть экран после некоторой задержки, если нет кнопки
            // setTimeout(() => {
            //     introScreen.classList.add('hidden');
            //     sessionStorage.setItem('introShown', 'true');
            // }, 4000); // 4 секунды
        } else {
            // Если экран уже был показан, сразу скрываем его
            introScreen.style.display = 'none';
        }
    }


    // === Переключение языков ===
    const langSwitcher = document.querySelector('.lang-switcher');
    const langDropdown = document.querySelector('.lang-dropdown');

    if (langSwitcher && langDropdown) {
        langSwitcher.addEventListener('click', (event) => {
            event.stopPropagation(); // Предотвращаем закрытие при клике внутри
            langSwitcher.classList.toggle('active');
        });

        // Закрываем дропдаун при клике вне его
        document.addEventListener('click', (event) => {
            if (!langSwitcher.contains(event.target)) {
                langSwitcher.classList.remove('active');
            }
        });
    }

    // Функция для получения параметра языка из URL
    function getLangFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang') || 'lt'; // По умолчанию литовский
    }

    // Функция для установки текстов на основе текущего языка
    function setLanguage(lang) {
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('selectedLang', lang);

        document.querySelectorAll('[data-lang]').forEach(element => {
            const translations = JSON.parse(element.getAttribute('data-lang'));
            element.innerHTML = translations[lang] || translations['lt']; // Fallback на литовский
        });
        document.querySelectorAll('[data-placeholder-lang]').forEach(element => {
            const placeholders = JSON.parse(element.getAttribute('data-placeholder-lang'));
            element.placeholder = placeholders[lang] || placeholders['lt'];
        });
        document.querySelectorAll('[data-alt-lang]').forEach(element => {
            const altTexts = JSON.parse(element.getAttribute('data-alt-lang'));
            element.alt = altTexts[lang] || altTexts['lt'];
        });
        document.querySelectorAll('[data-title-lang]').forEach(element => {
            const titleTexts = JSON.parse(element.getAttribute('data-title-lang'));
            element.title = titleTexts[lang] || titleTexts['lt'];
        });
        document.querySelectorAll('[data-value-lang]').forEach(element => {
            const valueTexts = JSON.parse(element.getAttribute('data-value-lang'));
            element.value = valueTexts[lang] || valueTexts['lt'];
        });
    }

    // При загрузке страницы:
    // 1. Пытаемся получить язык из localStorage
    let currentLang = localStorage.getItem('selectedLang');
    // 2. Если в localStorage нет, берем из URL
    if (!currentLang) {
        currentLang = getLangFromUrl();
    }
    // 3. Если нигде нет, по умолчанию 'lt'
    if (!currentLang) {
        currentLang = 'lt';
    }
    
    setLanguage(currentLang); // Устанавливаем язык

    // Привязываем события к ссылкам в выпадающем списке
    document.querySelectorAll('.lang-dropdown a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const newLang = event.target.getAttribute('data-lang-code');
            setLanguage(newLang);
            langSwitcher.classList.remove('active'); // Закрываем выпадающий список
        });
    });

});
