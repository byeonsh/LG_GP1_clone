import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import swiper from '../../assets/js/vendors/swiper.js';

const desktopView = 3;
const tabletView = 2;
const mobileView = 1;
// 카루젤 옵션
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
  // slidesPerView: 'auto',
  slidesPerView: mobileView,

  centeredSlides: false,
  spaceBetween: 10,
  // breakpoints: {
  //     // min
  //     769: {
  //         slidesPerView: 4,
  //         spaceBetween: 24,
  //     },
  // },
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: tabletView,
      allowTouchMove: true,
      spaceBetween: 24,
    },
    [bp.tablet + 1]: {
      slidesPerView: desktopView,
      allowTouchMove: false,
      spaceBetween: 24,
    },
  },
};

const swiperInit = function (target) {
  const swiperFraction = target.parentElement.querySelector('.c-carousel__pagination');
  const nextButton = target.parentElement.querySelector('.js-carousel-next');
  const prevButton = target.parentElement.querySelector('.js-carousel-prev');
  const topSwiper = target.closest('.CS0028').querySelector('.type-banner__slide2 .c-carousel--gallery');
  // const itemCount = target.querySelectorAll('.type-banner__slide2 .swiper-slide').length;
  runCarousel(topSwiper, {
    ...carouselOption,
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
    // eslint-disable-next-line no-nested-ternary
    // slidesPerView: 2 > itemCount ? 1 : 1.4,
    centeredSlides: false,
    spaceBetween: 10,
    // slidesOffsetBefore: 2 > itemCount ? 0 : 25,
    // slidesOffsetAfter: 2 > itemCount ? 0 : 25,
    // breakpoints: {
    //     // min
    //     769: {
    //         slidesPerView: 4,
    //         // slidesPerView: auto,
    //         // slidesPerView: 2 >= itemCount ? 2 : 3,
    //         spaceBetween: 24,
    //         slidesOffsetBefore: 0,
    //         slidesOffsetAfter: 0,
    //     },
    // },
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    on: {
      // init: function () {
      //     const thisSwiper = target.querySelector('.cmp-carousel__content');
      //     const slideLength = thisSwiper.querySelectorAll('.swiper-slide').length;
      //     if (slideLength >= 2) {
      //         thisSwiper.style.left = '-12px';
      //     };
      // },
      // slideChange: function (el) {
      //     const thisSwiper = target.querySelector('.cmp-carousel__content');
      //     const slideIndex = el.activeIndex;
      //     // console.log(lastSlide);
      //     if (slideIndex === 0) {
      //         thisSwiper.style.left = '-12px';
      //         thisSwiper.style.right = 'auto';
      //     } else {
      //         thisSwiper.style.left = 'auto';
      //         // thisSwiper.style.right = 'auto';
      //     }
      // },
      // reachEnd: function () {
      //     target.querySelector('.cmp-carousel__content').style.left = 'auto';
      //     target.querySelector('.cmp-carousel__content').style.right = '-12px';
      // },
    },
  });
};

// const classfier = function (type, target) {
//     // let { swiper = undefined } = target;
//     switch (type) {
//         case 'swiper init':
//             return swiperInit(target);
//         case 'swiper destroy':
//             target.swiper.destroy(true, true);
//             // eslint-disable-next-line no-param-reassign
//             target.swiper = undefined;
//             return;

//         default:
//             return console.log('non case');
//     }
// };
// init

const carouselOption2 = {
  pagination: behavior.pagination,
  speed: 500,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  allowTouchMove: true,
  lazy: false,
  spaceBetween: 24,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: 2,
      slidesPerGroup: 8,
      grid: {
        rows: 4,
      },
    },
  },
};

