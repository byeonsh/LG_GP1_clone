import { togglePasswordField } from '../../assets/js/common/utils.js';

const toastEvent = () => {
  const toastBtn = document.querySelector('.toastBtn');
  const toast = document.querySelector('.toast-popup');
  const toastShow = () => {
    if (!toast.classList.contains('active')) {
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

toastEvent();

togglePasswordField('.ETC000C .my-form__eye');
