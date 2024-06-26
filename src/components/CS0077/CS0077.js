import { bp } from '../../assets/js/common/constant.js';

// 20230309 add modal script
function scrollContentHeight(breakpoint) {
  const modal = document.querySelectorAll('.c-modal__box');

  modal.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead.offsetHeight;

    const modalBottom = item.childNodes[5];
    const modalBottomHeight = modalBottom.offsetHeight;

    const modalContent = item.childNodes[3].lastElementChild;
    const modalContentHeight = modalHeadHeight + modalBottomHeight;

    if (breakpoint > bp.mobile) {
      modalContent.style.height = `calc(90vh - ${modalContentHeight}px)`;
    } else {
      modalContent.style.height = `calc(100vh - ${modalContentHeight}px)`;
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
