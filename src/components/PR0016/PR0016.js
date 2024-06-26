// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp, isRTL } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';
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

// eslint-disable-next-line new-cap, no-unused-vars
const tabSwiper = new swiper('.c-tabs__inner.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  a11y: false,
  navigation: {
    nextEl: '.tabs-swiper-navigation .js-carousel-next',
    prevEl: '.tabs-swiper-navigation .js-carousel-prev',
  },
});

// tab center move event
const tabCenterMove = function () {
  const tab = document.querySelectorAll('.PR0016 .c-tabs__inner.swiper');
  tab.forEach(tabElem => {
    const tabItem = tabElem.querySelectorAll('.PR0016 .c-tabs__inner.swiper .swiper-slide');

    const tabCenter = function (target) {
      let pos;
      let listWidth = 0;

      const targetWidth = target.offsetWidth;
      const swiperWrapper = tabElem.querySelector('.swiper-wrapper');
      const targetPosLeft = target.offsetLeft;
      const swiperBox = tabElem.parentElement.parentElement.querySelector('.c-tabs__inner.swiper');
      const swiperBoxWidth = swiperBox.offsetWidth;
      const swiperBoxHalf = swiperBox.offsetWidth / 2;
      const selectTargetLeftPos = targetPosLeft + target.offsetWidth / 2;
      // RTL
      const targetPosRight = targetWidth + targetPosLeft - swiperBoxWidth;
      const selectTargetRightPos = Math.abs(targetPosRight) + target.offsetWidth / 2;

      tabItem.forEach(item => {
        listWidth += item.offsetWidth;
      });

      if (listWidth > swiperBoxWidth) {
        if (isRTL) {
          if (selectTargetRightPos <= swiperBoxHalf) {
            // right item
            pos = 0;
          } else if (listWidth - selectTargetRightPos <= swiperBoxHalf) {
            // left item
            pos = listWidth - swiperBox.offsetWidth;
          } else {
            // other centers
            pos = selectTargetRightPos - swiperBoxHalf;
          }
          swiperWrapper.style.transform = `translate3d(${pos * 1}px, 0, 0)`;
        } else {
          if (selectTargetLeftPos <= swiperBoxHalf) {
            // left item
            pos = 0;
          } else if (listWidth - selectTargetLeftPos <= swiperBoxHalf) {
            // right item
            pos = listWidth - swiperBox.offsetWidth;
          } else {
            // other centers
            pos = selectTargetLeftPos - swiperBoxHalf;
          }
          swiperWrapper.style.transform = `translate3d(${pos * -1}px, 0, 0)`;
        }
        swiperWrapper.style.transition = '500ms';
      }
    };

    tabItem.forEach(item => {
      item.addEventListener('click', () => {
        tabCenter(item);
      });
    });
    const tabMoveReset = function (breakpoint) {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      if (breakpoint > bp.mobile) {
        swiperWrapper.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    window.addEventListener('resize', () => {
      let breakpoint = window.innerWidth;
      breakpoint = window.innerWidth;
      tabMoveReset(breakpoint);
    });
  });
};

function bestSwiper() {
  const bastCarousel = document.querySelectorAll('.PR0016 .c-result-area .swiper');
  if (beforeLaunch(bastCarousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const carouselOptions = {
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
  };
  bastCarousel.forEach(target => {
    let targetSwiper;
    const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
    const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
    const togglemySwiper = function (mediaQuery) {
      // mobile view
      if (!mediaQuery.matches) {
        if (target.children[0].children.length === 1) {
          if (targetSwiper !== undefined) {
            targetSwiper.destroy(true, true);
            targetSwiper = undefined;
          }
        } else {
          targetSwiper =
            targetSwiper === undefined
              ? runCarousel(target, {
                  ...carouselOptions,
                  navigation: {
                    nextEl,
                    prevEl,
                  },
                })
              : undefined;
        }
        return;
      }
      if (targetSwiper !== undefined) {
        targetSwiper.destroy(true, true);
        targetSwiper = undefined;
      }
    };
    breakpoint.addEventListener('change', togglemySwiper);
    togglemySwiper(breakpoint);
  });
}

function init() {
  const component = document.querySelectorAll('.PR0016');
  if (beforeLaunch(component)) return false;

  component.forEach(c => {
    promotionSelectorInit(c, promotionSelectorOption);
  });
  tabCenterMove();
  bestSwiper();
}
init();
