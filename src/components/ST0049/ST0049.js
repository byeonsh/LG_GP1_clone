import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  slidesPerView: 1,
  spaceBetween: 10,
  on: {
    breakpoint: behavior.togglePagination(),
  },
};
const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  const carousel = el.querySelector('.swiper');
  runCarousel(carousel, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

// init
function init() {
  const component = document.querySelectorAll('.ST0049');
  if (beforeLaunch(component)) return false;

  component.forEach(el => swiperInit(el, carouselOption));
}

init();
