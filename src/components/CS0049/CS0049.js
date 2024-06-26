import swiper from '../../assets/js/vendors/swiper.js';

const dateSetting = function () {
  const monthControl = document.querySelectorAll('input[type="date"]');
  monthControl.forEach(function (el) {
    const theElement = el;
    theElement.value = new Date().toISOString().slice(0, 10);
    const gnb = document.querySelector('.c-gnb__navi-wrap');
    if (theElement) {
      if (gnb) {
        gnb.addEventListener('mouseenter', function () {
          document.getElementById('purchaseDate').blur();
        });
      }
    }
  });
};
dateSetting();

// eslint-disable-next-line new-cap, no-unused-vars
const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 3,
});

// When inserting a component
const reselectClose = function () {
  const component = document.querySelectorAll('.CS0049');
  component.forEach(comp => {
    const reselectCloseBtn = comp.querySelectorAll('.c-selected-model .c-btn-close');

    if (reselectCloseBtn) {
      reselectCloseBtn.forEach(el => {
        el.addEventListener('click', () => {
          const selectModelNum = el.closest('.c-selected-model');
          const reselectBreadcrumb = el.parentElement.previousElementSibling;
          selectModelNum.classList.add('hide');
          if (reselectBreadcrumb) {
            reselectBreadcrumb.classList.add('hide');
          }
        });
      });
    }
  });
};
reselectClose();

const hoverImg = function () {
  const iconImgNormal = document.querySelectorAll('.CS0049 .c-prd-grid > div');
  iconImgNormal.forEach(item => {
    const norIcon = item.querySelector('img');
    const norIconAttr = norIcon.getAttribute('src');
    const hoverIcon = norIconAttr.replace('_normal', '_active');
    item.addEventListener('mouseover', function () {
      norIcon.setAttribute('src', hoverIcon);
      item.classList.add('hover');
    });
    item.addEventListener('mouseout', function () {
      norIcon.setAttribute('src', norIconAttr);
      item.classList.remove('hover');
    });
  });
};
hoverImg();

