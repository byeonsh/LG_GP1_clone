import { bp, isRTL, keyboard } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel from '../../assets/js/common/carousel.js';
import swiper from '../../assets/js/vendors/swiper.js';
import accordion from '../../assets/js/common/accordion.js';

// carouselOption
const carouselOption = {
  loop: false,
  speed: 500,
  autoplay: false,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: 2.1,
  pagination: {
    enabled: true,
  },
  // centeredSlides: true,
  spaceBetween: 12,
  breakpoints: {
    // min
    769: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    },
  },
};

// const carouselOption2 = {
//     pagination: behavior.pagination,
//     speed: 500,
//     keyboard: {
//         enabled: true,
//         onlyInViewport: false,
//     },
//     allowTouchMove: true,
//     lazy: false,
//     spaceBetween: 24,
//     breakpoints: {
//         // min
//         [bp.mobile + 1]: {
//             slidesPerView: 2,
//             slidesPerGroup: 8,
//             grid: {
//                 rows: 4,
//             },
//         },
//     },
// };

const swiperInit = function (target) {
  const bodySwiper = target.parentElement.querySelector('.c-carousel--video');
  const swiperFraction = target.parentElement.querySelector('.c-carousel__pagination');
  const nextButton = target.parentElement.querySelector('.js-carousel-next');
  const prevButton = target.parentElement.querySelector('.js-carousel-prev');
  runCarousel(bodySwiper, {
    ...carouselOption,
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
};

// const swiperInit2 = function (target) {
//     const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
//     const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
//     return runCarousel(target, {
//         ...carouselOption2,
//         navigation: {
//             nextEl,
//             prevEl,
//         },
//     });
// };

// const addBtnMore = function (target, items, addFlag = true) {
//     const max = 3;
//     const ctaAreaColumn = target.closest('.carousel').querySelector('.c-cta');
//     const button = ctaAreaColumn.querySelector('.c-button');
//     // preset
//     if (max >= items.length && addFlag) ctaAreaColumn.classList.add('hidden');
//     if (max < items.length) ctaAreaColumn.classList.remove('hidden');
//     if (!addFlag) ctaAreaColumn.classList.add('hidden');
//     items.forEach((item, index) => {
//         if (index > max - 1 && addFlag) item.classList.add('hidden');
//     });
//     // event listening
//     const handler = function (event) {
//         event.preventDefault();
//         [...items].filter(item => item.classList.contains('hidden'))
//              .forEach(item => item.classList.remove('hidden'));
//         this.classList.remove('hidden');
//         ctaAreaColumn.classList.add('hidden');
//     };
//     if (!addFlag) return button.removeEventListener('click', handler);
//     button.addEventListener('click', handler, false);
// };

const classfier = function (type, target) {
  // let { swiper = undefined } = target;
  switch (type) {
    case 'swiper init':
      return swiperInit(target);
    // case 'swiper init2':
    //     return swiperInit2(target);
    case 'swiper destroy':
      target.swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.swiper = undefined;
      return;
    // case 'add more button':
    //     return addBtnMore(target, items);
    // case 'remove more button':
    //     return addBtnMore(target, items, false);
    default:
      return console.log('non case');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.CS0045 .type-home');
  if (beforeLaunch(component)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const videoSwiper = document.querySelectorAll('.CS0045 .c-video-container');
  const typeAccordion = document.querySelectorAll('.CS0045 .type-accordion');

  videoSwiper.forEach(target => {
    return swiperInit(target);
  });

  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    const webNum = 3;
    const mobileNum = 1;
    component.forEach(function (element) {
      const typeHome = element.classList.contains('type-home');
      const target = element.querySelector('.c-carousel');
      const items = target.querySelectorAll('.cmp-carousel__item.swiper-slide');
      const num = mediaQueryList.matches ? webNum : mobileNum;
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      if (typeHome && isWeb) {
        // eslint-disable-next-line no-unused-expressions
        carouselHas && classfier('swiper destroy', target);
      }
      // type:category(default)
      if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
      if (num < items.length && carouselNone) return classfier('swiper init', target);
    });
  };
  typeAccordion.forEach(el => accordion.run(el));
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}

init();

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

// VIEW MORE
// const mobileSize = () => {
//     const ww = window.innerWidth;
//     const isMobile = ww <= bp.mobile + 1;
//     return isMobile;
// };

// const getDisplayNumber = list => {
//     let len = list.dataset.lengthMobile;
//     const isMobile = mobileSize();
//     if (isMobile) {
//         len = list.dataset.lengthMobile;
//     } else {
//         len = list.dataset.lengthDesktop;
//     }
//     return parseInt(len, 10);
// };

// const resetList = el => {
//     let list;
//     const btnArea = el.querySelector('.c-load-more');
//     if (el.classList.contains('type-video')) {
//         list = el.querySelector('.c-list');
//         // btnArea = c.closest('.type-video .c-load-more');
//     } else if (el.classList.contains('type-solution')) {
//         list = el.querySelector('.c-list-link');
//         // btnArea = c.closest('.type-solution .c-load-more');
//     }
//     const isMobile = mobileSize();
//     const len = getDisplayNumber(list);
//     if (list.dataset.first === 'true') {
//         // If the user has not yet clicked the more button,
//         // the number displayed on the screen is changed according to the browser size.
//         const allList = list.querySelectorAll('.c-list__item');
//         // console.log(allList);
//         // const primaryList = list.querySelectorAll('.c-list__item--primary');
//         allList.forEach(item => {
//             const index = [...item.parentElement.children].indexOf(item);
//             if (index >= len) {
//                 item.classList.add('hidden');
//             } else {
//                 item.classList.remove('hidden');
//             }
//         });
//     } else if (!isMobile) {
//         // After the user clicks the more button once, when resizing, show more items
//         // Only Desktop size
//         // let moreItemLength = 0;
//         const hiddenList = list.querySelectorAll('.c-list__item.hidden');
//         const shownList = list.querySelectorAll('.c-list__item:not(.hidden)');
//         hiddenList.forEach(item => {
//             const index = [...item.parentElement.children].indexOf(item) - shownList.length;
//             if (index <= len) {
//                 item.classList.remove('hidden');
//             }
//         });
//     }
//     // Controls whether to show the more button based on hidden items.
//     const hiddenList = list.querySelectorAll('.c-list__item.hidden');
//     if (hiddenList.length === 0) {
//         btnArea.classList.add('hidden');
//     } else {
//         btnArea.classList.remove('hidden');
//     }
// };

// const clickMore = event => {
//     const btn = event.target;
//     let list;
//     const container = btn.closest('.container');
//     if (container.classList.contains('type-video')) {
//         list = btn.closest('.component').querySelector('.c-list');
//     } else if (container.classList.contains('type-solution')) {
//         list = btn.closest('.component').querySelector('.c-list-link');
//     }
//     const btnArea = btn.closest('.container .c-load-more');
//     if (list.dataset.first) {
//         // After the user clicks the more button even once,
//         // the number displayed on the screen no longer changes.
//         list.dataset.first = false;
//     }
//     // Depending on the resolution, more items as many as len are displayed
//     const len = getDisplayNumber(list);
//     let hiddenList = list.querySelectorAll('.c-list__item.hidden');
//     const shownList = list.querySelectorAll('.c-list__item:not(.hidden)');
//     hiddenList.forEach(item => {
//         const index = [...item.parentElement.children].indexOf(item) - shownList.length + 1;
//         if (index <= len) {
//             item.classList.remove('hidden');
//         }
//     });
//     // Controls whether to show the more button based on hidden items.
//     hiddenList = list.querySelectorAll('.c-list__item.hidden');
//     if (hiddenList.length === 0) {
//         const changeBTN = btnArea.querySelector('.c-button').classList;
//         changeBTN.remove('black', 'c-button--box-outlined-icon');
//         changeBTN.add('red', 'c-button--box');
//         btnArea.querySelector('.c-button__text').innerHTML = 'VIEW ALL';
//     }
// };

// function reSize(component) {
//     // resize
//     const delay = 300;
//     let timer = null;
//     window.addEventListener('resize', function () {
//         clearTimeout(timer);
//         timer = setTimeout(function () {
//             resetList(component);
//         }, delay);
//     });
//     resetList(component);
// }

// init
// function init3() {
//     const moreButtons = document.querySelectorAll('.CS0045 .c-load-more .button');
//     moreButtons.forEach(btn => {
//         btn.addEventListener('click', clickMore);
//         const component = btn.closest('.container');
//         if (beforeLaunch(component)) return false;

//         // console.log(component)
//         let list;
//         if (component.classList.contains('type-video')) {
//             list = component.querySelector('.c-list');
//         } else if (component.classList.contains('type-solution')) {
//             list = component.querySelector('.c-list-link');
//         }
//         list.dataset.first = true;
//         reSize(component);
//     });
// }
// init3();

function selectContent(i, contentTitle) {
  let selectlistTitle2;
  contentTitle.forEach((el, index) => {
    const listTitle2 = contentTitle[index].querySelectorAll('.c-wide-list__item');
    listTitle2?.forEach((el2, index2) => {
      el2.parentElement.classList.remove('disabled');
      el2.classList.remove('c-wide-list__item--active');
      el2.setAttribute('aria-current', false);
      el2.addEventListener('click', function () {
        if (i !== index || i === index) {
          if (selectlistTitle2 !== index2 && selectlistTitle2 !== undefined) {
            listTitle2[selectlistTitle2].classList.remove('c-wide-list__item--active');
            listTitle2[selectlistTitle2].setAttribute('aria-current', false);
          }
          el2.classList.add('c-wide-list__item--active');
          el2.setAttribute('aria-current', true);
          selectlistTitle2 = index2;
        }
      });
      if (i !== index) {
        const disabledText = document.querySelector('.c-list-area__disabled-text');
        disabledText.classList.add('c-list-area__disabled-text--disabled');
        el2.parentElement.classList.add('disabled');
      }
    });
  });
}

function pcClickList() {
  const targetPC = document.querySelector('.pc-only').querySelectorAll('.c-list-area__box');
  const listTitle = targetPC[0].querySelectorAll('.c-wide-list__item');
  const listContentTitle = targetPC[1].querySelectorAll('.category-text');
  const listScrollBox = document.querySelectorAll('.c-list-area__scroll');
  const contentTitle = document.querySelector('.pc-only').querySelectorAll('.c-wide-list__item-category');
  const listItem = document
    .querySelector('.pc-only')
    .querySelectorAll('.c-list-area__box:not(.c-list-area__box-category) .c-wide-list .c-wide-list__item');
  const listItemSub = document
    .querySelector('.pc-only')
    .querySelectorAll('.c-list-area__sub-topic .c-wide-list__item-category .c-wide-list__item');
  let selectlistTitle;
  function keyupSearchLayer(btn) {
    const searchList = btn.target.closest('.wa-keylist');
    const currentList = btn.target.closest('.c-wide-list__item');
    const nodes = [...searchList.children];
    let index = nodes.indexOf(currentList);
    if (currentList.length === 0) return false;
    if (btn.keyCode === keyboard.up) {
      btn.preventDefault();
      index -= 1;
      if (index >= 0 && index < nodes.length) {
        if (nodes[index].querySelector('button')) {
          nodes[index].querySelector('button').focus();
        } else if (nodes[index].querySelector('a')) {
          nodes[index].querySelector('a').focus();
        }
      }
    } else if (btn.keyCode === keyboard.down) {
      btn.preventDefault();
      index += 1;
      if (index >= 0 && index < nodes.length) {
        if (nodes[index].querySelector('button')) {
          nodes[index].querySelector('button').focus();
        } else if (nodes[index].querySelector('a')) {
          nodes[index].querySelector('a').focus();
        }
      }
    }
  }
  contentTitle.forEach(elem => {
    elem.classList.add('c-all-disabled');
    listTitle.forEach((el, index) => {
      function enterAction() {
        elem.classList.remove('c-all-disabled');
        if (selectlistTitle !== index && selectlistTitle !== undefined) {
          listTitle[selectlistTitle].classList.remove('c-wide-list__item--active');
          listTitle[selectlistTitle].setAttribute('aria-current', false);
        }
        el.classList.add('c-wide-list__item--active');
        el.setAttribute('aria-current', true);
        setTimeout(function () {
          const focusFirst = document.querySelectorAll('.c-wide-list__item-category:not(.disabled) .c-wide-list__item');
          focusFirst[0].querySelector('a').focus();
        }, 100);
        if (index <= listContentTitle.length) {
          if (index !== 0) {
            const movePosition = listContentTitle[index].offsetTop;
            listScrollBox[2].scrollTop = movePosition;
          } else {
            listScrollBox[2].scrollTop = 0;
          }
          selectContent(index, contentTitle);
        }
        selectlistTitle = index;
      }
      el.addEventListener('click', function () {
        enterAction();
      });
      el.addEventListener('keyup', function () {
        if (window.event.keyCode === 13 || window.event.keyCode === 32) {
          enterAction();
        }
      });
    });
    listItem.forEach(el => {
      el.addEventListener('keyup', keyupSearchLayer);
    });
    listItemSub.forEach(el => {
      el.addEventListener('keyup', keyupSearchLayer);
    });
  });
}
function mobileClickList() {
  const targetMobile = document.querySelector('.mobile-only').querySelectorAll('.c-accordion__box');
  targetMobile.forEach(el =>
    el.querySelector('.c-accordion__head').addEventListener('click', () => {
      // const firstItemActive = el.querySelector('.c-wide-list__item');
      // firstItemActive.classList.add('c-wide-list__item--active');
      const subAccOpen = document.querySelector('.c-accordion__box--expand--sub');
      if (subAccOpen != null && subAccOpen !== el) {
        subAccOpen.classList.remove('c-accordion__box--expand--sub');
      }
      el.classList.toggle('c-accordion__box--expand--sub');
      if (el.classList.contains('c-accordion__box--expand')) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    })
  );
}

// 20230317 modify script
function listItemToggle() {
  const listItem = document.querySelectorAll('.mobile-only .c-wide-list__item');

  listItem.forEach(item => {
    item.addEventListener('click', () => {
      listItem.forEach(el => {
        el.classList.remove('c-wide-list__item--active');
        el.setAttribute('aria-current', false);
      });
      item.classList.add('c-wide-list__item--active');
      item.setAttribute('aria-current', true);
    });
    item.addEventListener('keyup', () => {
      if (window.event.keyCode === 13) {
        listItem.forEach(el => {
          el.classList.remove('c-wide-list__item--active');
          el.setAttribute('aria-current', false);
        });
        item.classList.add('c-wide-list__item--active');
        item.setAttribute('aria-current', true);
      }
    });
  });
}
listItemToggle();

function clickEvent(breakpoint) {
  if (breakpoint > bp.mobile) {
    pcClickList();
  } else {
    mobileClickList();
  }
}

function init4() {
  let breakpoint = window.innerWidth;
  clickEvent(breakpoint);

  window.addEventListener('resize', () => {
    breakpoint = window.innerWidth;
    clickEvent(breakpoint);
  });
}

init4();

// 20230317 added
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
  const tab = document.querySelectorAll('.CS0045 .c-tabs__inner.swiper');
  tab.forEach(tabElem => {
    const tabItem = tabElem.querySelectorAll('.CS0045 .c-tabs__inner.swiper .swiper-slide');

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

// 20230328 add script
function tooltipToggle() {
  const tooltipOpenButton = document.querySelector('.c-header-tooltip-button');
  const tooltipCloseButton = document.querySelector('.c-header-tooltip__button-close');
  const tooltip = document.querySelector('.c-header-tooltip');

  tooltipOpenButton.addEventListener('click', () => {
    tooltip.classList.add('c-header-tooltip--active');
  });

  tooltipCloseButton.addEventListener('click', () => {
    tooltip.classList.remove('c-header-tooltip--active');
  });
}

tooltipToggle();
