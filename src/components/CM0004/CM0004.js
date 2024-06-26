// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

// component
const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    // min
    480: {
      slidesPerView: 2,
    },
    [bp.mobile + 1]: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    [bp.tablet + 1]: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
  on: {
    breakpoint: behavior.togglePagination(),
  },
};

const swiperInit = el => {
  const nextEl = el.closest('.swiper').querySelector('.js-carousel-next');
  const prevEl = el.closest('.swiper').querySelector('.js-carousel-prev');
  runCarousel(el, {
    ...carouselOption,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

function init() {
  const component = document.querySelectorAll('.CM0004');
  if (beforeLaunch(component)) return false;
  const socialArticleCarousel = document.querySelectorAll('.CM0004 .swiper');
  // be passed check carousel elements with this component.
  // initialize carousel
  socialArticleCarousel.forEach((el, index) => {
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
