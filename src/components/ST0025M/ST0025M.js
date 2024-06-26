// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';

// init Open Method
const firstSet = (el, elements) => {
  const { accordionTarget, accordionTrigger } = elements;
  el.querySelectorAll(accordionTarget)[0].classList.add('c-accordion__box--expand');
  el.querySelectorAll(`${accordionTarget} ${accordionTrigger}`)[0].setAttribute('aria-expanded', true);
};

// component
function init() {
  const component = document.querySelectorAll('.ST0025M');
  if (beforeLaunch(component)) return false;

  const elements = {
    accordionTarget: '.js-accordion-handle-target',
    accordionTrigger: '.js-accordion-trigger',
    accordionBody: '.js-accordion .c-accordion__body',
  };

  component.forEach(el => accordion.run(el));
  component.forEach(el => firstSet(el, elements));
}
init();
// export default
