// validation
const submitButton = document.querySelector('.c-btn-submit');
const validationCheck = function () {
  const modelNumberValid = document.querySelector('.c-feedback-valid');
  const modelNumberRequired = document.querySelector('.c-feedback-required');
  // const modelNumberInvalid = document.querySelector('.c-feedback-invalid');
  submitButton.addEventListener('click', e => {
    e.preventDefault();
    const feedbackChecked = document.getElementsByName('feedback');
    let feedbackValid = false;

    let i = 0;
    while (!feedbackValid && i < feedbackChecked.length) {
      if (feedbackChecked[i].checked) feedbackValid = true;
      i++;
    }

    if (!feedbackValid) {
      modelNumberValid.focus();
      modelNumberValid.classList.add('c-error');
      modelNumberRequired.style.display = 'block';
    } else {
      modelNumberValid.focus();
      modelNumberValid.classList.add('c-error');
      modelNumberRequired.style.display = 'none';
    }
    return feedbackValid;
  });
};
validationCheck();

const validationCheck02 = function () {
  const modelNumberValid = document.querySelector('.c-star-valid');
  const modelNumberRequired = document.querySelector('.c-star-required');
  // const modelNumberInvalid = document.querySelector('.c-star-invalid');
  submitButton.addEventListener('click', e => {
    e.preventDefault();
    const feedbackChecked = document.getElementsByName('rating');
    let feedbackValid = false;

    let i = 0;
    while (!feedbackValid && i < feedbackChecked.length) {
      if (feedbackChecked[i].checked) feedbackValid = true;
      i++;
    }

    if (!feedbackValid) {
      modelNumberValid.focus();
      modelNumberValid.classList.add('c-error');
      modelNumberRequired.style.display = 'block';
    } else {
      modelNumberValid.focus();
      modelNumberValid.classList.add('c-error');
      modelNumberRequired.style.display = 'none';
    }
    return feedbackValid;
  });
};
validationCheck02();
const validationCheck03 = function () {
  const installDateValid = document.querySelector('.c-message-valid');
  const installDateRequired = document.querySelector('.c-message-required');
  // const installDateInvalid = document.querySelector('.c-installDate-invalid');

  submitButton.addEventListener('click', e => {
    e.preventDefault();

    // install date Validation
    if (installDateValid.value === '') {
      installDateValid.focus();
      installDateValid.classList.add('c-error');
      // installDateInvalid.style.display = 'none';
      installDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      installDateValid.classList.remove('c-error');
      // installDateInvalid.style.display = 'black';
      installDateRequired.style.display = 'none';
    }
  });
};
validationCheck03();

// print
const printSection = function () {
  const printBtn = document.querySelectorAll('.c-print');
  // console.log(printBtn);
  const body = document.querySelector('body');
  const cloneBody = body.cloneNode(true);
  // console.log(cloneBody);
  printBtn.forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      cloneBody.style.zoom = '95%';
      window.print(cloneBody);
    });
  });
};
printSection();
