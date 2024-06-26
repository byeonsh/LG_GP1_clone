import accordion from '../../assets/js/common/accordion.js';

// init
function init() {
  const typeAccordion = document.querySelectorAll('.type-accordion');
  typeAccordion.forEach(el => {
    if (!el.classList.contains('type-product')) {
      accordion.run(el);
    }
  });
}

init();

// validation
// 20230328 add script
const inputEvent = {
  textClear() {
    const buttonDelete = document.querySelectorAll('.c-modelnumber-input__button--delete');
    const input = document.querySelectorAll('.c-modelnumber-input input');
    buttonDelete.forEach(el => {
      el.addEventListener('click', () => {
        input.forEach(el3 => {
          // eslint-disable-next-line no-param-reassign
          el3.value = '';
          el3.focus(); // 20230307
        });
        el.classList.remove('c-modelnumber-input__button--active');
      });
    });
  },
  deleteButtonOn() {
    const buttonDelete = document.querySelectorAll('.c-modelnumber-input__button--delete');
    const input = document.querySelectorAll('.c-modelnumber-input input');
    input.forEach(el => {
      el.addEventListener('click', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-modelnumber-input__button--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-modelnumber-input__button--active');
          }
        });
      });
      el.addEventListener('keyup', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-modelnumber-input__button--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-modelnumber-input__button--active');
          }
        });
      });
    });
  },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
  },
};

inputEvent.init();
//

const limitPhone = () => {
  const countInputs = document.querySelectorAll('.c-telephone-valid2');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{2})(\d{4})(\d{4})$/, `($1)$2-$3`);
    });
  });
};
limitPhone();

const limitMobile = () => {
  const countInputs = document.querySelectorAll('.c-mobilephone-valid');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{2})(\d{5})(\d{4})$/, `($1)$2-$3`);
    });
  });
};
limitMobile();

const limitPhone02 = () => {
  const countInputs = document.querySelectorAll('.c-telephone-valid3');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{2})(\d{4})(\d{4})$/, `($1)$2-$3`);
    });
  });
};
limitPhone02();

const limitMobile02 = () => {
  const countInputs = document.querySelectorAll('.c-mobilephone-valid2');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{2})(\d{5})(\d{4})$/, `($1)$2-$3`);
    });
  });
};
limitMobile02();

const inputType01 = () => {
  const countInputs = document.querySelectorAll('.input-enter-type01');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{2})(\d{5})(\d{4})$/, `($1)$2-$3`);
    });
  });
};
inputType01();

const limitSeacrh03 = () => {
  const countInputs = document.querySelectorAll('.input-enter-type02');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{2})(\d{5})(\d{4})$/, `($1)$2-$3`);
    });
  });
};
limitSeacrh03();

// validation
const submitButton = document.querySelectorAll('.c-btn-next');
const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.c-warning');
        let require = 0;
        if (el.parentNode.classList.contains('c-modelnumber-input')) {
          require = el.parentNode.parentNode.querySelector('.require');
        } else {
          require = el.parentNode.querySelector('.require');
        }
        if (require) {
          if (el.value === '') {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
            el.focus();
            // eslint-disable-next-line no-else-return
          } else if (RequiredMsg === null) {
            el.focus();
            el.classList.remove('c-error');
          } else {
            RequiredMsg.style.display = 'none';
            el.classList.remove('c-error');
          }
        }
      });
    });
  }
};
inputRequiredCheck();

const checkRequiredCheck02 = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs =
        submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="checkbox"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
        // console.log(el.checked);
        if (el.checked === false) {
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
checkRequiredCheck02();

const selectRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      // console.log(e.target);
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('select');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.c-warning');
        // console.log(el.value);
        // console.log(RequiredMsg);
        if (el.value === 'Type your Country') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'Choose') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'Region Name') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'amazon') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'departamento') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'city') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'city/Town') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'country') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'state') {
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

const limitSearch01 = () => {
  const countInputs = document.querySelectorAll('.c-cpf-valid');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, `$1.$2.$3-$4`).slice(0, 14);
    });
    el.addEventListener('keydown', function (e) {
      if (e.keyCode === 8) {
        // eslint-disable-next-line no-shadow
        el.addEventListener('input', function (e) {
          const inputNum = /[^0-9]/g;
          const NewNum = e.target.value.replace(inputNum, '');
          // console.log(NewNum.length);
          if (NewNum.length < 10) {
            const NewNum02 = e.target.value.replace(inputNum, '');
            e.target.value = NewNum02.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, `$1.$2.$3-$4`);
          } else {
            return false;
          }
        });
      }
    });
  });
};
limitSearch01();

const limitSeacrh02 = () => {
  const countInputs = document.querySelectorAll('.c-zipcode-valid');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{5})(\d{3})$/, `$1-$2`).slice(0, 9);
    });
    el.addEventListener('keydown', function (e) {
      if (e.keyCode === 8) {
        // eslint-disable-next-line no-shadow
        el.addEventListener('input', function (e) {
          const inputNum = /[^0-9]/g;
          const NewNum = e.target.value.replace(inputNum, '');
          // console.log(NewNum.length);
          if (NewNum.length < 8) {
            const NewNum02 = e.target.value.replace(inputNum, '');
            e.target.value = NewNum02.replace(/^(\d{5})(\d{3})$/, `$1-$2`);
          } else {
            return false;
          }
        });
      }
    });
  });
};
limitSeacrh02();

const limitSearch05 = () => {
  const countInputs = document.querySelectorAll('.c-cnpj-valid');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, `($1.$2.$3/$4-$5)`)
        .slice(0, 20);
    });
    el.addEventListener('keydown', function (e) {
      if (e.keyCode === 8) {
        // eslint-disable-next-line no-shadow
        el.addEventListener('input', function (e) {
          const inputNum = /[^0-9]/g;
          const NewNum = e.target.value.replace(inputNum, '');
          // console.log(NewNum.length);
          if (NewNum.length < 13) {
            const NewNum02 = e.target.value.replace(inputNum, '');
            e.target.value = NewNum02.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, `($1.$2.$3/$4-$5)`);
          } else {
            return false;
          }
        });
      }
    });
  });
};
limitSearch05();
const textareaRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('textarea');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.querySelector('.c-warning');
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
textareaRequiredCheck();
