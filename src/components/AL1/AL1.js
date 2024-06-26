import { beforeLaunch } from '../../assets/js/common/utils.js';
import heroCarousel from '../../assets/js/common/heroCarousel.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
import popUp from '../../assets/js/common/popUp.js';

// init
function init() {
  function ST0048() {
    const component = document.querySelectorAll('.AL1.ST0048');
    if (beforeLaunch(component)) return false;

    // carousel
    const carousel = [...component].map(c => c.querySelector('.swiper'));
    const onlyComponentCarousel = carousel.filter(el => !el.closest('.c-hero-banner__contents'));
    if (beforeLaunch(onlyComponentCarousel)) return false;

    onlyComponentCarousel.forEach(target => {
      const carouselEventType = target.dataset.cmpAutoplay;
      const carouselOption = {
        type: carouselEventType,
      };
      heroCarousel(target, carouselOption);
    });
  }

  const carouselOption = {
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    loop: false,
    speed: 500,
    autoplay: false,
    preloadImages: false,
    allowTouchMove: true,
    lazy: false,
    slidesPerView: 2,
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
  function ST0023() {
    // component
    const component = document.querySelectorAll('.AL1.ST0023');
    if (beforeLaunch(component)) return false;
    const popupCont = document.querySelectorAll('.AL1.ST0023 .js-open-popup');
    // window popup
    if (popupCont.length) {
      popUp(popupCont);
    }

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

  ST0023();
  ST0048();
}

init();
