/* eslint-disable */
import { bp, isRTL } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';
// import accordion from '../../assets/js/common/accordion.js';

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
  const tab = document.querySelectorAll('.CS0015 .c-tabs__inner.swiper');

  tab.forEach(tabElem => {
    const tabItem = tabElem.querySelectorAll('.CS0015 .c-tabs__inner.swiper .swiper-slide');

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

function navHighlighter() {
  const sections = document.querySelectorAll('.c-image-content[id]');

  const scrollY = window.pageYOffset;
  // console.log('scrollY : ', scrollY);
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150;
    const sectionId = current.getAttribute('id');

    // console.log('sectionHeight', sectionHeight);
    // console.log('sectionTop', sectionTop);
    // console.log('sectionId', sectionId);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.c-tabs__tablist a[href*=${sectionId}]`).classList.add('active');
      document.querySelector('.cmp-tabs__tab__cs').classList.remove('cmp-tabs__tab--active');
    } else {
      document.querySelector(`.c-tabs__tablist a[href*=${sectionId}]`).classList.remove('active');
      document.querySelector('.cmp-tabs__tab__cs').classList.remove('cmp-tabs__tab--active');
    }
  });
}

function fixedStyleChange(e) {
  const header = document.querySelector('.c-sticky-tab');
  const upsticky = header.classList.contains('c-upsticky');
  const pcgnb = document.querySelector('.c-gnb__desktop .c-gnb__sticky');
  const mognb = document.querySelector('.c-gnb__mobile .c-gnb__sticky');

  const sticky = header.querySelector('.type-tabs .c-tabs__inner');
  const cookie = document.querySelector('.c-cookie-layer.active');
  const tabanchor = sticky.querySelectorAll('.c-tabs__tablist .swiper-slide a');
  if (pcgnb || mognb) {
    var pcgnbHeight = pcgnb.clientHeight;
    var mognbHeight = mognb.clientHeight;
    var gnbScrollDown = pcgnb.classList.contains('scroll-down');

    if (e.deltaY > 80) {
      header.classList.add('c-sticky');
      header.classList.remove('c-upsticky');
      if (cookie) {
        sticky.style.top = `${cookie.clientHeight}px`;
      } else {
        sticky.style.top = `${0}px`;
      }
    } else {
      header.classList.add('c-upsticky');
      header.classList.remove('c-sticky');
      if (cookie) {
        if (window.innerWidth > bp.tablet) {
          sticky.style.top = `${pcgnbHeight + cookie.clientHeight}px`;
        } else {
          sticky.style.top = `${mognbHeight + cookie.clientHeight}px`;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (window.innerWidth > bp.tablet) {
          sticky.style.top = `${pcgnbHeight}px`;
        } else {
          sticky.style.top = `${mognbHeight}px`;
        }
      }
    }
  }
  tabanchor.forEach(item => {
    const tabanchorWrap = item.parentElement.closest('.cs-tabs').querySelector('.c-tabs__inner');
    if (gnbScrollDown) {
      header.classList.add('c-sticky');
      header.classList.remove('c-upsticky');
      if (cookie) {
        if (!upsticky) {
          tabanchorWrap.style.top = `${cookie.clientHeight}px`;
        } else {
          tabanchorWrap.style.top = `${pcgnbHeight + cookie.clientHeight}px`;
        }
      } else {
        tabanchorWrap.style.top = `${0}px`;
      }
    } else {
      header.classList.add('c-upsticky');
      header.classList.remove('c-sticky');
    }
  });
}
window.onscroll = function (event) {
  // eslint-disable-next-line no-use-before-define
  fixedStyleChange(event);
  navHighlighter();
};
window.addEventListener('resize', e => {
  fixedStyleChange(e);
});
