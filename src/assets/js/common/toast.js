import { beforeLaunch } from './utils.js';

const toastDelete = () => {
  const msgRemoveBtn = document.querySelectorAll('.toast-popup__remove');
  if (beforeLaunch(msgRemoveBtn)) return false;

  msgRemoveBtn.forEach(el => {
    el.addEventListener('click', () => {
      const targetMsg = el.closest('.toast-popup__item');
      const targetUl = el.closest('.toast-popup');
      targetMsg.remove();
      if (targetUl.querySelectorAll('.toast-popup__item').length === 0) {
        targetUl.remove();
      }
    });
  });
};

export default toastDelete;
