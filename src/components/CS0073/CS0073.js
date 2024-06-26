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

// When inserting a component
const reselectClose = function () {
  const component = document.querySelectorAll('.CS0073');
  component.forEach(comp => {
    const reselectCloseBtn = comp.querySelectorAll('.c-selected-model .c-btn-close');

    if (reselectCloseBtn) {
      reselectCloseBtn.forEach(el => {
        el.addEventListener('click', () => {
          const selectModelNum = el.closest('.c-selected-model');
          const reselectBreadcrumb = el.parentElement.previousElementSibling;
          selectModelNum.classList.add('hide');
          if (reselectBreadcrumb) {
            reselectBreadcrumb.classList.add('hide');
          }
        });
      });
    }
  });
};
reselectClose();

// 20230314 modify validation script
// validation
const validationCheck = function () {
  const submitButton = document.querySelector('.c-submit');
  const modelNumberValid = document.querySelector('.c-modelNumber-valid');
  const modelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
  const modelNumberRequired = document.querySelector('.c-modelNumber-required');
  const modelNumberInvalid = document.querySelector('.c-modelNumber-invalid');

  const serialNumberValid = document.querySelector('.c-serialNumber-valid');
  const serialNumberRegex = /^[a-zA-Z0-9]{15}$/; // English + Number == 15
  const serialNumberRequired = document.querySelector('.c-serialNumber-required');
  const serialNumberInvalid = document.querySelector('.c-serialNumber-invalid');

  const installDateValid = document.querySelector('.c-installDate-valid');
  const installDateRequired = document.querySelector('.c-installDate-required');
  const installDateInvalid = document.querySelector('.c-installDate-invalid');

  const warrantyExpireDateValid = document.querySelector('.c-warrantyExpireDate-valid');
  const warrantyExpireDateRequired = document.querySelector('.c-warrantyExpireDate-required');
  const warrantyExpireDateInvalid = document.querySelector('.c-warrantyExpireDate-invalid');

  submitButton.addEventListener('click', e => {
    e.preventDefault();
    // ModelNumber Validation
    if (modelNumberValid.value === '') {
      modelNumberValid.focus();
      modelNumberValid.classList.add('c-error');
      modelNumberInvalid.style.display = 'none';
      modelNumberRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (modelNumberValid.value.match(modelNumberRegex)) {
      modelNumberValid.classList.remove('c-error');
      modelNumberInvalid.style.display = 'none';
      modelNumberRequired.style.display = 'none';
    } else {
      modelNumberValid.focus();
      modelNumberValid.classList.add('c-error');
      modelNumberInvalid.style.display = 'block';
      modelNumberRequired.style.display = 'none';
      return false;
    }

    // SerialNumber Validation
    if (serialNumberValid.value === '') {
      serialNumberValid.focus();
      serialNumberValid.classList.add('c-error');
      serialNumberInvalid.style.display = 'none';
      serialNumberRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (serialNumberValid.value.match(serialNumberRegex)) {
      serialNumberValid.classList.remove('c-error');
      serialNumberInvalid.style.display = 'none';
      serialNumberRequired.style.display = 'none';
    } else {
      serialNumberValid.focus();
      serialNumberValid.classList.add('c-error');
      serialNumberInvalid.style.display = 'block';
      serialNumberRequired.style.display = 'none';
      return false;
    }

    // install date Validation
    if (installDateValid.value === '') {
      installDateValid.focus();
      installDateValid.classList.add('c-error');
      installDateInvalid.style.display = 'none';
      installDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      installDateValid.classList.remove('c-error');
      installDateInvalid.style.display = 'black';
      installDateRequired.style.display = 'none';
    }

    // warranty expire date Validation
    if (warrantyExpireDateValid.value === '') {
      warrantyExpireDateValid.focus();
      warrantyExpireDateValid.classList.add('c-error');
      warrantyExpireDateInvalid.style.display = 'none';
      warrantyExpireDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      warrantyExpireDateValid.classList.remove('c-error');
      warrantyExpireDateInvalid.style.display = 'black';
      warrantyExpireDateRequired.style.display = 'none';
    }
  });
};
validationCheck();
