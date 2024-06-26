import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const carouselOption = {
  pagination: behavior.pagination,
  slidesPerView: 4,
  spaceBetween: 10,
  on: {
    init(swiper) {
      console.log(swiper);
      if (swiper.wrapperEl.childElementCount > 4) {
        console.log(swiper.wrapperEl.childElementCount);
        swiper.wrapperEl.closest('.swiper-initialized')?.classList.add('my-profile__swiper--play');
      }
    },
  },
};

const swiperInit = function (component, option) {
  const nextEl = component.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = component.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(component, {
    ...option,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

function init() {
  const component = document.querySelectorAll('.ML0100M');
  if (beforeLaunch(component)) return false;
  const categorySwiperAreas = document.querySelectorAll('.my-profile__swiper');
  categorySwiperAreas.forEach(c => {
    swiperInit(c, carouselOption);
  });
}
init();
