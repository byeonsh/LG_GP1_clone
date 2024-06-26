/* eslint-disable */
import { bp, isRTL } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';

function accord() {
  const component = document.querySelectorAll('.type-accordion');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}
accord();

const swiperFraction = document.querySelector('.c-carousel__pagination');
const nextButton = document.querySelector('.swiper-button-next');
const prevButton = document.querySelector('.swiper-button-prev');
const tabSwiper = new swiper('.csSwiper', {
  slidesPerView: 'auto',
  // preventClicks: true,
  // preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  pagination: {
    el: swiperFraction,
    type: 'fraction',
  },
  navigation: {
    nextEl: nextButton,
    prevEl: prevButton,
  },
});

const swiperArrow = function () {
  const contentCount = document.querySelectorAll('.CS0304 .cs-second-tab .swiper-slide').length;
  const swiperHandler = document.querySelector('.CS0304 .cs-second-tab .c-carousel__handler');
  if (swiperHandler && window.innerWidth >= bp.mobile) {
    if (contentCount > 7) {
      swiperHandler.style.display = 'block';
    }
  }
};
swiperArrow();

// const tabCenterMove = function () {
//     const tab = document.querySelectorAll('.csSwiper');
//     tab.forEach(tabElem => {
//         const tabItem = tabElem.querySelectorAll('.csSwiper .swiper-wrapper .swiper-slide');
//         const tabCenter = function (target) {
//             let pos;
//             let listWidth = 0;

//             const targetWidth = target.offsetWidth;
//             const swiperWrapper = tabElem.querySelector('.swiper-wrapper');
//             const targetPosLeft = target.offsetLeft;
//             const swiperBox = tabElem.parentElement.parentElement.querySelector('.swiper');
//             const swiperBoxWidth = swiperBox.offsetWidth;
//             const swiperBoxHalf = swiperBox.offsetWidth / 2;
//             const selectTargetLeftPos = targetPosLeft + target.offsetWidth / 2;
//             // RTL
//             const targetPosRight = targetWidth + targetPosLeft - swiperBoxWidth;
//             const selectTargetRightPos = Math.abs(targetPosRight) + target.offsetWidth / 2;

//             tabItem.forEach(item => {
//                 listWidth += item.offsetWidth;
//             });

//             if (listWidth > swiperBoxWidth) {
//                 if (isRTL) {
//                     if (selectTargetRightPos <= swiperBoxHalf) {
//                         // right item
//                         pos = 0;
//                     } else if (listWidth - selectTargetRightPos <= swiperBoxHalf) {
//                         // left item
//                         pos = listWidth - swiperBox.offsetWidth;
//                     } else {
//                         // other centers
//                         pos = selectTargetRightPos - swiperBoxHalf;
//                     }
//                     swiperWrapper.style.transform = `translate3d(${pos * 1}px, 0, 0)`;
//                 } else {
//                     if (selectTargetLeftPos <= swiperBoxHalf) {
//                         // left item
//                         pos = 0;
//                     } else if (listWidth - selectTargetLeftPos <= swiperBoxHalf) {
//                         // right item
//                         pos = listWidth - swiperBox.offsetWidth;
//                     } else {
//                         // other centers
//                         pos = selectTargetLeftPos - swiperBoxHalf;
//                     }
//                     swiperWrapper.style.transform = `translate3d(${pos * -1}px, 0, 0)`;
//                 }
//                 swiperWrapper.style.transition = '500ms';
//             }
//         };

//         tabItem.forEach(el => {
//             el.addEventListener('click', () => {
//                 tabCenter(el);
//             });
//         });

//         const tabMoveReset = function (breakpoint) {
//             const swiperWrapper = document.querySelector('.swiper-wrapper');
//             if (breakpoint > bp.mobile) {
//                 swiperWrapper.style.transform = 'translate3d(0, 0, 0)';
//             } else {
//                 const selectEl = tabElem.querySelector('.on');
//                 tabCenter(selectEl);
//             }
//         };

//         window.addEventListener('resize', () => {
//             const breakpoint = window.innerWidth;
//             tabMoveReset(breakpoint);
//         });
//     });
// };

// tabCenterMove();

// 이중탭인지 판단 후 이중탭일 경우 이중탭들만 모아서 배열처리
const allTabs = document.querySelectorAll('.tabs');
const notFirstTabs = [];

if (allTabs.length > 1) {
  allTabs.forEach((el, index) => {
    if (index != 0) {
      notFirstTabs[index - 1] = el;
    }
  });
}

