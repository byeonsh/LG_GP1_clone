// import module
import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

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
  // const toast = document.querySelector('.cs-active-msg');
  // const toastMsg = toast.querySelectorAll('.cs-active-msg__box');
  // const toastMsgClose = toast.querySelectorAll('.cs-active-msg__close');
  // proactive-msg
  // const toastEvent = () => {
  //     for (let i = 0; i < toastMsg.length; i += 1) {
  //         const Msg = toastMsg[i];
  //         const toastAction = () => {
  //             Msg.classList.add('cs-active-msg__box--active');
  //             setTimeout(() => {
  //                 Msg.classList.remove('cs-active-msg__box--active');
  //             }, 4500);
  //         };
  //         setTimeout(function () {
  //             toastAction(true);
  //         }, [i] * 1000);
  //         const closeToast = () => {
  //             if (Msg.classList.contains('cs-active-msg__box--active')) {
  //                 Msg.classList.remove('cs-active-msg__box--active');
  //             }
  //         };
  //         toastMsgClose[i].addEventListener('click', closeToast);
  //     }
  // };
  // window.addEventListener('DOMContentLoaded', () => {
  //     setTimeout(toastEvent, 1000);
  // });
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
}
const myInput = document.querySelector('.my-input');
const body = document.querySelector('body');
const searchInput = document.querySelector('.textInput__input');

body.addEventListener('click', event => {
  const parentTag = event.target;
  const parentTagClosest = parentTag.closest('.my-input');
  const parentTagClose = parentTag.closest('.c-pop-msg__close--on-top');
  if (parentTagClosest === null) {
    myInput.className = 'my-input';
  }
  if (parentTagClose !== null) {
    myInput.className = 'my-input';
  }
});

// eslint-disable-next-line no-unused-vars
searchInput.onfocus = function (e) {
  myInput.className += ' active';
};

init();
