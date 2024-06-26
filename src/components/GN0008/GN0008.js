// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');

  const swiper = runCarousel(el, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });

  return swiper;
};

const runRecommendSwiper = function () {
  const recommendListCarousel = document.querySelectorAll('.GN0008 .swiper');
  if (beforeLaunch(recommendListCarousel)) return false;

  recommendListCarousel.forEach(el => {
    const carouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      breakpoints: {
        // min
        [bp.mobile + 1]: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 24,
        },
        [bp.tablet + 1]: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 24,
        },
      },
      on: {
        breakpoint: behavior.togglePagination(),
      },
    };
    swiperInit(el, carouselOption);
  });
};

// init
function init() {
  const component = document.querySelectorAll('.GN0008');
  if (beforeLaunch(component)) return false;

  runRecommendSwiper();
}
init();
