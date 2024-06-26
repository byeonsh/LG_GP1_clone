import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  centeredSlides: false,
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 24,
      allowTouchMove: false,
    },
    [bp.tablet + 1]: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 24,
      allowTouchMove: false,
    },
  },
  on: {
    breakpoint: behavior.togglePagination(),
  },
};

const swiperInit = function (target) {
  const bodySwiper = target.querySelector('.c-carousel');
  const nextButton = target.querySelector('.js-carousel-next');
  const prevButton = target.querySelector('.js-carousel-prev');
  const paginationEl = target.querySelector(behavior.pagination.el);

  return runCarousel(bodySwiper, {
    ...carouselOption,
    pagination: {
      ...behavior.pagination,
      el: paginationEl,
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
};

function init(elements = null) {
  const component = elements || document.querySelectorAll('.PR0007');
  if (beforeLaunch(component)) return false;
  const gallerySwiper = document.querySelectorAll('.PR0007 .cmp-container');
  return swiperInit(gallerySwiper[0]);
}
init();
