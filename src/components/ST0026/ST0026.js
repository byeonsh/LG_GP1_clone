import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const carouselOption = {
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: 1,
  spaceBetween: 0,
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

// init
function init() {
  const component = document.querySelectorAll('.ST0026');
  if (beforeLaunch(component)) return false;

  // carousel
  const carousel = document.querySelectorAll('.ST0026 .c-carousel');
  if (beforeLaunch(carousel)) return false;
  component.forEach(function (element) {
    const target = element.querySelector('.swiper');
    const items = target.querySelectorAll('.swiper-slide');
    // Run swiper when there are more than 2 items
    if (items.length >= 2) return swiperInit(target);
  });
}
init();
