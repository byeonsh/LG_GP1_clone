// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
// component

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerGroupSkip: 1,
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
  const itemCount = el.querySelectorAll('.swiper-slide').length;
  const nextEl = el.closest('.swiper').querySelector('.js-carousel-next');
  const prevEl = el.closest('.swiper').querySelector('.js-carousel-prev');
  runCarousel(el, {
    ...carouselOption,
    slidesPerView: 1 < itemCount ? 2 : 1, // for layout
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

function init() {
  const component = document.querySelectorAll('.PD0021');
  if (beforeLaunch(component)) return false;
  const viewedProductCarousel = document.querySelectorAll('.PD0021 .swiper');
  if (beforeLaunch(viewedProductCarousel)) return false;
  // initialize carousel
  viewedProductCarousel.forEach((el, index) => {
    // running to async 1st, 2nd carousel.
    if (index > 2) {
      const chanceStackEmpty = 0;
      setTimeout(() => swiperInit(el), chanceStackEmpty);
    }
    swiperInit(el);
  });
}
init();
// export default
