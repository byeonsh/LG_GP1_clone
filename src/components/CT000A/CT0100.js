// import module
import toastDelete from '../../assets/js/common/toast.js';
import { cartPriceTotal, minusPlusCount } from '../../assets/js/common/cartPriceTotal.js';
import { beforeLaunch, pageScroll } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';
import { keyboard } from '../../assets/js/common/constant.js';
// component

const countProduct = () => {
  const component = document.querySelectorAll('.CT0100');
  component.forEach(el => {
    const productLength = el.querySelectorAll('.buy-count-box.inStock');
    const basketLength = el.querySelector('.my-component__header .buy-basket__text span');
    if (basketLength) {
      basketLength.innerText = productLength.length;
    }
  });
};

const savingEvent = () => {
  if (beforeLaunch(document.querySelector('.questionnaire-list-inCart'))) return false;
  let savingCheack = '';
  const savingStatus = status => {
    savingCheack = status;
  };
  const savingBtn = document.querySelectorAll('.status-btn .js-pop-open');
  const removeCouponPop = document.querySelector('#popRemoveCoupon');
  const removeBtn = removeCouponPop.querySelector('a.cmp-button');
  const savingPop = document.querySelector('#popSaving');
  const continueBtn = savingPop.querySelector('.c-pop-msg__button-wrap .continue');
  const radios = document.querySelectorAll("input[name='terms_checked']");
  const confirmBtn = savingPop.querySelector('.c-pop-msg__button-wrap .confirm');
  // Status checked
  savingBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      savingStatus(e.target.closest('.questionnaire-status').querySelector('.questionnaire-title').getAttribute('id'));
    });
    btn.addEventListener('keydown', e => {
      if (e.keyCode === keyboard.enter || e.keyCode === keyboard.spacebar) {
        savingStatus(
          e.target.closest('.questionnaire-status').querySelector('.questionnaire-title').getAttribute('id')
        );
      }
    });
  });
  // List delete event
  removeBtn.addEventListener('click', e => {
    e.preventDefault();
    removeCouponPop.classList.remove('active');
    pageScroll.able();
    document.getElementById(savingCheack).closest('.questionnaire-status').classList.remove('saving-status');
    document.getElementById(savingCheack).closest('.questionnaire-status').setAttribute('aria-checked', 'false');
    document
      .getElementById(savingCheack)
      .closest('.questionnaire-status')
      .querySelector('.questionnaire-btns .popSaving')
      .focus();
  });
  // Step continueBtn event
  continueBtn.addEventListener('click', e => {
    e.preventDefault();
    continueBtn.classList.add('hidden');
    confirmBtn.classList.remove('hidden');
    savingPop.querySelector('.saving-form-step1').classList.add('hidden');
    savingPop.querySelector('.saving-form-step2').classList.remove('hidden');
    savingPop.querySelector('#saving-step1').classList.remove('step-act');
    savingPop.querySelector('#saving-step1').removeAttribute('aria-current');
    savingPop.querySelector('#saving-step2').classList.add('step-act');
    savingPop.querySelector('#saving-step2').setAttribute('aria-current', 'step');
    savingPop.focus();
  });
  // Terms checked
  radios.forEach(radio => {
    radio.addEventListener('change', e => {
      const current = e.currentTarget;
      if (current.id === 'terms_yes') {
        confirmBtn.disabled = false;
      } else {
        confirmBtn.disabled = true;
      }
    });
  });
  // ConfirmBtn event
  confirmBtn.addEventListener('click', e => {
    e.preventDefault();
    savingPop.classList.remove('active');
    pageScroll.able();
    document.getElementById(savingCheack).closest('.questionnaire-status').classList.add('saving-status');
    document.getElementById(savingCheack).closest('.questionnaire-status').setAttribute('aria-checked', 'true');
    document
      .getElementById(savingCheack)
      .closest('.questionnaire-status')
      .querySelector('.questionnaire-btns .popSavingRemove')
      .focus();
  });
};

