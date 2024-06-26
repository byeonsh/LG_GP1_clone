import { bp } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';

// eslint-disable-next-line new-cap, no-unused-vars
const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 3,
});

// 20230309 add modal script
function scrollContentHeight(breakpoint) {
  const modal = document.querySelectorAll('.c-modal__box');

  modal.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead.offsetHeight;

    const modalBottom = item.childNodes[7];
    const modalBottomHeight = modalBottom.offsetHeight;

    const modalSerialTabContent = item.childNodes[3].firstElementChild.firstElementChild;
    const modalSerialTabContentHeight = modalHeadHeight + modalBottomHeight;

    const modalQrTabContent = item.childNodes[5].firstElementChild.firstElementChild;
    const modalQrTabContentHeight = modalHeadHeight + modalBottomHeight;

    if (breakpoint > bp.mobile) {
      modalSerialTabContent.style.height = `calc(90vh - ${modalSerialTabContentHeight}px)`;
      modalQrTabContent.style.height = `calc(90vh - ${modalQrTabContentHeight}px)`;
    } else {
      modalSerialTabContent.style.height = `calc(100vh - ${modalSerialTabContentHeight}px)`;
      modalQrTabContent.style.height = `calc(100vh - ${modalQrTabContentHeight}px)`;
    }
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
