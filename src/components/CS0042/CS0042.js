// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import { isRTL } from '../../assets/js/common/constant.js';
import share from '../../assets/js/common/share.js';

const toggleFilter = function (event) {
  const filterContainer = event.target.closest('.c-map-search');
  if (filterContainer.classList.contains('is-hide')) {
    // collapse
    filterContainer.classList.remove('is-hide');
    this.setAttribute('aria-expanded', 'false');
  } else {
    // expand
    filterContainer.classList.add('is-hide');
    this.setAttribute('aria-expanded', 'true');
  }
};

const toggleBrand = function (event) {
  const filterContainer = event.target.closest('.c-brand-detail__product');
  if (filterContainer.classList.contains('is-active')) {
    // collapse
    filterContainer.classList.remove('is-active');
    this.setAttribute('aria-expanded', 'false');
  } else {
    // expand
    filterContainer.classList.add('is-active');
    this.setAttribute('aria-expanded', 'true');
  }
};

const setCategorySelectDisabled = function (event) {
  const $this = event.target;
  const selected = $this.options[$this.selectedIndex].value;
  const city = $this.closest('.c-search-box__form').querySelector('.c-search-box__category');

  if (selected === '') {
    city.setAttribute('disabled', 'disabled');
  } else {
    city.removeAttribute('disabled');
  }
};

const printEvent = event => {
  event.preventDefault();
  const printBtn = event.currentTarget;
  const component = printBtn.closest('.container');
  const cssURLs = printBtn.dataset.cssUrl.split(',');

  let cssHtml = '';
  cssURLs.forEach(url => {
    cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
  });
  const newWin = window.open('', '_blank');
  newWin.document.writeln(
    // eslint-disable-next-line max-len
    `<html dir=${isRTL}><head>${cssHtml}</head><body><div class="c-wrapper CS0042"><div class="container">${component.innerHTML}</div></div></body></html>`
  );
  newWin.document.querySelector('.c-print-area').remove();
  newWin.focus();
  setTimeout(() => {
    newWin.print();
    newWin.close();
  }, 100);
};

// component
function init() {
  const component = document.querySelectorAll('.CS0042');
  if (beforeLaunch(component)) return false;

  component.forEach(el => {
    // Finder Map Toggle Button
    const btnCollapse = el.querySelectorAll('.c-map-search__toggle');
    btnCollapse.forEach(target => {
      target.addEventListener('click', toggleFilter);
    });

    // Brand Detail Product Toggle Button
    const btnBrandToggle = el.querySelectorAll('.c-brand-detail__product-toggle');
    btnBrandToggle.forEach(target => {
      target.addEventListener('click', toggleBrand);
    });

    // Set Category Select box disabled
    const searchSelectSuperCate = el.querySelectorAll('.c-search-box__super-category');
    searchSelectSuperCate.forEach(target => {
      target.addEventListener('change', setCategorySelectDisabled);
    });

    // Case4 print button event
    const printBtn = el.querySelectorAll('.c-print');
    if (printBtn) {
      printBtn.forEach(btn => {
        btn.addEventListener('click', printEvent);
      });
    }

    if (!el.querySelector('.c-tooltip')) return false;
    if (!el.querySelector('.c-sns-share')) return false;
    const shareObj = el.querySelector('.c-sns-share');
    const configElem = document.querySelector('[data-component-config="snsShare"]');
    const config = getComponentConfigFromElem(configElem);
    if (!config) return false;
    share(shareObj, config);
  });
}
init();
// export default

// validation

// const nextButton = document.querySelector('.c-btn-search02');
// const validationCheckProduct = function () {
//     const productValid = document.querySelector('.c-product-valid');
//     const productRequired = document.querySelector('.c-product-required');
//     // const productInvalid = document.querySelector('.c-product-invalid');

//     nextButton.addEventListener('click', e => {
//         e.preventDefault();
//         // product Validation
//         if (productValid.value === 'Choose a product') {
//             productValid.focus();
//             productValid.classList.add('c-error');
//             // productInvalid.style.display = 'none';
//             productRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             productValid.focus();
//             productValid.classList.add('c-error');
//             // productInvalid.style.display = 'block';
//             productRequired.style.display = 'none';
//             return false;
//         }
//     });
// };
// validationCheckProduct();
// const validationCheckAddress = function () {
//     const addressValid = document.querySelector('.c-address-valid');
//     const addressRequired = document.querySelector('.c-address-required');
//     // const addressInvalid = document.querySelector('.c-address-invalid');

