import { togglePasswordField } from '../../assets/js/common/utils.js';

const toastEvent = () => {
  const toastBtn = document.querySelector('.toastBtn');
  const toast = document.querySelector('.toast-popup');
  const toastShow = () => {
    if (!toast.classList.contains('active')) {
      // 클래스 추가
      toast.classList.add('active');
      setTimeout(() => {
        // 클래스 제거
        toast.classList.remove('active');
      }, 2000);
    }
  };

  // active가 없을 때에만 실행
  if (toastBtn) toastBtn.addEventListener('click', toastShow);
};

togglePasswordField('.ML00AA .my-form__eye');
toastEvent();

const phoneInputs = document.querySelectorAll('#phoneInputKz');
phoneInputs.forEach(phoneInput => {
  let phoneStr = '';
  let formattedStr = '';
  let deleteMode = false;

  const defaultFormat = '({0}{1}{2}){3}{4}{5}-{6}{7}-{8}{9}';

  function formatPhoneString() {
    const strArr = phoneStr.split('');
    formattedStr = defaultFormat;
    for (let i = 0; i < strArr.length; i++) {
      formattedStr = formattedStr.replace(`{${i}}`, strArr[i]);
    }

    if (formattedStr.indexOf('{') === -1) {
      return formattedStr;
    }
    return formattedStr.substring(0, formattedStr.indexOf('{'));
  }

  function parsePhoneString(str) {
    return str.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
  }

  phoneInput.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      deleteMode = true;
    } else {
      deleteMode = false;
    }
  });

  phoneInput.addEventListener('input', e => {
    if (deleteMode) {
      if (e.target.value.match(/\d+/g) == null) {
        phoneStr = parsePhoneString('');
      } else {
        phoneStr = parsePhoneString(e.target.value.match(/\d+/g).join(''));
      }
    } else {
      if (e.inputType === 'insertText' && !Number.isNaN(parseInt(e.data, 10))) {
        if (phoneStr.length <= 10) phoneStr += e.data;
      }

      e.target.value = formatPhoneString();
    }
  });
});
