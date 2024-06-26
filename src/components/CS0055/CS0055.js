import accordion from '../../assets/js/common/accordion.js';

function init() {
  const typeAccordion = document.querySelectorAll('.type-accordion');
  typeAccordion.forEach(el => accordion.run(el));
}
init();

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
// validation
const submitButton = document.querySelectorAll('.c-button__text');
const selectRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      // console.log(e.target);
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.CS0055__container').querySelectorAll('select');
      // console.log(e.target);
      countInputs.forEach(el => {
        const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning');
        // console.log(el.value);
        // console.log(RequiredMsg);
        if (el.value === 'survey1') {
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

const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.CS0055__container').querySelectorAll('input[type="text"]');
      console.log(countInputs);
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
const dateRequiredCheck = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const dateString = `${year}-${month}-${day}`;
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      // console.log(e.target);
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="date"]');
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.c-warning');
        // console.log(dateString);
        if (el.value === dateString) {
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
dateRequiredCheck();
