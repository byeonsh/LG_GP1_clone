// validation
// eslint-disable-next-line no-unused-vars
const validationCheck = function () {
  const submitButton = document.querySelector('.c-submit');

  const countryValid = document.querySelector('.c-country-valid');
  const countryRequired = document.querySelector('.c-country-required');

  const telephoneValid = document.querySelector('.c-telephone-valid');
  const telephoneRegex = /^[0-9]{10}$/; // Number == 10
  const telephoneRequired = document.querySelector('.c-telephone-required');
  const telephoneIncorrect = document.querySelector('.c-telephone-incorrect');

  const regPhoneNumValid = document.querySelector('.c-phoneNum-valid');
  const regPhoneNumRequired = document.querySelector('.c-phoneNum-required');
  const regPhoneNumInvalid = document.querySelector('.c-phoneNum-invalid');
  const regPhoneNumReg = /^[0-9]+$/;

  const firstNameValid = document.querySelector('.c-firstName-valid');
  const firstNameRequired = document.querySelector('.c-firstName-required');

  const lastNameValid = document.querySelector('.c-lastName-valid');
  const lastNameRequired = document.querySelector('.c-lastName-required');

  const emailValid = document.querySelector('.c-email-valid');
  const emailRegex = /^[a-zA-Z0-9+]+@[a-zA-Z0-9-+]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailRequired = document.querySelector('.c-email-required');
  const emailInvalid = document.querySelector('.c-email-invalid');

  const confirmEmailValid = document.querySelector('.c-confirmEmail-valid');
  const confirmEmailRegex = /^[a-zA-Z0-9+]+@[a-zA-Z0-9-+]+(?:\.[a-zA-Z0-9-]+)*$/;
  const confirmEmailRequired = document.querySelector('.c-confirmEmail-required');
  const confirmEmailInvalid = document.querySelector('.c-confirmEmail-invalid');
  const confirmEmailnotmatch = document.querySelector('.c-confirmEmail-notmatch');

  submitButton.addEventListener('click', e => {
    console.log('zzz');
    e.preventDefault();

    // firstName Validation
    if (firstNameValid.value === '') {
      firstNameValid.focus();
      firstNameValid.classList.add('c-error');
      firstNameRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      firstNameValid.classList.remove('c-error');
      firstNameRequired.style.display = 'none';
    }

    // lastName Validation
    if (lastNameValid.value === '') {
      lastNameValid.focus();
      lastNameValid.classList.add('c-error');
      lastNameRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      lastNameValid.classList.remove('c-error');
      lastNameRequired.style.display = 'none';
    }

    // CheckEmail - Email
    if (emailValid.value === '') {
      emailValid.focus();
      emailValid.classList.add('c-error');
      emailRequired.style.display = 'block';
      emailInvalid.style.display = 'none';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (emailValid.value.match(emailRegex)) {
      emailValid.classList.remove('c-error');
      emailRequired.style.display = 'none';
      emailInvalid.style.display = 'none';
    } else {
      emailValid.focus();
      emailValid.classList.add('c-error');
      emailRequired.style.display = 'none';
      emailInvalid.style.display = 'block';
      return false;
    }

    // CheckConfirmEmail - comfirmEmail
    if (confirmEmailValid.value === '') {
      confirmEmailValid.focus();
      confirmEmailValid.classList.add('c-error');
      confirmEmailRequired.style.display = 'block';
      confirmEmailInvalid.style.display = 'none';
      confirmEmailnotmatch.style.display = 'none';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (!confirmEmailValid.value.match(confirmEmailRegex)) {
      confirmEmailValid.focus();
      confirmEmailValid.classList.add('c-error');
      confirmEmailRequired.style.display = 'none';
      confirmEmailInvalid.style.display = 'block';
      confirmEmailnotmatch.style.display = 'none';
    } else if (emailValid.value !== confirmEmailValid.value) {
      confirmEmailValid.focus();
      confirmEmailValid.classList.add('c-error');
      confirmEmailRequired.style.display = 'none';
      confirmEmailInvalid.style.display = 'none';
      confirmEmailnotmatch.style.display = 'block';
    } else if (confirmEmailValid.value.match(confirmEmailRegex) && emailValid.value === confirmEmailValid.value) {
      confirmEmailValid.classList.remove('c-error');
      confirmEmailRequired.style.display = 'none';
      confirmEmailInvalid.style.display = 'none';
      confirmEmailnotmatch.style.display = 'none';
    }

    // telephone Validation
    if (telephoneValid.value === '') {
      telephoneValid.focus();
      telephoneValid.classList.add('c-error');
      telephoneRequired.style.display = 'block';
      telephoneIncorrect.style.display = 'none';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (telephoneValid.value.match(telephoneRegex)) {
      telephoneValid.classList.remove('c-error');
      telephoneRequired.style.display = 'none';
      telephoneIncorrect.style.display = 'none';
    } else {
      telephoneValid.focus();
      telephoneValid.classList.add('c-error');
      telephoneRequired.style.display = 'none';
      telephoneIncorrect.style.display = 'block';
      return false;
    }

    // Phone Number Area
    if (regPhoneNumValid.value === '') {
      regPhoneNumRequired.style.display = 'block';
      regPhoneNumInvalid.style.display = 'none';
      regPhoneNumValid.classList.add('c-error');
      regPhoneNumValid.focus();
      return false;
      // eslint-disable-next-line no-else-return
    } else if (regPhoneNumValid.value.match(regPhoneNumReg)) {
      regPhoneNumRequired.style.display = 'none';
      regPhoneNumInvalid.style.display = 'none';
      regPhoneNumValid.classList.remove('c-error');
    } else {
      regPhoneNumRequired.style.display = 'none';
      regPhoneNumInvalid.style.display = 'block';
      regPhoneNumValid.classList.add('c-error');
      regPhoneNumValid.focus();
      return false;
    }

    // country Validation
    if (countryValid.value === '') {
      countryValid.focus();
      countryValid.classList.add('c-error');
      countryRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      countryValid.classList.remove('c-error');
      countryRequired.style.display = 'none';
    }
  });
};
// validationCheck();
