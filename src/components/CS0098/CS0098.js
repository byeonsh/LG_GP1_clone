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
const submitButton = document.querySelector('.c-submit');
//
const valueInputlength01 = () => {
  const countInputs = document.querySelectorAll('.c-subject-valid02');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{2})(\d{5})(\d{4})$/, `($1)$2-$3`).substr(0, 14);
    });
  });
};
valueInputlength01();

const valueInputlength02 = () => {
  const countInputs = document.querySelectorAll('.c-subject-valid03');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, `$1-$2-$3-$4`).substr(0, 14);
    });
  });
};
valueInputlength02();

// const valueCheckSubmit = document.querySelector('.c-submit02');
const inputRequiredCheck = () => {
  const countInputs = document.querySelectorAll('.c-subject-rquired-valid');
  submitButton.addEventListener('click', () => {
    countInputs.forEach(el => {
      const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning');
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
};
inputRequiredCheck();

const selectRequiredCheck = () => {
  const countInputs = document.querySelectorAll('.c-responsavel-valid');
  submitButton.addEventListener('click', () => {
    countInputs.forEach(el => {
      const RequiredMsg = el.parentNode.querySelector('.c-responsavel-required');
      // console.log(RequiredMsg);
      if (el.value === 'Selecione') {
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
};
selectRequiredCheck();

const textBoxRequiredCheck = () => {
  const countInputs = document.querySelectorAll('.c-responsavel-valid-textbox');
  submitButton.addEventListener('click', () => {
    countInputs.forEach(el => {
      const RequiredMsg = el.parentNode.parentNode.querySelector('.c-responsavel-required');
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
};
textBoxRequiredCheck();

const checkboxRequiredCheck = () => {
  const countInputs = document.querySelectorAll('input[type="checkbox"]');
  submitButton.addEventListener('click', () => {
    countInputs.forEach(el => {
      const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-privacyPolicy-checked');
      console.log(RequiredMsg);
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
};
checkboxRequiredCheck();
