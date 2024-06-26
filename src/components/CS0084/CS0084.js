import accordion from '../../assets/js/common/accordion.js';
import { isSafeToLoad } from '../../assets/js/common/utils.js';

const dateSetting = function (compElement) {
  const monthControl = compElement.querySelectorAll('input[type="date"]');
  monthControl.forEach(function (el) {
    const theElement = el;
    theElement.value = new Date().toISOString().slice(0, 10);
    // Disable previous dates
    theElement.setAttribute('min', theElement.value);
  });
};

// init
function init(compElement) {
  const typeAccordion = compElement.querySelectorAll('.type-accordion');
  typeAccordion.forEach(el => {
    if (!el.classList.contains('type-product')) {
      accordion.run(el);
    }
  });
}

// validation
const dateRequiredCheck = submitButton => {
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
      // console.log(e.target);
      countInputs.forEach(el => {
        if (el.getAttribute('required')) {
          const RequiredMsg = el.parentNode.childNodes[5];
          // console.log(RequiredMsg);
          if (el.value === dateString) {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
            el.focus();
            return false;
            // eslint-disable-next-line no-else-return
          } else {
            RequiredMsg.style.display = 'none';
            el.classList.remove('c-error');
          }
        }
      });
    });
  }
};

const selectRequiredCheck = submitButton => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('select');
      countInputs.forEach(el => {
        if (el.getAttribute('required')) {
          const RequiredMsg = el.parentNode.querySelector('.c-warning');
          if (!el.value) {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
            el.focus();
            return false;
            // eslint-disable-next-line no-else-return
          } else {
            RequiredMsg.style.display = 'none';
            el.classList.remove('c-error');
          }
        }
      });
    });
  }
};

const tabAction = submitButton => {
  for (let index = 0; index < submitButton.length; index++) {
    const tabWarp = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('.cmp-tabs');
    // console.log(tabWarp.length);
    if (tabWarp.length === 1) {
      const tabCont = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('.c-tabs__tablist li');
      for (let i = 0; i < tabCont.length; i++) {
        tabCont[i].addEventListener('click', () => {
          const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('select');
          const countDate = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="date"]');
          countInputs.forEach(el => {
            const RequiredMsg = el.parentNode.querySelector('.c-warning');
            el.classList.remove('c-error');
            RequiredMsg.style.display = 'none';
          });
          countDate.forEach(el => {
            const RequiredMsg = el.parentNode.querySelector('.c-warning');
            el.classList.remove('c-error');
            RequiredMsg.style.display = 'none';
          });
        });
      }
    }
  }
};

if (isSafeToLoad('CS0084')) {
  const compElement = document.querySelector('.CS0084');
  const submitButton = compElement.querySelectorAll('.c-btn-next');

  init(compElement);
  dateSetting(compElement);
  dateRequiredCheck(submitButton);
  selectRequiredCheck(submitButton);
  tabAction(submitButton);
}
