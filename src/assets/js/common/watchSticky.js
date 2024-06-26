/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { getElementRenderStyle } from './utils.js';

// const bottomStickyComponentIdList = ['PD0003', 'PD0014', 'PD0033'];
const bottomStickyComponentList = {
  CM0007: {
    target: '.CM0007',
  },
  CT000A: {
    target: '.CT0100 .c-product-price-sticky',
  },
  CT000C: {
    target: '.CT000C .c-product-price-sticky',
  },
  CT000E: {
    target: '.CT000E .c-product-price-sticky',
  },
  PD0003: {
    target: '.PD0003 .c-product-price-sticky',
  },
  PD0014: {
    target: '.PD0014 > .component > .cmp-container',
  },
  PD0033: {
    target: '.PD0033 .c-bottom-sheet',
  },
  PR0004: {
    target: '.PR0004 .c-package-deal-basket',
  },
};
const bottomStickyStackOrder = {
  default: ['PD0033', 'PD0014', 'PR0004', 'PD0003', 'CT000A', 'CT000C', 'CT000E', 'CM0007'],
};

const getMergeHeight = ({ array, listIndex }) =>
  array
    .filter((v, i) => i < listIndex)
    .reduce((acc, set) => {
      const position = getElementRenderStyle(set.targetElement, 'position');
      if (position === 'sticky' || position === 'fixed') {
        acc += set.targetElement?.getBoundingClientRect().height || 0;
      } else {
        acc = 0;
      }
      // eslint-disable-next-line no-param-reassign
      // acc += set.targetElement.getBoundingClientRect().height;
      return acc;
    }, 0);

const setPositionOnScreen = list => () => {
  list.forEach(({ targetElement }, listIndex, array) => {
    if (0 === listIndex) return;
    // eslint-disable-next-line no-param-reassign
    const height = getMergeHeight({ array, listIndex });
    if (targetElement) {
      targetElement.style.bottom = height === '0' ? '' : `${height}px`;
    }
  });
};

const watchInterFooterSection = list => entries => {
  const { intersectionRatio } = entries[0];
  const flag = 0 < intersectionRatio;
  // From the list of bottomStickyStackOrder.default,
  // add below the components that should be hidden when the footer is visible on the screen.
  // [Start] 2023-09-08 : UPDATE- 배열 내 PD0003 제거
  const footerHiddenElId = ['PD0014', 'PD0033', 'PR0004'];
  // [End] 2023-09-08 : UPDATE- 배열 내 PD0003 제거
  list.forEach(({ id, targetElement }) => {
    if (footerHiddenElId.includes(id)) {
      targetElement?.classList[flag ? 'add' : 'remove']('hidden');
    }
  });
};

const launchObserver = ({ observeTarget, callback, ObserverConstructor, option }) => {
  const observer = new ObserverConstructor(callback, option);
  observer.observe(observeTarget);
};

const watchSticky = () => {
  const watchList = bottomStickyStackOrder.default;
  const stickyTargetList = watchList
    .map(componentId => ({
      id: componentId,
      targetElement: document.querySelector(`${bottomStickyComponentList[componentId].target}`),
    }))
    .filter(set => set.targetElement != null);

  // if page has one and more of "bottomStickyComponentIdList"
  const check = 0 < stickyTargetList.length;
  if (!check) return false;

  // Exception handling by screen size on each page
  stickyTargetList.forEach(el => {
    // console.log(el.id);
    if (el.id === 'PD0003') {
      document.querySelector(bottomStickyComponentList.CM0007.target)?.classList.add('CM0007--web-fall-bottom--PBP');
    } else if (el.id === 'CT000A' || el.id === 'CT000C' || el.id === 'CT000E') {
      document.querySelector(bottomStickyComponentList.CM0007.target)?.classList.add('CM0007--web-fall-bottom--Cart');
    }
  });

  // stickyTargetList.forEach(({ id, targetElement }) => {
  //     // if page has ".PD0033.type-pdp"
  //     const hasPDPFunctionalTab =
  //         ('PD0033' === id && targetElement.closest('.type-pdp')) ||
  //         targetElement.classList.contains('c-bottom-sheet--pdp');
  //     const bottomSheetPDPStyle = 'c-bottom-sheet--square-edge';
  //     if (hasPDPFunctionalTab) {
  //         targetElement.classList.add(bottomSheetPDPStyle);
  //     }
  // });

  const observeTarget = document.querySelector('.PD0014');
  if (observeTarget) {
    const handleTarget = document.querySelector('.PD0033 .c-bottom-sheet');
    const bottomSheetPDPStyle = 'c-bottom-sheet--square-edge';
    const config = { attributes: true };
    const callback = mutationList => {
      const { target, attributeName } = mutationList[0];
      const flag = attributeName === 'class' && target?.classList.contains('hidden');

      if (flag) return handleTarget?.classList.remove(bottomSheetPDPStyle);
      handleTarget?.classList.add(bottomSheetPDPStyle);
    };

    const observer = new MutationObserver(callback);
    observer.observe(observeTarget, config);

    const panelToggleButton = observeTarget?.querySelector('.c-compare-toggle');
    panelToggleButton?.addEventListener('click', () => {
      const [{ targetElement: resizeObserveTarget }] = stickyTargetList;
      const callback = setPositionOnScreen(stickyTargetList);
      launchObserver({
        ObserverConstructor: IntersectionObserver,
        observeTarget: resizeObserveTarget,
        callback,
      });
    });
  }

  // registry event
  // resize
  if (1 < stickyTargetList.length) {
    const [{ targetElement: resizeObserveTarget }] = stickyTargetList;
    const callback = setPositionOnScreen(stickyTargetList);
    launchObserver({
      ObserverConstructor: ResizeObserver,
      observeTarget: resizeObserveTarget,
      callback,
    });
  }
  // scroll
  const footerComponent = document.querySelector('.CM0002');
  if (!footerComponent) return false;
  const callback = watchInterFooterSection(stickyTargetList);
  launchObserver({
    ObserverConstructor: IntersectionObserver,
    observeTarget: footerComponent,
    callback,
    option: {
      threshold: 0.001,
    },
  });
};

export default watchSticky;
