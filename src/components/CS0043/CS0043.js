/* eslint-disable */
function radioEvent() {
  const radioBox = document.querySelectorAll('.c-support__column2x2.type1 .c-form__radio-box');
  radioBox.forEach(item => {
    const radioInput = item.querySelectorAll('.radio input');
    radioInput.forEach((list, index) => {
      const formWrap = list.closest('.cs-form__wrap');
      list.addEventListener('click', () => {
        const type1 = formWrap.querySelector('.c-repair__type1');
        const type2 = formWrap.querySelector('.c-repair__type2');
        // const type3 = document.querySelector('.c-repair__type3');
        // eslint-disable-next-line default-case
        switch (index) {
          case 0:
            type1.style.display = 'block';
            type2.style.display = 'none';
            // type3.style.display = 'none';

            break;
          case 1:
            type1.style.display = 'none';
            type2.style.display = 'block';
            // type3.style.display = 'none';

            break;
          case 2:
            type1.style.display = 'none';
            type2.style.display = 'none';
            // type3.style.display = 'block';
            break;
        }
      });
    });
  });
}
radioEvent();

function radioEvent1() {
  const radioBox = document.querySelectorAll('.c-support__column2x2.type3 .c-form__radio-box');
  radioBox.forEach(item => {
    const radioInput = item.querySelectorAll('.radio input');
    radioInput.forEach((list, index) => {
      console.log(list);
      list.addEventListener('click', () => {
        console.log(index);
        const type1 = document.querySelector('.c-repair__type3');
        const type2 = document.querySelector('.c-repair__type4');
        // const type3 = document.querySelector('.c-repair__type3');
        // eslint-disable-next-line default-case
        switch (index) {
          case 0:
            type1.style.display = 'block';
            type2.style.display = 'none';
            // type3.style.display = 'none';

            break;
          case 1:
            type1.style.display = 'none';
            type2.style.display = 'block';
            // type3.style.display = 'none';

            break;
          case 2:
            type1.style.display = 'none';
            type2.style.display = 'none';
            // type3.style.display = 'block';
            break;
        }
      });
    });
  });
}
radioEvent1();

function radioEvent2() {
  const radioBox = document.querySelectorAll('.c-support__column2x2.type2 .c-form__radio-box');
  radioBox.forEach(item => {
    const radioInput = item.querySelectorAll('.radio input');
    radioInput.forEach((list, index) => {
      // console.log(list);
      list.addEventListener('click', () => {
        // console.log(index);
        const type1 = document.querySelector('.c-repair__type5');
        const type2 = document.querySelector('.c-repair__type6');
        // eslint-disable-next-line default-case
        switch (index) {
          case 0:
            type1.style.display = 'block';
            type2.style.display = 'none';

            break;
          case 1:
            type1.style.display = 'none';
            type2.style.display = 'block';

            break;
        }
      });
    });
  });
}
radioEvent2();

