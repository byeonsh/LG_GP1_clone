// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import share from '../../assets/js/common/share.js';
import { review, keyboard } from '../../assets/js/common/constant.js';
import runBVStaticPLP from '../../assets/js/common/bv.js';
import runSPStaticPLP from '../../assets/js/common/sp.js';

const findTarget = function (el, targetClassname, range) {
  // console.log('el', el);
  if (el === range) return null;
  if (el instanceof HTMLButtonElement || el.closest('.c-button')) return null;
  if (el.classList.contains(targetClassname)) return el;
  return findTarget(el.parentElement, targetClassname);
};

// component
const classname = {
  optionArea: 'js-step-option-area',
  option: 'js-step-option',
  optionActive: 'c-step-option__item--selected',
  introAnchor: 'c-step-option__intro-linker',
};

function init() {
  const component = document.querySelectorAll('.PD0011');
  if (beforeLaunch(component)) return false;

  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);

  component.forEach(el => {
    // share
    const productItems = document.querySelectorAll('.c-tooltip__share');
    productItems.forEach(product => {
      if (!config) return false;
      share(product, config);
    });
    if (review.type === 'BV1') runBVStaticPLP(el);
    else if (review.type === 'SP') runSPStaticPLP(el);
  });

  const AllOptionArea = [...component].map(c => c.querySelector(`.${classname.optionArea}`));
  if (beforeLaunch(AllOptionArea)) return false;
  const handler = event => {
    const { target, currentTarget, keyCode, type } = event;
    // key event filter
    if (type === 'keydown' && keyboard.enter !== keyCode) return false;
    // target filter
    const correctTarget = findTarget(target, classname.option, currentTarget);
    if (correctTarget == null) return;
    // toggle class name
    correctTarget.classList.toggle(classname.optionActive);
  };
  AllOptionArea.forEach(area => {
    if (area == null) return false;
    if (area.querySelector(`.${classname.introAnchor}`)) return false;
    area.addEventListener('click', handler, false);
    area.addEventListener('keydown', handler, false);
  });

  // const runMedia = () => {
  //     media(document.getElementById('popCurationExample'));
  // };
  // setTimeout(runMedia, 3000);
}
init();
// export default
