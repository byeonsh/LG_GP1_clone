import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import swiper from '../../assets/js/vendors/swiper.js';

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

// 카루젤 옵션
const carouselOption2 = {
  pagination: behavior.pagination,
  spaceBetween: 10,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  slidesPerView: 1,
  breakpoints: {
    769: {
      slidesPerGroup: 3,
      spaceBetween: 50,
      pagination: {
        enabled: true,
      },
    },
  },
};

const swiperInit2 = el => {
  const swiperFraction2 = el.parentElement.querySelector('.type-card__slide .c-carousel__pagination');
  const nextButton = el.parentElement.querySelector('.js-carousel-next');
  const prevButton = el.parentElement.querySelector('.js-carousel-prev');
  let activeSlide = '';
  runCarousel(el, {
    ...carouselOption2,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      el: swiperFraction2,
      type: 'fraction',
    },
    breakpoints: {
      // min
      769: {
        slideToClickedSlide: true,
        slidesPerGroup: 3,
        slidesPerView: 3,
        // 20230308 spaceBetween number change
        spaceBetween: 24,
        pagination: {
          enabled: true,
        },
        preventClicks: false,
        loopFillGroupWithBlank: true,
      },
    },
    on: {
      init: () => {
        activeSlide = el.parentElement.querySelector('.swiper-slide-active');
      },
      click: index => {
        if (el.closest('.type-card__slide').classList.contains('type-card__slide--multiselect')) {
          index.clickedSlide.classList.toggle('custom-active');
        } else if (el.closest('.type-card__slide').classList.contains('type-card__slide--select')) {
          activeSlide.classList.remove('custom-active');
          index.clickedSlide.classList.add('custom-active');
          activeSlide = index.clickedSlide;
        }
      },
    },
  });
};

function init2() {
  const component = document.querySelectorAll('.CS0065');
  if (beforeLaunch(component)) return false;
  const viewedProductCarousel = document.querySelectorAll('.CS0065 .type-card__slide .swiper');
  if (beforeLaunch(viewedProductCarousel)) return false;

  // initialize carousel
  viewedProductCarousel.forEach(el => {
    const itemCount = el.querySelectorAll('.type-card__slide .swiper-slide:not(.emptyCard)').length;
    const cardMoreBtn = el.querySelector('.type-card__slide .c-viewMore-btn');
    const handler = el.querySelector('.c-carousel__handler');
    if (itemCount <= 3) {
      cardMoreBtn.classList.add('hidden');
    }
    if (itemCount < 2) {
      handler.classList.add('hidden');
      el.classList.add('noEmptyCard');
    }
    swiperInit2(el);
  });
}

init2();

