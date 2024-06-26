import swiper from '../../assets/js/vendors/swiper.js';
// 20230314 add script
// eslint-disable-next-line new-cap, no-unused-vars
const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 4,
});

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

const reselectClose = function () {
  const component = document.querySelectorAll('.CS0072');
  component.forEach(comp => {
    const reselectCloseBtn = comp.querySelectorAll('.c-selected-model-Num .c-btn-close');

    if (reselectCloseBtn) {
      reselectCloseBtn.forEach(el => {
        el.addEventListener('click', () => {
          const selectModelNum = el.closest('.c-selected-model-Num');
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
  const iconImgNormal = document.querySelectorAll('.CS0072 .c-prd-grid > div');
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

// 20230314 modify validation script
// form validation
const beforeSubmit = document.querySelector('.c-beforeCategory-submit');
const today = new Date();
const year = today.getFullYear();
const month = `0${today.getMonth() + 1}`.slice(-2);
const day = `0${today.getDate()}`.slice(-2);
const dateString = `${year}-${month}-${day}`;
const beforeCategorySubmit = function () {
  const beforeModelNumberValid = document.querySelector('.c-before-modelNumber-valid');
  const beforeModelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
  const beforeModelNumberRequired = document.querySelector('.c-before-modelNumber-required');
  const beforeModelNumberInvalid = document.querySelector('.c-before-modelNumber-invalid');

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
  });
};
beforeCategorySubmit();

const beforeCategorySubmit02 = function () {
  const beforeSerialNumberValid = document.querySelector('.c-before-serialNumber-valid');
  const beforeSerialNumberRegex = /^[a-zA-Z0-9]{15}$/; // English + Number == 15
  const beforeSerialNumberRequired = document.querySelector('.c-before-serialNumber-required');
  const beforeSerialNumberInvalid = document.querySelector('.c-before-serialNumber-invalid');

  beforeSubmit.addEventListener('click', () => {
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
  });
};
beforeCategorySubmit02();

const beforeCategorySubmit03 = function () {
  const beforeInstallDateValid = document.querySelector('.c-before-installDate-valid');
  const beforeInstallDateRequired = document.querySelector('.c-before-installDate-required');
  const beforeInstallDateInvalid = document.querySelector('.c-before-installDate-invalid');

  beforeSubmit.addEventListener('click', () => {
    // Before install Date
    if (beforeInstallDateValid.value === dateString) {
      beforeInstallDateValid.focus();
      beforeInstallDateValid.classList.add('c-error');
      beforeInstallDateInvalid.style.display = 'none';
      beforeInstallDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      beforeInstallDateValid.classList.remove('c-error');
      beforeInstallDateInvalid.style.display = 'black';
      beforeInstallDateRequired.style.display = 'none';
    }
  });
};
beforeCategorySubmit03();

const beforeCategorySubmit04 = function () {
  const beforeWarrantyDateValid = document.querySelector('.c-before-warrantyDate-valid');
  const beforeWarrantyDateRequired = document.querySelector('.c-before-warrantyDate-required');
  const beforeWarrantyDateInvalid = document.querySelector('.c-before-warrantyDate-invalid');

  beforeSubmit.addEventListener('click', () => {
    // before warranty expire date Validation
    if (beforeWarrantyDateValid.value === dateString) {
      beforeWarrantyDateValid.focus();
      beforeWarrantyDateValid.classList.add('c-error');
      beforeWarrantyDateInvalid.style.display = 'none';
      beforeWarrantyDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      beforeWarrantyDateValid.classList.remove('c-error');
      beforeWarrantyDateInvalid.style.display = 'black';
      beforeWarrantyDateRequired.style.display = 'none';
    }
  });
};
beforeCategorySubmit04();

// afterCategorySubmit
const afterSubmit = document.querySelector('.c-afterCategory-submit');

const afterCategorySubmit = function () {
  const afterModelNumberValid = document.querySelector('.c-after-modelNumber-valid');
  const afterModelNumberRegex = /^[a-zA-Z0-9]{10}$/; // English + Number == 10
  const afterModelNumberRequired = document.querySelector('.c-after-modelNumber-required');
  const afterModelNumberInvalid = document.querySelector('.c-after-modelNumber-invalid');
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
  });
};
afterCategorySubmit();

const afterCategorySubmit02 = function () {
  const afterSerialNumberValid = document.querySelector('.c-after-serialNumber-valid');
  const afterSerialNumberRegex = /^[a-zA-Z0-9]{15}$/; // English + Number == 15
  const afterSerialNumberRequired = document.querySelector('.c-after-serialNumber-required');
  const afterSerialNumberInvalid = document.querySelector('.c-after-serialNumber-invalid');

  afterSubmit.addEventListener('click', () => {
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
  });
};
afterCategorySubmit02();

const afterCategorySubmit03 = function () {
  const afterInstallDateValid = document.querySelector('.c-after-installDate-valid');
  const afterInstallDateRequired = document.querySelector('.c-after-installDate-required');
  const afterInstallDateInvalid = document.querySelector('.c-after-installDate-invalid');

  afterSubmit.addEventListener('click', () => {
    // after install Date
    if (afterInstallDateValid.value === dateString) {
      afterInstallDateValid.focus();
      afterInstallDateValid.classList.add('c-error');
      afterInstallDateInvalid.style.display = 'none';
      afterInstallDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      afterInstallDateValid.classList.remove('c-error');
      afterInstallDateInvalid.style.display = 'black';
      afterInstallDateRequired.style.display = 'none';
    }
  });
};
afterCategorySubmit03();
const afterCategorySubmit04 = function () {
  const afterWarrantyDateValid = document.querySelector('.c-after-warrantyDate-valid');
  const afterWarrantyDateRequired = document.querySelector('.c-after-warrantyDate-required');
  const afterWarrantyDateInvalid = document.querySelector('.c-after-warrantyDate-invalid');

  afterSubmit.addEventListener('click', () => {
    // after warranty expire date Validation
    if (afterWarrantyDateValid.value === dateString) {
      afterWarrantyDateValid.focus();
      afterWarrantyDateValid.classList.add('c-error');
      afterWarrantyDateInvalid.style.display = 'none';
      afterWarrantyDateRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      afterWarrantyDateValid.classList.remove('c-error');
      afterWarrantyDateInvalid.style.display = 'black';
      afterWarrantyDateRequired.style.display = 'none';
    }
  });
};
afterCategorySubmit04();
