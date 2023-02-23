window.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.catalog__tabs').addEventListener('click', (event) => {
        if (event.target.tagName != 'LI') return;
        for (let child of event.currentTarget.children) {
            child.classList.remove('catalog__tab_active');
        }
        event.target.classList.add('catalog__tab_active');
        for (let content of document.querySelectorAll('.catalog__content')) {
            content.classList.remove('catalog__content_active');
            Array.from(document.querySelectorAll('.catalog__content')[event.target.dataset.num].querySelectorAll('.catalog__item')).forEach(el => {
                let coord = el.getBoundingClientRect();
                if (coord.top < document.documentElement.clientHeight) {
                    el.classList.remove('catalog__item-active');
                }
            });
        }
        document.querySelectorAll('.catalog__content')[event.target.dataset.num].classList.add('catalog__content_active');
        Array.from(document.querySelectorAll('.catalog__content')[event.target.dataset.num].querySelectorAll('.catalog__item')).forEach(el => {
            let coord = el.getBoundingClientRect();
            if (coord.top < document.documentElement.clientHeight) {
                el.classList.add('catalog__item-active');
            }
        });
    });

    document.querySelector('.catalog').addEventListener('click', (event) => {
        if (event.target.className == 'catalog__gen-more') {
            event.preventDefault();
            event.target.closest('.catalog__gen').classList.toggle('catalog__gen_active');
            event.target.closest('.catalog__gen').nextElementSibling.classList.toggle('catalog__list_active');
        } else if (event.target.className == 'catalog__list-back') {
            event.preventDefault();
            event.target.closest('.catalog__list').classList.toggle('catalog__list_active');
            event.target.closest('.catalog__list').previousElementSibling.classList.toggle('catalog__gen_active');
        }
    })

    if (document.documentElement.clientWidth > 1200) {
        function toggleSlide(el) {
            el.querySelector('.catalog__gen').classList.toggle('catalog__gen_active');
            el.querySelector('.catalog__list').classList.toggle('catalog__list_active');
        }
        for (let item of document.querySelectorAll('.catalog__item-wrp')) {
            item.addEventListener('mouseenter', () => {
                toggleSlide(item);
            })
            item.addEventListener('mouseleave', () => {
                toggleSlide(item);
            })
        }
    }

    window.addEventListener('scroll', () => {
        Array.from(document.querySelectorAll('.catalog__item')).forEach(el => {
            let coord = el.getBoundingClientRect();
            if (coord.top < document.documentElement.clientHeight) {
                el.classList.add('catalog__item-active');
            }
            if (coord.bottom < 0 || coord.top > document.documentElement.clientHeight) {
                el.classList.remove('catalog__item-active');
            }
        })
    })
});