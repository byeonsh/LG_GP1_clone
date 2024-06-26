/* eslint-disable max-len */
// import module
import { beforeLaunch, getElementRenderStyle } from '../../assets/js/common/utils.js';
import { bp } from '../../assets/js/common/constant.js';
import specs from '../../assets/js/common/specs.js';

// variable
const selector = {
  wrapper: '.c-compare-selling__inner',
  target:
    '.c-compare-selling:not(.c-compare-selling__wrap--active) .c-compare-selling__product-list, .c-compare-selling:not(.c-compare-selling__wrap--active) .c-compare-selling__spec-list',
  sticky: '.js-compare-scroll-area',
  left: '.js-scroll-left',
  right: '.js-scroll-right',
};

const behavior = {
  steady: 'steady',
  left: 'scroll left',
  right: 'scroll right',
  sticky: 'sticky',
};

function getIndicateCount() {
  const ww = window.innerWidth;
  const upper1440 = ww >= bp.gridFull + 1;
  const under1440 = ww >= bp.tabletMiddle + 1 && ww <= bp.gridFull;
  const under1024 = ww <= bp.tabletMiddle + 1 && ww >= bp.mobile;
  const under768 = ww <= bp.mobile;

  let indicateCount;
  if (upper1440) indicateCount = 4;
  if (under1440) indicateCount = 3;
  if (under1024) indicateCount = 3;
  if (under768) indicateCount = 1;
  return indicateCount;
}

function adjustPosByIndex({ index, indicateCount, arrayLength }) {
  const underContainer = window.innerWidth < bp.gridFull;
  const isMobile = window.innerWidth < bp.mobile;

  // eslint-disable-next-line no-nested-ternary
  if (index >= arrayLength - indicateCount - 1) return underContainer ? (isMobile ? -8 : 0) : -6;
  // eslint-disable-next-line no-nested-ternary
  return underContainer ? (isMobile ? -16 : -24) : 0;
}

function setPositionData(DOMArray) {
  let gap = null;
  const indicateCount = getIndicateCount();
  const result = [
    { distance: 0, left: 0 },
    ...[...DOMArray].map((item, index, array) => {
      gap = parseInt(getElementRenderStyle(item.parentElement, 'column-gap').replace('px', ''), 10);
      const { right, left } = item.getBoundingClientRect();
      const distance = right - left + gap;
      const adj = adjustPosByIndex({ index, indicateCount, arrayLength: array.length });
      console.log(gap);
      return {
        distance: distance * (index + 1),
        stickyDistance: distance * (index + 1) + adj,
        left,
      };
    }),
  ];

  // console.groupCollapsed('position data');
  // console.log('DOMArray', DOMArray);
  // console.table(result);
  // console.groupEnd('position data');

  return result;
}

function setDirective(_trigger) {
  if (_trigger.classList.contains(selector.sticky.replace('.', ''))) return 'sticky';
  if (_trigger.classList.contains(selector.left.replace('.', ''))) return 'scroll left';
  if (_trigger.classList.contains(selector.right.replace('.', ''))) return 'scroll right';
  return behavior.steady;
}

function getScrollIndexRange({ positionData, indicateCount }) {
  const min = 0;
  const max = positionData.length <= indicateCount ? min : positionData.length - indicateCount - 1;
  return [min, max];
}

function setButtonUseable({ buttons, index, min, max }) {
  buttons.forEach(btn => btn.removeAttribute('disabled'));

  if (min === index) {
    // console.log('min');
    buttons.forEach(btn => {
      if (!btn.classList.contains(`${selector.left.replace('.', '')}`)) return;
      btn.setAttribute('disabled', 'disabled');
    });
  } else if (max === index) {
    // console.log('max');
    buttons.forEach(btn => {
      if (!btn.classList.contains(`${selector.right.replace('.', '')}`)) return;
      btn.setAttribute('disabled', 'disabled');
    });
  }
}

function setControlsUseable({ component, positionData, indicateCount }) {
  const controls = component.querySelectorAll('.c-compare-selling__controls');
  const countLess = positionData.length - 1 <= indicateCount;
  const countFill = positionData.length - 1 > indicateCount;

  if (countLess) {
    controls.forEach(el => el.classList.add('hidden'));
  } else if (countFill) {
    controls.forEach(el => el.classList.remove('hidden'));
  }
}

