import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

// init
function init() {
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const isWeb = breakpoint.matches;
  const carouselOption = {
    keyboard: behavior.useKeyInteraction,
    speed: 500,
    allowTouchMove: true,
    observer: true,
    loop: false,
    autoplay: false,
    preloadImages: false,
    lazy: false,
    slidesPerView: '2',
    spaceBetween: null,
  };
  const swiperInit = function (target) {
    const nextEl = target.closest('.carousel').querySelector('.c-pagination__action--next');
    const prevEl = target.closest('.carousel').querySelector('.c-pagination__action--prev');
    const countEl = target.closest('.carousel').querySelector('.c-pagination__fraction');
    return runCarousel(target, {
      ...carouselOption,
      navigation: {
        nextEl,
        prevEl,
      },
      pagination: {
        el: countEl,
        type: 'fraction',
      },
    });
  };
  function AL0014() {
    // component
    const component = document.querySelectorAll('.AL0014');
    if (beforeLaunch(component)) return false;
    // swiper
    function carouselControl(element) {
      const target = element.querySelector('.c-carousel');
      swiperInit(target);
    }
    component.forEach(function (element) {
      const target = element.querySelectorAll('.c-carousel');
      const itemNum = element.querySelectorAll('.swiper-slide');
      if (beforeLaunch(target)) return false;
      if (isWeb && itemNum.length > 2) {
        carouselControl(element);
      }
      if (isWeb && itemNum.length <= 2) {
        target.forEach(function (el) {
          const targetPagination = el.querySelector('.cmp-carousel__pagenation');
          targetPagination.style.display = 'none';
        });
      }
      if (!isWeb && itemNum.length > 1) {
        carouselOption.slidesPerView = '1';
        target.forEach(function (el) {
          const targetPagination = el.querySelector('.cmp-carousel__pagenation');
          targetPagination.style.display = 'block';
        });
        carouselControl(element);
      }
    });
  }
  AL0014();
}
init();