// 전체 탭들 주 이미지 탭만 선별하여 배열처리
const imgTabs = new Array();

allTabs.forEach(el => {
  const hasImgIcon = el.querySelectorAll('.c-image__img');

  if (hasImgIcon.length > 0) {
    imgTabs.push(el);
  }
});

// 첫번째 탭 slide 클릭이벤트
const snbSwiperItem = allTabs[0].querySelectorAll('.swiper-slide');
let firstActiveItem = 0; // 활성화된 첫번째 탭의 인덱스를 확인하기 위한 변수

snbSwiperItem[0].classList.add('on'); // 초기화 (페이지 로딩 시 첫번째 탭의 0번 아이템에 on class를 부여.)

snbSwiperItem.forEach((item, index) => {
  item.addEventListener('click', function () {
    // 현재 활성화된 탭이 아닐 경우에만 동작하도록 설정.
    if (index != firstActiveItem) {
      // on class의 이동
      snbSwiperItem[firstActiveItem].classList.remove('on');
      item.classList.add('on');
      firstActiveItem = index;

      // 현재 활성화 된 탭이 아닐 경우 두번째 탭이 존재하면, 두번째 탭을 초기화하는 함수 호출(두번째 탭의 0번 아이템이 선택)
      resetSecondTab();
    }

    // 첫번째 탭이 이미지 탭일 경우 이미지체인지 함수 호출 (현재 페이지에 이미지탭이 있을 경우만 실행)
    if (imgTabs.length > 0) {
      if (imgTabs.includes(item.closest('.tabs'))) {
        imgChange(item.closest('.tabs'), index);
      }
    }
  });
});

// 이중탭일 경우 두번째 탭들의 slide 클릭이벤트
if (notFirstTabs.length > 0) {
  notFirstTabs.forEach(el => {
    const secondTabItems = el.querySelectorAll('.swiper-slide');

    secondTabItems[0].classList.add('on'); // 초기화 (두번째 탭들의 0번째 아이템에 on class 부여)

    secondTabItems.forEach((item, index) => {
      item.addEventListener('click', function () {
        if (!item.classList.contains('on')) {
          item.classList.add('on');
          secondTabItems.forEach((nonSelectEl, elIndex) => {
            if (index != elIndex) {
              nonSelectEl.classList.remove('on');
            }
          });
        }

        // 이미지 탭일 경우 이미지체인지 함수 호출 (현재 페이지에 이미지탭이 있을 경우만 실행)
        if (imgTabs.length > 0) {
          if (imgTabs.includes(item.closest('.tabs'))) {
            imgChange(item.closest('.tabs'), index);
          }
        }
      });
    });
  });
}

// 두번째 탭을 초기화하는 함수(두번째 탭의 0번 아이템이 선택)
const resetSecondTab = function () {
  if (notFirstTabs.length > 0) {
    notFirstTabs.forEach(el => {
      const secondTabsFirstItem = el.querySelectorAll('.swiper-slide');

      secondTabsFirstItem[0].click();
    });
  }
};

// 이미지 on 상태 변환하는 함수 (현재 click 이벤트가 일어난 tab과, active되어야 하는 img의 index를 넘겨받아서 처리.)
const imgChange = function (clickTab, imgIndex) {
  const tabImgs = clickTab.querySelectorAll('.c-image__img');

  tabImgs.forEach((item, index) => {
    const IconAttr = item.getAttribute('src');
    let replaceIcon = IconAttr.replace('_normal', '_active');
    if (imgIndex != index) {
      replaceIcon = IconAttr.replace('_active', '_normal');
    } else {
      replaceIcon = IconAttr.replace('_normal', '_active');
    }
    item.setAttribute('src', replaceIcon);
  });
};

window.onscroll = function () {
  fixedStyleChange();
};

const fixedStyleChange = () => {
  const secondTabSticky = document.querySelector('.cs-second-tab');
  if (secondTabSticky) {
    const tabHeight = secondTabSticky.querySelector('.tabs__items');
    const sticky = secondTabSticky.offsetTop + tabHeight.offsetHeight;
    if (window.pageYOffset > sticky) {
      secondTabSticky.querySelector('.csSwiper2').classList.add('c-sticky');
    } else {
      secondTabSticky.querySelector('.csSwiper2').classList.remove('c-sticky');
    }
  }
};

