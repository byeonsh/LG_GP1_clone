import { keyboard } from '../../assets/js/common/constant.js';

function init() {
  const typeAccordion = document.querySelectorAll('.type-accordion');
  // eslint-disable-next-line no-undef
  typeAccordion.forEach(el => accordion.run(el));
}
init();

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
// validation
const submitButton = document.querySelectorAll('.c-submit');
const selectRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      // console.log(e.target);
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.CS0012__container').querySelectorAll('select');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning');
        // console.log(el.value);
        // console.log(RequiredMsg);
        if (el.value === 'Choose a seller') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'Choose a one') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else {
          RequiredMsg.style.display = 'none';
          el.classList.remove('c-error');
        }
      });
    });
  }
};
selectRequiredCheck();

const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.CS0012__container').querySelectorAll('input[type="text"]');
      // countInputs = countInputs.
      console.log(countInputs);
      countInputs.forEach(el => {
        // console.log(el);
        const containsCheck = el.classList.contains('c-not-required');
        const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning ');
        // console.log(containsCheck);
        if (containsCheck === false) {
          if (el.value === '') {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
            // RequiredMsg.style.display = 'none';
            el.focus();
            return false;
            // eslint-disable-next-line no-else-return
          } else {
            el.classList.remove('c-error');
            RequiredMsg.style.display = 'none';
          }
        }
        // console.log(RequiredMsg);
      });
    });
  }
};
inputRequiredCheck();
const dateRequiredCheck = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const dateString = `${year}-${month}-${day}`;
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      // console.log(e.target);
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="date"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.c-warning');
        // console.log(dateString);
        if (el.value === dateString) {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          // return false;
          // eslint-disable-next-line no-else-return
        } else {
          RequiredMsg.style.display = 'none';
          el.classList.remove('c-error');
        }
      });
    });
  }
};
dateRequiredCheck();

// model number  add
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
  layerClose() {
    const cancelBtn = document.querySelectorAll('.c-cancel');
    cancelBtn.forEach(el => {
      el.addEventListener('click', function () {
        const searchLayer = el.parentElement.parentElement;
        searchLayer.classList.remove('c-display');
      });
    });
  },
  inputTxt() {
    const pInput = document.querySelectorAll('.textInput__input');
    const mInput = document.getElementById('textInput__input2');
    pInput.forEach(el => {
      // eslint-disable-next-line no-shadow
      el.addEventListener('input', el => {
        const inValue = el.target.value;
        const searchLayer = el.target.closest('.c-modelnumber-input').querySelector('.searchLayer');
        const cancelBtn = searchLayer.querySelector('.c-cancel');
        if (inValue) {
          searchLayer.classList.add('c-display');
          mInput.value = inValue;
          mInput.focus();
        }
        cancelBtn.addEventListener('click', function () {
          pInput.value = '';
        });
      });
    });
  },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
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
    const get = document.querySelectorAll('.searchLayer');
    get.forEach(el => {
      if (!el.contains(event.target)) {
        el.classList.remove('c-display');
      }
    });
  });
};
clickOutside();
