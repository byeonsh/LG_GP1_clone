function init() {
  const typeAccordion = document.querySelectorAll('.type-accordion');
  // eslint-disable-next-line no-undef
  typeAccordion.forEach(el => accordion.run(el));
}
init();

// validation
const submitButton = document.querySelectorAll('.c-checkEmail-trackStatus-submit');

const inputRequiredCheck = () => {
  for (let index = 0; index < submitButton.length; index++) {
    submitButton[index].addEventListener('click', e => {
      e.stopPropagation();
      const countInputs = submitButton[index].closest('.CS0021__container').querySelectorAll('input[type="text"]');
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
