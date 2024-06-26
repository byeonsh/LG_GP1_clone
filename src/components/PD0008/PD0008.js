// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
import specs from '../../assets/js/common/specs.js';

// import popUp from '../../assets/js/common/popUp.js';

// function comparePrint(component) {
//     const popUpTarget = component.querySelectorAll('.js-open-popup');
//     if (beforeLaunch(popUpTarget)) return false;
//     popUp(popUpTarget);
// }
const slideOptions = [
  {
    className: '.spec-slide',
    option: {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: 2,
      spaceBetween: 8,
      on: {
        breakpoint: behavior.togglePagination(),
      },
    },
  },
];
const swiperInit = (el, data) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  const carousel = el.querySelector('.swiper');

  const setSwiper = options => {
    const { option } = options;
    const innerOption = {
      ...option,
      // breakpoints:
      // //     (className === '.spec-slide'),
      //     (className === '.spec-slide'),
      navigation: {
        prevEl,
        nextEl,
      },
    };

    if (el.querySelector('.c-carousel')) {
      runCarousel(carousel, innerOption);
    }
  };

  data.map(val => setSwiper(val));
};
const classfier = function (type, target) {
  // let { swiper = undefined } = target;
  switch (type) {
    case 'swiper init':
      return swiperInit(target, slideOptions);
    case 'swiper destroy':
      target.querySelector('.c-carousel').swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.querySelector('.c-carousel').swiper = undefined;
      return;
    default:
      return console.log('non case');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.PD0008');
  if (beforeLaunch(component)) return false;
  const carousel = document.querySelectorAll('.PD0008 .spec-slide');

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    if (beforeLaunch(carousel)) return false;

    const webNum = 5;
    const mobileNum = 2;
    carousel.forEach(function (element) {
      const target = element;
      if (target) {
        const items = target.querySelectorAll('.swiper-slide');
        const num = mediaQueryList.matches ? webNum : mobileNum;
        const carouselHas = target.querySelector('.c-carousel').swiper !== undefined;
        const carouselNone = target.querySelector('.c-carousel').swiper === undefined;
        // type:category(default)
        if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
        if (num < items.length && carouselNone) return classfier('swiper init', target);
      }
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler);
  component.forEach(c => {
    // const allSpecArea = c.querySelectorAll('.c-all-specs-area');
    // const allSpecsAreaMore = c.querySelectorAll('.c-all-specs-area__more');
    const openAllSpecBtn = c.querySelectorAll('.c-all-specs-area__more .c-all-specs-area__more-open button');
    const closeAllSpecBtn = c.querySelectorAll('.c-all-specs-area__more .c-all-specs-area__more-close button');
    const closeInSpecBtn = c.querySelectorAll('.c-all-specs-area__in .c-all-specs-area__more-close button');
    // console.log(allSpecsAreaMore);

    // show more
    const openEvent = event => {
      const pElem = event.currentTarget.closest('.cmp-tabs__tabpanel')
        ? event.currentTarget.closest('.cmp-tabs__tabpanel')
        : event.currentTarget.closest('.cmp-container');
      pElem.querySelector('.c-all-specs-area').classList.add('active');
      pElem.querySelectorAll('.c-all-specs-area__more-open').forEach(btn => btn.classList.remove('active'));
      pElem.querySelectorAll('.c-all-specs-area__more-close').forEach(btn => {
        btn.classList.add('active');
        event.currentTarget
          .closest('.c-all-specs-area__more')
          .querySelector('.active')
          .getElementsByClassName('c-button')[0]
          .focus();
      });
    };

    // show less
    const closeEvent = event => {
      const pElem = event.currentTarget.closest('.cmp-tabs__tabpanel')
        ? event.currentTarget.closest('.cmp-tabs__tabpanel')
        : event.currentTarget.closest('.cmp-container');
      pElem.querySelector('.c-all-specs-area').classList.remove('active');
      pElem.querySelectorAll('.c-all-specs-area__more-close').forEach(btn => btn.classList.remove('active'));
      pElem.querySelectorAll('.c-all-specs-area__more-open').forEach(btn => {
        btn.classList.add('active');
        event.currentTarget
          .closest('.c-all-specs-area__more')
          .querySelector('.active')
          .getElementsByClassName('c-button')[0]
          .focus();
      });
    };

    const closeInEvent = event => {
      const pElem = event.currentTarget.closest('.cmp-tabs__tabpanel')
        ? event.currentTarget.closest('.cmp-tabs__tabpanel')
        : event.currentTarget.closest('.cmp-container');
      pElem.querySelector('.c-all-specs-area').classList.remove('active');
      pElem.querySelectorAll('.c-all-specs-area__more-close').forEach(btn => btn.classList.remove('active'));
      pElem.querySelectorAll('.c-all-specs-area__more-open').forEach(btn => {
        btn.classList.add('active');
        event.currentTarget
          .closest('.cmp-container')
          .querySelector('.c-all-specs-area__more .active')
          .getElementsByClassName('c-button')[0]
          .focus();
      });
    };

    openAllSpecBtn?.forEach(btn => btn.addEventListener('click', openEvent));
    closeAllSpecBtn?.forEach(btn => btn.addEventListener('click', closeEvent));
    closeInSpecBtn?.forEach(btn => btn.addEventListener('click', closeInEvent));
    specs.changeText(c);
  });
}
init();
