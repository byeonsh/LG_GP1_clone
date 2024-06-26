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
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: '2',
      allowTouchMove: false,
    },
    [bp.tablet + 1]: {
      slidesPerView: 3,
    },
  },
};

const swiperInit = function (target) {
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
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
function init2() {
  const component = document.querySelectorAll('.CS0076');
  if (beforeLaunch(component)) return false;

  // carousel
  const carousel = document.querySelectorAll('.CS0076 .c-carousel');
  if (beforeLaunch(carousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);

  // no swiper
  // item.length <= 1 isMobile
  // item.length <= 4 isWeb
  // type:home isMobile

  // more
  // type:home isMobile

  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    const webNum = 4;
    const mobileNum = 1;
    // component.forEach(function (element) {
    // const typeHome = element.classList.contains('type-home');
    const typeHome = document.querySelectorAll('.CS0076.type-home');
    console.log(typeHome);
    typeHome.forEach(el => {
      const target = el.querySelector('.c-carousel');
      console.log(target);
      const items = target.querySelectorAll('.swiper-slide');
      const num = mediaQueryList.matches ? webNum : mobileNum;
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
      // });
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}
init2();

// const toastPopup = function () {
//     const component = document.querySelector('.CS0076');
//     const toastBox = component.querySelector('.toast');
//     const toastOpen = component.querySelectorAll('.toastOpen');
//     const toastCloseBtn = document.querySelector('.CS0076 .closeBtn');

//     toastOpen.forEach(toastItem => {
//         toastItem.addEventListener('click', function () {
//             toastBox.className = 'show';
//             setTimeout(function () {
//                 toastBox.className = toastBox.className.replace('show', '');
//             }, 6000);
//             if (toastCloseBtn) {
//                 toastCloseBtn.addEventListener('click', function () {
//                     toastBox.className = '';
//                 });
//             }
//         });
//     });
// };
const toastPopup = function () {
  const component = document.querySelector('.CS0076');
  const toastBox = component.querySelector('.toast');
  const toastOpen = component.querySelectorAll('.toastOpen');
  const toastCloseBtn = document.querySelector('.CS0076 .closeBtn');

  toastOpen.forEach(toastItem => {
    toastItem.addEventListener('click', function () {
      toastBox.className = 'show';
      toastCloseBtn.setAttribute('tabindex', '1');
      toastItem.setAttribute('tabindex', '0');

      setTimeout(function () {
        toastBox.className = toastBox.className.replace('show', '');

        toastCloseBtn.setAttribute('tabindex', '0');
      }, 6000);
      if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', function () {
          toastBox.className = '';
        });
      }
    });

    // enter
    toastItem.addEventListener('keydown', function () {
      if (window.event.keyCode === 13) {
        toastBox.className = 'show';
        toastCloseBtn.setAttribute('tabindex', '1');
        toastItem.setAttribute('tabindex', '0');
        toastCloseBtn.focus();

        setTimeout(function () {
          toastBox.className = toastBox.className.replace('show', '');
          toastCloseBtn.setAttribute('tabindex', '0');
          toastItem.focus();
        }, 6000);
        if (toastCloseBtn) {
          toastCloseBtn.addEventListener('keydown', function () {
            if (window.event.keyCode === 13) {
              toastBox.className = '';
              toastItem.focus();
            }
          });
        }
      }
    });
  });
};
toastPopup();

// select registered product popup
const productListActive = function () {
  const listItem = document.querySelectorAll('.cs-popup .swiper-slide');
  const okButton = document.querySelector('.button-ok');

  const selectArr = [];

  listItem.forEach(item => {
    item.addEventListener('click', () => {
      listItem.forEach(el => {
        el.classList.remove('swiper-slide--active');
      });
      item.classList.add('swiper-slide--active');
      selectArr.push(item);

      if (selectArr.length >= 1) {
        okButton.disabled = false;
      }
    });
    item.addEventListener('keyup', () => {
      if (window.event.keyCode === 13) {
        listItem.forEach(el => {
          el.classList.remove('swiper-slide--active');
        });
        item.classList.add('swiper-slide--active');
      }
    });
  });
};

productListActive();

// 20230309 add modal script
function scrollContentHeight(breakpoint) {
  const modal = document.querySelectorAll('.c-modal__box');

  modal.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead?.offsetHeight ?? 0;

    const modalBottom = item.childNodes[5];
    const modalBottomHeight = modalBottom?.offsetHeight ?? 0;

    const modalContent = item.childNodes[3].lastElementChild;
    const modalContentHeight = modalHeadHeight + modalBottomHeight;

    if (!modalContent) {
      return;
    }

    if (breakpoint > bp.mobile) {
      modalContent.style.height = `calc(90vh - ${modalContentHeight}px)`;
    } else {
      modalContent.style.height = `calc(100vh - ${modalContentHeight}px)`;
    }

    console.log(item.childNodes);
  });
}

// 20230309 add modal script
// init
function init() {
  let breakpoint = window.innerWidth;
  scrollContentHeight(breakpoint);

  window.addEventListener('resize', () => {
    breakpoint = window.innerWidth;
    scrollContentHeight(breakpoint);
  });
}
init();
