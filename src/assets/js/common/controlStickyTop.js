import { beforeLaunch, getElementRenderStyle } from './utils.js';

const sticky = {
  els: document.querySelectorAll('.can-sticky:not(.bottom)'),
  pos: [],
};
window.stickyHeight = 0;
const fixStickyPos = () => {
  let sumHeight = 0;
  sticky.els.forEach((el, idx) => {
    // const t = el.getBoundingClientRect().top;
    const beforeElement = el.previousElementSibling;
    const t = beforeElement.getBoundingClientRect().bottom;
    const h = el.getBoundingClientRect().height;
    // if (t === 0 || t === sumHeight) {
    if (t < sumHeight && !el.classList.contains('scroll-down')) {
      el.classList.add('is-fixed');
      // if (t >= 0 && t <= sumHeight + h) {
      if (idx !== 0) sticky.els[idx].style.top = `${sumHeight}px`;
      // Height difference before and after sticky
      const gapHeight = window.innerWidth <= 768 ? 108 - 54 : 210 - 70;
      if (t <= sumHeight - gapHeight) {
        sticky.els[idx].classList.add('is-sticky');
      } else {
        sticky.els[idx].classList.remove('is-sticky');
      }
      sticky.pos[idx] = sumHeight;
      if (getElementRenderStyle(el, 'position') === 'fixed') sumHeight += h;
    } else {
      el.classList.remove('is-fixed');
      sticky.els[idx].removeAttribute('style');
      sticky.els[idx].classList.remove('is-sticky');
      sticky.pos[idx] = 0;
      sumHeight += 0;
    }
    window.stickyHeight = sumHeight;
  });
};
export const controlStickyTop = function () {
  sticky.els = document.querySelectorAll('.can-sticky:not(.bottom)');
  // This script is to handle all can-sticky areas
  // that become sticky when scrolling so they don't overlap each other.
  if (beforeLaunch(sticky.els)) return false;
  sticky.els.forEach((el, idx) => {
    const beforeElement = document.createElement('div');
    beforeElement.classList.add('before-element');
    beforeElement.style.clear = 'both';
    // beforeElement.style.height = '10px';

    sticky.pos[idx] = 0;
    sticky.els[idx].parentElement.insertBefore(beforeElement, sticky.els[idx]);
  });
  fixStickyPos();
  window.addEventListener('scroll', fixStickyPos, false);
  window.addEventListener('resize', fixStickyPos, false);
};

export default {};