const swiperInit2 = function (target) {
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption2,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

// const addBtnMore = function (target, items, addFlag = true) {
//     const max = 3;
//     const ctaAreaColumn = target.closest('.carousel').querySelector('.c-cta');
//     const button = ctaAreaColumn.querySelector('.c-button');
//     // preset
//     if (max >= items.length && addFlag) ctaAreaColumn.classList.add('hidden');
//     if (max < items.length) ctaAreaColumn.classList.remove('hidden');
//     if (!addFlag) ctaAreaColumn.classList.add('hidden');
//     items.forEach((item, index) => {
//         if (index > max - 1 && addFlag) item.classList.add('hidden');
//     });
//     // event listening
//     const handler = function (event) {
//         event.preventDefault();
//         [...items].filter(item => item.classList.contains('hidden'))
//              .forEach(item => item.classList.remove('hidden'));
//         this.classList.remove('hidden');
//         ctaAreaColumn.classList.add('hidden');
//     };
//     if (!addFlag) return button.removeEventListener('click', handler);
//     button.addEventListener('click', handler, false);
// };

const classfier = function (type, target) {
  // let { swiper = undefined } = target;
  switch (type) {
    case 'swiper init2':
      return swiperInit2(target);
    case 'swiper destroy':
      target.swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.swiper = undefined;
      return;
    // case 'add more button':
    // return addBtnMore(target, items);
    // case 'remove more button':
    // return addBtnMore(target, items, false);
    default:
      return console.log('non case');
  }
};

function init2() {
  const component = document.querySelectorAll('.type-manual-software');
  if (beforeLaunch(component)) return false;

  // carousel
  const carousel = document.querySelectorAll('.type-manual-software .c-carousel');
  if (beforeLaunch(carousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);

  // no swiper
  // item.length <= 1 isMobile
  // item.length <= 4 isWeb
  // type:home isMobile

  // more
  // type:home isMobile

  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    const webNum = 4;
    const mobileNum = 1;
    component.forEach(function (element) {
      const typeHome = element.classList.contains('type-home');
      const target = element.querySelector('.c-carousel');
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
      if (num < items.length && carouselNone) return classfier('swiper init2', target);
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}
init2();
function init() {
  const component = document.querySelectorAll('.CS0028 .type-home');
  if (beforeLaunch(component)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);

  const viewChangeHandler = function (mediaQueryList) {
    component.forEach(function (element) {
      const itemCount = element.querySelectorAll('.swiper-slide').length;
      const isWeb = mediaQueryList.matches;
      const typeHome = element.classList.contains('type-home');
      const target = element.querySelector('.c-carousel');
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      if ((typeHome && !isWeb) || (!isWeb && carouselNone)) {
        classfier('swiper init', target);
      }
      if (typeHome && !isWeb && itemCount < 2) {
        // eslint-disable-next-line no-param-reassign
        element.querySelector('.c-carousel__handler').style.display = 'none';
        const slide2Class = element.classList.contains('type-banner__slide2');
        if (slide2Class) {
          element.classList.remove('full');
        }
        // eslint-disable-next-line no-unused-expressions
        carouselHas && classfier('swiper destroy', target);
      }
      if (typeHome && isWeb && itemCount < 5) {
        // eslint-disable-next-line no-unused-expressions
        return carouselHas && classfier('swiper destroy', target);
      }

      return swiperInit(element);
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}

init();

// eslint-disable-next-line new-cap, no-unused-vars
const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 4,
});

const inputEvent = {
  textClear() {
    const buttonDelete = document.querySelectorAll('.c-button-delete');
    const input = document.querySelectorAll('.textInput__input');
    buttonDelete.forEach(el => {
      el.addEventListener('click', () => {
        input.forEach(el3 => {
          // eslint-disable-next-line no-param-reassign
          el3.value = '';
          el3.focus(); // 20230307
        });
        el.classList.remove('c-button-delete--active');
      });
    });
  },
  deleteButtonOn() {
    const buttonDelete = document.querySelectorAll('.c-button-delete');
    const input = document.querySelectorAll('.textInput__input');
    input.forEach(el => {
      el.addEventListener('click', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
          }
        });
      });
      el.addEventListener('keyup', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
          }
        });
      });
    });
  },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
  },
};

inputEvent.init();

// 20230328 add script
function tooltipToggle() {
  const tooltipOpenButton = document.querySelector('.c-header-tooltip-button');
  const tooltipCloseButton = document.querySelector('.c-header-tooltip__button-close');
  const tooltip = document.querySelector('.c-header-tooltip');

  tooltipOpenButton.addEventListener('click', () => {
    tooltip.classList.add('c-header-tooltip--active');
  });

  tooltipCloseButton.addEventListener('click', () => {
    tooltip.classList.remove('c-header-tooltip--active');
  });
}

tooltipToggle();
