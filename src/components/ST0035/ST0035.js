// import module
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
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      allowTouchMove: false,
    },
  },
};
const swiperInit = function (target) {
  const nextEl = target.closest('.c-carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.c-carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
    },
    on: {
      slideChange: swiper => {
        swiper.el.querySelectorAll('.js-video-close').forEach(btn => {
          btn.click();
        });
      },
    },
  });
};
function init() {
  // component
  const interactiveGallerySwiper = document.querySelectorAll('.c-interactive-gallery');
  if (beforeLaunch(interactiveGallerySwiper)) return false;

  // swiper
  interactiveGallerySwiper.forEach(function (element) {
    if (element.querySelectorAll('.cmp-carousel__item').length > 2) return swiperInit(element);
  });
}
init();
