import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

// init
function init() {
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  // const isWeb = breakpoint.matches;
  const carouselOption = {
    keyboard: behavior.useKeyInteraction,
    speed: 500,
    allowTouchMove: true,
    observer: true,
  };
  const carouselOptionBase = {
    ...carouselOption,
    loop: false,
    autoplay: false,
    preloadImages: false,
    lazy: false,
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: false,
    breakpoints: {
      [bp.mobile + 1]: {
        loopFillGroupWithBlank: false,
        resizeObserver: true,
        updateOnWindowResize: true,
        allowTouchMove: true,
        observer: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 24,
        initialSlide: 1,
      },
    },
    on: {
      breakpoint: behavior.togglePagination(),
    },
  };
  const swiperInit = function (target) {
    const nextEl = target.closest('.carousel').querySelector('.c-pagination__action--next');
    const prevEl = target.closest('.carousel').querySelector('.c-pagination__action--prev');
    const countEl = target.closest('.carousel').querySelector('.c-pagination__fraction');
    runCarousel(target, {
      ...carouselOptionBase,
      navigation: {
        nextEl,
        prevEl,
      },
      pagination: {
        el: countEl,
        type: 'fraction',
        // enabled: true,
      },
    });
  };
  const classfier = function (type, target) {
    switch (type) {
      case 'swiper init':
        // console.log(target.closest('.carousel').querySelector('.c-carousel__handler'));
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

  function AL0016(mediaQueryList) {
    // component
    const component = document.querySelectorAll('.AL0016');
    if (beforeLaunch(component)) return false;
    const webNum = 2;
    const mobileNum = 1;
    component.forEach(function (element) {
      const target = element.querySelector('.c-carousel');
      const items = target.querySelectorAll('.swiper-slide');
      const num = mediaQueryList.matches ? webNum : mobileNum;
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      if (carouselHas) {
        classfier('swiper destroy', target);
        classfier('swiper init', target);
      }
      if (num >= items.length && carouselHas) {
        classfier('swiper destroy', target);
      }
      if (num < items.length && carouselNone) {
        classfier('swiper init', target);
      }
    });
  }
  const viewChangeHandler = function (mediaQueryList) {
    AL0016(mediaQueryList);
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler);
}

init();
