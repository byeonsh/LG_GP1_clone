// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp, margin, columns, carouselPerView } from '../../assets/js/common/constant.js';
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

const swiperMulti2Init = () => {
  const swiperMulti2 = document.querySelectorAll('.PR0013 .multirow2 .swiper');
  if (beforeLaunch(swiperMulti2)) return false;

  swiperMulti2.forEach(el => {
    const carouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: carouselPerView.small,
      spaceBetween: 10,
      on: {
        breakpoint: behavior.togglePagination(),
      },
      breakpoints: {
        [columns(4 * 2, 'mobile') + 25 * 2]: {
          // 680
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
          spaceBetween: 10,
          pagination: {
            enabled: true,
          },
        },
        [bp.mobile + 1]: {
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
          spaceBetween: 24,
          pagination: {
            enabled: true,
          },
        },
        [columns(9) + margin['inset padding'] * 2]: {
          // 1122
          slidesPerView: 3,
          slidesPerGroup: 3,
          grid: {
            rows: 2,
          },
          spaceBetween: 24,
          pagination: {
            enabled: true,
          },
        },
        [columns(12) + margin['inset padding'] * 2]: {
          // 1488
          slidesPerView: 4,
          slidesPerGroup: 4,
          grid: {
            rows: 2,
          },
          spaceBetween: 24,
          pagination: {
            enabled: true,
          },
        },
      },
    };
    swiperInit(el, carouselOption);
  });
};
const swiperMulti3Init = () => {
  const swiperMulti3 = document.querySelectorAll('.PR0013 .multirow3 .swiper');
  if (beforeLaunch(swiperMulti3)) return false;

  swiperMulti3.forEach(el => {
    const carouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: carouselPerView.small,
      spaceBetween: 10,
      on: {
        breakpoint: behavior.togglePagination(),
      },
      breakpoints: {
        [columns(4 * 2, 'mobile') + 25 * 2]: {
          // 680
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
          spaceBetween: 10,
          pagination: {
            enabled: true,
          },
        },
        [bp.mobile + 1]: {
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
          spaceBetween: 24,
          pagination: {
            enabled: true,
          },
        },
        [columns(9) + margin['inset padding'] * 2]: {
          // 1122
          slidesPerView: 3,
          slidesPerGroup: 3,
          grid: {
            rows: 3,
          },
          spaceBetween: 24,
          pagination: {
            enabled: true,
          },
        },
        [columns(12) + margin['inset padding'] * 2]: {
          // 1488
          slidesPerView: 4,
          slidesPerGroup: 4,
          grid: {
            rows: 3,
          },
          spaceBetween: 24,
          pagination: {
            enabled: true,
          },
        },
      },
    };
    swiperInit(el, carouselOption);
  });
};

// Init
swiperMulti2Init();
swiperMulti3Init();
