import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const desktopView = 6;
const tabletView = 3;
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
  slidesPerView: mobileView,
  spaceBetween: 25,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: tabletView,
      allowTouchMove: false,
      spaceBetween: 24,
    },
    [bp.tablet + 1]: {
      slidesPerView: desktopView,
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
const swiperInit2 = function (target) {
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
    },
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      [bp.mobile + 1]: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      [bp.tablet + 1]: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
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
    case 'swiper init qrcode':
      return swiperInit2(target);
    default:
      return console.log('non case');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.ST0018');
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
      const qrTarget = element.querySelector('.c-qr-list .c-carousel');
      const items = target.querySelectorAll('.swiper-slide');
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      if (num >= items.length && carouselHas) {
        return classfier('swiper destroy', target);
      }
      if (num < items.length && carouselNone && !qrTarget) {
        return classfier('swiper init', target);
      }
      if (num < items.length && carouselNone && qrTarget) {
        return classfier('swiper init qrcode', target);
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
