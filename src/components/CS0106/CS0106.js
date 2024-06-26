import accordion from '../../assets/js/common/accordion.js';

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

// validation
const submitButton = document.querySelectorAll('.c-btn-next');
const textareaRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.c-text-contents').querySelectorAll('textarea');
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
  }
};
textareaRequiredCheck();

const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.c-text-contents').querySelectorAll('input[type="text"]');
      countInputs.forEach(el => {
        console.log(el);
        const containsCheck = el.classList.contains('undefined');
        const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning ');
        console.log(containsCheck);
        if (containsCheck === false) {
          if (el.value === '') {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
            // RequiredMsg.style.display = 'none';
            el.focus();
            return false;
            // eslint-disable-next-line no-else-return
          } else {
            el.classList.remove('c-error');
            RequiredMsg.style.display = 'none';
          }
        }
        // console.log(RequiredMsg);
      });
    });
  }
};
inputRequiredCheck();

const checkRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', () => {
      // e.stopPropagation();
      const countInputs =
        submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="checkbox"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
        // console.log(el.checked);
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
