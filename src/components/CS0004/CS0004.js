import { bp, isRTL } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';
import swiper from '../../assets/js/vendors/swiper.js';

// eslint-disable-next-line new-cap, no-unused-vars
const tabSwiper = new swiper('.c-tabs__inner.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
});

// tab center move event
const tabCenterMove = function () {
  const tab = document.querySelectorAll('.CS0004 .c-tabs__inner.swiper');

  tab.forEach(tabElem => {
    const tabItem = tabElem.querySelectorAll('.CS0004 .c-tabs__inner.swiper .swiper-slide');

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
            console.log('isrtl');
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

tabCenterMove();

function init5() {
  const component = document.querySelectorAll('.CS0004');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}
init5();
