// phone input check
const inputCodeCheckTypeCA = () => {
  const countInputs = document.querySelectorAll('.c-input-type01');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/^(\w{2})(\w{5})(\w{4})$/, `($1)$2-$3`).slice(0, 14);
    });
    el.addEventListener('keydown', function (e) {
      if (e.keyCode === 8) {
        // eslint-disable-next-line no-shadow
        el.addEventListener('input', function (e) {
          const inputNum = /[^0-9]/g;
          const NewNum = e.target.value.replace(inputNum, '');
          // console.log(NewNum.length);
          if (NewNum.length < 14) {
            const NewNum02 = e.target.value.replace(inputNum, '');
            e.target.value = NewNum02.replace(/^(\w{2})(\w{5})(\w{4})$/, `($1)$2-$3`).slice(0, 14);
          } else {
            return false;
          }
        });
      }
    });
  });
};
inputCodeCheckTypeCA();

const submitButton = document.querySelectorAll('.c-submit02');
const dateRequiredCheck = () => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = e.target.parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.c-warning');
        // console.log(dateString);
        if (el.value === '') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
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
      e.stopPropagation();
      const countInputs = e.target.parentNode.parentNode.parentNode.querySelectorAll('select');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.c-warning');
        // eslint-disable-next-line no-template-curly-in-string
        if (el.value === 'Selecione o produto') {
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

const radioRequiredCheck = () => {
  const countInputs = document.querySelectorAll('input[type="checkbox"]');
  // console.log(countInputs);
  submitButton[0].addEventListener('click', () => {
    // e.stopPropagation();
    countInputs.forEach(el => {
      const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
      // console.log(RequiredMsg);
      if (!countInputs) {
        // el.classList.remove('c-error');
        RequiredMsg.style.display = 'none';
      } else {
        // el.classList.add('c-error');
        RequiredMsg.style.display = 'block';
        el.focus();
      }
    });
  });
};
radioRequiredCheck();
