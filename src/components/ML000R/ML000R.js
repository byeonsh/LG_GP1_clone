const trashBtn = document.querySelectorAll('.ML000R .c-product-item__input--delete');
const deleteBtn = document.querySelector('.my-address-pop__delete');
const cancelBtn = document.querySelector('.c-pop-msg__close-btn');
const closeBtn = document.querySelector('.c-pop-msg__close-button');

const productDelete = targetProduct => {
  let targetProduct2 = targetProduct;
  cancelBtn.addEventListener('click', e => {
    e.preventDefault();
    targetProduct2 = null;
  });
  closeBtn.addEventListener('click', e => {
    e.preventDefault();
    targetProduct2 = null;
  });
  deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    if (targetProduct2 !== undefined && targetProduct2 !== null) {
      targetProduct2.remove();
    }
  });
};

const productDeletePop = () => {
  trashBtn.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      let targetProduct = null;
      targetProduct = el.closest('.c-checkout-step02');
      productDelete(targetProduct);
    });
  });
};

productDeletePop();