function scrolling({ elements, dependency, index, directive }) {
  // console.log('dependency :', dependency);
  const { distance, stickyDistance } = dependency[index];
  const direction = 'ltr' === document.documentElement.getAttribute('dir') ? -1 : 1;
  const isSticky = elements[0].closest('.component').querySelector(`${selector.sticky}.${behavior.sticky}`);
  const scrollD = isSticky && bp.gridFull > window.innerWidth ? stickyDistance : distance;

  elements.forEach(elem => {
    elem.setAttribute(
      'style',
      `
                transform:translate3d(${scrollD * direction}px, 0, 0);
                ${behavior.steady !== directive ? `transition:transform 0.5s` : ''}
            `
    );

    if (!elem.closest('.js-pin-scroll')) return false;
    const [pinItem] = elem.querySelectorAll('.c-compare-selling__item');
    if (beforeLaunch(pinItem)) return false;
    pinItem.setAttribute(
      'style',
      `
                    transform:translate3d(${scrollD * direction * -1}px, 0, 0);
                    ${behavior.steady !== directive ? `transition:transform 0.5s` : ''}
                `
    );
  });
}

function useScroll({ component, positionData, scrollTarget }) {
  let array = [...positionData];
  let { startIndex: index = 0 } = component.dataset;
  const buttons = [
    // left first.
    ...component.querySelectorAll(selector.left),
    ...component.querySelectorAll(selector.right),
  ].flat(1);

  const handler = function (event) {
    const trigger = event.currentTarget || event[0].target;
    const directive = setDirective(trigger);
    const indicateCount = getIndicateCount();
    const [min, max] = getScrollIndexRange({ positionData, indicateCount });

    // action by index
    switch (directive) {
      case behavior.left:
        index = index <= min ? min : (index -= 1);
        break;
      case behavior.right:
        index = index >= max ? max : (index += 1);
        break;
      case behavior.steady:
      default:
        array = setPositionData(scrollTarget[0].children);
        index = index > max ? max : index;
    }

    // eslint-disable-next-line no-param-reassign
    component.dataset.scrollIndex = (() => {
      if (index <= min) return 'min';
      if (index >= max) return 'max';
      return index;
    })();

    // btn disabled
    setButtonUseable({ buttons, index, min, max });
    // Hide the button if the displayed number is insufficient
    setControlsUseable({ component, positionData, indicateCount });
    // scroll
    scrolling({ elements: scrollTarget, dependency: array, index, directive });
  };

  return [buttons, handler];
}

function compareScroll(component) {
  const scrollWrapper = component.querySelector(selector.wrapper);
  const scrollTarget = component.querySelectorAll(`${selector.target}`);
  const isLtr = 'ltr' === document.documentElement.getAttribute('dir');

  const [...productItems] = scrollTarget[0].children;
  const positionData = setPositionData(productItems);

  // horizontal scroll event
  const [buttons, handler] = useScroll({ component, positionData, scrollTarget });

  // resize event
  const watcher = entries => handler(entries);
  const resizeObserver = new ResizeObserver(watcher);

  // event listening
  resizeObserver.observe(scrollWrapper);
  buttons.forEach(b => b.addEventListener('click', handler, false));

  // swipe
  let startX;
  // let startY;
  let endX;
  // let endY;

  const triggerClickLeft = () => component.querySelector(isLtr ? selector.left : selector.right).click();
  const triggerClickRight = () => component.querySelector(isLtr ? selector.right : selector.left).click();

  const swipeHandler = {
    start({ type, touches, clientX }) {
      const isTouchEvent = type.indexOf('touch') >= 0;
      startX = isTouchEvent ? touches[0].clientX : clientX;
    },
    end({ type, changedTouches, clientX }) {
      const isTouchEvent = type.indexOf('touch') >= 0;
      endX = isTouchEvent ? changedTouches[0].clientX : clientX;
      if (startX - endX > 50) {
        // to left
        triggerClickRight();
      } else if (endX - startX > 50) {
        // to right
        triggerClickLeft();
      } else if (startX - endX < 50 || startX - endX < 50) {
        // up&down or touch
      }
    },
  };

  scrollWrapper.addEventListener('touchstart', swipeHandler.start, false);
  scrollWrapper.addEventListener('mousedown', swipeHandler.start, false);
  scrollWrapper.addEventListener('touchend', swipeHandler.end, false);
  scrollWrapper.addEventListener('mouseup', swipeHandler.end, false);
}

// component
function init() {
  const component = document.querySelectorAll('.PD0042');
  if (beforeLaunch(component)) return false;

  component.forEach(c => {
    compareScroll(c);
    specs.changeText(c);
  });
}
init();
// export default
