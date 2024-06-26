// start --- publishing part only | This function is just for displaying validation messages.
const checkRequiredCheck = function () {
  const searchButton = document.querySelectorAll('.c-btn-search');
  const selectRequiredCheck = () => {
    for (let index = 0; index < searchButton.length; index++) {
      searchButton[index].addEventListener('click', e => {
        e.stopPropagation();
        const countInputs = searchButton[index].parentNode.parentNode.parentNode.querySelectorAll('select');
        countInputs.forEach(el => {
          const RequiredMsg = el.parentNode.parentNode.parentNode.querySelector('.c-warning');
          const formBox = el.closest('.c-search-box__form');
          if (el.options[el.selectedIndex].text === 'Country') {
            formBox.classList.add('my-warn');
            RequiredMsg.style.display = 'block';
            el.focus();
            return false;
            // eslint-disable-next-line no-else-return
          } else {
            formBox.classList.remove('my-warn');
            RequiredMsg.style.display = 'none';
            return false;
          }
        });
      });
    }
  };
  selectRequiredCheck();
};
checkRequiredCheck();
// end --- publishing part only | This function is just for displaying validation messages.

const dateSetting = function () {
  const startDateSet = document.querySelectorAll('.registrationStartDate');
  // setting
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  const prevYear = today.getFullYear() - 1;
  const prevMonth = today.getMonth() + 1;
  const prevDay = today.getDate();
  // action : startDateSet
  startDateSet.forEach(function (el) {
    // default
    const theElement = el.childNodes[3];
    theElement.value = `${todayYear}-${`0${today.getMonth() - 2}`.slice(-2)}-${todayDate}`;
    theElement.max = today.toISOString().slice(0, 10);
    // change event
    theElement.addEventListener('change', () => {
      if (theElement.value < `${prevYear}-${prevMonth}-${prevDay}`) {
        // next > input
        const changeDateEnd = el.closest('.my-input').querySelector('.registrationEndDate input');
        // default setting date change
        const arr1 = theElement.value.split('-');
        const newDate = new Date(arr1[0], arr1[1], arr1[2]);
        let newDateYear = newDate.getFullYear() + 1;
        let newDateMonth = 0;
        const newDateDay = `0${newDate.getDate()}`.slice(-2);
        // 12month
        if (newDate.getMonth() < 1) {
          newDateYear = newDate.getFullYear();
          newDateMonth = `0${newDate.getMonth()}${12}`.slice(-2);
          changeDateEnd.value = `${newDateYear}-${newDateMonth}-${newDateDay}`;
        } else {
          newDateMonth = `0${newDate.getMonth()}`.slice(-2);
          changeDateEnd.value = `${newDateYear}-${newDateMonth}-${newDateDay}`;
        }
      }
    });
  });
  // endDateSet
  const endDateSet = document.querySelectorAll('.registrationEndDate');
  endDateSet.forEach(function (el) {
    const theElement = el.childNodes[3];
    theElement.value = `${todayYear}-${todayMonth}-${todayDate}`;
    theElement.max = today.toISOString().slice(0, 10);
    // console.log(`${todayYear}-${todayMonth}-${todayDate}`);
  });
};
dateSetting();
