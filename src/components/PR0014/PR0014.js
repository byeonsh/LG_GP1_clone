// import module
import { bp, keyboard } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

// component
const promotionSelectorOption = {
  ...behavior.useRollingLikeScroll({ useSticky: true, useLoop: false }),
  keyboard: behavior.useKeyInteraction,
  slidesPerGroup: 1,
  slidesPerView: 'auto',
  spaceBetween: 16,
  freeMode: {
    enabled: true,
    sticky: true,
  },
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      spaceBetween: 30,
    },
  },
};

const promotionSelectorInit = function (component, option) {
  const codeBlock = component.querySelector('.c-roll-selector');
  const target = codeBlock.querySelector('.swiper');
  const nextEl = codeBlock.querySelector('.js-carousel-next');
  const prevEl = codeBlock.querySelector('.js-carousel-prev');
  runCarousel(target, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

export function promotionSelectorInitJs() {
  const component = document.querySelectorAll('.PR0014');
  if (beforeLaunch(component)) return false;
  component.forEach(c => {
    promotionSelectorInit(c, promotionSelectorOption);
  });
}

export const tabsSelectShop = elements => {
  const tablist = elements ?? document.querySelectorAll('.PR0014 .cmp-tabs__tablist');
  const clickTab = event => {
    const currentTab = event.target.closest('.cmp-tabs__tab');
    if (currentTab) {
      const container = currentTab.closest('.c-wrapper') || currentTab.closest('.c-pop-msg');
      const tab = currentTab;
      // const panel = document.getElementById(currentTab.getAttribute('aria-controls'));
      const tabAll = container.querySelectorAll('.cmp-tabs__tab');
      // const panelAll = container.querySelectorAll('.cmp-tabs__tabpanel');
      // init
      tabAll.forEach(el => {
        el.classList.remove('cmp-tabs__tab--active');
        el.setAttribute('tabindex', -1);
      });
      // panelAll.forEach(el => {
      //   el.classList.remove('cmp-tabs__tabpanel--active');
      //   el.setAttribute('tabindex', -1);
      // });
      // current
      tab.classList.add('cmp-tabs__tab--active');
      tab.setAttribute('tabindex', 0);
      // panel.classList.add('cmp-tabs__tabpanel--active');
      // panel.setAttribute('tabindex', 0);
    }
  };
  const keyupTab = event => {
    const keycode = event.keyCode;
    const tabList = event.target.closest('.cmp-tabs__tablist');
    if (tabList === null) {
      return false;
    }
    const currentItem = event.target.closest('.cmp-tabs__tab');
    const nodes = [...tabList.children];
    let index = nodes.indexOf(currentItem);
    if (currentItem.length === 0) return false;
    if (keycode === keyboard.left) {
      // left arrow key
      index -= 1;
    } else if (keycode === keyboard.right) {
      // right arrow key
      index += 1;
    }
    if (index >= 0 && index < nodes.length) {
      const tab = nodes[index];
      tab.focus();
      tab.click();
    }
  };

  tablist.forEach(el => {
    el.addEventListener('click', clickTab);
    el.addEventListener('keyup', keyupTab);
  });
};

// Wa Type Check
const waChack = () => {
  const TabItem = document.querySelectorAll('.c-roll-selector__item');
  TabItem?.forEach(c => {
    if (c.closest('.c-roll-selector').getAttribute('data-wa-type') === 'tab') {
      c.setAttribute('role', 'tab');
      c.closest('.c-roll-selector').querySelector('.c-roll-selector__item').removeAttribute('aria-selected');
      c.closest('.c-roll-selector')
        .querySelector('.c-roll-selector__item--active')
        .setAttribute('aria-selected', 'true');
      c.closest('.c-roll-selector').querySelector('.swiper-wrapper').setAttribute('role', 'tablist');
    } else if (c.closest('.c-roll-selector').getAttribute('data-wa-type') === 'page') {
      c.closest('.c-roll-selector').querySelector('.c-roll-selector__item').removeAttribute('aria-current');
      c.closest('.c-roll-selector')
        .querySelector('.c-roll-selector__item--active')
        .setAttribute('aria-current', 'page');
    }
  });
};

function init() {
  const component = document.querySelectorAll('.PR0014');
  if (beforeLaunch(component)) return false;

  component.forEach(c => {
    promotionSelectorInit(c, promotionSelectorOption);
  });
  waChack();
}
init();
