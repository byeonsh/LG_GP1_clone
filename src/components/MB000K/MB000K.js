import { togglePasswordField } from '../../assets/js/common/utils.js';

const toastEvent = () => {
  const toastBtn = document.querySelector('.toastBtn');
  const toast = document.querySelector('.toast-popup');
  const toastShow = () => {
    if (toast && !toast.classList.contains('active')) {
      // 클래스 추가
      toast.classList.add('active');
      setTimeout(() => {
        // 클래스 제거
        toast.classList.remove('active');
      }, 2000);
    }
  };

  // active가 없을 때에만 실행
  if (toastBtn) toastBtn.addEventListener('click', toastShow);
};

const checkEvent = () => {
  const inpustCheck = document.querySelectorAll(".my-formbox input[type='checkbox']");
  let optionCheckNum = 0;
  inpustCheck.forEach(input => {
    input.addEventListener('change', e => {
      const closestButton = e.target.closest('.button');
      // if (
      //     closestButton.classList.contains('custom-item') &&
      //     closestButton.nextElementSibling !== null &&
      //     closestButton.nextElementSibling.classList.contains('js-optional-check')
      // ) {
      //     const inputCheckOptions = closestButton.nextElementSibling.querySelectorAll("input[type='checkbox']");

      //     if (e.target.checked) {
      //         inputCheckOptions.forEach(inputChildren => {
      //             inputChildren.checked = true;
      //         });
      //     }
      // } else
      if (closestButton.classList.contains('js-optional-check')) {
        if (
          e.target.closest('.c-checkbox-item') &&
          e.target.closest('.c-checkbox-item').nextElementSibling !== null &&
          e.target.closest('.c-checkbox-item').nextElementSibling.classList.contains('my-check--receipt-text')
        ) {
          const optionCheck = e.target
            .closest('.c-checkbox-item')
            .nextElementSibling.querySelectorAll("input[type='checkbox']");

          // if (e.target.checked) {
          //     optionCheck.forEach(item => {
          //         item.checked = true;
          //     });
          // }
          if (!e.target.checked) {
            optionCheck.forEach(item => {
              // eslint-disable-next-line no-param-reassign
              item.checked = false;
            });
          }
        } else if (e.target.closest('.my-check--receipt-text')) {
          const optionCheck = e.target.closest('.my-check--receipt-text').querySelectorAll("input[type='checkbox']");

          optionCheck.forEach(item => {
            if (item.checked) {
              optionCheckNum++;
            }
          });
          if (optionCheckNum > 0) {
            console.log(true);
            e.target.closest('.button').querySelector("input[type='checkbox']").checked = true;
          }
          // else {
          //     e.target.closest('.button').querySelector("input[type='checkbox']").checked = false;
          // }
          optionCheckNum = 0;
        }
      }
    });
  });
};

const popCheckEvent = () => {
  const inpustCheck = document.querySelectorAll(".c-pop-msg__contents input[type='checkbox']");
  let optionCheckNum = 0;
  inpustCheck.forEach(input => {
    input.addEventListener('change', e => {
      const closestButton = e.target.closest('.button');
      if (closestButton.classList.contains('acceptAll')) {
        if (e.target.checked) {
          inpustCheck.forEach(item => {
            // eslint-disable-next-line no-param-reassign
            item.checked = true;
            document.querySelector('.my-check--receipt-text').style.display = 'block';
          });
        } else {
          inpustCheck.forEach(item => {
            // eslint-disable-next-line no-param-reassign
            item.checked = false;
            document.querySelector('.my-check--receipt-text').style.display = 'none';
          });
        }
      } else if (e.target.closest('.acceptOptions')) {
        const optionCheck = e.target.closest('.acceptOptions').querySelectorAll("input[type='checkbox']");

        optionCheck.forEach(item => {
          if (item.checked) {
            optionCheckNum++;
          }

          if (
            item.checked &&
            closestButton.classList.contains('button') &&
            closestButton.nextElementSibling !== null &&
            closestButton.nextElementSibling.classList.contains('my-check--receipt-text')
          ) {
            e.target.closest('.button').nextElementSibling.style.display = 'block';
          } else if (
            !item.checked &&
            closestButton.classList.contains('button') &&
            closestButton.nextElementSibling !== null &&
            closestButton.nextElementSibling.classList.contains('my-check--receipt-text')
          ) {
            e.target.closest('.button').nextElementSibling.style.display = 'none';
          }
        });

        if (optionCheckNum === 3) {
          document.querySelector(".acceptAll input[type='checkbox']").checked = true;
        } else if (optionCheckNum <= 2) {
          document.querySelector(".acceptAll input[type='checkbox']").checked = false;
        }

        optionCheckNum = 0;
      }
    });
  });
};

popCheckEvent();
toastEvent();
checkEvent();

togglePasswordField('.MB000K .my-form__eye');
