// import module
import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

// const csSearchBtns = () => {
//   const items = document.querySelectorAll('.cs-search-result__all-item');
//   const isMobile = window.innerWidth < bp.mobile;
//   if (beforeLaunch(items)) return false;
//   items.forEach(el => {
//     const item = el?.querySelector('.cs-search-result__all-buttonbox');
//     const itemHeight = item?.offsetHeight;
//     // eslint-disable-next-line no-unused-expressions, no-param-reassign
//     item && isMobile ? (el.style.paddingBottom = `${itemHeight + 8}px`) : (el.style.paddingBottom = '');
//   });
// };
// const delay = 300;
// let timer = null;
// const resizeSearch = () => {
//   window.addEventListener('resize', () => {
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       csSearchBtns();
//     }, delay);
//   });
// };
const swiperInit = function (target, option) {
  const nextEl = target.closest('.c-carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.c-carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...option,
    navigation: {
      nextEl,
      prevEl,
    },
    // spaceBetween: 10,
  });
};

const toggleTable = function (event) {
  const btn = event.currentTarget;
  const container = btn.closest('.cs-search-bar__title');
  if (container.classList.contains('cs-search-bar__folded')) {
    // expand
    container.classList.remove('cs-search-bar__folded');
  } else {
    // collapse
    container.classList.add('cs-search-bar__folded');
  }
};

// component
function init() {
  const toast = document.querySelector('.cs-active-msg');
  const toastMsg = toast.querySelectorAll('.cs-active-msg__box');
  const toastMsgClose = toast.querySelectorAll('.cs-active-msg__close');
  // proactive-msg
  const toastEvent = () => {
    for (let i = 0; i < toastMsg.length; i += 1) {
      const Msg = toastMsg[i];
      const toastAction = () => {
        Msg.classList.add('cs-active-msg__box--active');
        setTimeout(() => {
          Msg.classList.remove('cs-active-msg__box--active');
        }, 4500);
      };
      const delay1 = [i] * 1000;
      setTimeout(() => {
        toastAction(true);
      }, delay1);
      const closeToast = () => {
        if (Msg.classList.contains('cs-active-msg__box--active')) {
          Msg.classList.remove('cs-active-msg__box--active');
        }
      };
      toastMsgClose[i].addEventListener('click', closeToast);
    }
  };
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(toastEvent, 1000);
  });
  // Related Promotion Carousel
  const component = document.querySelector('.c-summary-recommended-promotion');
  const fold = document.querySelectorAll('.cs-search-bar__fold');
  if (beforeLaunch(component)) return false;

  // banner carousel
  const recommendedCarousel = component.querySelector(`.swiper`);
  if (!beforeLaunch(recommendedCarousel)) {
    swiperInit(recommendedCarousel, {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: 1,
      slidesPerGroup: 1,
      breakpoints: {
        [bp.mobile + 1]: {
          slidesPerView: 2,
          allowTouchMove: true,
        },
      },
    });
  }
  fold.forEach(el => {
    const btnCollapse = el.querySelector('button');
    btnCollapse.addEventListener('click', toggleTable);
  });
  // csSearchBtns();
  // resizeSearch();
}
init();
