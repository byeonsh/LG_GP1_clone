const inputEvent = {
  textClear() {
    const buttonDelete = document.querySelector('.c-button-delete');
    const input = document.querySelector('.textInput__input');
    buttonDelete.addEventListener('click', () => {
      input.value = '';
      buttonDelete.classList.remove('c-button-delete--active');
    });
  },
  deleteButtonOn() {
    const buttonDelete = document.querySelector('.c-button-delete');
    const input = document.querySelector('.textInput__input');
    input.addEventListener('keyup', () => {
      buttonDelete.classList.add('c-button-delete--active');
      if (input.value.length === 0) {
        buttonDelete.classList.remove('c-button-delete--active');
      }
    });
  },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
  },
};

inputEvent.init();

// const searchRequiredCheck = () => {
//     const submitButton = document.querySelector('.fieldIcons__before');
//     submitButton.addEventListener('click', e => {
//         // console.log(e.target);
//         // e.stopPropagation();
//         const countInputs = submitButton[index]
//              .parentNode.parentNode.parentNode.querySelectorAll('input[type=text]');
//         // console.log(e.target);
//         countInputs.forEach(el => {
//             const RequiredMsg = el.parentNode.querySelector('.c-warning');
//             // console.log(el.value);
//             // console.log(RequiredMsg);
//             if (el.value === '') {
//                 el.classList.add('c-error');
//                 RequiredMsg.style.display = 'block';
//                 el.focus();
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else {
//                 RequiredMsg.style.display = 'none';
//                 el.classList.remove('c-error');
//             }
//         });
//     });
// };
// searchRequiredCheck();
