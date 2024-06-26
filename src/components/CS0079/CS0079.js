import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import swiper from '../../assets/js/vendors/swiper.js';

const dateSetting = function () {
  const monthControl = document.querySelectorAll('input[type="date"]');
  monthControl.forEach(el => {
    const theElement = el;
    theElement.value = new Date().toISOString().slice(0, 10);
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
  const swiperFraction2 = el.parentElement.querySelector('.CS0079 .type-card__slide .c-carousel__pagination');
  const nextButton = el.parentElement.querySelector('.js-carousel-next');
  const prevButton = el.parentElement.querySelector('.js-carousel-prev');
  let selectSlide = '';
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
        spaceBetween: 12,
        pagination: {
          enabled: true,
        },
        preventClicks: false,
        loopFillGroupWithBlank: true,
      },
    },
    on: {
      click: index => {
        console.log(selectSlide);
        if (index.clickedIndex !== selectSlide) {
          index.slides.forEach(slide => {
            slide.classList.remove('custom-active');
          });
        }
        index.clickedSlide.classList.toggle('custom-active');

        selectSlide = index.clickedIndex;
      },
    },
  });
};

function init4() {
  const component = document.querySelectorAll('.CS0079');
  if (beforeLaunch(component)) return false;
  const viewedProductCarousel = document.querySelectorAll('.CS0079 .type-card__slide .swiper');
  if (beforeLaunch(viewedProductCarousel)) return false;

  // initialize carousel
  viewedProductCarousel.forEach(el => {
    console.log(el);
    const itemCount = el.querySelectorAll('.type-card__slide .swiper-slide:not(.emptyCard)').length;
    console.log(itemCount);
    const cardMoreBtn = el.querySelectorAll('.type-card__slide .c-viewMore-btn');
    console.log(cardMoreBtn);
    const handler = el.querySelector('.c-carousel__handler');
    // running to async 1st, 2nd carousel.
    // if (index > 3) {
    //     const chanceStackEmpty = 0;
    //     setTimeout(() => swiperInit2(el), chanceStackEmpty);
    // }
    // if (itemCount <= 3) {
    //     cardMoreBtn.classList.add('hidden');
    // }
    if (itemCount <= 3) {
      cardMoreBtn.forEach(items => {
        items.classList.add('hidden');
      });
    }
    if (itemCount < 2) {
      handler.classList.add('hidden');
      el.classList.add('noEmptyCard');
    }
    swiperInit2(el);
  });
}

init4();

// When inserting a component
const reselectClose = function () {
  const component = document.querySelectorAll('.CS0079');
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

const clickRoleGroup = function () {
  // const clickDiv = document.querySelectorAll('.cmp-carousel__item');
  const clickDiv = document.querySelectorAll(
    '.type-card__slide--select .cmp-carousel__item, .type-card__slide--multiselect .cmp-carousel__item'
  );
  clickDiv.forEach(function (i) {
    i.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        this.classList.toggle('custom-active');
      }
    });
  });
};
clickRoleGroup();

// const validationCheckNonLogin = function () {
//     // eslint-disable-next-line no-shadow
//     const nonLoginNextSubmit = document.querySelector('.c-non-login-submit');
//     const purchaseDateValid = document.querySelector('.c-non-login-purchaseDate-valid');
//     const purchaseDateRequired = document.querySelector('.c-non-login-purchaseDate-required');

//     nonLoginNextSubmit.addEventListener('click', e => {
//         // Purchase Date Validation
//         if (purchaseDateValid.value === '') {
//             purchaseDateValid.focus();
//             purchaseDateValid.classList.add('c-error');
//             purchaseDateRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             purchaseDateValid.classList.remove('c-error');
//             purchaseDateRequired.style.display = 'none';
//         }
//     });
// };
// validationCheckNonLogin();

// const validationCheckLogin = function () {
//     // eslint-disable-next-line no-shadow
//     const loginNextSubmit = document.querySelector('.c-login-submit');
//     const purchaseDateValid = document.querySelector('.c-login-purchaseDate-valid');
//     const purchaseDateRequired = document.querySelector('.c-login-purchaseDate-required');

