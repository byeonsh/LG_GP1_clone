import { bp } from '../../assets/js/common/constant.js';

// 20230309 add modal script
function scrollContentHeight(breakpoint) {
  const modal = document.querySelectorAll('.c-modal__type-scroll .c-modal__box');

  modal.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead.offsetHeight;

    const modalContent = item.childNodes[3].firstElementChild;
    const modalContentHeight = modalHeadHeight;

    if (breakpoint > bp.mobile) {
      modalContent.style.height = 'auto';
    } else {
      modalContent.style.height = `calc(50vh - ${modalContentHeight}px)`;
    }

    console.log(item.childNodes);
  });
}

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

// validation
const submitButton = document.querySelector('.c-btn-continue');

const validationCheck = function () {
  const privacyPolicyCheck = document.querySelector('#checkId5');
  const privacyPolicyChecked = document.querySelector('.c-privacyPolicy-checked');

  submitButton.addEventListener('click', e => {
    e.preventDefault();
    // privacy check validation
    if (privacyPolicyCheck.checked === false) {
      privacyPolicyChecked.classList.add('c-error');
      privacyPolicyChecked.style.display = 'block';
    } else {
      privacyPolicyChecked.classList.remove('c-error');
      privacyPolicyChecked.style.display = 'none';
    }
  });
};
validationCheck();
