/* eslint-disable */
import { bp, isRTL } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';

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
  const tabItem = document.querySelectorAll('.c-tabs__inner.swiper .swiper-slide');

  const tabCenter = function (target) {
    let pos;
    let listWidth = 0;

    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const targetPosLeft = target.offsetLeft;
    const swiperBox = document.querySelector('.c-tabs__inner.swiper');
    const swiperBoxWidth = document.querySelector('.c-tabs__inner.swiper').offsetWidth;
    const swiperBoxHalf = swiperBox.offsetWidth / 2;
    const selectTargetPos = targetPosLeft + target.offsetWidth / 2;

    tabItem.forEach(item => {
      listWidth += item.offsetWidth;
    });

    if (listWidth > swiperBoxWidth) {
      if (selectTargetPos <= swiperBoxHalf) {
        // left item
        pos = 0;
        // console.log('left');
      } else if (listWidth - selectTargetPos <= swiperBoxHalf) {
        // right item
        pos = listWidth - swiperBox.offsetWidth;
        // console.log('right');
      } else {
        // center
        pos = selectTargetPos - swiperBoxHalf;
        // console.log('center');
      }

      swiperWrapper.style.transform = `translate3d(${pos * -1}px, 0, 0)`;
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
};

tabCenterMove();
function fixedStyleChange(e) {
  const header = document.querySelector('.c-sticky__contents');
  // const sticky = header.offsetTop;
  const pcgnb = document.querySelector('.c-gnb__desktop .c-gnb__sticky');
  const mognb = document.querySelector('.c-gnb__mobile .c-gnb__sticky');
  const sticky = header.querySelector('.type-tabs .c-tabs__inner');
  const cookie = document.querySelector('.c-cookie-layer.active');
  if (pcgnb || mognb) {
    var pcgnbHeight = pcgnb.clientHeight;
    var mognbHeight = mognb.clientHeight;
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
}
const tabScrollTop = function (e) {
  const tab = document.querySelector('.c-tabs');
  const scrollYPos = window.scrollY;
  const posFromTop = tab.getBoundingClientRect().top;
  const absolutePos = scrollYPos + posFromTop;
  const header = document.querySelector('.c-sticky__contents');

  const tabItem = document.querySelectorAll('.c-tabs__tablist li');
  const pcgnb = document.querySelector('.c-gnb__desktop .c-gnb__sticky');
  const mognb = document.querySelector('.c-gnb__mobile .c-gnb__sticky');

  const sticky = header.querySelector('.type-tabs .c-tabs__inner');
  const cookie = document.querySelector('.c-cookie-layer.active');
  tabItem.forEach(item => {
    fixedStyleChange(e);
  });
};
window.addEventListener('mousewheel', e => {
  fixedStyleChange(e);
});
window.addEventListener('resize', e => {
  fixedStyleChange(e);
  tabScrollTop(e);
});

function init2() {
  const typeAccordion = document.querySelectorAll('.type-accordion');
  typeAccordion.forEach(el => accordion.run(el));
}
init2();

function init() {
  const component = document.querySelectorAll('.type-accordion2');
  if (beforeLaunch(component)) return false;
  component.forEach(el => accordion.run(el));
}

init();

// s --- 230809 print function edit
// const printEvent = event => {
//     console.log(event);
//     const printBtn = event.currentTarget;
//     const component = printBtn.closest('.c-wrapper');
//     // console.log(component)
//     const cssURLs = printBtn.dataset.cssUrl.split(',');
//     console.log(printBtn);
//     console.log(cssURLs);

//     let cssHtml = '';
//     cssURLs.forEach(url => {
//         cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
//     });
//     const newWin = window.open('', '_blank');
//     newWin.document.writeln(
//         `<html dir=${isRTL}><head>${cssHtml}</head><body><div class="c-wrapper CS0236">${component.innerHTML}</div></body></html>`
//     );
//     newWin.document.querySelector('.c-print-area').remove();

//     const isTabs = newWin.document.querySelector('.tabs');
//     if (isTabs) {
//         isTabs.querySelector('.swiper-wrapper').remove();
//         // isTabs.closest('.cmp-container').querySelector('.c-text-contents').remove();
//     }

//     newWin.document.close();
//     newWin.focus();
//     newWin.print();
//     setTimeout(function () {}, 100);
// };
// component
// function printfunc() {
//     const component = document.querySelectorAll('.CS0236');
//     console.log(component);
//     if (beforeLaunch(component)) return false;
//     component.forEach(c => {
//         // print button event
//         // comparePrint(c);
//         const printBtn = c.querySelector('.js-print');
//         if (printBtn) printBtn.addEventListener('click', printEvent);
//     });
//     // if (!document.querySelector('.c-tooltip')) return false;
//     // if (!document.querySelector('.c-sns-share') && !document.getElementById('modal_help_library')) return false;
//     // const shareObj = document.querySelector('.c-sns-share');
//     const configElem = document.querySelector('[data-component-config="snsShare"]');
//     const config = getComponentConfigFromElem(configElem);
//     if (!config) return false;
//     // share(shareObj, config);
// }
// printfunc();

const printSection = function () {
  const printBtn = document.querySelectorAll('.c-print');
  // console.log(printBtn);
  const body = document.querySelector('body');
  const cloneBody = body.cloneNode(true);
  // console.log(cloneBody);
  printBtn.forEach(el => {
    el.addEventListener('click', function () {
      cloneBody.style.zoom = '95%';
      window.print(cloneBody);
    });
  });
};
printSection();
// e --- 230809 print function edit
