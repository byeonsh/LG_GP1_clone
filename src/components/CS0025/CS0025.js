const waRadio = () => {
  const radios = document.querySelectorAll('input[type=radio]');
  const target = document.querySelectorAll('.c-feel_list > li p');
  radios.forEach(c =>
    c.addEventListener('change', () => {
      const currentPrents = c.closest('li');
      target.forEach(el => {
        el.classList.remove('active');
      });
      currentPrents.querySelector('p').classList.add('active');
    })
  );
};

function init() {
  // Show textbox when radio button is clicked
  const radioClick = document.querySelectorAll('.CS0025 .clickedShow');
  radioClick.forEach(item =>
    item.addEventListener('click', function () {
      radioClick.forEach(el => {
        el.nextElementSibling.classList.remove('c-display');
        const notClicedShow = document.querySelectorAll('.CS0025 .c-radio-item:not(.clickedShow)');
        notClicedShow.forEach(item2 => {
          item2.addEventListener('click', function () {
            el.nextElementSibling.classList.remove('c-display');
          });
        });
      });
      item.nextElementSibling.classList.add('c-display');
    })
  );

  // Show formField when radio button is clicked
  const fieldShow = document.querySelector('.CS0025 .showForm');
  fieldShow.addEventListener('click', () => {
    const selectShow = document.querySelector('.CS0025 .c-select-show');
    selectShow.classList.add('c-display');
  });
  const fieldNoShow = document.querySelector('.CS0025 .noShowForm');
  fieldNoShow.addEventListener('click', () => {
    const selectShow = document.querySelector('.CS0025 .c-select-show');
    selectShow.classList.remove('c-display');
  });
  waRadio();
}
init();

// Step 3 - Search button (PostCode Search)
const regPostCodeSearchBtn = document.querySelector('.c-check-value');
const regPostCodeValid = document.querySelector('.c-postCode-valid');
const regPostCodeRequired = document.querySelector('.c-postCode-required');
const regPostCodeInvalid = document.querySelector('.c-postCode-invalid');
const regPostCodeAgain = document.querySelector('.c-postCode-searchAgain');
const regPostCodeReg = /^[0-9]{5}(?:-[0-9]{4})?$/; // US Postal Code, Ex) 12345 || 12345-6789
const regCityValid = document.querySelector('.c-city-valid');
const regStreetAdrValid = document.querySelector('.c-streetAddr-valid');

regPostCodeSearchBtn.addEventListener('click', e => {
  e.preventDefault();
  if (regPostCodeValid.value === '') {
    regPostCodeRequired.style.display = 'block';
    regPostCodeInvalid.style.display = 'none';
    regPostCodeAgain.style.display = 'none';
    regPostCodeValid.focus();
    return false;
    // eslint-disable-next-line no-else-return
  } else if (regPostCodeValid.value.match(regPostCodeReg)) {
    regPostCodeRequired.style.display = 'none';
    regPostCodeInvalid.style.display = 'none';
    regPostCodeAgain.style.display = 'none';
    // PostCode Dummy Data [TEST]
    sessionStorage.setItem('PostCode', regPostCodeValid.value);
    sessionStorage.setItem('City', 'Philadelphia');
    regCityValid.value = sessionStorage.getItem('City');
    sessionStorage.setItem('StreetAddress', '5338 VINE ST APT 1A');
    regStreetAdrValid.value = sessionStorage.getItem('StreetAddress');
  } else {
    regPostCodeRequired.style.display = 'none';
    regPostCodeInvalid.style.display = 'block';
    regPostCodeAgain.style.display = 'none';
    regPostCodeValid.focus();
    return false;
  }
});
