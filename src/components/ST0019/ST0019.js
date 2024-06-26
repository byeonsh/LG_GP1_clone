import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

// 카루젤 옵션
const casouselCommonOption = {
  keyboard: behavior.useKeyInteraction,
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  spaceBetween: 16,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      spaceBetween: 24,
    },
  },
};
const carouselThumbnailOption = {
  ...casouselCommonOption,
  // custom
  slidesPerView: 4,
  spaceBetween: 10,
  centerInsufficientSlides: true,
  watchSlidesProgress: true,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      spaceBetween: 20,
    },
  },
};

const carouselOption = {
  ...casouselCommonOption,
  // custom
  slidesPerView: 'auto',
  spaceBetween: 16,
  speed: 500,
  loop: false,
  autoplay: false,
  centeredSlides: true,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: '1',
      spaceBetween: 20,
    },
  },
};

const swiperInit = function (target) {
  const bodySwiper = target.querySelector('.c-carousel--gallery');
  const thumbSwiper = target.querySelector('.c-carousel--thumbnail');
  const swiperFraction = target.querySelector('.c-carousel__pagination');
  const nextButton = target.querySelector('.js-carousel-next');
  const prevButton = target.querySelector('.js-carousel-prev');

  runCarousel(bodySwiper, {
    ...carouselOption,
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    thumbs: {
      swiper: runCarousel(thumbSwiper, carouselThumbnailOption),
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
};

// init
function init() {
  const component = document.querySelectorAll('.ST0019');
  if (beforeLaunch(component)) return false;

  const gallerySwiper = document.querySelectorAll('.ST0019 .c-gallery-container');

  gallerySwiper.forEach(target => {
    // When the number of items is less than 5,
    // the handler should not be displayed.
    const len = target.querySelectorAll('.c-carousel--thumbnail .swiper-slide').length;
    if (len <= 4) {
      target.classList.add('less-than-five');
    }
    return swiperInit(target);
  });
}

init();
