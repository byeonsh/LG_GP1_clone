// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
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
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    [bp.mobile + 1]: {
      slidesPerView: 3,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
    [bp.tablet + 1]: {
      slidesPerView: 4,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
  },
  on: {
    breakpoint: behavior.togglePagination(),
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

function init() {
  const component = document.querySelectorAll('.ST0040');
  if (beforeLaunch(component)) return false;

  const carousel = document.querySelectorAll('.ST0040 .c-carousel');
  if (beforeLaunch(carousel)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    const webNum = 4;
    const mobileNum = 1;
    component.forEach(function (element) {
      const target = element.querySelector('.c-carousel');
      if (target) {
        const items = target.querySelectorAll('.swiper-slide');
        const num = mediaQueryList.matches ? webNum : mobileNum;
        const carouselHas = target.swiper !== undefined;
        const carouselNone = target.swiper === undefined;
        // type:category(default)
        if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
        if (num < items.length && carouselNone) return classfier('swiper init', target);
      }
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler);
}
init();
// export default
