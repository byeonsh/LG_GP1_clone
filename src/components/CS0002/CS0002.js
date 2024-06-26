/* eslint-disable default-case */
import { bp, isRTL, keyboard } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';
import { pageScroll } from '../../assets/js/common/utils.js';

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
  const tabItem = document.querySelectorAll('.c-tabs__inner.swiper .swiper-slide');

  const tabCenter = function (target) {
    let pos;
    let listWidth = 0;

    const targetWidth = target.offsetWidth;
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const targetPosLeft = target.offsetLeft;
    const swiperBox = document.querySelector('.c-tabs__inner.swiper');
    const swiperBoxWidth = document.querySelector('.c-tabs__inner.swiper').offsetWidth;
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
};

tabCenterMove();

// let focusBtn;
// modal
const popup = {
  focusBtn: '',
  closeEvent(elememt) {
    const targetCont = elememt.closest('.c-modal');
    targetCont.classList.remove('c-modal--active');
    targetCont.removeAttribute('tabindex');
    pageScroll.able();
  },
  popMsg(href, popOpenBtn = false) {
    // href = href value or id value
    const popCloseBtns = document.querySelectorAll('.c-modal__closebtn');
    const popId = href.replace('#', '');
    const targetCont = document.getElementById(popId);
    const dimmed = targetCont.querySelector('.c-modal__dimmed');
    targetCont.classList.add('c-modal--active');
    targetCont.setAttribute('tabindex', '0');
    targetCont.focus();
    if (popOpenBtn) popup.focusBtn = popOpenBtn;

    // page scroll
    pageScroll.disable();

    // close
    popCloseBtns.forEach(b =>
      b.addEventListener('click', () => {
        // initLayerPopup(b.closest('.c-pop-msg'));
        popup.closeEvent(b);
        if (popup.focusBtn) popup.focusBtn.focus();
      })
    );
    // dimmed
    dimmed.addEventListener('click', () => {
      popup.closeEvent(dimmed);
      if (popup.focusBtn) popup.focusBtn.focus();
    });
  },
  initPopup() {
    const popOpenBtns = document.querySelectorAll('.c-modal-open');
    popOpenBtns.forEach(function (btn) {
      // href = href value or id value
      let href = btn.getAttribute('aria-controls') || btn.getAttribute('href');
      href = href.replace('#', '');
      btn.addEventListener('click', function () {
        popup.popMsg(href);
        popup.focusBtn = btn;
      });
      // enter
      btn.addEventListener('keydown', function () {
        if (window.event.keyCode === 13) {
          popup.popMsg(href);
          popup.focusBtn = btn;
        }
      });
    });
    const keyupEvent = function (event) {
      const key = event.keyCode;
      if (key === keyboard.esc) {
        const popLayer = document.querySelectorAll('.c-modal');
        popLayer.forEach(layer => {
          if (layer.classList.contains('c-modal--active')) {
            // initLayerPopup(layer);
          }
          layer.classList.remove('c-modal--active');
        });
        if (popup.focusBtn) popup.focusBtn.focus();
        pageScroll.able();
      }
    };
    window.addEventListener('keyup', keyupEvent);
  },
};

popup.initPopup();

const hoverImg = function () {
  const iconImgNormal = document.querySelectorAll('.CS0002 .c-prd-grid > div');
  iconImgNormal.forEach(item => {
    const norIcon = item.querySelector('img');
    const norIconAttr = norIcon.getAttribute('src');
    const hoverIcon = norIconAttr.replace('_normal', '_active');
    item.addEventListener('mouseover', function () {
      norIcon.setAttribute('src', hoverIcon);
      item.classList.add('hover');
    });
    item.addEventListener('mouseout', function () {
      norIcon.setAttribute('src', norIconAttr);
      item.classList.remove('hover');
    });
  });
};
hoverImg();