//     nextButton.addEventListener('click', e => {
//         e.preventDefault();
//         // address Validation
//         if (addressValid.value === '') {
//             addressValid.focus();
//             addressValid.classList.add('c-error');
//             // addressInvalid.style.display = 'none';
//             addressRequired.style.display = 'block';
//             return false;
//             // eslint-disable-next-line no-else-return
//         } else {
//             addressValid.focus();
//             addressValid.classList.add('c-error');
//             // addressInvalid.style.display = 'block';
//             addressRequired.style.display = 'none';
//             return false;
//         }
//     });
// };
// validationCheckAddress();
const moreBtn = function () {
  const btnMore = document.querySelectorAll('.c-list-more .cmp-button');
  for (let index = 0; index < btnMore.length; index++) {
    btnMore[index].addEventListener('click', e => {
      const listWrap = e.target.parentNode.parentNode.parentNode.querySelector('.c-find-service-center__info-list');
      listWrap.classList.toggle('is-open');
    });
  }
};
moreBtn();

function selectDisabledNone() {
  const component = document.querySelectorAll('.c-form__step1 select');
  component.forEach((el, index) => {
    // eslint-disable-next-line no-param-reassign
    el.addEventListener('click', e => {
      // console.log(index);
      if (index < 3) {
        if (e.target.selectedIndex > 0) {
          const selectLength = e.target.parentNode.parentNode.children[index + 1];
          if (selectLength.children[0].hasAttribute('disabled')) {
            selectLength.children[0].removeAttribute('disabled');
          }
        }
      } else if (e.target.selectedIndex > 0) {
        const index2 = index % 3;
        if (index2 < 2) {
          const selectLength = e.target.parentNode.parentNode.children[index2 + 1];
          if (selectLength.children[0].hasAttribute('disabled')) {
            selectLength.children[0].removeAttribute('disabled');
          }
        }
      }
    });
  });
}
selectDisabledNone();

function selectOptionCont() {
  const component = document.querySelectorAll('#searchby');
  component.forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.addEventListener('click', e => {
      const num = e.target.selectedIndex;
      if (num > 0) {
        const searchByCont = e.target.parentNode.parentNode.parentNode.nextElementSibling;
        // eslint-disable-next-line no-shadow
        for (let index = 0; index < searchByCont.children.length; index++) {
          // searchByCont.children[index].removeAttribute('style');
          searchByCont.children[index].classList.remove('is-open');
        }
        searchByCont.children[num - 1].classList.add('is-open');
        // searchByCont.children[num - 1].setAttribute('style', 'display:flex');
      }
    });
  });
}
selectOptionCont();

function suggestRoutSelect() {
  const component = document.querySelectorAll('.c-select-route label');
  const suggestRoutInfo = document.querySelector('.c-form-info-list');
  const publicTransportationInfo = document.querySelector('.c-public-transportation-info ');
  component.forEach((el, index) => {
    el.addEventListener('click', () => {
      if (index === 0) {
        suggestRoutInfo.classList.add('is-active');
        publicTransportationInfo.classList.remove('is-active');
      } else if (index === 1) {
        suggestRoutInfo.classList.add('is-active');
        publicTransportationInfo.classList.add('is-active');
      } else if (index === 2) {
        suggestRoutInfo.classList.remove('is-active');
        publicTransportationInfo.classList.remove('is-active');
      }
    });
  });
}
suggestRoutSelect();

// const submitButton = document.querySelectorAll('.c-btn-search');
// const textareaRequiredCheck = () => {
//     for (let index = 0; index < submitButton.length; index++) {
//         submitButton[index].addEventListener('click', e => {
//             e.stopPropagation();
//             const countInputs = submitButton[index].closest('.c-search-box').querySelectorAll('select');
//             console.log(countInputs);
//             countInputs.forEach(el => {
//                 const RequiredMsg = el.closest('.cmp-form').querySelector('.c-warning');

//                 // if (el.value === '') {
//                 //     el.classList.add('c-error');
//                 //     RequiredMsg.style.display = 'block';
//                 //     el.focus();
//                 //     return false;
//                 //     // eslint-disable-next-line no-else-return
//                 // } else {
//                 //     RequiredMsg.style.display = 'none';
//                 //     el.classList.remove('c-error');
//                 // }
//             });
//         });
//     }
// };
// textareaRequiredCheck();