const hoverImg = function () {
  const iconImgNormal = document.querySelectorAll('.CS0065 .c-prd-grid > div');
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

const reselectClose = function () {
  const component = document.querySelectorAll('.CS0065');
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

// const telephoneNumberCheck = function () {
//     const telephoneCheckbox = document.getElementById('mobileNumberCheck');
//     const mobileInput = document.getElementById('mobilePhone');

//     telephoneCheckbox.addEventListener('click', (e) => {
//         const { checked } = e.target;

//         if (checked) {
//             mobileInput.disabled = true;
//         } else {
//             mobileInput.disabled = false;
//         }
//     });
// };

// telephoneNumberCheck();

// validation
// const validationCheck = function () {
//     const submitButton = document.querySelector('.c-submit');

//     const countryValid = document.querySelector('.c-country-valid');
//     const countryRequired = document.querySelector('.c-country-required');

//     const telephoneValid = document.querySelector('.c-telephone-valid');
//     const telephoneRegex = /^[0-9]{10}$/; // Number == 10
//     const telephoneRequired = document.querySelector('.c-telephone-required');
//     const telephoneIncorrect = document.querySelector('.c-telephone-incorrect');

//     const firstNameValid = document.querySelector('.c-firstName-valid');
//     const firstNameRequired = document.querySelector('.c-firstName-required');

//     const lastNameValid = document.querySelector('.c-lastName-valid');
//     const lastNameRequired = document.querySelector('.c-lastName-required');

//     const emailValid = document.querySelector('.c-email-valid');
//     const emailRegex = /^[a-zA-Z0-9+]+@[a-zA-Z0-9-+]+(?:\.[a-zA-Z0-9-]+)*$/;
//     const emailRequired = document.querySelector('.c-email-required');
//     const emailInvalid = document.querySelector('.c-email-invalid');

//     const confirmEmailValid = document.querySelector('.c-confirmEmail-valid');
//     const confirmEmailRegex = /^[a-zA-Z0-9+]+@[a-zA-Z0-9-+]+(?:\.[a-zA-Z0-9-]+)*$/;
//     const confirmEmailRequired = document.querySelector('.c-confirmEmail-required');
//     const confirmEmailInvalid = document.querySelector('.c-confirmEmail-invalid');
//     const confirmEmailnotmatch = document.querySelector('.c-confirmEmail-notmatch');

//     submitButton.addEventListener('click', e => {
//         e.preventDefault();
//         // country Validation
//         if (countryValid.value === '') {
//             countryValid.focus();
//             countryValid.classList.add('c-error');
//             countryRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             countryValid.classList.remove('c-error');
//             countryRequired.style.display = 'none';
//         }

//         // telephone Validation
//         if (telephoneValid.value === '') {
//             telephoneValid.focus();
//             telephoneValid.classList.add('c-error');
//             telephoneRequired.style.display = 'block';
//             telephoneIncorrect.style.display = 'none';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else if (telephoneValid.value.match(telephoneRegex)) {
//             telephoneValid.classList.remove('c-error');
//             telephoneRequired.style.display = 'none';
//             telephoneIncorrect.style.display = 'none';
//         } else {
//             telephoneValid.focus();
//             telephoneValid.classList.add('c-error');
//             telephoneRequired.style.display = 'none';
//             telephoneIncorrect.style.display = 'block';
//             return false;
//         }

//         // firstName Validation
//         if (firstNameValid.value === '') {
//             firstNameValid.focus();
//             firstNameValid.classList.add('c-error');
//             firstNameRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             firstNameValid.classList.remove('c-error');
//             firstNameRequired.style.display = 'none';
//         }

//         // lastName Validation
//         if (lastNameValid.value === '') {
//             lastNameValid.focus();
//             lastNameValid.classList.add('c-error');
//             lastNameRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             lastNameValid.classList.remove('c-error');
//             lastNameRequired.style.display = 'none';
//         }

//         // CheckEmail - Email
//         if (emailValid.value === '') {
//             emailValid.focus();
//             emailValid.classList.add('c-error');
//             emailRequired.style.display = 'block';
//             emailInvalid.style.display = 'none';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else if (emailValid.value.match(emailRegex)) {
//             emailValid.classList.remove('c-error');
//             emailRequired.style.display = 'none';
//             emailInvalid.style.display = 'none';
//         } else {
//             emailValid.focus();
//             emailValid.classList.add('c-error');
//             emailRequired.style.display = 'none';
//             emailInvalid.style.display = 'block';
//             return false;
//         }

//         // CheckConfirmEmail - comfirmEmail
//         if (confirmEmailValid.value === '') {
//             confirmEmailValid.focus();
//             confirmEmailValid.classList.add('c-error');
//             confirmEmailRequired.style.display = 'block';
//             confirmEmailInvalid.style.display = 'none';
//             confirmEmailnotmatch.style.display = 'none';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else if (!confirmEmailValid.value.match(confirmEmailRegex)) {
//             confirmEmailValid.focus();
//             confirmEmailValid.classList.add('c-error');
//             confirmEmailRequired.style.display = 'none';
//             confirmEmailInvalid.style.display = 'block';
//             confirmEmailnotmatch.style.display = 'none';
//         } else if (emailValid.value !== confirmEmailValid.value) {
//             confirmEmailValid.focus();
//             confirmEmailValid.classList.add('c-error');
//             confirmEmailRequired.style.display = 'none';
//             confirmEmailInvalid.style.display = 'none';
//             confirmEmailnotmatch.style.display = 'block';
//         } else if (confirmEmailValid.value.match(confirmEmailRegex)
//              && emailValid.value === confirmEmailValid.value) {
//             confirmEmailValid.classList.remove('c-error');
//             confirmEmailRequired.style.display = 'none';
//             confirmEmailInvalid.style.display = 'none';
//             confirmEmailnotmatch.style.display = 'none';
//         }
//     });
// };
// validationCheck();

const inputEvent = {
  textClear() {
    const buttonDelete = document.querySelectorAll('.c-button-delete');
    const input = document.querySelectorAll('.textInput__input');
    buttonDelete.forEach(el => {
      el.addEventListener('click', () => {
        input.forEach(el3 => {
          // eslint-disable-next-line no-param-reassign
          el3.value = '';
          el3.focus(); // 20230307
        });
        el.classList.remove('c-button-delete--active');
      });
    });
  },
  deleteButtonOn() {
    const buttonDelete = document.querySelectorAll('.c-button-delete');
    const input = document.querySelectorAll('.textInput__input');
    const searchLayer = document.querySelector('.searchLayer');
    input.forEach(el => {
      el.addEventListener('click', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
            searchLayer.classList.remove('c-display');
          }
        });
      });
      el.addEventListener('keyup', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
            searchLayer.classList.remove('c-display');
          }
        });
      });
    });
  },

  // inputTxt() {
  //     const pInput = document.querySelector('.textInput__input');
  //     const mInput = document.getElementById('textInput__input2');
  //     const searchLayer = document.querySelector('.searchLayer');
  //     const cancelBtn = searchLayer.querySelector('.c-cancel');
  //     pInput.addEventListener('input', function (e) {
  //         let inValue = e.target.value;
  //         if (inValue) {
  //             searchLayer.classList.add('c-display');
  //             mInput.value = inValue;
  //             mInput.focus();
  //         }
  //     });
  //     mInput.addEventListener('input', function (e) {
  //         let inValue = e.target.value;
  //         if (inValue) {
  //             searchLayer.classList.add('c-display');
  //             pInput.value = inValue;
  //             pInput.focus();
  //         }
  //     });
  //     cancelBtn.addEventListener('click', function () {
  //         pInput.value = '';
  //     });
  // },
  init() {
    inputEvent.textClear();
    inputEvent.deleteButtonOn();
    // inputEvent.inputTxt();
  },
};

inputEvent.init();
