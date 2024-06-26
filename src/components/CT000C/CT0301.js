// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';

function init() {
  const component = document.querySelectorAll('.CT0301');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}

init();

const checkedCoupon = () => {
  const btnCheckCoupon = document.querySelectorAll(
    '.CT0301 .buy-order-info-coupon .buy-select-coupon .buy-coupon-item label.checkbox input[type="checkbox"]'
  );
  btnCheckCoupon.forEach(el => {
    el.addEventListener('click', () => {
      const checkCoupon = el.closest('.buy-coupon-item label.checkbox');
      if (el.checked === true) {
        checkCoupon.classList.add('checked');
      } else {
        checkCoupon.classList.remove('checked');
      }
    });
  });
};

checkedCoupon();

const memberEmailEdit = () => {
  const editBtn = document.querySelector('.CT0301 .buy-member-id .c-button--text-underline');
  const cancelBtn = document.querySelector('.CT0301 .buy-member-edit .c-button--text-underline');
  const editContent = document.querySelector('.CT0301 .buy-checkout__item--id');
  const cancelContent = document.querySelector('.CT0301 .buy-checkout__item--id.buy-checkout__item--complete');
  editBtn.addEventListener('click', () => {
    editContent.style.display = 'none';
    cancelContent.style.display = 'block';
  });

  cancelBtn.addEventListener('click', () => {
    editContent.style.display = 'block';
    cancelContent.style.display = 'none';
  });
};

memberEmailEdit();

const stepToggle = () => {
  const nextBtn = document.querySelector(
    '.CT0301 .buy-checkout__item--coupon:not(.buy-checkout__item--complete) .cmp-button.next'
  );
  const editBtn = document.querySelector(
    '.CT0301 .buy-checkout__item--coupon.buy-checkout__item--complete .c-checkout-step__edit'
  );
  const nextContent = document.querySelector('.CT0301 .buy-checkout__item--coupon:not(.buy-checkout__item--complete)');
  const editContent = document.querySelector('.CT0301 .buy-checkout__item--coupon.buy-checkout__item--complete');

  let checkedCouponArray = [];
  let applyCouponText;
  const applyCoupon = document.querySelector('.CT0301 .buy-apply-coupon__coupon');
  const couponInput = document.querySelectorAll('.CT0301 .buy-coupon-select input');

  const couponCheck = () => {
    checkedCouponArray = [];
    for (let i = 0; i < couponInput.length; i += 1) {
      if (couponInput[i].checked) {
        checkedCouponArray.push(couponInput[i].closest('label').querySelector('.buy-select-coupon__label').innerText);
      }
    }
    applyCouponText = checkedCouponArray.join(`<br/>`);
  };

  nextBtn.addEventListener('click', () => {
    editContent.style.display = 'block';
    nextContent.style.display = 'none';
    couponCheck();
    if (checkedCouponArray.length === 0) {
      applyCoupon.innerText = 'No coupon has been selected';
    } else {
      applyCoupon.innerHTML = applyCouponText;
    }
  });
  editBtn.addEventListener('click', () => {
    editContent.style.display = 'none';
    nextContent.style.display = 'block';
    couponCheck();
  });
};

stepToggle();