function init() {
  cartPriceTotal('.CT0100');
  countProduct();
  const component = document.querySelector('.CT0100');
  if (beforeLaunch(component)) return false;
  accordion.run(component);
  savingEvent();
}

init();

const limitNumber = () => {
  const countInputs = document.querySelectorAll('.CT0100 .buy-count-box__number input');
  countInputs.forEach(el => {
    el.addEventListener('input', item => {
      const targetInput = item.target;
      targetInput.value = item.target.value.replace(/[^0-9]/g, '').substr(0, 4);
    });
  });
};

limitNumber();

const createDeleteMsg = el => {
  el.insertAdjacentHTML(
    'beforeend',
    `<li class="toast-popup__item toast-popup__item--success">
      <div class="toast-popup__container">
        <i class="toast-popup__icon toast-popup__icon--success">
          <span class="sr-only">success</span>
        </i>
        <div class="toast-popup__title font-m-normal-12">
          We've removed the selected item(s) from your basket.
        </div>
      </div>
      <button class="toast-popup__remove" type="button">
        <span class="sr-only">remove</span>
      </button>
    </li>
    `
  );
  const deleteMsgLi = el.querySelector('.toast-popup__item--success');
  const targetUl = el.closest('.toast-popup');
  toastDelete();

  setTimeout(() => {
    deleteMsgLi.style.opacity = 0;
  }, 4500);

  setTimeout(() => {
    deleteMsgLi.remove();
    if (targetUl.querySelectorAll('.toast-popup__item').length === 0) {
      targetUl.remove();
    }
  }, 5000);
};

const isToastUl = el => {
  let targetHeaderMsg = el.closest('.CT0100').querySelector('ul.toast-popup');

  if (el.closest('.CT0100').querySelectorAll('.toast-popup__item--success').length === 0) {
    if (!targetHeaderMsg) {
      el.closest('.CT0100')
        .querySelector('.c-product-price-sticky')
        .insertAdjacentHTML('afterbegin', `<ul class="toast-popup"></ul>`);
      targetHeaderMsg = el.closest('.CT0100').querySelector('ul.toast-popup');
    }
    createDeleteMsg(targetHeaderMsg);
  }
};

const productDeleteToast = () => {
  const deleteBtn = document.querySelectorAll('.CT0100 .c-product-item__input--delete');
  deleteBtn.forEach(el => {
    el.addEventListener('click', () => {
      isToastUl(el);
      const targetProduct = el.closest('.buy-cart-list__item');
      targetProduct.remove();
      countProduct();
    });
  });
};

productDeleteToast();

const productDeleteAll = () => {
  const deleteAllBtn = document.querySelectorAll('.CT0100 .buy-zipcode__ziptxt');

  deleteAllBtn.forEach(el => {
    el.addEventListener('click', () => {
      const targetProductList = el.closest('.buy-summary-area__primary').querySelector('.buy-cart-list');
      if (targetProductList) {
        targetProductList.remove();
        isToastUl(el);
      }
      countProduct();
    });
  });
};

productDeleteAll();

const warrantyRadioChange = () => {
  const radioEl = document.querySelectorAll('.c-addon-product-box--selection .c-sibling-option');
  radioEl.forEach(el => {
    el.querySelector('label').addEventListener('click', e => {
      const targetIpt = e.target.closest('.c-sibling-option').querySelector('.c-sibling-option__input');
      if (targetIpt.checked) {
        targetIpt.checked = false;
      } else {
        targetIpt.checked = true;
      }
    });
  });
};

warrantyRadioChange();

const exchangeDells = () => {
  const changeSelectedDells = document.querySelectorAll('.exchange__item--delete');
  changeSelectedDells.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const exchangeWrapper = el.closest('.exchange-item');
      el.closest('.exchange-item').querySelector('.exchange-toggle-area a').classList.remove('inactive');
      exchangeWrapper.querySelector('.exchange-info').classList.remove('inactive');
      exchangeWrapper.querySelector('.exchange-toggle-area .price-area').classList.add('inactive');
      exchangeWrapper.querySelector('.exchange-product__list').classList.add('inactive');
    });
  });
};

exchangeDells();
minusPlusCount();
