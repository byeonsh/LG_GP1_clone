/* eslint-disable no-unused-vars */
// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';
// eslint-disable-next-line max-len
// eslint-disable-next-line import/namespace, import/default, import/no-named-as-default, import/no-named-as-default-member
import FullCalendar from './index-global.js';

let memo = document.body.scrollHeight - 100;

function init() {
  const component = document.querySelectorAll('.CT0302');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));

  const componentCalendar = document.querySelectorAll('.Buy-calendar');
  if (beforeLaunch(componentCalendar)) return false;
  const calendarBtn = document.querySelectorAll('.c-checkout-step02-delivery__date-edit');
  calendarBtn.forEach(function (element) {
    element.querySelector('.c-button').addEventListener('click', function () {
      const calendarEl = document.querySelector('.Buy-calendar__box');

      const dateActive = targetEl => {
        if (
          targetEl.closest('.fc-day').classList.contains('fc-day-future') &&
          !targetEl.closest('.fc-day').classList.contains('selected')
        ) {
          const prevEl = document.querySelectorAll('.fc-day-future.selected');
          if (prevEl) {
            prevEl.forEach(el => el.classList.remove('selected'));
          }
          targetEl.closest('.fc-day').classList.add('selected');
        }
      };

      const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
          left: '',
          center: 'prev,title,next',
          right: '',
        },
        dayCellDidMount(options) {
          if (!options.el.classList.contains('fc-day-other') && options.el.classList.contains('fc-day-future')) {
            options.el.querySelector('a').setAttribute('tabindex', '0');
          }
        },
      });
      calendar.render();

      const date = calendarEl.querySelectorAll('.fc-daygrid-day-number');
      date.forEach(targetEl => {
        targetEl.addEventListener('click', e => {
          e.preventDefault();
          dateActive(targetEl);
        });
        targetEl.addEventListener('keyup', e => {
          if (e.keyCode === 13 || e.which === 13) {
            dateActive(targetEl);
          }
        });
      });
    });
  });

  const autoHyphen = target => {
    // eslint-disable-next-line no-param-reassign
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,5})(\d{0,3})$/g, '$1-$2')
      // eslint-disable-next-line no-useless-escape
      .replace(/(\-{1,2})$/g, '')
      .replace(/\b\d{8,}\b/g, '');
  };
  const CEP = document.querySelectorAll('.js-CEP-keyup');
  CEP.forEach(el => {
    if (beforeLaunch(el)) return false;
    el.addEventListener('keyup', () => {
      autoHyphen(el);
    });
  });

  const autoHyphenTinNum = targetItem => {
    // eslint-disable-next-line no-param-reassign
    targetItem.value = targetItem.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,5})$/, '$1-$2-$3-$4')
      // eslint-disable-next-line no-useless-escape
      .replace(/(\-{1,2})$/g, '')
      .replace(/\b\d{14,}\b/g, '');
  };
  const TINNumber = document.querySelectorAll('.js-TINNumber-keyup');
  TINNumber.forEach(el => {
    if (beforeLaunch(el)) return false;
    el.addEventListener('keyup', () => {
      autoHyphenTinNum(el);
    });
  });

  const radioInputs = document.querySelectorAll('.option-item > .c-radio-item input[type="radio"]');

  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;

      const optionItem = radio.closest('.option-item');
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

const stepToggle = () => {
  const nextBtn = document.querySelectorAll(
    '.CT0302 .buy-checkout__item--delivery:not(.buy-checkout__item--complete) .cmp-button.next'
  );
  const editBtn = document.querySelectorAll(
    '.CT0302 .buy-checkout__item--delivery.buy-checkout__item--complete .c-checkout-step__edit'
  );

  nextBtn.forEach(nextEl => {
    nextEl.addEventListener('click', () => {
      const nextContent = nextEl
        .closest('.CT0302')
        .querySelector('.buy-checkout__item--delivery:not(.buy-checkout__item--complete)');
      const editContent = nextEl
        .closest('.CT0302')
        .querySelector('.buy-checkout__item--delivery.buy-checkout__item--complete');
      editContent.style.display = 'block';
      nextContent.style.display = 'none';
      memo = document.body.scrollHeight - 100;
    });
  });
  editBtn.forEach(editEl => {
    editEl.addEventListener('click', () => {
      const nextContent = editEl
        .closest('.CT0302')
        .querySelector('.buy-checkout__item--delivery:not(.buy-checkout__item--complete)');
      const editContent = editEl
        .closest('.CT0302')
        .querySelector('.buy-checkout__item--delivery.buy-checkout__item--complete');

      editContent.style.display = 'none';
      nextContent.style.display = 'block';
      memo = document.body.scrollHeight - 100;
    });
  });
};

stepToggle();

const inputInSelectChecked = () => {
  // input radio in select
  const selectBox = document.querySelector('.buy-delivery-box--type-mix .buy-delivery-box__item--radio select');
  if (beforeLaunch(selectBox)) return false;
  const radioInput = selectBox.closest('.buy-delivery-box__item--radio').querySelector('input');
  // eslint-disable-next-line eqeqeq
  if (radioInput != 'undefined') {
    selectBox.addEventListener('change', function () {
      radioInput.checked = true;
    });
  }
};
inputInSelectChecked();

// const deliveryDate = () => {
//     console.log('deleveryDate');
//     const btnDateSelect = document.querySelectorAll(
//         '.CT0302 .buy-delivery-box__list--border .buy-delivery-box__select .c-button[class*=-box].medium'
//     );
//     btnDateSelect.forEach(btnDateSelectEl => {
//         btnDateSelectEl.addEventListener('click', () => {
//             // if (el.classList.contains('c-button__active')) {
//             //     console.log('remove Class');
//             //     el.classList.remove('c-button__active');
//             // } else {
//             //     console.log('add Class');
//             //     el.classList.add('c-button__active');
//             // }
//             // const expectedDate = btnDateSelectEl
//             //     .closest('.buy-delivery-box__select')
//             //     .querySelector('.buy-delivery-box__select__expected-date');
//             // const selectValide = btnDateSelectEl
//             //     .closest('.buy-delivery-box__select')
//             //     .querySelector('.buy-delivery-box__select__valid');
//             btnDateSelectEl.classList.add('c-button__active');
//             // expectedDate.classList.add('buy-delivery-box__select__expected-date--active');
//             // selectValide.classList.add('buy-delivery-box__select__valid--active');
//         });
//     });
// };
// deliveryDate();
