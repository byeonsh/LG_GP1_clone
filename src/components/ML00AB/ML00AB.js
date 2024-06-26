// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

function init() {
  const component = document.querySelectorAll('.ML00AB');
  if (beforeLaunch(component)) return false;

  const radioInputs = document.querySelectorAll('.info-boxfield > .c-radio-item input[type="radio"]');

  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;

      const optionItem = radio.closest('.info-boxfield');
      if (!optionItem) return;

      const siblingOptionItems = Array.from(optionItem.parentElement.children).filter(item => item !== optionItem);
      siblingOptionItems.forEach(siblingOptionItem => {
        const subInputField = siblingOptionItem.querySelector('.sub-input-field');
        if (subInputField) {
          subInputField.classList.add('hide');
        }
      });

      const closestSubInputField = optionItem.querySelector('.sub-input-field');
      if (closestSubInputField) {
        closestSubInputField.classList.remove('hide');
      }
    });
  });

  const complexRadioInputs = document.querySelectorAll('.complex-input > .c-radio-item input[type="radio"]');

  complexRadioInputs.forEach(radio => {
    radio.addEventListener('click', function () {
      const parentComplexInput = this.closest('.complex-input');
      const inputField = parentComplexInput.querySelector('.c-input-item > input[type="text"]');

      if (this.checked) {
        inputField.removeAttribute('disabled');

        const siblingComplexInputs = Array.from(parentComplexInput.parentNode.children).filter(
          element => element.classList.contains('complex-input') && element !== parentComplexInput
        );
        siblingComplexInputs.forEach(siblingComplexInput => {
          const siblingRadio = siblingComplexInput.querySelector('.c-radio-item input[type="radio"]');

          if (siblingRadio && siblingRadio !== this) {
            siblingComplexInput.querySelector('.c-input-item > input[type="text"]').setAttribute('disabled', '');
          }
        });
      }
    });
  });
}

init();
