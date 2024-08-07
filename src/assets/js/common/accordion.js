import { beforeLaunch } from './utils.js';

// history log
// 22.11.??
// - separated folding feature to "single" and "sync".
// 22.12.20
// - change to collect each element using "id" attribute.
// - change first parameter of "...fonding" function "el" to "box".
//   + The "closest" api climbs up DOM tree and returns the first matching selector.
// - change "click" event bind target
//   + consider to nested accordion module.
//   + so remove "filter event target" code.
// - add feature "All".

const selector = {
  target: '.js-accordion:not(.js-accordion-initialized)',
  trigger: '.js-accordion-trigger',
  handleTarget: '.js-accordion-handle-target',

  // classname for status should be "c-accordion" block.
  // and recommend target element is ".c-accordion__box".
  box: '.c-accordion__box',
  contents: '.c-accordion__body',
  active: 'c-accordion__box--expand',
  offmode: 'c-accordion__box--turn-off',
  initialized: 'js-accordion-initialized',
};

const singleFolding = function (element, trigger) {
  // console.log('pair :', element, trigger);
  const status = element.classList.toggle(selector.active);
  trigger?.setAttribute('aria-expanded', status);
  return status;
};

const syncFolding = function (element, trigger, targetRange, callback) {
  const status = element.classList.contains(selector.active);
  // all accordion target status reset to negative
  targetRange.forEach(t => {
    t.classList.remove(selector.active);
    t.querySelector(selector.trigger).setAttribute('aria-expanded', false);
  });
  // set accordion box what clicked
  if (!status) {
    element.classList.add(selector.active);
    trigger?.setAttribute('aria-expanded', true);
  }
  if (callback) {
    callback();
  }
};

const allOf = function (element, trigger, siblings) {
  const status = element.classList.contains(selector.active);
  if (status) {
    siblings.forEach(s => {
      s.classList.remove(selector.active);
      s.setAttribute('aria-expanded', false);
    });
    trigger?.setAttribute('aria-expanded', false);
    return;
  }
  siblings.forEach(s => {
    s.classList.add(selector.active);
    s.setAttribute('aria-expanded', true);
  });
  trigger?.setAttribute('aria-expanded', true);
};

const useCollectAccordion = function (el, siblings, callback) {
  const contents = el.querySelector(selector.contents);
  const box = contents.closest(selector.box);
  const trigger = el.querySelector(`[aria-controls="${contents.getAttribute('id')}"]`);
  const handler = () => {
    // // 1. filter event target
    // const correctButtonClick = trigger === event.target || event.target.closest(selector.trigger);
    // // 1-0. click element is not button... event break.
    // if (!correctButtonClick) return false;

    // 2. execute
    switch (box.dataset.expand) {
      // 2-3. active all under the {selector.target}
      case 'all':
        return allOf(box, trigger, siblings);
      // 2-2. active box by box
      case 'independent':
        return singleFolding(box, trigger);
      // 2-1. active sync other box
      default:
        return syncFolding(box, trigger, siblings, callback);
    }
  };
  return [trigger, handler];
};

const accordion = function (root, callback) {
  // console.log('root :', root);
  const [...element] = root.querySelectorAll(selector.target);
  if (beforeLaunch(element)) return false;
  // returns an un-nested array.
  const allAccordionHandleTarget = element.map(el => [...el.querySelectorAll(selector.handleTarget)]).flat(1);

  // console.log(allAccordionHandleTarget);
  allAccordionHandleTarget.forEach((el, index, self) => {
    const parent = el.closest(selector.target);
    if (parent) {
      parent.classList.add(selector.initialized);
    }
    const [trigger, handler] = useCollectAccordion(el, self, callback);
    trigger?.addEventListener('click', handler, false);
  });
};

export default { run: accordion, behavior: { syncFolding, singleFolding, allOf }, selector };
