// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
// component

const carouselOption = {
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  // slidesPerView: 1,
  slidesPerGroup: 7,

  grid: {
    rows: 7,
  },
};

const swiperInit = el => {
  const nextEl = el.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = el.closest('.carousel').querySelector('.js-carousel-prev');

  const swiper = runCarousel(el, {
    ...carouselOption,
    navigation: {
      prevEl,
      nextEl,
    },
  });

  return swiper;
};

function init() {
  const component = document.querySelectorAll('.CS0108');
  if (beforeLaunch(component)) return false;

  const carousel = document.querySelectorAll('.CS0108 .c-carousel');
  if (beforeLaunch(carousel)) return false;

  carousel.forEach(el => {
    swiperInit(el);
  });
}
init();

const inputEvent = {
  textClear() {
    const buttonDelete = document.querySelector('.c-button-delete');
    console.log(buttonDelete);
    const input = document.querySelector('.textInput__input');
    buttonDelete.addEventListener('click', () => {
      input.value = '';
      buttonDelete.classList.remove('c-button-delete--active');
    });
  },
  deleteButtonOn() {
    const buttonDelete = document.querySelector('.c-button-delete');
    const input = document.querySelector('.textInput__input');
    input.addEventListener('keyup', () => {
      buttonDelete.classList.add('c-button-delete--active');
      if (input.value.length === 0) {
        buttonDelete.classList.remove('c-button-delete--active');
      }
    });
  },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
  },
};

inputEvent.init();

const validation = function () {
  const input = document.querySelector('.textInput__input');
  const searchBtn = document.querySelector('.fieldIcons__before');
  const inputRequired = document.querySelector('.c-field-required');

  // enter
  searchBtn.addEventListener('click', function () {
    if (input.value === '') {
      input.focus();
      input.classList.add('c-error');
      inputRequired.style.display = 'block';
    }
  });
};

validation();

// export default
