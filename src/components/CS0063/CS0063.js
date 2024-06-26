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
const submitButton = document.querySelectorAll('.c-submit');

const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', () => {
      // e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
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
      });
    });
  }
};
inputRequiredCheck();
const textareaRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', () => {
      // e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('textarea');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.querySelector('.c-warning');
        console.log(RequiredMsg);
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
      });
    });
  }
};
textareaRequiredCheck();
const checkRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', () => {
      // e.stopPropagation();
      const countInputs =
        submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="checkbox"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
        console.log(el.checked);
        if (el.checked === false) {
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
checkRequiredCheck();
