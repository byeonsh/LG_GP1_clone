import { keyboard } from '../../assets/js/common/constant.js';

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

// Step Dummy Data [TEST]
function captchaRandomCode(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}
sessionStorage.setItem('alreadyEmailValue', 'test@gmail.com');
sessionStorage.setItem('captcha', captchaRandomCode(7));

// validation
const validationCheck = function () {
  const registerSubmit = document.querySelectorAll('.c-submit');
  registerSubmit.forEach(submit => {
    submit.addEventListener('click', e => {
      e.preventDefault();
      const inputContainer = submit.parentNode.parentNode.parentNode;
      const privacyPolicyCheck = inputContainer.querySelector('#privacyPolicyCheck');
      const privacyPolicyChecked = inputContainer.querySelector('.c-privacyPolicy-checked');
      const countryValid = inputContainer.querySelector('.c-country-valid');
      const countryRequired = inputContainer.querySelector('.c-country-required');
      const countInputs = inputContainer.querySelectorAll('input[type="text"]');
      const modelNumberValid = inputContainer.querySelector('.c-modelNumber-valid');
      const modelNumberRequired = inputContainer.querySelector('.c-modelNumber-required');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.c-warning');
        const require = el.parentNode.querySelector('.require');

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
        // privacy check validation
        if (privacyPolicyCheck.checked === false) {
          privacyPolicyChecked.classList.add('c-error');
          privacyPolicyChecked.style.display = 'block';
        } else {
          privacyPolicyChecked.classList.remove('c-error');
          privacyPolicyChecked.style.display = 'none';
        }

        if (countryValid.value === 'Select your country') {
          countryValid.classList.add('c-error');
          countryRequired.style.display = 'block';
          countryValid.focus();
          // eslint-disable-next-line no-else-return
        }
        if (modelNumberValid.value === '') {
          modelNumberValid.classList.add('c-error');
          modelNumberRequired.style.display = 'block';
          modelNumberValid.focus();
          // eslint-disable-next-line no-else-return
        } else if (modelNumberRequired === null) {
          modelNumberValid.focus();
          modelNumberValid.classList.remove('c-error');
        } else {
          modelNumberRequired.style.display = 'none';
          modelNumberValid.classList.remove('c-error');
        }
      });
    });
    // const modelNumberValid = document.querySelector('.c-modelNumber-valid');
    // const modelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
    // const modelNumberRequired = document.querySelector('.c-modelNumber-required');
    // const modelNumberInvalid = document.querySelector('.c-modelNumber-invalid');

    // const serialNumberValid = document.querySelector('.c-serialNumber-valid');
    // const serialNumberRegex = /^[a-zA-Z0-9]{15}$/; // English + Number == 15
    // const serialNumberRequired = document.querySelector('.c-serialNumber-required');
    // const serialNumberInvalid = document.querySelector('.c-serialNumber-invalid');

    // const firstNameValid = document.querySelector('.c-firstName-valid');
    // const firstNameRequired = document.querySelector('.c-firstName-required');

    // const lastNameValid = document.querySelector('.c-lastName-valid');
    // const lastNameRequired = document.querySelector('.c-lastName-required');

    // const telephoneValid = document.querySelector('.c-telephone-valid');
    // const telephoneRegex = /^[0-9]{10}$/; // Number == 10
    // const telephoneRequired = document.querySelector('.c-telephone-required');
    // const telephoneIncorrect = document.querySelector('.c-telephone-incorrect');

    // const mobilephoneValid = document.querySelector('.c-mobilephone-valid');
    // const mobilephoneRegex = /^(01[0]{1})[0-9]{3,4}[0-9]{4}$/;
    // const mobilephoneRequired = document.querySelector('.c-mobilephone-required');
    // const mobilephoneInvalid = document.querySelector('.c-mobilephone-invalid');

    // const countryValid = document.querySelector('.c-country-valid');
    // const countryRequired = document.querySelector('.c-country-required');

    // const postCodeValid = document.querySelector('.c-postCode-valid');
    // const postCodeRequired = document.querySelector('.c-postCode-required');
    // const postCodeRegex = /^\d{5}(-\d{4})?$/;
    // const postCodeInvalid = document.querySelector('.c-postCode-invalid');

    // const cityValid = document.querySelector('.c-city-valid');
    // const cityRequired = document.querySelector('.c-city-required');

    // const addressValid = document.querySelector('.c-address-valid');
    // const addressRequired = document.querySelector('.c-address-required');

    // const emailValid = document.querySelector('.c-email-valid');
    // const emailRegex = /^[a-zA-Z0-9+]+@[a-zA-Z0-9-+]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const emailRequired = document.querySelector('.c-email-required');
    // const emailInvalid = document.querySelector('.c-email-invalid');

    // const requestDateValid = document.querySelector('.c-requestDate-valid');
    // const requestDateRequired = document.querySelector('.c-requestDate-required');

    // const regCaptchaValid = document.querySelector('.c-regProductSignUp-captcha-valid');
    // const regCaptchaRequired = document.querySelector('.c-regProductSignUp-captcha-required');
    // const regCaptchaIncorrect = document.querySelector('.c-regProductSignUp-captcha-incorrect');

    // const privacyPolicyCheck = document.querySelector('#privacyPolicyCheck');
    // const privacyPolicyChecked = document.querySelector('.c-privacyPolicy-checked');

    // submit.addEventListener('click', e => {
    //    e.preventDefault();

    // // ModelNumber Validation
    // if (modelNumberValid.value === '') {
    //     modelNumberValid.focus();
    //     modelNumberValid.classList.add('c-error');
    //     modelNumberInvalid.style.display = 'none';
    //     modelNumberRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else if (modelNumberValid.value.match(modelNumberRegex)) {
    //     modelNumberValid.classList.remove('c-error');
    //     modelNumberInvalid.style.display = 'none';
    //     modelNumberRequired.style.display = 'none';
    // } else {
    //     modelNumberValid.focus();
    //     modelNumberValid.classList.add('c-error');
    //     modelNumberInvalid.style.display = 'block';
    //     modelNumberRequired.style.display = 'none';

    // }

    // // SerialNumber Validation
    // if (serialNumberValid.value === '') {
    //     serialNumberValid.focus();
    //     serialNumberValid.classList.add('c-error');
    //     serialNumberInvalid.style.display = 'none';
    //     serialNumberRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else if (serialNumberValid.value.match(serialNumberRegex)) {
    //     serialNumberValid.classList.remove('c-error');
    //     serialNumberInvalid.style.display = 'none';
    //     serialNumberRequired.style.display = 'none';
    // } else {
    //     serialNumberValid.focus();
    //     serialNumberValid.classList.add('c-error');
    //     serialNumberInvalid.style.display = 'block';
    //     serialNumberRequired.style.display = 'none';

    // }

    // // firstName Validation
    // if (firstNameValid.value === '') {
    //     firstNameValid.focus();
    //     firstNameValid.classList.add('c-error');
    //     firstNameRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else {
    //     firstNameValid.classList.remove('c-error');
    //     firstNameRequired.style.display = 'none';
    // }

    // // lastName Validation
    // if (lastNameValid.value === '') {
    //     lastNameValid.focus();
    //     lastNameValid.classList.add('c-error');
    //     lastNameRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else {
    //     lastNameValid.classList.remove('c-error');
    //     lastNameRequired.style.display = 'none';
    // }

    // // telephone Validation
    // if (telephoneValid.value === '') {
    //     telephoneValid.focus();
    //     telephoneValid.classList.add('c-error');
    //     telephoneRequired.style.display = 'block';
    //     telephoneIncorrect.style.display = 'none';

    //     // eslint-disable-next-line no-else-return
    // } else if (telephoneValid.value.match(telephoneRegex)) {
    //     telephoneValid.classList.remove('c-error');
    //     telephoneRequired.style.display = 'none';
    //     telephoneIncorrect.style.display = 'none';
    // } else {
    //     telephoneValid.focus();
    //     telephoneValid.classList.add('c-error');
    //     telephoneRequired.style.display = 'none';
    //     telephoneIncorrect.style.display = 'block';

    // }

    // // mobilephone Validation
    // if (mobilephoneValid.value === '') {
    //     mobilephoneValid.focus();
    //     mobilephoneValid.classList.add('c-error');
    //     mobilephoneInvalid.style.display = 'none';
    //     mobilephoneRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else if (mobilephoneValid.value.match(mobilephoneRegex)) {
    //     mobilephoneValid.classList.remove('c-error');
    //     mobilephoneRequired.style.display = 'none';
    //     mobilephoneInvalid.style.display = 'none';
    // } else {
    //     mobilephoneValid.focus();
    //     mobilephoneValid.classList.add('c-error');
    //     mobilephoneInvalid.style.display = 'block';
    //     mobilephoneRequired.style.display = 'none';

    // }

    // // country Validation
    // if (countryValid.value === '') {
    //     countryValid.focus();
    //     countryValid.classList.add('c-error');
    //     countryRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else {
    //     countryValid.classList.remove('c-error');
    //     countryRequired.style.display = 'none';
    // }

    // // postCode Validation
    // if (postCodeValid.value === '') {
    //     postCodeValid.focus();
    //     postCodeValid.classList.add('c-error');
    //     postCodeInvalid.style.display = 'none';
    //     postCodeRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else if (postCodeValid.value.match(postCodeRegex)) {
    //     postCodeValid.classList.remove('c-error');
    //     postCodeRequired.style.display = 'none';
    //     postCodeInvalid.style.display = 'none';
    // } else {
    //     postCodeValid.focus();
    //     postCodeValid.classList.add('c-error');
    //     postCodeInvalid.style.display = 'block';
    //     postCodeRequired.style.display = 'none';

    // }

    // // city Validation
    // if (cityValid.value === '') {
    //     cityValid.focus();
    //     cityValid.classList.add('c-error');
    //     cityRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else {
    //     cityValid.classList.remove('c-error');
    //     cityRequired.style.display = 'none';
    // }

    // // address Validation
    // if (addressValid.value === '') {
    //     addressValid.focus();
    //     addressValid.classList.add('c-error');
    //     addressRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else {
    //     addressValid.classList.remove('c-error');
    //     addressRequired.style.display = 'none';
    // }

    // // CheckEmail - Email
    // if (emailValid.value === '') {
    //     emailValid.focus();
    //     emailValid.classList.add('c-error');
    //     emailRequired.style.display = 'block';
    //     emailInvalid.style.display = 'none';

    //     // eslint-disable-next-line no-else-return
    // } else if (emailValid.value.match(emailRegex)) {
    //     emailValid.classList.remove('c-error');
    //     emailRequired.style.display = 'none';
    //     emailInvalid.style.display = 'none';
    // } else {
    //     emailValid.focus();
    //     emailValid.classList.add('c-error');
    //     emailRequired.style.display = 'none';
    //     emailInvalid.style.display = 'block';

    // }

    // // request Date Validation
    // if (requestDateValid.value === '') {
    //     requestDateValid.focus();
    //     requestDateValid.classList.add('c-error');
    //     requestDateRequired.style.display = 'block';

    //     // eslint-disable-next-line no-else-return
    // } else {
    //     requestDateValid.classList.remove('c-error');
    //     requestDateRequired.style.display = 'none';
    // }

    // // Captcha Area
    // if (regCaptchaValid.value === '') {
    //     regCaptchaRequired.style.display = 'block';
    //     regCaptchaIncorrect.style.display = 'none';
    //     regCaptchaValid.classList.add('c-error');
    //     regCaptchaValid.focus();

    //     // eslint-disable-next-line no-else-return
    // } else if (regCaptchaValid.value !== sessionStorage.getItem('captcha')) {
    //     regCaptchaRequired.style.display = 'none';
    //     regCaptchaIncorrect.style.display = 'block';
    //     regCaptchaValid.classList.add('c-error');
    //     regCaptchaValid.focus();

    // } else {
    //     regCaptchaRequired.style.display = 'none';
    //     regCaptchaIncorrect.style.display = 'none';
    //     regCaptchaValid.classList.remove('c-error');
    // }

    // // privacy check validation
    // if (privacyPolicyCheck.checked === false) {
    //     privacyPolicyChecked.classList.add('c-error');
    //     privacyPolicyChecked.style.display = 'block';
    // } else {
    //     privacyPolicyChecked.classList.remove('c-error');
    //     privacyPolicyChecked.style.display = 'none';
    // }

    // })
  });
};
validationCheck();

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
