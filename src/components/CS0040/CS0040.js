// 20230317 full script change
import { keyboard } from '../../assets/js/common/constant.js';

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
    } else if (key === keyboard.shift && searchActive) {
      searchActive.classList.remove('c-display');
    } else if (!searchActive) {
      targetConts.forEach(el => {
        el.setAttribute('tabindex', '0');
      });
    }
  };
  document.addEventListener('keyup', keyupEvent);
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

// 20230320
const hoverImg = function () {
  const iconImgNormal = document.querySelectorAll('.CS0040 .c-prd-grid > div');
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
