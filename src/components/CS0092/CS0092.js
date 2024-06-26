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
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
    // inputEvent.layerOpen();
    // inputEvent.layerClose();
    // inputEvent.inputTxt();
  },
};

inputEvent.init();
