import { bp, carouselPerView } from '../../assets/js/common/constant.js';
import { beforeLaunch, promotionDateChecker } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

// const desktopView = 3;
// const desktopLargeView = 2;
const tabletView = 2;
const mobileView = carouselPerView.small;

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
  spaceBetween: 10,
};

const swiperInit = function (target, columnNum) {
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
    },
    slidesPerView: mobileView,
    breakpoints: {
      // min
      [bp.mobile + 1]: {
        slidesPerView: columnNum === 1 ? columnNum : tabletView,
        slidesPerGroup: columnNum === 1 ? columnNum : tabletView,
        allowTouchMove: true,
        spaceBetween: 24,
      },
      [bp.tablet + 1]: {
        slidesPerView: columnNum,
        slidesPerGroup: columnNum,
        allowTouchMove: false,
        spaceBetween: 24,
      },
    },
    on: {
      breakpoint: behavior.togglePagination(),
    },
  });
};

const classfier = function (type, target, columnNum) {
  switch (type) {
    case 'swiper init':
      return swiperInit(target, columnNum);
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
  const component = document.querySelectorAll('.PD0041');
  if (beforeLaunch(component)) return false;
  const viewChangeHandler = function () {
    const ww = window.innerWidth;
    const desktopSize = ww >= bp.tablet + 1;
    const tabletSize = ww >= bp.mobile + 1 && ww <= bp.tablet;
    const mobileSize = ww <= bp.mobile + 1;
    let num;
    function carouselControl(element) {
      const target = element.querySelector('.c-carousel');
      let columnNum = 3;
      if (target.classList.contains('column-2')) columnNum = 2;
      else if (target.classList.contains('column-1')) columnNum = 1;
      const items = target.querySelectorAll('.swiper-slide');
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      if (desktopSize) num = columnNum;
      if (tabletSize) num = tabletView;
      if (mobileSize) num = mobileView;
      if (num >= items.length && carouselHas) {
        return classfier('swiper destroy', target, columnNum);
      }
      if (num < items.length && carouselNone) {
        return classfier('swiper init', target, columnNum);
      }
    }
    component.forEach(function (element) {
      const target = element.querySelectorAll('.c-carousel');
      if (beforeLaunch(target)) return false;
      carouselControl(element);
      promotionDateChecker(element);
    });
  };
  viewChangeHandler();
  window.addEventListener('resize', viewChangeHandler, false);
}
init();
