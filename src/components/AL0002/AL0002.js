// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import { isRTL } from '../../assets/js/common/constant.js';
import share from '../../assets/js/common/share.js';
// import { bp } from '../../assets/js/common/constant.js';
// import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const printEvent = event => {
  const printBtn = event.currentTarget;
  const component = printBtn.closest('.c-wrapper');
  const cssURLs = printBtn.dataset.cssUrl.split(',');
  let cssHtml = '';
  cssURLs.forEach(url => {
    cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
  });
  const newWin = window.open('', '_blank');
  newWin.document.writeln(
    // eslint-disable-next-line max-len
    `<html dir=${isRTL}><head>${cssHtml}</head><body><div class="c-wrapper AL0002">${component.innerHTML}</div></body></html>`
  );
  newWin.document.querySelector('.c-print-area').remove();
  newWin.document.querySelector('.c-back-to-list').remove();
  newWin.document.querySelector('.c-control-link').remove();
  const isTabs = newWin.document.querySelector('.tabs');
  if (isTabs) {
    isTabs.querySelector('.cmp-tabs__inner').remove();
    isTabs.closest('.cmp-container').querySelector('.c-text-contents').remove();
  }
  newWin.document.close();
  newWin.focus();
  setTimeout(function () {
    newWin.print();
  }, 1000);
};
const shareEvent = c => {
  const shareCont = c.querySelectorAll('.c-sns-share');
  shareCont.forEach(shareObj => {
    const configElem = document.querySelector('[data-component-config="snsShare"]');
    const config = getComponentConfigFromElem(configElem);
    if (!config) return false;
    share(shareObj, config);
  });
};

// const carouselOption = {
//     pagination: behavior.pagination,
//     loop: false,
//     speed: 500,
//     autoplay: false,
//     keyboard: {
//         enabled: true,
//         onlyInViewport: false,
//     },
//     preloadImages: false,
//     allowTouchMove: true,
//     lazy: false,
//     slidesPerView: 1,
//     spaceBetween: 10,
//     breakpoints: {
//         // min
//         [bp.mobile + 1]: {
//             spaceBetween: 24,
//         },
//     },
// };

// const swiperInit = function (target) {
//     const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
//     const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
//     return runCarousel(target, {
//         ...carouselOption,
//         navigation: {
//             nextEl,
//             prevEl,
//         },
//     });
// };

// const carouselEvent = carouselAll => {
//     carouselAll.forEach(carousel => {
//         const items = carousel.querySelectorAll('.swiper-slide');
//         // Run swiper when there are more than 2 items
//         if (items.length >= 2) return swiperInit(carousel);
//     });
// };

// component
function init() {
  const component = document.querySelectorAll('.AL0002');
  if (beforeLaunch(component)) return false;
  component.forEach(c => {
    // print button event
    // comparePrint(c);
    const printBtn = c.querySelector('.js-print');
    if (printBtn) printBtn.addEventListener('click', printEvent);

    // share
    if (!c.querySelector('.c-sns-share')) return false;
    shareEvent(c);

    // carousel
    // const carouselAll = c.querySelectorAll('.c-carousel');
    // if (beforeLaunch(carouselAll)) return false;
    // carouselEvent(carouselAll);
  });
  if (!document.querySelector('.c-tooltip')) return false;
  if (!document.getElementById('modal_help_library')) return false;
  // if (!document.querySelector('.c-sns-share') && !document.getElementById('modal_help_library')) return false;
  // const shareObj = document.querySelectorAll('.c-sns-share');
  // const configElem = document.querySelector('[data-component-config="snsShare"]');
  // const config = getComponentConfigFromElem(configElem);
  // if (!config) return false;
  // share(shareObj, config);
}
init();
