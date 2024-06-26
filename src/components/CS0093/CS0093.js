const selectEvent = function () {
  const btnClose = document.querySelectorAll('.c-btn-close');
  const selectBox = document.querySelectorAll('.cs-form__select');
  const selectBeforeBox = document.querySelectorAll('.cs-form__box-before');
  const selectAfterBox = document.querySelectorAll('.cs-form__box-after');
  const comparisonBtn = document.querySelectorAll('.comparison-btn');
  const comparisonText = document.querySelectorAll('.comparison-text');

  btnClose.forEach(itemButton => {
    itemButton.addEventListener('click', function () {
      selectBox.forEach(item => {
        item.classList.add('cs-form__select-before');
        item.classList.remove('cs-form__select-after');
      });
      selectAfterBox.forEach(item2 => {
        item2.classList.add('hidden');
      });
      selectBeforeBox.forEach(item3 => {
        item3.classList.remove('hidden');
      });

      comparisonBtn.forEach(item2 => {
        item2.classList.add('on');
      });
      comparisonText.forEach(item3 => {
        item3.classList.remove('on');
      });
    });
  });
};
selectEvent();

// validation
const submitButton = document.querySelectorAll('.cmp-button');
const dateRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      // console.log(e.target);
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
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
        if (el.value === 'Select product type') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
        } else if (el.value === 'Select capacity') {
          el.classList.add('c-error');
          RequiredMsg.style.display = 'block';
          el.focus();
        } else if (el.value === 'Select Star Ration') {
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
selectRequiredCheck();

const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      // console.log(e.target);
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.cs-form__box').querySelectorAll('input');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning');
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