// 20230702 add
const validationCheck = function () {
  const registerSubmit = document.querySelectorAll('.c-submit');

  registerSubmit.forEach(submit => {
    const inputContainer = submit.parentNode.parentNode;
    const inputReceiptNumber = inputContainer.querySelector('.repair-normal-receipt');
    const inputCnuNumber = inputContainer.querySelector('.repair-normal-cnu');
    const inputSerialNumber = inputContainer.querySelector('.repair-normal-serial');
    const inputPhoneNumber = inputContainer.querySelector('.repair-normal-phone');
    const inputPhoneNumber2 = inputContainer.querySelector('.repair-normal-phone2');
    const receiptRequired = inputContainer.querySelector('.receipt-required');
    const receiptNotFinded = inputContainer.querySelector('.c-not-finded');
    const phoneRequired = inputContainer.querySelector('.phone-required');
    const phoneNotFinded = inputContainer.querySelector('.phone-not-finded');
    const phoneRequired2 = inputContainer.querySelector('.phone-required2');
    const phoneNotFinded2 = inputContainer.querySelector('.phone-not-finded2');
    const cnuRequired = inputContainer.querySelector('.cnu-required');
    const serialRequired = inputContainer.querySelector('.serial-required');
    const specialCharExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    const blankExp = /\s/g;

    submit.addEventListener('click', e => {
      e.preventDefault();

      if (inputReceiptNumber) {
        if (inputReceiptNumber.value == '') {
          receiptRequired.classList.add('c-error');
          receiptNotFinded.classList.remove('c-error');
          inputReceiptNumber.classList.add('c-error');
        } else if (inputReceiptNumber.value.match(specialCharExp) || inputReceiptNumber.value.match(blankExp)) {
          receiptRequired.classList.remove('c-error');
          receiptNotFinded.classList.remove('c-error');
          inputReceiptNumber.classList.add('c-error');
        } else if (inputReceiptNumber.value != 'RNN123456789123') {
          receiptRequired.classList.remove('c-error');
          receiptNotFinded.classList.add('c-error');
          inputReceiptNumber.classList.add('c-error');
        } else {
          receiptRequired.classList.remove('c-error');
          receiptNotFinded.classList.remove('c-error');
          inputReceiptNumber.classList.remove('c-error');
        }
      }
      if (inputPhoneNumber) {
        if (inputPhoneNumber.value === '') {
          phoneRequired.classList.add('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else if (inputPhoneNumber.value.match(specialCharExp) || inputPhoneNumber.value.match(blankExp)) {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else if (inputPhoneNumber.value != '1234') {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.add('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.remove('c-error');
        }
      }

      const repairCheckBox = inputContainer.querySelector('input[type="radio"]:checked').id;
      if (repairCheckBox == 'FV00000001') {
        if (inputCnuNumber.value == '') {
          cnuRequired.classList.add('c-error');
          inputCnuNumber.classList.add('c-error');
        } else if (inputCnuNumber.value.match(specialCharExp) || inputCnuNumber.value.match(blankExp)) {
          cnuRequired.classList.remove('c-error');
          inputCnuNumber.classList.add('c-error');
        } else if (inputCnuNumber.value != 'CNU123456789123') {
          cnuRequired.classList.remove('c-error');
          inputCnuNumber.classList.add('c-error');
        } else {
          cnuRequired.classList.remove('c-error');
          inputCnuNumber.classList.remove('c-error');
        }
        if (inputPhoneNumber.value == '') {
          phoneRequired.classList.add('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else if (inputPhoneNumber.value.match(specialCharExp) || inputPhoneNumber.value.match(blankExp)) {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else if (inputPhoneNumber.value != '1234') {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.add('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.remove('c-error');
        }
      } else if (repairCheckBox == 'FV00000002') {
        if (inputSerialNumber.value == '') {
          serialRequired.classList.add('c-error');
          inputSerialNumber.classList.add('c-error');
        } else if (inputSerialNumber.value.match(specialCharExp) || inputSerialNumber.value.match(blankExp)) {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.add('c-error');
        } else if (inputSerialNumber.value != 'RNN123456789123') {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.add('c-error');
        } else {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.remove('c-error');
        }
        if (inputPhoneNumber2.value == '') {
          phoneRequired2.classList.add('c-error');
          phoneNotFinded2.classList.remove('c-error');
          inputPhoneNumber2.classList.add('c-error');
        } else if (inputPhoneNumber2.value.match(specialCharExp) || inputPhoneNumber2.value.match(blankExp)) {
          phoneRequired2.classList.remove('c-error');
          phoneNotFinded2.classList.remove('c-error');
          inputPhoneNumber2.classList.add('c-error');
        } else if (inputPhoneNumber2.value != '1234') {
          phoneRequired2.classList.remove('c-error');
          phoneNotFinded2.classList.add('c-error');
          inputPhoneNumber2.classList.add('c-error');
        } else {
          phoneRequired2.classList.remove('c-error');
          phoneNotFinded2.classList.remove('c-error');
          inputPhoneNumber2.classList.remove('c-error');
        }
      } else if (repairCheckBox == 'FV00000004') {
        if (inputSerialNumber.value == '') {
          serialRequired.classList.add('c-error');
          inputSerialNumber.classList.add('c-error');
        } else if (inputSerialNumber.value.match(specialCharExp) || inputSerialNumber.value.match(blankExp)) {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.add('c-error');
        } else if (inputSerialNumber.value != 'CNU123456789123') {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.add('c-error');
        } else {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.remove('c-error');
        }
      } else if (repairCheckBox == 'FV00000005') {
        if (inputReceiptNumber.value == '') {
          receiptRequired.classList.add('c-error');
          inputReceiptNumber.classList.add('c-error');
        } else if (inputReceiptNumber.value.match(specialCharExp) || inputReceiptNumber.value.match(blankExp)) {
          receiptRequired.classList.remove('c-error');
          inputReceiptNumber.classList.add('c-error');
        } else if (inputReceiptNumber.value != 'CNU123456789123') {
          receiptRequired.classList.remove('c-error');
          inputReceiptNumber.classList.add('c-error');
        } else {
          receiptRequired.classList.remove('c-error');
          inputReceiptNumber.classList.remove('c-error');
        }
        if (inputPhoneNumber.value === '') {
          phoneRequired.classList.add('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else if (inputPhoneNumber.value.match(specialCharExp) || inputPhoneNumber.value.match(blankExp)) {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else if (inputPhoneNumber.value != '1234') {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.add('c-error');
          inputPhoneNumber.classList.add('c-error');
        } else {
          phoneRequired.classList.remove('c-error');
          phoneNotFinded.classList.remove('c-error');
          inputPhoneNumber.classList.remove('c-error');
        }
      } else if (repairCheckBox == 'FV00000006') {
        if (inputSerialNumber.value == '') {
          serialRequired.classList.add('c-error');
          inputSerialNumber.classList.add('c-error');
        } else if (inputSerialNumber.value.match(specialCharExp) || inputSerialNumber.value.match(blankExp)) {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.add('c-error');
        } else if (inputSerialNumber.value != 'CNU123456789123') {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.add('c-error');
        } else {
          serialRequired.classList.remove('c-error');
          inputSerialNumber.classList.remove('c-error');
        }
        if (inputPhoneNumber2.value === '') {
          phoneRequired2.classList.add('c-error');
          phoneNotFinded2.classList.remove('c-error');
          inputPhoneNumber2.classList.add('c-error');
        } else if (inputPhoneNumber2.value.match(specialCharExp) || inputPhoneNumber2.value.match(blankExp)) {
          phoneRequired2.classList.remove('c-error');
          phoneNotFinded2.classList.remove('c-error');
          inputPhoneNumber2.classList.add('c-error');
        } else if (inputPhoneNumber2.value != '1234') {
          phoneRequired2.classList.remove('c-error');
          phoneNotFinded2.classList.add('c-error');
          inputPhoneNumber2.classList.add('c-error');
        } else {
          phoneRequired2.classList.remove('c-error');
          phoneNotFinded2.classList.remove('c-error');
          inputPhoneNumber2.classList.remove('c-error');
        }
      }
    });
  });
};
validationCheck();
