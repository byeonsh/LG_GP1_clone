// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

// scroll wrap
const scrollEvnet = ({ wrap, item }) => {
  // event state
  let isEvent = true;

  // scroll options
  const scrollOption = {
    scrollTop: window.pageYOffset,
    windowHeight: window.innerHeight,
    wrapTop: wrap.map(el => window.pageYOffset + el.getBoundingClientRect().top),
    wrapHeight: wrap.map(el => parseFloat(getComputedStyle(el, null).getPropertyValue('height'))),
  };
  const { scrollTop, windowHeight, wrapTop, wrapHeight } = scrollOption;

  // set scroll sensing
  scrollOption.wrapSum = wrapTop.map((val, idx) => val - wrapHeight[idx] * 0.5 - (windowHeight - wrapHeight[idx]));

  // sensing event
  scrollOption.wrapSum.map((val, idx) => {
    return scrollTop > val && isEvent && item[idx].classList.remove('c-scroll-image--bottom', 'c-scroll-image--right');
  });

  // last event check
  if (scrollTop > scrollOption.wrapSum[scrollOption.wrapSum.length - 1]) {
    isEvent = false;
  }
};

// component
function init() {
  const component = document.querySelectorAll('.ST0038');
  if (beforeLaunch(component)) return false;

  // selector element
  const selector = {
    wrap: [...document.querySelectorAll('.c-scroll-image')],
    item: [...document.querySelectorAll('.c-scroll-image--item')],
  };

  // scroll Event
  window.addEventListener('scroll', () => scrollEvnet(selector));

  // resize event
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => window.addEventListener('scroll', () => scrollEvnet(selector)), 300);
  });
}
init();
// export default
