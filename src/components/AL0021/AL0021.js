import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

// init
function init() {
  const carouselOption = {
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    loop: false,
    speed: 500,
    autoplay: false,
    preloadImages: false,
    allowTouchMove: true,
    lazy: false,
    slidesPerView: 'auto',
    spaceBetween: 10,
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
  function AL0021() {
    // component
    const component = document.querySelectorAll('.AL0021');
    if (beforeLaunch(component)) return false;

    // swiper
    const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
    const viewChangeHandler = function (mediaQueryList) {
      const isWeb = mediaQueryList.matches;
      function carouselControl(element) {
        const target = element.querySelector('.c-carousel');
        const carouselHas = target.swiper !== undefined;
        const carouselNone = target.swiper === undefined;
        if (isWeb && carouselHas) {
          return classfier('swiper destroy', target);
        }
        if (!isWeb && carouselNone) {
          return classfier('swiper init', target);
        }
      }
      component.forEach(function (element) {
        const target = element.querySelectorAll('.c-carousel');
        if (beforeLaunch(target)) return false;
        carouselControl(element);
      });
    };
    viewChangeHandler(breakpoint);
    breakpoint.addEventListener('change', viewChangeHandler, false);
  }
  AL0021();
}

init();
