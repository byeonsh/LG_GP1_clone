// import module
import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

// Swiper Option
const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  slidesPerView: 1,
  spaceBetween: 10,
  grid: {
    rows: 4,
  },
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: 4,
      spaceBetween: 24,
      grid: {
        rows: 2,
      },
      pagination: {
        enabled: true,
      },
    },
  },
  on: {
    breakpoint: behavior.togglePagination(),
  },
};

// Swiper Method
const swiperInit = target => {
  const carousel = target.querySelector('.c-carousel');
  if (carousel === null) return false;
  const nextEl = carousel.querySelector('.js-carousel-next');
  const prevEl = carousel.querySelector('.js-carousel-prev');

  return runCarousel(carousel, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

// component
function init() {
  const component = document.querySelectorAll('.PD0022');
  if (beforeLaunch(component)) return false;

  component.forEach(el => swiperInit(el, carouselOption));
}
init();
// export default
