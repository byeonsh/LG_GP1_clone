import { bp, isRTL } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';

const dateSetting = function () {
  const monthControl = document.querySelectorAll('input[type="date"]');
  monthControl.forEach(function (el) {
    const theElement = el;
    theElement.value = new Date().toISOString().slice(0, 10);
    const gnb = document.querySelector('.c-gnb__navi-wrap');
    if (theElement) {
      if (gnb) {
        gnb.addEventListener('mouseenter', function () {
          document.getElementById('purchaseDate').blur();
        });
      }
    }
  });
};
dateSetting();

// eslint-disable-next-line new-cap, no-unused-vars
const tabSwiper = new swiper('.c-tabs__inner.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
});

// eslint-disable-next-line new-cap, no-unused-vars
const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 3,
});

// tab center move event
const tabCenterMove = function () {
  const tab = document.querySelectorAll('.CS0048 .c-tabs__inner.swiper');
  tab.forEach(tabElem => {
    const tabItem = tabElem.querySelectorAll('.CS0048 .c-tabs__inner.swiper .swiper-slide');

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

tabCenterMove();

// When inserting a component
const reselectClose = function () {
  const component = document.querySelectorAll('.CS0048');
  component.forEach(comp => {
    const reselectCloseBtn = comp.querySelectorAll('.c-selected-model-Num .c-btn-close');

    if (reselectCloseBtn) {
      reselectCloseBtn.forEach(el => {
        el.addEventListener('click', () => {
          const selectModelNum = el.closest('.c-selected-model-Num');
          const reselectBreadcrumb = el.parentElement.previousElementSibling;
          selectModelNum.classList.add('hide');
          if (reselectBreadcrumb) {
            reselectBreadcrumb.classList.add('hide');
          }
        });
      });
    }
  });
};
reselectClose();

// window.onscroll = function () {
//     // eslint-disable-next-line no-use-before-define
//     fixedStyleChange();
// };

// // Add the sticky class to the header when you reach its scroll position.
// // Remove "sticky" when you leave the scroll position
// function fixedStyleChange() {
//     const header = document.querySelector('.c-sticky__contents');
//     const sticky = header.offsetTop;
//     if (window.pageYOffset > sticky) {
//         header.classList.add('c-sticky');
//     } else {
//         header.classList.remove('c-sticky');
//     }
// }