//     loginNextSubmit.addEventListener('click', e => {
//         // Purchase Date Validation
//         if (purchaseDateValid.value === '') {
//             purchaseDateValid.focus();
//             purchaseDateValid.classList.add('c-error');
//             purchaseDateRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             purchaseDateValid.classList.remove('c-error');
//             purchaseDateRequired.style.display = 'none';
//         }
//     });
// };
// validationCheckLogin();
const validationCheck = function () {
  const registerSubmit = document.querySelectorAll('.c-submit');
  registerSubmit.forEach(submit => {
    submit.addEventListener('click', e => {
      console.log(submit);
      e.preventDefault();
      const warrantyValid = submit.closest('.c-accordion__body').querySelector('.c-responsavel-valid');
      const countInputs = submit.closest('.c-accordion__body').querySelector('.c-non-login-purchaseDate-valid');
      console.log(countInputs);
      const RequiredMsg1 = countInputs.closest('.cmp-form').querySelector('.c-warning');
      const RequiredMsg = warrantyValid.closest('.cmp-form').querySelector('.c-warning');
      if (countInputs.value === '') {
        console.log(RequiredMsg1);
        countInputs.classList.add('c-error');
        console.log(RequiredMsg1);

        RequiredMsg1.style.display = 'block';
        countInputs.focus();
        // eslint-disable-next-line no-else-return
      } else if (RequiredMsg1 === null) {
        countInputs.focus();
        countInputs.classList.remove('c-error');
      } else {
        RequiredMsg1.style.display = 'none';
        countInputs.classList.remove('c-error');
      }

      if (warrantyValid.value === 'Warranty type') {
        warrantyValid.classList.add('c-error');
        RequiredMsg.style.display = 'block';
        warrantyValid.focus();
        // eslint-disable-next-line no-else-return
      } else if (RequiredMsg === null) {
        warrantyValid.focus();
        warrantyValid.classList.remove('c-error');
      } else {
        RequiredMsg.style.display = 'none';
        warrantyValid.classList.remove('c-error');
      }
    });
  });
};
validationCheck();

// 20230321
const hoverImg = function () {
  const iconImgNormal = document.querySelectorAll('.CS0079 .c-prd-grid > div');
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
    // const searchLayer = document.querySelector('.searchLayer');
    input.forEach(el => {
      el.addEventListener('click', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
            // searchLayer.classList.remove('c-display');
          }
        });
      });
      el.addEventListener('keyup', () => {
        buttonDelete.forEach(el2 => {
          el2.classList.add('c-button-delete--active');
          if (el.value.length === 0) {
            el2.classList.remove('c-button-delete--active');
            // searchLayer.classList.remove('c-display');
          }
        });
      });
    });
  },
  // layerOpen() {
  //     const searchLayer = document.querySelector('.searchLayer');
  //     const searchBtn = document.querySelector('.searchBar__form .fieldIcons__before');
  //     searchBtn.addEventListener('click', function () {
  //         searchLayer.classList.add('c-display');
  //     });
  // },
  // layerClose() {
  //     const searchLayer = document.querySelector('.searchLayer');
  //     const cancelBtn = searchLayer.querySelector('.c-cancel');
  //     cancelBtn.addEventListener('click', function () {
  //         searchLayer.classList.remove('c-display');
  //     });
  // },
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
    // inputEvent.layerOpen();
    // inputEvent.layerClose();
    // inputEvent.inputTxt();
  },
};

inputEvent.init();

/*
const submitButton = document.querySelector('.c-btn-next');

const validationCheck03 = function () {
    const regCaptchaValid = document.querySelector('.c-warranty-valid');
    const regCaptchaRequired = document.querySelector('.c-warranty-required');
    // const regCaptchaIncorrect = document.querySelector('.c-warranty-incorrect');

    submitButton.addEventListener('click', e => {
        e.preventDefault();

        // Captcha Area
        if (regCaptchaValid.value === 'Warranty type') {
            regCaptchaRequired.style.display = 'block';
            // regCaptchaIncorrect.style.display = 'none';
            regCaptchaValid.classList.add('c-error');
            regCaptchaValid.focus();
            return false;
            // eslint-disable-next-line no-else-return
        } else {
            regCaptchaRequired.style.display = 'none';
            // regCaptchaIncorrect.style.display = 'none';
            regCaptchaValid.classList.remove('c-error');
        }
    });
};
validationCheck03();

const validationCheck02 = function () {
    const regCaptchaValid = document.querySelector('.c-non-login-purchaseDate-valid');
    const regCaptchaRequired = document.querySelector('.c-non-login-purchaseDate-required');
    // const regCaptchaIncorrect = document.querySelector('.c-warranty-incorrect');

    submitButton.addEventListener('click', e => {
        e.preventDefault();

        // Captcha Area
        if (regCaptchaValid.value === '') {
            regCaptchaRequired.style.display = 'block';
            // regCaptchaIncorrect.style.display = 'none';
            regCaptchaValid.classList.add('c-error');
            regCaptchaValid.focus();
            return false;
            // eslint-disable-next-line no-else-return
        } else {
            regCaptchaRequired.style.display = 'none';
            // regCaptchaIncorrect.style.display = 'none';
            regCaptchaValid.classList.remove('c-error');
        }
    });
};
validationCheck02();
*/