const inputEvent = {
  textClear() {
    const buttonDelete = document.querySelectorAll('.c-button-delete');
    const input = document.querySelectorAll('.textInput__input');
    buttonDelete.forEach(el => {
      el.addEventListener('click', () => {
        input.forEach(el3 => {
          // eslint-disable-next-line no-param-reassign
          el3.value = '';
          el3.focus(); // 20230307
        });
        el.classList.remove('c-button-delete--active');
      });
    });
  },
  deleteButtonOn() {
    const buttonDelete = document.querySelectorAll('.c-button-delete');
    const input = document.querySelectorAll('.textInput__input');
    const searchLayer = document.querySelector('.searchLayer');
    input.forEach(el => {
      el.addEventListener('click', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
            searchLayer.classList.remove('c-display');
          }
        });
      });
      el.addEventListener('keyup', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
            searchLayer.classList.remove('c-display');
          }
        });
      });
    });
  },
  layerOpen() {
    // const searchLayer = document.querySelector('.searchLayer');
    // const searchBtn = document.querySelector('.searchBar__form .fieldIcons__before');
    // searchBtn.addEventListener('click', function () {
    //     searchLayer.classList.add('c-display');
    // });
  },
  layerClose() {
    const searchLayer = document.querySelector('.searchLayer');
    const cancelBtn = searchLayer.querySelector('.c-cancel');
    cancelBtn.addEventListener('click', function () {
      searchLayer.classList.remove('c-display');
    });
  },
  inputTxt() {
    const pInput = document.querySelector('.textInput__input');
    const mInput = document.getElementById('textInput__input2');
    const searchLayer = document.querySelector('.searchLayer');
    const cancelBtn = searchLayer.querySelector('.c-cancel');
    const searchLayerList = searchLayer.querySelectorAll('ul li');
    pInput.addEventListener('input', function (e) {
      const inValue = e.target.value;
      if (inValue) {
        searchLayer.classList.add('c-display');
        mInput.value = inValue;
        mInput.focus();
      }
    });
    mInput.addEventListener('input', function (e) {
      const inValue = e.target.value;
      if (inValue) {
        searchLayer.classList.add('c-display');
        pInput.value = inValue;
        pInput.focus();
      }
    });
    cancelBtn.addEventListener('click', function () {
      pInput.value = '';
    });

    const keyupSearchLayer = btn => {
      const searchList = btn.target.closest('ul');
      const currentList = btn.target.closest('li');
      const nodes = [...searchList.children];
      let index = nodes.indexOf(currentList);
      if (currentList.length === 0) return false;
      if (btn.keyCode === keyboard.up) {
        btn.preventDefault();
        index -= 1;
        if (index >= 0 && index < nodes.length) {
          nodes[index].querySelector('a').focus();
        }
      } else if (btn.keyCode === keyboard.down) {
        btn.preventDefault();
        index += 1;
        if (index >= 0 && index < nodes.length) {
          nodes[index].querySelector('a').focus();
        }
      }
    };

    searchLayerList.forEach(el => {
      el.addEventListener('keyup', keyupSearchLayer);
    });
  },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
    inputEvent.layerOpen();
    inputEvent.layerClose();
    inputEvent.inputTxt();
  },
};

inputEvent.init();

// 20230307 WAI
const keyEvent = function () {
  const keyupEvent = function (event) {
    const searchActive = document.querySelector('.searchLayer.c-display');
    const nextFocus = document.querySelector('.find-number');
    const key = event.keyCode;
    const targetConts = document.querySelectorAll('.c-prd-grid .c-modal-open');

    if (key === keyboard.esc && searchActive) {
      targetConts.forEach(el => {
        el.removeAttribute('tabindex');
      });
      searchActive.classList.remove('c-display');
      nextFocus.focus();
    } else if (!searchActive) {
      targetConts.forEach(el => {
        el.setAttribute('tabindex', '0');
      });
    }
  };
  document.addEventListener('keydown', keyupEvent);
};
keyEvent();

// clickOutside :  clear searchLayer
const clickOutside = function () {
  document.addEventListener('click', function clickOutside2(event) {
    const get = document.querySelector('.searchLayer');
    if (!get.contains(event.target)) {
      get.classList.remove('c-display');
    }
  });
};
clickOutside();

// add modal script
function scrollContentHeight(breakpoint) {
  // modal category
  const modalCategory = document.querySelectorAll('.c-modal__box-category');

  modalCategory.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead.offsetHeight;

    const modalBottom = item.childNodes[5];
    const modalBottomHeight = modalBottom.offsetHeight;

    const modalContent = item.childNodes[3].lastElementChild;
    const modalContentHeight = modalHeadHeight + modalBottomHeight;

    if (breakpoint > bp.mobile) {
      modalContent.style.height = `calc(90vh - ${modalContentHeight}px)`;
    } else {
      modalContent.style.height = `calc(100vh - ${modalContentHeight}px)`;
    }
  });

  // modal model number
  const modalModelNumber = document.querySelectorAll('.c-modal__box-modelnumber');

  modalModelNumber.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead.offsetHeight;

    const modalBottom = item.childNodes[7];
    const modalBottomHeight = modalBottom.offsetHeight;

    const modalSerialTabContent = item.childNodes[3].firstElementChild.firstElementChild;
    const modalSerialTabContentHeight = modalHeadHeight + modalBottomHeight;

    const modalQrTabContent = item.childNodes[5].firstElementChild.firstElementChild;
    const modalQrTabContentHeight = modalHeadHeight + modalBottomHeight;

    if (breakpoint > bp.mobile) {
      modalSerialTabContent.style.height = `calc(90vh - ${modalSerialTabContentHeight}px)`;
      modalQrTabContent.style.height = `calc(90vh - ${modalQrTabContentHeight}px)`;
    } else {
      modalSerialTabContent.style.height = `calc(100vh - ${modalSerialTabContentHeight}px)`;
      modalQrTabContent.style.height = `calc(100vh - ${modalQrTabContentHeight}px)`;
    }
  });
}

// add modal script
function init() {
  let breakpoint = window.innerWidth;
  scrollContentHeight(breakpoint);

  window.addEventListener('resize', () => {
    breakpoint = window.innerWidth;
    scrollContentHeight(breakpoint);
  });
}

init();
