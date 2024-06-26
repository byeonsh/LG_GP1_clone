import accordion from '../../assets/js/common/accordion.js';

const dateSetting = function () {
  const monthControl = document.querySelectorAll('input[type="date"]');
  monthControl.forEach(function (el) {
    const theElement = el;
    theElement.value = new Date().toISOString().slice(0, 10);
  });
};
dateSetting();

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

const limitSearch01 = () => {
  const countInputs = document.querySelectorAll('.c-after-search-valid01');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{5})$/, `$1`).slice(0, 5);
      // space delete
      const strSpace = /\s/;
      if (strSpace.exec(targetInput.value)) {
        // console.log(strSpace);
        targetInput.value = targetInput.value.replace(' ', '');
      }
    });
    el.addEventListener('keydown', function (e) {
      if (e.keyCode === 8) {
        // eslint-disable-next-line no-shadow
        el.addEventListener('input', function (e) {
          const inputNum = /[^0-9]/g;
          const NewNum = e.target.value.replace(inputNum, '');
          // console.log(NewNum.length);
          if (NewNum.length < 6) {
            const NewNum02 = e.target.value.replace(inputNum, '');
            e.target.value = NewNum02.replace(/^(\d{5})$/, `$1`);
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
  const countInputs = document.querySelectorAll('.c-after-search-valid02');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{5})(\d{3})$/, `$1-$2`);
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

// ca input postal code check
const inputCodeCheckTypeCA = () => {
  const countInputs = document.querySelectorAll('.c-after-search-valid-CA');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\w{3})(\w{3})$/, `($1-$2)`).slice(0, 9);
    });
    el.addEventListener('keydown', function (e) {
      if (e.keyCode === 8) {
        // eslint-disable-next-line no-shadow
        el.addEventListener('input', function (e) {
          e.stopPropagation();
          // new input data
          const inputNum = e.target.value.slice(1, 4);
          const inputNum02 = e.target.value.slice(5, 8);
          // col data
          const NewPinCode = inputNum + inputNum02;
          const NewPinCodeValue = e.target.value.replace(NewPinCode, '');
          // console.log(NewPinCodeValue);
          if (NewPinCodeValue.length === 8) {
            e.target.value = NewPinCode.replace(/^(\d{3})(\d{3})$/, `($1-$2)`);
          } else {
            e.target.value.slice(-1);
            return false;
          }
          // console.log(inputNum03);
        });
      }
    });
  });
};
inputCodeCheckTypeCA();

const submitButton = document.querySelectorAll('.c-btn-next');

const dateRequiredCheck = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const dateString = `${year}-${month}-${day}`;
  // eslint-disable-next-line no-plusplus
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

const selectRequiredCheck = () => {
  // eslint-disable-next-line no-plusplus
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
        // eslint-disable-next-line no-template-curly-in-string
        if (el.value === 'Schedule time') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value === 'Reservation Date') {
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

const searchInputRequiredCheck = () => {
  const submitButton02 = document.querySelectorAll('.c-search-input__button');
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < submitButton02.length; index++) {
    submitButton02[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.querySelector('.c-warning');
        // console.log(RequiredMsg);
        if (el.value === '') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value.length < 5) {
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

const searchInputRequiredCheck02 = () => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.querySelector('.c-warning');
        // console.log(RequiredMsg);
        if (el.value === '') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value.length < 5) {
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
searchInputRequiredCheck02();

const CAinvalidCheck = () => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs =
        submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('.c-after-search-valid-CA ');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.querySelector('.c-warning');
        const invalidMsg = el.parentNode.parentNode.querySelector('.c-after-search-invalid');
        const countInputsRegex01 = /^[A-Z0-9]*$/; // capital letter + number
        const countInputsRegex02 = /^[0-9]*$/; // number only
        if (el.value === '') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          invalidMsg.style.display = 'none';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value.toString().length < 8) {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'none';
          invalidMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else {
          RequiredMsg.style.display = 'none';
          el.classList.remove('c-error');
          invalidMsg.style.display = 'none';
        }
        // invalid Check
        if (el.value.toString().length === 9) {
          const inputNum = el.value.slice(1, 4);
          const inputNum02 = el.value.slice(5, 8);
          const NumPinCode = inputNum + inputNum02;
          console.log(NumPinCode.match(countInputsRegex01));
          if (!NumPinCode.match(countInputsRegex01) || NumPinCode.match(countInputsRegex02)) {
            el.classList.add('c-error');
            invalidMsg.style.display = 'block';
            if (NumPinCode.match(countInputsRegex02)) {
              el.classList.add('c-error');
              invalidMsg.style.display = 'block';
            }
          }
        }
        //
      });
    });
  }
};
CAinvalidCheck();

const CAinvalidBtnCheck = () => {
  const submitButton02 = document.querySelectorAll('.c-after-search-valid-CA + .c-search-input__button');
  console.log(submitButton02);
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < submitButton02.length; index++) {
    submitButton02[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.querySelector('.c-warning');
        const invalidMsg = el.parentNode.parentNode.querySelector('.c-after-search-invalid');
        const countInputsRegex01 = /^[A-Z0-9]*$/; // capital letter + number
        const countInputsRegex02 = /^[0-9]*$/; // number only
        // console.log(RequiredMsg);
        if (el.value === '') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else if (el.value.length < 8) {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'none';
          invalidMsg.style.display = 'block';
          el.focus();
          return false;
          // eslint-disable-next-line no-else-return
        } else {
          RequiredMsg.style.display = 'none';
          invalidMsg.style.display = 'none';
          el.classList.remove('c-error');
        }
        // invalid Check
        if (el.value.toString().length === 9) {
          const inputNum = el.value.slice(1, 4);
          const inputNum02 = el.value.slice(5, 8);
          const NumPinCode = inputNum + inputNum02;
          console.log(NumPinCode.match(countInputsRegex01));
          if (!NumPinCode.match(countInputsRegex01) || NumPinCode.match(countInputsRegex02)) {
            el.classList.add('c-error');
            invalidMsg.style.display = 'block';
            if (NumPinCode.match(countInputsRegex02)) {
              el.classList.add('c-error');
              invalidMsg.style.display = 'block';
            }
          }
        }
        //
      });
    });
  }
};
CAinvalidBtnCheck();

const radioRequiredCheck = () => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="radio"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.c-warning');
        // console.log(RequiredMsg);
        console.log(el.checked);
        if (el.checked === true) {
          RequiredMsg.style.display = 'none';
        } else {
          RequiredMsg.style.display = 'block';
          // el.focus();
        }
      });
    });
  }
};
radioRequiredCheck();
const CheckboxRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs =
        submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="checkbox"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
        // console.log(RequiredMsg);
        console.log(el.checked);
        if (el.checked === true) {
          RequiredMsg.style.display = 'none';
        } else {
          RequiredMsg.style.display = 'block';
          // el.focus();
        }
      });
    });
  }
};
CheckboxRequiredCheck();
