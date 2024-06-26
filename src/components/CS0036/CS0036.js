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
            if (searchLayer) {
              searchLayer.classList.remove('c-display');
            }
          }
        });
      });
      el.addEventListener('keyup', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
            if (searchLayer) {
              searchLayer.classList.remove('c-display');
            }
          }
        });
      });
    });
  },
  layerOpen() {
    const searchLayer = document.querySelector('.searchLayer');
    const searchBtn = document.querySelector('.searchBar__form .fieldIcons__before');
    searchBtn.addEventListener('click', function () {
      searchLayer.classList.add('c-display');
    });
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
    // inputEvent.layerOpen();
    // inputEvent.layerClose();
    // inputEvent.inputTxt();
  },
};

inputEvent.init();

// add event
const searchInputRequiredCheck = () => {
  const submitButton02 = document.querySelectorAll('.button');
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < submitButton02.length; index++) {
    submitButton02[index].addEventListener('click', e => {
      const countInputs = e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.closest('.searchBar__searchInner').querySelector('.c-warning');
        console.log(el);
        if (el.value === '') {
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
searchInputRequiredCheck();
