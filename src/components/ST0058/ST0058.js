import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp } from '../../assets/js/common/constant.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  runCarousel(el, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

// init
function init() {
  const swiper = document.querySelectorAll('.ST0058 .swiper');
  if (beforeLaunch(swiper)) return false;

  swiper.forEach(el => {
    const carouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: 2,
      slidesPerGroup: 6,
      grid: {
        rows: 3,
      },
      spaceBetween: 10,
      on: {
        breakpoint: behavior.togglePagination(),
      },
      breakpoints: {
        [bp.mobile + 1]: {
          slidesPerView: 2,
          grid: {
            rows: 3,
          },
          spaceBetween: 24,
        },
        [bp.tablet + 1]: {
          slidesPerView: 3,
          grid: {
            rows: 2,
          },
          spaceBetween: 24,
        },
      },
    };
    swiperInit(el, carouselOption);
  });
}

init();
