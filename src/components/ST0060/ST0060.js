// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

const sidePopup = el => {
  const closeBtn = el.querySelector('.js-side-close');
  const animationTime = 300;
  const closeEvent = () => {
    el.classList.remove('active');
    el.blur();
    el.removeAttribute('tabindex');
    el.setAttribute('aria-live', 'false');
    setTimeout(() => {
      el.classList.add('hidden');
    }, animationTime);
  };
  // close button
  closeBtn?.addEventListener('click', () => {
    closeEvent();
  });
};

// component
function init() {
  const component = document.querySelectorAll('.ST0060');
  if (beforeLaunch(component)) return false;
  const sidePopCont = document.querySelectorAll('.c-pop-side');
  sidePopCont.forEach(el => {
    sidePopup(el);
  });
}
init();
// export default
