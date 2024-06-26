import accordion from '../../assets/js/common/accordion.js';

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

// 20230320 modify script
function reselectClose() {
  const reselectCloseBtn = document.querySelector('.CS0044 .c-selected-model .c-btn-close');
  const selectModelNum = document.querySelector('.CS0044 .c-selected-model');
  const reselectBreadcrumb = document.querySelector('.CS0044 .breadcrumb');
  reselectCloseBtn.addEventListener('click', () => {
    selectModelNum.classList.add('hide');
    reselectBreadcrumb.classList.add('hide');
  });
}
reselectClose();

// validation
// const nextButton = document.querySelector('.c-btn-next');

// const nextBtn01 = function () {
//     const validationCheck = function () {
//         const modelNumberValid = document.querySelector('.c-after-modelNumber-valid');
//         const modelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
//         const modelNumberRequired = document.querySelector('.c-after-modelNumber-required');
//         const modelNumberInvalid = document.querySelector('.c-after-modelNumber-invalid');

//         nextButton.addEventListener('click', e => {
//             e.preventDefault();
//             // ModelNumber Validation
//             if (modelNumberValid.value === '') {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else if (modelNumberValid.value.match(modelNumberRegex)) {
//                 modelNumberValid.classList.remove('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'none';
//             } else {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'block';
//                 modelNumberRequired.style.display = 'none';
//                 return false;
//             }
//         });
//     };
//     validationCheck();
// };
// nextBtn01();

// const validationCheck03 = function () {
//     const productCodeValid = document.querySelector('.c-productCode-valid');
//     const productCodeRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
//     const productCodeRequired = document.querySelector('.c-productCode-required');
//     const productCodeInvalid = document.querySelector('.c-productCode-invalid');
//     nextButton.addEventListener('click', e => {
//         e.preventDefault();
//         // ProductCode Validation
//         if (productCodeValid.value === '') {
//             productCodeValid.focus();
//             productCodeValid.classList.add('c-error');
//             productCodeInvalid.style.display = 'none';
//             productCodeRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else if (productCodeValid.value.match(productCodeRegex)) {
//             productCodeValid.classList.remove('c-error');
//             productCodeInvalid.style.display = 'none';
//             productCodeRequired.style.display = 'none';
//         } else {
//             productCodeValid.focus();
//             productCodeValid.classList.add('c-error');
//             productCodeInvalid.style.display = 'block';
//             productCodeRequired.style.display = 'none';
//             return false;
//         }
//     });
// };
// validationCheck03();

// const validationCheck04 = function () {
//     const imeiValid = document.querySelector('.c-imei-valid');
//     const imeiRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
//     const imeiRequired = document.querySelector('.c-imei-required');
//     const imeiInvalid = document.querySelector('.c-imei-invalid');
//     nextButton.addEventListener('click', e => {
//         e.preventDefault();
//         // imei Validation
//         if (imeiValid.value === '') {
//             imeiValid.focus();
//             imeiValid.classList.add('c-error');
//             imeiInvalid.style.display = 'none';
//             imeiRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else if (imeiValid.value.match(imeiRegex)) {
//             imeiValid.classList.remove('c-error');
//             imeiInvalid.style.display = 'none';
//             imeiRequired.style.display = 'none';
//         } else {
//             imeiValid.focus();
//             imeiValid.classList.add('c-error');
//             imeiInvalid.style.display = 'block';
//             imeiRequired.style.display = 'none';
//             return false;
//         }
//     });
// };
// validationCheck04();
// const validationCheck05 = function () {
//     const purchaseDateValid = document.querySelector('.c-purchaseDate-valid');
//     const purchaseDateRequired = document.querySelector('.c-purchaseDate-required');

//     nextButton.addEventListener('click', e => {
//         e.preventDefault();

//         // Purchase Date Validation
//         if (purchaseDateValid.value === '') {
//             purchaseDateValid.focus();
//             purchaseDateValid.classList.add('c-error');
//             purchaseDateRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             purchaseDateValid.classList.remove('c-error');
//             purchaseDateRequired.style.display = 'none';
//         }
//     });
// };
// validationCheck05();

// const nextBtn02 = function () {
//     const nextButton02 = document.querySelector('.c-btn-next02');
//     const validationCheck = function () {
//         const modelNumberValid = document.querySelector('.c-after-modelNumber-valid02');
//         const modelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
//         const modelNumberRequired = document.querySelector('.c-after-modelNumber-required02');
//         const modelNumberInvalid = document.querySelector('.c-after-modelNumber-invalid02');

