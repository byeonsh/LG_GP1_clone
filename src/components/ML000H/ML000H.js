// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

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
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: '2',
      allowTouchMove: false,
    },
    [bp.tablet + 1]: {
      slidesPerView: 3,
    },
  },
};

const swiperInit = function (target) {
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

const classfier = function (type, target) {
  // let { swiper = undefined } = target;
  switch (type) {
    case 'swiper init':
      return swiperInit(target);
    case 'swiper destroy':
      target.swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.swiper = undefined;
      return;
    default:
      return console.log('non case');
  }
};
// init
function init2() {
  const component = document.querySelectorAll('.thinkq-popup');
  if (beforeLaunch(component)) return false;

  // carousel
  const carousel = document.querySelectorAll('.thinkq-popup .c-carousel');
  if (beforeLaunch(carousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);

  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    const webNum = 4;
    const mobileNum = 1;
    const typeHome = document.querySelectorAll('.thinkq-popup.type-home');
    console.log(typeHome);
    typeHome.forEach(el => {
      const target = el.querySelector('.c-carousel');
      console.log(target);
      const items = target.querySelectorAll('.swiper-slide');
      const num = mediaQueryList.matches ? webNum : mobileNum;
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      // type:home
      if (typeHome && isWeb) {
        classfier('remove more button', target, items);
      }
      if (typeHome && !isWeb) {
        // eslint-disable-next-line no-unused-expressions
        carouselHas && classfier('swiper destroy', target);
        return classfier('add more button', target, items);
      }
      // type:category(default)
      if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
      if (num < items.length && carouselNone) return classfier('swiper init', target);
      // });
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}
init2();

// select registered product popup
const productListActive = function () {
  const listItem = document.querySelectorAll('.thinkq-popup .swiper-slide');

  const selectArr = [];

  listItem.forEach(item => {
    item.addEventListener('click', () => {
      listItem.forEach(el => {
        el.classList.remove('swiper-slide--active');
      });
      item.classList.add('swiper-slide--active');
      selectArr.push(item);
    });
    item.addEventListener('keyup', () => {
      if (window.event.keyCode === 13) {
        listItem.forEach(el => {
          el.classList.remove('swiper-slide--active');
        });
        item.classList.add('swiper-slide--active');
      }
    });
  });
};

productListActive();

const closeEventzone = document.querySelector('.ml-event__zone .clone-self');
closeEventzone.addEventListener('click', () => {
  document.querySelector('.ml-event__zone').style.display = 'none';
});

// component
function init() {
  const component = document.querySelectorAll('.ML000H');
  if (beforeLaunch(component)) return false;

  const selectChangeText = () => {
    const sel = document.querySelectorAll('.my-com__sort-box select');
    const textEl = '.my-com__sort-box-text';
    sel.forEach(el => {
      // initial
      const targetText = el.closest('li').querySelector(textEl);
      targetText.classList.add('active');
      targetText.innerText = el.options[0].text;

      // change event
      el.addEventListener('change', () => {
        const selectValue = el.options[el.selectedIndex].text;
        targetText.innerText = selectValue;
      });
    });
  };
  selectChangeText();
}
init();
// export default
