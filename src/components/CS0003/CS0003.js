import { beforeLaunch } from '../../assets/js/common/utils.js';

// Change label when option is selected
const selectLabelChange = function (event) {
  const selectBox = document.getElementById('orderBy');
  const selectLabel = document.querySelector('.c-select-label');
  const changeLabel = document.querySelector('.c-select-label2');
  const dataResult = selectBox[selectBox.selectedIndex];

  const changeInput = document.getElementById('email2');
  selectLabel.innerHTML = `${event.target.value} <em class="require">*</em>`;
  changeLabel.innerHTML = dataResult.dataset.changeLabel;
  if (selectBox.selectedIndex === 1) {
    changeInput.setAttribute('type', 'text');
    changeInput.setAttribute('placeholder', 'Type a Zip Code');
    changeInput.nextSibling.nextSibling.classList.remove('required-msg');
    changeInput.nextSibling.nextSibling.style.display = 'none';
    changeInput.classList.remove('c-error');
  } else {
    changeInput.setAttribute('type', 'email');
    changeInput.setAttribute('placeholder', 'Type an Email');
    changeInput.nextSibling.nextSibling.classList.add('required-msg');
  }
};
function init4() {
  const component = document.getElementById('orderBy');
  if (beforeLaunch(component)) return false;
  component.addEventListener('change', function (event) {
    return selectLabelChange(event);
  });
}
init4();
const validCheck = document.querySelectorAll('.trackMyOrderValidCheck');
const inputCheck = () => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < validCheck.length; index++) {
    validCheck[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = validCheck[index].parentNode.parentNode.parentNode.querySelectorAll('input');
      // console.log(countInputs);
      countInputs.forEach(el => {
        const RequiredMsg = el.parentNode.querySelector('.required-msg');
        if (el.value === '') {
          if (RequiredMsg !== null) {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
          }
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
inputCheck();
