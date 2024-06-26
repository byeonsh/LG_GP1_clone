const checkEvent = () => {
  const inpustCheck = document.querySelectorAll(".my-check-msg input[type='checkbox']");
  inpustCheck.forEach(item => {
    item.addEventListener('change', e => {
      const closestCheckBoxItem = e.target.closest('.c-checkbox-item');

      if (
        item.checked &&
        closestCheckBoxItem.classList.contains('c-checkbox-item') &&
        closestCheckBoxItem.nextElementSibling !== null &&
        closestCheckBoxItem.nextElementSibling.classList.contains('my-check-msg--receipt-text')
      ) {
        closestCheckBoxItem.nextElementSibling.style.display = 'block';
      } else if (
        !item.checked &&
        closestCheckBoxItem.classList.contains('c-checkbox-item') &&
        closestCheckBoxItem.nextElementSibling !== null &&
        closestCheckBoxItem.nextElementSibling.classList.contains('my-check-msg--receipt-text')
      ) {
        closestCheckBoxItem.nextElementSibling.style.display = 'none';
      }

      if (item.checked && e.target.closest('.my-check-msg__button').classList.contains('requireItem')) {
        document.querySelector('.my-formbox__button button').removeAttribute('disabled');
      } else if (!item.checked && e.target.closest('.my-check-msg__button').classList.contains('requireItem')) {
        document.querySelector('.my-formbox__button button').setAttribute('disabled', 'disabled');
      }
    });
  });
};

checkEvent();
