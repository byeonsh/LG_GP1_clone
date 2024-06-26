// radio action
function radioEvent01() {
  const radioBox = document.querySelectorAll('.c-support__column2x2.type1 .c-form__radio-box');
  radioBox.forEach(item => {
    const radioInput = item.querySelectorAll('.radio input');
    radioInput.forEach((list, index) => {
      // console.log(list);
      list.addEventListener('click', () => {
        // console.log(index);
        const type1 = document.querySelector('.c-repair__type1');
        const type2 = document.querySelector('.c-repair__type2');
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
radioEvent01();

function radioEvent02() {
  const radioBox = document.querySelectorAll('.c-support__column2x2.type3 .c-form__radio-box');
  radioBox.forEach(item => {
    const radioInput = item.querySelectorAll('.radio input');
    radioInput.forEach((list, index) => {
      // console.log(list);
      list.addEventListener('click', () => {
        // console.log(index);
        const type1 = document.querySelector('.c-repair__type5');
        const type2 = document.querySelector('.c-repair__type6');
        // const type3 = document.querySelector('.c-repair__type3');
        // eslint-disable-next-line default-case
        switch (index) {
          case 0:
            type1.style.display = 'block';
            type2.style.display = 'none';
            // type3.style.display = 'none';
            // distributorAccessSubmit();
            break;
          case 1:
            type1.style.display = 'none';
            type2.style.display = 'block';
            // type3.style.display = 'none';
            // distributorAccessSubmit02();
            // distributorAccessSubmit03();
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
radioEvent02();

function radioEvent03() {
  const radioBox = document.querySelectorAll('.c-support__column2x2.type2 .c-form__radio-box');
  radioBox.forEach(item => {
    const radioInput = item.querySelectorAll('.radio input');
    radioInput.forEach((list, index) => {
      // console.log(list);
      list.addEventListener('click', () => {
        // console.log(index);
        const type1 = document.querySelector('.c-repair__type3');
        const type2 = document.querySelector('.c-repair__type4');
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
radioEvent03();

// btn action
const btnClickAction = function () {
  const submitButton = document.querySelectorAll('.c-btn-find');
  const dateRequiredCheck = () => {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < submitButton.length; index++) {
      submitButton[index].addEventListener('click', e => {
        // console.log(e.target);
        e.stopPropagation();
        const countInputs = e.target.parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
        // console.log(countInputs);
        countInputs.forEach(el => {
          const RequiredMsg = el.nextElementSibling;
          // console.log(RequiredMsg);
          // console.log(dateString);
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
  dateRequiredCheck();
};
btnClickAction();
