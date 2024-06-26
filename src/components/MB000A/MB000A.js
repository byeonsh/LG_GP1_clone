// import module
import { beforeLaunch, togglePasswordField } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
// component

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
  spaceBetween: 10,
  // slidesPerView: 2,
  breakpoints: {
    [bp.mobile + 1]: {
      slidesPerView: 3,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
    [bp.tablet + 1]: {
      slidesPerView: 4,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
  },
  on: {
    breakpoint: behavior.togglePagination(),
  },
};

console.log(carouselOption);

// eslint-disable-next-line no-unused-vars
const swiperInit = (el, option) => {
  const nextEl = el.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = el.closest('.carousel').querySelector('.js-carousel-prev');

  const swiper = runCarousel(el, {
    ...carouselOption,
    navigation: {
      prevEl,
      nextEl,
    },
  });

  return swiper;
};

// eslint-disable-next-line no-unused-vars
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
    default:
      return console.log('non case');
  }
};
// RO SG,ES
// const expandEvent = (target, btn) => {
//     const getAriaExpand = btn.getAttribute('aria-expanded');
//     if (getAriaExpand === 'true') {
//         btn.setAttribute('aria-expanded', 'false');
//         target.classList.remove('expanded');
//     } else {
//         btn.setAttribute('aria-expanded', 'true');
//         target.classList.add('expanded');
//     }
// };
// RO SG,ES
// const moreText = btn => {
//     const targetId = btn.getAttribute('aria-controls');
//     const target = document.querySelector(`#${targetId}`);
//     btn.addEventListener('click', () => {
//         expandEvent(target, btn);
//     });
// };
function init() {
  const component = document.querySelectorAll('.my-component');
  if (beforeLaunch(component)) return false;

  const carousel = document.querySelectorAll('.my-component .c-carousel');
  if (beforeLaunch(carousel)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = mediaQueryList => {
    const webNum = 4;
    const mobileNum = 1;
    component.forEach(element => {
      const target1 = element.querySelector('.my-listbox');
      if (target1) {
        carouselOption.slidesPerView = '2';
        const items = target1.querySelectorAll('.swiper-slide');
        const num = mediaQueryList.matches ? webNum : mobileNum;
        const carouselHas = target1.swiper !== undefined;
        const carouselNone = target1.swiper === undefined;
        // type:category(default)
        if (num >= items.length && carouselHas) return classfier('swiper destroy', target1);
        if (num < items.length && carouselNone) return classfier('swiper init', target1);
      }
      const target2 = element.querySelector('.my-resources');
      if (target2) {
        carouselOption.slidesPerView = '1';
        const items = target2.querySelectorAll('.swiper-slide');
        const num = mediaQueryList.matches ? webNum : mobileNum;
        const carouselHas = target2.swiper !== undefined;
        const carouselNone = target2.swiper === undefined;
        // type:category(default)
        if (num >= items.length && carouselHas) return classfier('swiper destroy', target2);
        if (num < items.length && carouselNone) return classfier('swiper init', target2);
      }
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler);

  // RO SG.ES
  // const component2 = document.querySelector('.MB000A');
  // const moreBtn = component2.querySelectorAll('.js-more-text-trigger');
  // moreBtn.forEach(btn => {
  //     moreText(btn);
  // });
}
init();
togglePasswordField('.MB000A .my-form__eye');
