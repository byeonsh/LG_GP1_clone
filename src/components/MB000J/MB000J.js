import { togglePasswordField } from '../../assets/js/common/utils.js';

togglePasswordField('.MB000J .my-form__eye');

// - [Start] 2023-04-07 : ADD - check function
const check = () => {
  const formCheckBox = document.querySelectorAll('.my-form .my-check .button');
  const formLastCheckBox = formCheckBox[formCheckBox.length - 1];
  const popCheckBox = document.querySelectorAll('.terms-pop .my-check .button');
  const popLastCheckBox = popCheckBox[popCheckBox.length - 1];
  const targetButton = document.querySelector('.highlight.js-pop-open');
  formLastCheckBox.addEventListener('click', () => {
    const targetText = formLastCheckBox.closest('.my-check').querySelector('.my-check--receipt-text');
    if (formLastCheckBox.querySelector('input').checked) {
      targetText.style.display = 'block';
      targetButton.removeAttribute('disabled');
    } else {
      targetText.style.display = 'none';
      targetButton.setAttribute('disabled', true);
    }
  });
  popLastCheckBox.addEventListener('click', () => {
    const targetText = popLastCheckBox.closest('.my-check').querySelector('.my-check--receipt-text');
    if (popLastCheckBox.querySelector('input').checked) {
      targetText.style.display = 'block';
    } else {
      targetText.style.display = 'none';
    }
  });
};
check();
// - [End] 2023-04-07 : ADD - check function
