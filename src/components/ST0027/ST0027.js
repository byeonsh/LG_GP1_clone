// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  const carousel = el.querySelector('.swiper');
  const carouselWraps = el.querySelector('.c-summary-box');
  const itemLength = carouselWraps.querySelectorAll('.cmp-carousel__item').length;

  runCarousel(carousel, {
    ...option,
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    spaceBetween: 10,
    slidesPerView: 2,
    on: {
      breakpoint: behavior.togglePagination(),
    },
    navigation: {
      prevEl,
      nextEl,
    },
    breakpoints: {
      [bp.mobile + 1]: {
        slidesPerView: itemLength > 4 ? 4 : itemLength,
        spaceBetween: 24,
        pagination: {
          enabled: true,
        },
      },
    },
  });
};

const handlerCheck = el => {
  const itemWraps = [...el.querySelectorAll('.c-summary-box')];
  const breakpoint = window.innerWidth;

  const setData = element => {
    const handler = element.querySelector('.c-carousel__handler');
    const swiperWrapper = element.querySelector('.swiper-wrapper');

    if (breakpoint > bp.mobile) {
      handler.style.display = 'flex';
    } else {
      handler.style.display = 'none';
      swiperWrapper.style.transform = 'translate3d(0, 0, 0)';
    }
  };
  itemWraps.map(element => setData(element));
};

// component
function init() {
  const component = document.querySelectorAll('.ST0027');
  if (beforeLaunch(component)) return false;

  // initialize carousel
  component.forEach(el => swiperInit(el));

  // handler check
  component.forEach(el => handlerCheck(el));

  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => component.forEach(el => handlerCheck(el)), 100);
  });
}
init();
// export default
