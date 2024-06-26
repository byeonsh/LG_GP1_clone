// import module
import runCarousel, { behavior } from './carousel.js';
import { beforeLaunch } from './utils.js';
import { bp, columns, margin } from './constant.js';

const swiperInit = function (target, option) {
  const nextEl = target.closest('.c-carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.c-carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...option,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};
export const similarProductCarousel = function () {
  const similarProductsOption = {
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      // min
      [columns(4 * 2, 'mobile') + 25 * 2]: {
        // 680
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
          enabled: true,
        },
      },
      [bp.mobile + 1]: {
        slidesPerView: 2,
        spaceBetween: 24,
        pagination: {
          enabled: true,
        },
      },
      [columns(9) + margin['inset padding'] * 2]: {
        // 1122
        slidesPerView: 3,
        spaceBetween: 24,
        pagination: {
          enabled: true,
        },
      },
      // [columns(12) + margin['inset padding'] * 2]: {
      //     // 1488
      //     slidesPerView: 4,
      //     spaceBetween: 24,
      //     pagination: {
      //         enabled: true,
      //     },
      // },
    },
    on: {
      breakpoint: behavior.togglePagination(),
    },
  };
  // similar Products popup
  const similarProductsPopup = document.getElementById('popSimilarProducts');
  if (beforeLaunch(similarProductsPopup)) return false;
  const similarProductsCarousel = similarProductsPopup.querySelectorAll('.swiper');
  if (beforeLaunch(similarProductsCarousel)) return false;
  similarProductsCarousel.forEach(el => {
    swiperInit(el, similarProductsOption);
  });
};

export default {};
