import { bp } from '../../assets/js/common/constant.js';
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
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: 2,
      spaceBetween: 24,
      allowTouchMove: false,
    },
    [bp.tabletMiddle + 1]: {
      slidesPerView: 3,
      spaceBetween: 24,
      allowTouchMove: false,
    },
    [bp.tablet + 1]: {
      slidesPerView: 4,
      spaceBetween: 24,
      allowTouchMove: false,
    },
  },
};

const swiperInit = function (target) {
  const swiperFraction = target.closest('.carousel').querySelector('.c-carousel__pagination');
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

const addBtnMore = function (target, items, addFlag = true) {
  const max = 5;
  const ctaAreaColumn = target.closest('.carousel').querySelector('.c-cta');
  const button = ctaAreaColumn.querySelector('.c-button');
  // preset
  if (max >= items.length && addFlag) ctaAreaColumn.classList.add('hidden');
  if (max < items.length) ctaAreaColumn.classList.remove('hidden');
  if (!addFlag) ctaAreaColumn.classList.add('hidden');
  items.forEach((item, index) => {
    if (index > max - 1 && addFlag) item.classList.add('hidden');
  });
  // event listening
  const handler = function (event) {
    event.preventDefault();
    [...items].filter(item => item.classList.contains('hidden')).forEach(item => item.classList.remove('hidden'));
    this.classList.remove('hidden');
    ctaAreaColumn.classList.add('hidden');
  };
  if (!addFlag) return button.removeEventListener('click', handler);
  button.addEventListener('click', handler, false);
};

const classfier = function (type, target, items = null) {
  // let { swiper = undefined } = target;
  switch (type) {
    case 'swiper init':
      return swiperInit(target);
    case 'swiper destroy':
      target.swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.swiper = undefined;
      return;
    case 'add more button':
      return addBtnMore(target, items);
    case 'remove more button':
      return addBtnMore(target, items, false);
    default:
      return console.log('non case');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.ST0006');
  if (beforeLaunch(component)) return false;

  // carousel
  const carousel = document.querySelectorAll('.ST0006 .c-carousel');
  if (beforeLaunch(carousel)) return false;
  // eslint-disable-next-line no-unused-vars
  // const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);

  // no swiper
  // item.length <= 1 isMobile
  // item.length <= 4 isWeb
  // type:home isMobile

  // more
  // type:home isMobile

  const viewChangeHandler = function () {
    const ww = window.innerWidth;

    const desktopSize = ww >= bp.tablet + 1;
    const tabletSize = ww >= bp.tabletMiddle + 1 && ww <= bp.tablet;
    const tabletMiddleSize = ww >= bp.mobile + 1 && ww <= bp.tabletMiddle;
    const mobileSize = ww <= bp.mobile + 1;
    const isWeb = ww > bp.mobile;

    let num;

    const webNum = 4;
    const tabletNum = 2;
    const tabletMiddleNum = 2;
    const mobileNum = 1;

    if (desktopSize) num = webNum;
    if (tabletSize) num = tabletNum;
    if (tabletMiddleSize) num = tabletMiddleNum;
    if (mobileSize) num = mobileNum;

    component.forEach(function (element) {
      const typeHome = element.classList.contains('type-home');
      const target = element.querySelector('.c-carousel');
      const items = target.querySelectorAll('.swiper-slide');
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      // type:home
      if (typeHome && isWeb) {
        classfier('remove more button', target, items);
      }
      if (typeHome && !isWeb) {
        // eslint-disable-next-line no-unused-expressions
        carouselHas && classfier('swiper destroy', target);
        return classfier('add more button', target, items);
      }
      // type:category(default)
      if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
      if (num < items.length && carouselNone) return classfier('swiper init', target);
    });
  };
  viewChangeHandler();
  window.addEventListener('resize', viewChangeHandler, false);
}
init();
