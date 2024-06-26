// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

const awardOptions = [
  {
    className: '.c-award-category-slide',
    option: {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      on: {
        breakpoint: behavior.togglePagination(),
      },
    },
  },
  {
    className: '.c-award-slide',
    option: {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: 1,
      spaceBetween: 0,
      grid: {
        rows: 3,
      },
      on: {
        breakpoint: behavior.togglePagination(),
      },
    },
  },
];

const handlerCheck = el => {
  const itemWraps = [...el.querySelectorAll('.c-award-slide')];
  const setData = element => {
    const total = element.querySelector('.swiper-pagination-total');
    const handler = element.querySelector('.c-carousel__handler');

    if (Number(total.innerText) === 1) {
      handler.style.display = 'none';
    } else {
      handler.style.display = 'flex';
    }
  };
  itemWraps.map(parent => setData(parent));
};

const swiperInit = (el, data) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  const carousel = el.querySelector('.swiper');
  const itemCount = el.querySelectorAll('.swiper-slide').length;
  const categoryBreak = {
    // min
    [bp.mobile + 1]: {
      slidesPerView: itemCount > 2 ? 3 : 2,
      slidesPerGroup: itemCount > 2 ? 3 : 2,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
    [bp.tablet + 1]: {
      slidesPerView: itemCount > 2 ? 4 : 2,
      slidesPerGroup: itemCount > 2 ? 4 : 2,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
  };
  const awardBreak = {
    // min
    [bp.mobile + 1]: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 40,
      grid: {
        rows: 1,
      },
      pagination: {
        enabled: true,
      },
    },
    [bp.tablet + 1]: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 40,
      grid: {
        rows: 1,
      },
      pagination: {
        enabled: true,
      },
    },
  };

  const setSwiper = options => {
    const { className, option } = options;
    const innerOption = {
      ...option,
      breakpoints:
        (className === '.c-award-category-slide' && categoryBreak) || (className === '.c-award-slide' && awardBreak),
      navigation: {
        prevEl,
        nextEl,
      },
    };

    if (el.querySelector(className)) {
      runCarousel(carousel, innerOption);
    }
  };

  data.map(val => setSwiper(val));
};

// component
function init() {
  const component = document.querySelectorAll('.ST0053');
  if (beforeLaunch(component)) return false;

  // swiper Event
  component.forEach(el => swiperInit(el, awardOptions));

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
