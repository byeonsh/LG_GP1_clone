import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const desktopView = 3;
const tabletView = 2;
// const mobileView = 1.1;
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
  // slidesPerView: mobileView,

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
  const topSwiper = target.closest('.CS0009').querySelector('.type-banner__slide2 .c-carousel--gallery');
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
      init() {
        const thisSwiper = target.querySelector('.cmp-carousel__content');
        const slideLength = thisSwiper.querySelectorAll('.swiper-slide').length;
        if (slideLength >= 2) {
          thisSwiper.style.left = '-12px';
        }
      },
      slideChange(el) {
        const thisSwiper = target.querySelector('.cmp-carousel__content');
        const slideIndex = el.activeIndex;

        // console.log(lastSlide);
        if (slideIndex === 0) {
          thisSwiper.style.left = '-12px';
          thisSwiper.style.right = 'auto';
        } else {
          thisSwiper.style.left = 'auto';
          // thisSwiper.style.right = 'auto';
        }
      },
      reachEnd() {
        // eslint-disable-next-line no-param-reassign
        target.querySelector('.cmp-carousel__content').style.left = 'auto';
        // eslint-disable-next-line no-param-reassign
        target.querySelector('.cmp-carousel__content').style.right = '-12px';
      },
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
function init() {
  const component = document.querySelectorAll('.CS0009 .type-home');
  if (beforeLaunch(component)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  component.forEach(target => {
    return swiperInit(target);
  });

  const viewChangeHandler = function (mediaQueryList) {
    component.forEach(function (element) {
      const itemCount = element.querySelectorAll('.swiper-slide').length;
      const isWeb = mediaQueryList.matches;
      const typeHome = element.classList.contains('type-home');
      const target = element.querySelector('.c-carousel');
      const carouselHas = target.swiper !== undefined;
      if (typeHome && !isWeb) {
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
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}

init();
