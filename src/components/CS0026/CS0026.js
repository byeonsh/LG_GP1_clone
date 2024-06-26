import { bp, mobileHeight } from '../../assets/js/common/constant.js';

// 20230309 add modal script
function scrollContentHeight(breakpoint) {
  const modal = document.querySelectorAll('.c-modal__type-scroll .c-modal__box');

  modal.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead.offsetHeight;

    const modalContent = item.childNodes[3].firstElementChild;
    const modalContentHeight = modalHeadHeight;

    if (breakpoint > bp.mobile && window.innerHeight > mobileHeight) {
      modalContent.style.height = 'auto';
    } else {
      modalContent.style.maxHeight = `calc(50vh - ${modalContentHeight}px)`;
    }

    console.log(item.childNodes);
  });
}

// validation
const submitButton = document.querySelectorAll('.c-btn-send');

const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.c-modal__content').querySelectorAll('input');
      countInputs.forEach(el => {
        console.log(el);
        const containsCheck = el.classList.contains('undefined');
        const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning ');
        console.log(containsCheck);
        if (containsCheck === false) {
          if (el.value === '') {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
            // RequiredMsg.style.display = 'none';
            el.focus();
            return false;
            // eslint-disable-next-line no-else-return
          } else {
            el.classList.remove('c-error');
            RequiredMsg.style.display = 'none';
          }
        }
        // console.log(RequiredMsg);
      });
    });
  }
};
inputRequiredCheck();

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
