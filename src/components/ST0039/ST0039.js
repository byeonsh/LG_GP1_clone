import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp, isRTL } from '../../assets/js/common/constant.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const desktopView = 6;
const mobileView = 1;

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
  slidesPerView: mobileView,
  spaceBetween: 25,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: desktopView,
      allowTouchMove: false,
      spaceBetween: 12,
      pagination: {
        enabled: true,
      },
    },
    [bp.tablet + 1]: {
      slidesPerView: desktopView,
      allowTouchMove: false,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
  },
};

const swiperInit = el => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  runCarousel(el, {
    ...carouselOption,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

const classfier = function (type, target) {
  // let { swiper = undefined } = target;
  switch (type) {
    case 'swiper init':
      return swiperInit(target);
    case 'swiper destroy':
      target.swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.swiper = undefined;
      return;
    default:
      return console.log('non case');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.ST0039');
  if (beforeLaunch(component)) return false;

  const carousel = document.querySelectorAll('.ST0039 .c-carousel');
  if (beforeLaunch(carousel)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    const webNum = 6;
    const mobileNum = 1;
    carousel.forEach(function (element) {
      const target = element;
      if (target) {
        const items = target.querySelectorAll('.swiper-slide');
        const num = mediaQueryList.matches ? webNum : mobileNum;
        const carouselHas = target.swiper !== undefined;
        const carouselNone = target.swiper === undefined;
        // type:category(default)
        if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
        if (num < items.length && carouselNone) return classfier('swiper init', target);
      }
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler);

  const tablist = document.querySelector('.ST0039 .cmp-tabs .cmp-tabs__tablist');
  // Resize event(tab align)
  window.addEventListener('resize', function () {
    const obj = document.querySelector('.cmp-tabs__tab--active');
    const activeTabPos = obj.offsetLeft;
    const w = obj.clientWidth;
    const scrollSize = activeTabPos - 25;
    const scrollSizeRTL = document.body.clientWidth - activeTabPos - w - 25;
    if (isRTL) {
      tablist.scrollTo(-scrollSizeRTL, 0);
    } else {
      tablist.scrollTo(scrollSize, 0);
    }
  });
}

init();
