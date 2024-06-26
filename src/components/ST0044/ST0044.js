import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const desktopView = 3;
const tabletView = 2;
const mobileView = 1;

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
  lazyPreloadPrevNext: 1,
  slidesPerView: mobileView,
  spaceBetween: 10,
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
  const component = document.querySelectorAll('.ST0044');
  if (beforeLaunch(component)) return false;
  // carousel
  const viewChangeHandler = function () {
    const ww = window.innerWidth;
    const desktopSize = ww >= bp.tablet + 1;
    const tabletSize = ww >= bp.mobile + 1 && ww <= bp.tablet;
    const mobileSize = ww <= bp.mobile + 1;
    let num;
    if (desktopSize) num = desktopView;
    if (tabletSize) num = tabletView;
    if (mobileSize) num = mobileView;
    function carouselControl(element) {
      const target = element.querySelector('.c-carousel');
      const items = target.querySelectorAll('.swiper-slide');
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      if (num >= items.length && carouselHas) {
        return classfier('swiper destroy', target);
      }
      if (num < items.length && carouselNone) {
        return classfier('swiper init', target);
      }
    }
    component.forEach(function (element) {
      const target = element.querySelectorAll('.c-carousel');
      if (beforeLaunch(target)) return false;
      carouselControl(element);
    });
  };
  viewChangeHandler();
  window.addEventListener('resize', viewChangeHandler, false);
}
init();