// form validation
const beforeCategorySubmit = function () {
  const beforeSubmit = document.querySelector('.c-beforeCategory-submit');
  const beforeModelNumberValid = document.querySelector('.c-before-modelNumber-valid');
  const beforeModelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
  const beforeModelNumberRequired = document.querySelector('.c-before-modelNumber-required');
  const beforeModelNumberInvalid = document.querySelector('.c-before-modelNumber-invalid');
  const beforeSerialNumberValid = document.querySelector('.c-before-serialNumber-valid');
  const beforeSerialNumberRegex = /^[a-zA-Z0-9]{15}$/; // English + Number == 15
  const beforeSerialNumberRequired = document.querySelector('.c-before-serialNumber-required');
  const beforeSerialNumberInvalid = document.querySelector('.c-before-serialNumber-invalid');
  const beforePurchaseDateValid = document.querySelector('.c-before-purchaseDate-valid');
  const beforePurchaseDateRequired = document.querySelector('.c-before-purchaseDate-required');
  const beforePlacePurchaseValid = document.querySelector('.c-before-placePurchase-valid');
  const beforePlacePurchaseRequired = document.querySelector('.c-before-placePurchase-required');

  beforeSubmit.addEventListener('click', () => {
    // Before Model Number
    if (beforeModelNumberValid.value === '') {
      beforeModelNumberValid.focus();
      beforeModelNumberValid.classList.add('c-error');
      beforeModelNumberRequired.style.display = 'block';
      beforeModelNumberInvalid.style.display = 'none';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (beforeModelNumberValid.value.match(beforeModelNumberRegex)) {
      beforeModelNumberValid.classList.remove('c-error');
      beforeModelNumberRequired.style.display = 'none';
      beforeModelNumberInvalid.style.display = 'none';
    } else {
      beforeModelNumberValid.focus();
      beforeModelNumberValid.classList.add('c-error');
      beforeModelNumberRequired.style.display = 'none';
      beforeModelNumberInvalid.style.display = 'block';
      return false;
    }
    // Before Serial Number
    if (beforeSerialNumberValid.value === '') {
      beforeSerialNumberValid.focus();
      beforeSerialNumberValid.classList.add('c-error');
      beforeSerialNumberRequired.style.display = 'block';
      beforeSerialNumberInvalid.style.display = 'none';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (beforeSerialNumberValid.value.match(beforeSerialNumberRegex)) {
      beforeSerialNumberValid.classList.remove('c-error');
      beforeSerialNumberRequired.style.display = 'none';
      beforeSerialNumberInvalid.style.display = 'none';
    } else {
      beforeSerialNumberValid.focus();
      beforeSerialNumberValid.classList.add('c-error');
      beforeSerialNumberRequired.style.display = 'none';
      beforeSerialNumberInvalid.style.display = 'block';
      return false;
    }
    // Before Purchase Date
    if (beforePurchaseDateValid.value === '') {
      beforePurchaseDateValid.focus();
      beforePurchaseDateValid.classList.add('c-error');
      beforePurchaseDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      beforePurchaseDateValid.classList.remove('c-error');
      beforePurchaseDateRequired.style.display = 'none';
    }
    // Before Place of Purchase
    if (beforePlacePurchaseValid.value === '') {
      beforePlacePurchaseValid.focus();
      beforePlacePurchaseValid.classList.add('c-error');
      beforePlacePurchaseRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      beforePlacePurchaseValid.classList.remove('c-error');
      beforePlacePurchaseRequired.style.display = 'none';
    }
  });
};
beforeCategorySubmit();

const afterCategorySubmit = function () {
  const afterSubmit = document.querySelector('.c-afterCategory-submit');
  const afterModelNumberValid = document.querySelector('.c-after-modelNumber-valid');
  const afterModelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
  const afterModelNumberRequired = document.querySelector('.c-after-modelNumber-required');
  const afterModelNumberInvalid = document.querySelector('.c-after-modelNumber-invalid');
  const afterSerialNumberValid = document.querySelector('.c-after-serialNumber-valid');
  const afterSerialNumberRegex = /^[a-zA-Z0-9]{15}$/; // English + Number == 15
  const afterSerialNumberRequired = document.querySelector('.c-after-serialNumber-required');
  const afterSerialNumberInvalid = document.querySelector('.c-after-serialNumber-invalid');
  const afterPurchaseDateValid = document.querySelector('.c-after-purchaseDate-valid');
  const afterPurchaseDateRequired = document.querySelector('.c-after-purchaseDate-required');
  const afterPlacePurchaseValid = document.querySelector('.c-after-placePurchase-valid');
  const afterPlacePurchaseRequired = document.querySelector('.c-after-placePurchase-required');

  afterSubmit.addEventListener('click', () => {
    // After Model Number
    if (afterModelNumberValid.value === '') {
      afterModelNumberValid.focus();
      afterModelNumberValid.classList.add('c-error');
      afterModelNumberRequired.style.display = 'block';
      afterModelNumberInvalid.style.display = 'none';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (afterModelNumberValid.value.match(afterModelNumberRegex)) {
      afterModelNumberValid.classList.remove('c-error');
      afterModelNumberRequired.style.display = 'none';
      afterModelNumberInvalid.style.display = 'none';
    } else {
      afterModelNumberValid.focus();
      afterModelNumberValid.classList.add('c-error');
      afterModelNumberRequired.style.display = 'none';
      afterModelNumberInvalid.style.display = 'block';
      return false;
    }
    // After Serial Number
    if (afterSerialNumberValid.value === '') {
      afterSerialNumberValid.focus();
      afterSerialNumberValid.classList.add('c-error');
      afterSerialNumberRequired.style.display = 'block';
      afterSerialNumberInvalid.style.display = 'none';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (afterSerialNumberValid.value.match(afterSerialNumberRegex)) {
      afterSerialNumberValid.classList.remove('c-error');
      afterSerialNumberRequired.style.display = 'none';
      afterSerialNumberInvalid.style.display = 'none';
    } else {
      afterSerialNumberValid.focus();
      afterSerialNumberValid.classList.add('c-error');
      afterSerialNumberRequired.style.display = 'none';
      afterSerialNumberInvalid.style.display = 'block';
      return false;
    }
    // After Purchase Date
    if (afterPurchaseDateValid.value === '') {
      afterPurchaseDateValid.focus();
      afterPurchaseDateValid.classList.add('c-error');
      afterPurchaseDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      afterPurchaseDateValid.classList.remove('c-error');
      afterPurchaseDateRequired.style.display = 'none';
    }
    // After Place of Purchase
    if (afterPlacePurchaseValid.value === '') {
      afterPlacePurchaseValid.focus();
      afterPlacePurchaseValid.classList.add('c-error');
      afterPlacePurchaseRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      afterPlacePurchaseValid.classList.remove('c-error');
      afterPlacePurchaseRequired.style.display = 'none';
    }
  });
};
afterCategorySubmit();

// 20230328 add script
const inputEvent = {
  textClear() {
    const buttonDelete = document.querySelectorAll('.c-modelnumber-input__button--delete');
    const input = document.querySelectorAll('.c-modelnumber-input input');
    buttonDelete.forEach(el => {
      el.addEventListener('click', () => {
        input.forEach(el3 => {
          // eslint-disable-next-line no-param-reassign
          el3.value = '';
          el3.focus(); // 20230307
        });
        el.classList.remove('c-modelnumber-input__button--active');
      });
    });
  },
  deleteButtonOn() {
    const buttonDelete = document.querySelectorAll('.c-modelnumber-input__button--delete');
    const input = document.querySelectorAll('.c-modelnumber-input input');
    input.forEach(el => {
      el.addEventListener('click', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-modelnumber-input__button--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-modelnumber-input__button--active');
          }
        });
      });
      el.addEventListener('keyup', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-modelnumber-input__button--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-modelnumber-input__button--active');
          }
        });
      });
    });
  },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
  },
};

inputEvent.init();