//         nextButton02.addEventListener('click', e => {
//             e.preventDefault();
//             // ModelNumber Validation
//             if (modelNumberValid.value === '') {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else if (modelNumberValid.value.match(modelNumberRegex)) {
//                 modelNumberValid.classList.remove('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'none';
//             } else {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'block';
//                 modelNumberRequired.style.display = 'none';
//                 return false;
//             }
//         });
//     };
//     validationCheck();
//     const validationCheck05 = function () {
//         const purchaseDateValid = document.querySelector('.c-after-purchaseDate-valid02');
//         const purchaseDateRequired = document.querySelector('.c-after-purchaseDate-required02');
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = ('0' + (today.getMonth() + 1)).slice(-2);
//         const day = ('0' + today.getDate()).slice(-2);
//         const dateString = year + '-' + month  + '-' + day;
//         nextButton02.addEventListener('click', e => {
//             e.preventDefault();

//             // Purchase Date Validation
//             if (purchaseDateValid.value === dateString) {
//                 purchaseDateValid.focus();
//                 purchaseDateValid.classList.add('c-error');
//                 purchaseDateRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else {
//                 purchaseDateValid.classList.remove('c-error');
//                 purchaseDateRequired.style.display = 'none';
//             }
//         });
//     };
//     validationCheck05();
// };
// nextBtn02();

// const nextBtn03 = function () {
//     const nextButton02 = document.querySelector('.c-btn-next03');
//     const validationCheck = function () {
//         const modelNumberValid = document.querySelector('.c-after-modelNumber-valid03');
//         const modelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
//         const modelNumberRequired = document.querySelector('.c-after-modelNumber-required03');
//         const modelNumberInvalid = document.querySelector('.c-after-modelNumber-invalid03');

//         nextButton02.addEventListener('click', e => {
//             e.preventDefault();
//             // ModelNumber Validation
//             if (modelNumberValid.value === '') {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else if (modelNumberValid.value.match(modelNumberRegex)) {
//                 modelNumberValid.classList.remove('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'none';
//             } else {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'block';
//                 modelNumberRequired.style.display = 'none';
//                 return false;
//             }
//         });
//     };
//     validationCheck();
//     const validationCheck05 = function () {
//         const purchaseDateValid = document.querySelector('.c-after-purchaseDate-valid03');
//         const purchaseDateRequired = document.querySelector('.c-after-purchaseDate-required03');
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = ('0' + (today.getMonth() + 1)).slice(-2);
//         const day = ('0' + today.getDate()).slice(-2);
//         const dateString = year + '-' + month  + '-' + day;
//         nextButton02.addEventListener('click', e => {
//             e.preventDefault();

//             // Purchase Date Validation
//             if (purchaseDateValid.value === dateString) {
//                 purchaseDateValid.focus();
//                 purchaseDateValid.classList.add('c-error');
//                 purchaseDateRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else {
//                 purchaseDateValid.classList.remove('c-error');
//                 purchaseDateRequired.style.display = 'none';
//             }
//         });
//     };
//     validationCheck05();
// };
// nextBtn03();

// const nextBtn04 = function () {
//     const nextButton02 = document.querySelector('.c-btn-next04');
//     const validationCheck = function () {
//         const modelNumberValid = document.querySelector('.c-after-modelNumber-valid04');
//         const modelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
//         const modelNumberRequired = document.querySelector('.c-after-modelNumber-required04');
//         const modelNumberInvalid = document.querySelector('.c-after-modelNumber-invalid04');

//         nextButton02.addEventListener('click', e => {
//             e.preventDefault();
//             // ModelNumber Validation
//             if (modelNumberValid.value === '') {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else if (modelNumberValid.value.match(modelNumberRegex)) {
//                 modelNumberValid.classList.remove('c-error');
//                 modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'none';
//             } else {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 modelNumberInvalid.style.display = 'block';
//                 modelNumberRequired.style.display = 'none';
//                 return false;
//             }
//         });
//     };
//     validationCheck();
//     const validationCheck05 = function () {
//         const purchaseDateValid = document.querySelector('.c-after-purchaseDate-valid03');
//         const purchaseDateRequired = document.querySelector('.c-after-purchaseDate-required03');
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = ('0' + (today.getMonth() + 1)).slice(-2);
//         const day = ('0' + today.getDate()).slice(-2);
//         const dateString = year + '-' + month  + '-' + day;
//         nextButton02.addEventListener('click', e => {
//             e.preventDefault();

