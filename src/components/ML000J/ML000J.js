// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelectorAll('.ML000J');
  if (beforeLaunch(component)) return false;
}
init();
// export default

const wishlistAction = () => {
  const wishListEl = '.c-icon-button--wish';
  const wishlistBtn = document.querySelectorAll(wishListEl);
  wishlistBtn.forEach(el => {
    el.addEventListener('click', () => {
      const isCheck = el.closest(wishListEl).classList.contains('active');
      if (isCheck) {
        el.closest(wishListEl).classList.remove('active');
      } else {
        el.closest(wishListEl).classList.add('active');
      }
      // const target = el.closest('.c-product-list__item');
      // setTimeout(()=>{target.remove()},200)
    });
  });
};
wishlistAction();