const printEvent = event => {
  // console.log(event);
  const printBtn = event.currentTarget;
  const component = printBtn.closest('.c-wrapper');
  // console.log(component)
  const cssURLs = printBtn.dataset.cssUrl.split(',');
  // console.log(printBtn);
  // console.log(cssURLs);

  let cssHtml = '';
  cssURLs.forEach(url => {
    cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
  });
  const newWin = window.open('', '_blank');
  newWin.document.writeln(
    `<html dir=${isRTL}><head>${cssHtml}</head><body><div class="c-wrapper CS0304">${component.innerHTML}</div></body></html>`
  );
  newWin.document.querySelector('.c-print-area').remove();

  const isTabs = newWin.document.querySelector('.tabs');
  if (isTabs) {
    isTabs.querySelector('.swiper-wrapper').remove();
    // isTabs.closest('.cmp-container').querySelector('.c-text-contents').remove();
  }

  newWin.document.close();
  newWin.focus();
  newWin.print();
  setTimeout(function () {}, 100);
};
// component
function printfunc() {
  const component = document.querySelectorAll('.CS0304');
  if (beforeLaunch(component)) return false;
  component.forEach(c => {
    // print button event
    // comparePrint(c);
    const printBtn = c.querySelector('.js-print');
    if (printBtn) printBtn.addEventListener('click', printEvent);
  });
  // if (!document.querySelector('.c-tooltip')) return false;
  // if (!document.querySelector('.c-sns-share') && !document.getElementById('modal_help_library')) return false;
  // const shareObj = document.querySelector('.c-sns-share');
  // const configElem = document.querySelector('[data-component-config="snsShare"]');
  // const config = getComponentConfigFromElem(configElem);
  // if (!config) return false;
  // share(shareObj, config);
}
printfunc();

// tab scroll top
const tabScrollTop = () => {
  const tab = document.querySelector('.csSwiper2');
  // const scrollYPos = window.scrollY;
  // console.log(scrollYPos)
  // const posFromTop = tab.getBoundingClientRect().top;
  // const absolutePos = scrollYPos + posFromTop;
  if (tab) {
    const tabItem = tab.querySelectorAll('.swiper-slide');
    tabItem.forEach(item => {
      item.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          // behavior: 'smooth',
        });
      });
    });
  }
};

tabScrollTop();

// new accordion
const accordionInTab = () => {
  const breakpoint = window.matchMedia(`(max-width:${bp.mobile}px)`);
  const tabSecond = document.querySelectorAll('.c-second-tab');
  tabSecond.forEach(el => {
    const accordionHeaders = el.querySelectorAll('.accordion__title');
    function toggleAccordion() {
      const accordionContent = this.nextElementSibling;

      if (accordionContent.style.display === 'block') {
        accordionContent.style.display = 'none';
        this.classList.remove('active');
      } else {
        accordionHeaders.forEach(header => {
          const content = header.nextElementSibling;
          content.style.display = 'none';
          header.classList.remove('active');
        });

        accordionContent.style.display = 'block';
        this.classList.add('active');
      }
    }

    const viewChangeHandler = mediaQueryList => {
      const onMobile = mediaQueryList.matches;
      // ~ 768
      if (onMobile) {
        // console.log('mobile');

        accordionHeaders.forEach((accordionHeader, index) => {
          if (index === 0) {
            accordionHeader.classList.add('active');
            accordionHeader.nextElementSibling.style.display = 'block';
          }

          accordionHeader.addEventListener('click', toggleAccordion);
        });
      }

      // 768 ~
      if (!onMobile) {
        // console.log('pc');

        accordionHeaders.forEach(accordionHeader => {
          accordionHeader.nextElementSibling.style.display = 'block';
        });
      }
    };
    viewChangeHandler(breakpoint);
    breakpoint.addEventListener('change', viewChangeHandler, false);
  });
};
accordionInTab();

const MobileAccor = function (breakpoint) {
  const AccorWrap = document.querySelectorAll('.accordion');

  AccorWrap.forEach(accrEl => {
    const AccorHd = accrEl.querySelectorAll('.accordion__title');
    const AccorCt = accrEl.querySelectorAll('.accordion__content');
    if (breakpoint < bp.tablet) {
      AccorHd.forEach((el, index) => {
        if (index != 0) {
          el.classList.remove('active');
        }
      });
      AccorCt.forEach((el, index) => {
        if (index != 0) {
          el.style.display = 'none';
        }
      });
    }
  });
};

window.addEventListener('resize', () => {
  const breakpoint = window.innerWidth;
  MobileAccor(breakpoint);
});