//             // Purchase Date Validation
//             if (purchaseDateValid.value === dateString) {
//                 purchaseDateValid.focus();
//                 purchaseDateValid.classList.add('c-error');
//                 purchaseDateRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else {
//                 purchaseDateValid.classList.remove('c-error');
//                 purchaseDateRequired.style.display = 'none';
//             }
//         });
//     };
//     validationCheck05();
//     const validationCheck02 = function () {
//         const serialNumberValid = document.querySelector('.c-after-serialNumber-valid04');
//         const serialNumberRegex = /^[a-zA-Z0-9]{15}$/; // English + Number == 15
//         const serialNumberRequired = document.querySelector('.c-after-serialNumber-required04');
//         const serialNumberInvalid = document.querySelector('.c-after-serialNumber-invalid04');

//         nextButton.addEventListener('click', e => {
//             e.preventDefault();

//             // SerialNumber Validation
//             if (serialNumberValid.value === '') {
//                 serialNumberValid.focus();
//                 serialNumberValid.classList.add('c-error');
//                 serialNumberInvalid.style.display = 'none';
//                 serialNumberRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else if (serialNumberValid.value.match(serialNumberRegex)) {
//                 serialNumberValid.classList.remove('c-error');
//                 serialNumberInvalid.style.display = 'none';
//                 serialNumberRequired.style.display = 'none';
//             } else {
//                 serialNumberValid.focus();
//                 serialNumberValid.classList.add('c-error');
//                 serialNumberInvalid.style.display = 'block';
//                 serialNumberRequired.style.display = 'none';
//                 return false;
//             }
//         });
//     };
//     validationCheck02();
// };
// nextBtn04();

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

// 20230603 add
const checkRequiredCheck = function () {
  const submitButton = document.querySelectorAll('.c-btn-next');
  const dateRequiredCheck01 = () => {
    for (let index = 0; index < submitButton.length; index++) {
      submitButton[index].addEventListener('click', e => {
        // console.log(e.target);
        e.stopPropagation();
        const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('.c-subject-valid');
        countInputs.forEach(el => {
          const RequiredMsg = el.parentNode.querySelector('.c-warning');
          const hasRequire = el.parentNode.querySelector('.require');
          console.log(hasRequire);
          if (hasRequire) {
            if (el.value === '') {
              el.classList.add('c-error');
              RequiredMsg.style.display = 'block';
              el.focus();
              // return false;
              // eslint-disable-next-line no-else-return
            } else {
              RequiredMsg.style.display = 'none';
              el.classList.remove('c-error');
            }
          }
        });
      });
    }
  };
  dateRequiredCheck01();
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
          // eslint-disable-next-line no-template-curly-in-string
          if (el.value === '${option.value_01}') {
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
        // console.log(e.target);
        e.stopPropagation();
        const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('#serialNumber');
        // console.log(e.target);
        countInputs.forEach(el => {
          const RequiredMsg = el.parentNode.querySelector('.c-warning');
          // console.log(el.value);
          // console.log(RequiredMsg);
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
  inputRequiredCheck();
  const inputRequiredCheck02 = () => {
    for (let index = 0; index < submitButton.length; index++) {
      submitButton[index].addEventListener('click', e => {
        // console.log(e.target);
        e.stopPropagation();
        const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('#productCode');
        // console.log(e.target);
        countInputs.forEach(el => {
          const RequiredMsg = el.parentNode.querySelector('.c-warning');
          // console.log(el.value);
          console.log(RequiredMsg);
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
  inputRequiredCheck02();
  const checkboxRequiredCheck02 = () => {
    for (let index = 0; index < submitButton.length; index++) {
      submitButton[index].addEventListener('click', e => {
        e.stopPropagation();

        const getSelectedValue =
          submitButton[index].parentNode.parentNode.parentNode.querySelector('input[type="radio"]:checked');
        const radioRequired =
          submitButton[index].parentNode.parentNode.parentNode.querySelector('.c-after-select-required');
        if (getSelectedValue != null) {
          console.log('aaa');
          if (radioRequired) {
            radioRequired.style.display = 'none';
          }
        } else {
          console.log('ccc');
          if (radioRequired) {
            radioRequired.style.display = 'block';
          }
        }
      });
    }
  };
  checkboxRequiredCheck02();
};
checkRequiredCheck();
