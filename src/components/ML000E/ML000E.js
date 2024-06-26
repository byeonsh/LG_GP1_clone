// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
const errorMsg = () => {
  const msgRemoveBtn = document.querySelectorAll('.error-content-msg__remove');
  msgRemoveBtn.forEach(el => {
    el.addEventListener('click', () => {
      const targetMsg = el.closest('.error-content-msg__item');
      targetMsg.remove();
    });
  });
};

errorMsg();

function init() {
  const component = document.querySelector('.ML000E');
  const accrodionItem = document.querySelectorAll('.ML000E .my-accodion.my-accodion--main');
  if (beforeLaunch(component)) return false;

  accrodionItem.forEach(el => accordion.run(el));
}
init();

// export default
