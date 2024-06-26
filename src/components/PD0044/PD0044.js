// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

const toastPopup = el => {
  const delayTime = el.getAttribute('data-delay');
  let delayDuration = el.getAttribute('data-duration');
  const countElem = el.querySelector('.js-toast-count');
  const closeBtn = el.querySelector('.js-toast-close');
  const animationTime = 600;
  const closeEvent = () => {
    el.classList.remove('active');
    el.blur();
    el.removeAttribute('tabindex');
    el.setAttribute('aria-live', 'false');
    setTimeout(() => {
      el.classList.add('hidden');
    }, animationTime);
  };
  setTimeout(() => {
    if (countElem) {
      countElem.innerHTML = delayDuration;
    }
    el.classList.add('active');
    el.setAttribute('tabindex', '0');
    el.focus();
    // el.querySelectorAll('a')[0].focus();
    const counting = setInterval(() => {
      if (delayDuration <= 0) {
        clearInterval(counting);
      }
      if (countElem) {
        countElem.innerHTML = delayDuration;
      }
      delayDuration -= 1;
    }, 1000);
    setTimeout(() => {
      closeEvent();
    }, delayDuration * 1000);
  }, delayTime * 1000);
  // close button
  closeBtn.addEventListener('click', () => {
    closeEvent();
  });
};
// component
function init() {
  const component = document.querySelectorAll('.PD0044');
  if (beforeLaunch(component)) return false;
  component.forEach(t => {
    const toastPopCont = t.querySelector('.c-pop-toast');
    toastPopup(toastPopCont);
  });
}
init();
// export default
