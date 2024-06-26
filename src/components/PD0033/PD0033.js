// import module
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { addKeyWordToCookie, beforeLaunch, getElementRenderStyle } from '../../assets/js/common/utils.js';
import { bp, keyboard, cookieConst, recheckScrolling } from '../../assets/js/common/constant.js';
import { checkFunctionalCookieEnabled } from '../../assets/js/common/onetrustHelper.js';

// html selector collection
const classname = {
  pdp: 'type-pdp',
  plp: 'type-plp',
  categorySelector: 'c-roll-selector',
  mobileArea: 'c-mobile-split-area',
  bottomSheet: 'c-bottom-sheet',
  bottomSheetCallButton: 'c-split-area-call-button button',
  status: {
    sticky: 'is-sticky',
    mobileAreaActive: 'active',
  },
};

// swiper
const options = {
  'category selector': {
    ...behavior.useRollingLikeScroll({ useSticky: true, useLoop: false }),
    keyboard: behavior.useKeyInteraction,
    slidesPerGroup: 1,
    slidesPerView: 4,
    spaceBetween: 16,
    freeMode: {
      enabled: true,
      sticky: true,
    },
    breakpoints: {
      // min
      [bp.mobile + 1]: {
        spaceBetween: 30,
        slidesPerView: 'auto',
      },
    },
  },
  'bottom sheet': {
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    slidesPerView: 1,
    slidesPerGroup: 1,
    on: {
      breakpoint: behavior.togglePagination(),
    },
  },
};
const swiperInit = function (el, option) {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  const swiper = el.querySelector('.swiper');
  let initialIndex = 0;
  el.querySelectorAll('.swiper-slide').forEach((item, index) => {
    if (item.classList.contains('c-roll-selector__item--active')) {
      initialIndex = index;
    }
  });
  runCarousel(swiper, {
    ...option,
    initialSlide: initialIndex,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

const plpInit = function (component) {
  if (beforeLaunch(component)) return false;

  // init category selector
  const categorySelector = component
    .map(c => c.querySelector(`.${classname.categorySelector}`))
    .filter(el => el != null);
  if (beforeLaunch(categorySelector)) return false;

  categorySelector.forEach(s => {
    const items = s.querySelectorAll('.swiper-slide');
    if (beforeLaunch(items)) return false;

    const blockLocation = s.closest(`.${classname.bottomSheet}`) ? 'bottom sheet' : 'category selector';
    return swiperInit(s, options[blockLocation]);
  });
};

// scroll for PDP
// const getScrollTop = () => {
//     if (window.pageYOffset !== undefined) {
//         return window.pageYOffset;
//     }
//     return document.documentElement.scrollTop || document.body.scrollTop;
// };
const PDPTabs = document.querySelector('.PD0033.type-pdp');
let PDPTabItem;
const PDPContentArea = [];
const activeTabs = (activeIdx, isActive) => {
  if (isActive) {
    PDPTabItem[activeIdx].classList.add('active');
    const scrollTarget = PDPTabs.querySelector('.c-floating-wrap');
    const tLeft = PDPTabItem[activeIdx].getBoundingClientRect().left;
    const left = tLeft + scrollTarget.scrollLeft;
    const paddingLeft = getElementRenderStyle(scrollTarget, 'padding-left');
    const moveTo = parseInt(left, 10) - parseInt(paddingLeft, 10);
    if (moveTo === 0 && activeIdx === 0) scrollTarget.scrollTo(moveTo, 0);
    else if (moveTo > 0) scrollTarget.scrollTo(moveTo, 0);
    // console.log(tLeft, scrollTarget.scrollLeft);
  } else {
    PDPTabItem[activeIdx].classList.remove('active');
  }
};
const findActiveTab = () => {
  let activeItem = -1;
  PDPContentArea.forEach((content, idx) => {
    if (!content || activeItem >= 0) {
      // if no content or activeItem already found
      return;
    }
    const t = parseInt(content.getBoundingClientRect().top, 10);
    const b = parseInt(content.getBoundingClientRect().bottom, 10);
    const wh = parseInt(window.innerHeight, 10);
    if (PDPContentArea[0].getBoundingClientRect().bottom >= wh * 0.3) {
      // first
      activeItem = 0;
    } else if ((t >= 0 && b < wh) || (t < 0 && b >= wh)) {
      // inside
      activeItem = idx;
    } else if (t >= 0 && t < wh * 0.3 && b >= wh) {
      // top
      activeItem = idx;
    } else if (t < 0 && b >= wh * 0.3 && b >= 0) {
      // bottom
      activeItem = idx;
    }
  });
  return activeItem;
};
const scrollTabs = () => {
  const activeItem = findActiveTab();
  PDPTabItem.forEach((tab, idx) => {
    if (idx === activeItem && activeItem >= 0) activeTabs(idx, true);
    else activeTabs(idx, false);
  });
};
const controlPDPTabs = () => {
  if (beforeLaunch(PDPTabs)) return false;
  PDPTabItem = PDPTabs.querySelectorAll('.c-tabs__item');
  if (!window.stickyHeight) window.stickyHeight = 0;
  let timer = null;
  const stopCheckPos = () => {
    if (timer) {
      // clear previous timer if exist
      // console.log('stop');
      clearInterval(timer);
      timer = null;
      window.removeEventListener('wheel', stopCheckPos, false);
      window.removeEventListener('touchstart', stopCheckPos, false);
    }
  };
  const keyupEvent = function (event) {
    const key = event.keyCode;
    if (key === keyboard.up || key === keyboard.pgup || key === keyboard.down || key === keyboard.pgdn) {
      stopCheckPos();
    }
  };

  PDPTabItem?.forEach(tab => {
    if (tab?.href.indexOf('#') !== -1) {
      if (tab.href.split('#')[1].length > 1) {
        const tid = tab.href.split('#')[1];
        const currentContent = document.getElementById(tid);
        PDPContentArea.push(currentContent);
        // click event
        const isFixPos = () => {
          const gap = window.stickyHeight - parseInt(currentContent.getBoundingClientRect().top, 10);
          if (gap >= 0 && gap < 10) {
            return true;
          }
          return false;
        };
        const goToPos = () => {
          if (!timer) return false;
          const targetTop = currentContent.offsetTop - window.stickyHeight;
          window.scrollTo({ top: targetTop });
        };
        tab.addEventListener('click', event => {
          event.preventDefault();
          if (!currentContent) return false;
          stopCheckPos();
          timer = setInterval(() => {
            if (!isFixPos()) {
              goToPos();
            } else {
              stopCheckPos();
            }
          }, recheckScrolling);
          goToPos();
          tab.addEventListener('keyup', keyupEvent, false);
          window.addEventListener('wheel', stopCheckPos, false);
          window.addEventListener('touchstart', stopCheckPos, false);
        });
      }
    }
  });
  window.addEventListener('scroll', scrollTabs, false);
  // hash
  const hash = window.location.hash.split('#')[1];
  if (hash && document.getElementById(hash)) {
    const currentTab = PDPTabs.querySelector(`.c-tabs__item[href="#${hash}"]`);
    if (currentTab) currentTab.click();
  }
};

const selectTab = () => {
  const Tab = document.querySelectorAll('.c-tabs__item');
  Tab.forEach(c => {
    c.addEventListener('click', () => {
      const currentPrents = c.closest('.c-tabs__list');
      if (c.getAttribute('role') === 'tab' && currentPrents.getAttribute('role') === 'tablist') {
        Tab.forEach(el => {
          el.setAttribute('aria-selected', 'false');
          el.classList.remove('active');
        });
        c.classList.add('active');
        c.setAttribute('aria-selected', 'true');
      }
      c.addEventListener('keyup', e => {
        const key = e.keyCode;
        const cfocus = c.href.split('#')[1];
        const currentFocus = document.getElementById(cfocus);
        if (key === keyboard.enter) {
          currentFocus?.focus();
        }
      });
    });
  });
};

// component
function init() {
  const component = document.querySelectorAll('.PD0033');
  if (beforeLaunch(component)) return false;

  component.forEach(cmp => {
    const componentContainer = cmp.querySelector('.price-area__PD0033');
    // gets sku from dataset and adds to recently view cookie if functional Cookies enabled
    if (componentContainer?.dataset?.sku && checkFunctionalCookieEnabled()) {
      addKeyWordToCookie(cookieConst.recentlyViewCookie, componentContainer.dataset.sku);
    }
  });

  controlPDPTabs();
  const PLPComponent = [...component].filter(c => c.classList.contains(classname.plp));
  plpInit(PLPComponent);
  selectTab();
}
init();
// export default
