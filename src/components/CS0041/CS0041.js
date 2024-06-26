// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

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

// component
function init() {
  const component = document.querySelectorAll('.CS0041');
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
  });
}
init();
// export default
// validation

// const nextButton = document.querySelector('.c-btn-search');

// const nextBtn01 = function () {
//     const validationCheck = function () {
//         const modelNumberValid = document.querySelector('.c-search-valid');
//         const modelNumberRequired = document.querySelector('.c-search-required');
//         // const modelNumberInvalid = document.querySelector('.c-modelNumber-invalid');

//         nextButton.addEventListener('click', e => {
//             e.preventDefault();
//             // ModelNumber Validation
//             if (modelNumberValid.value === '') {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 // modelNumberInvalid.style.display = 'none';
//                 modelNumberRequired.style.display = 'block';
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else {
//                 modelNumberValid.focus();
//                 modelNumberValid.classList.add('c-error');
//                 // modelNumberInvalid.style.display = 'block';
//                 modelNumberRequired.style.display = 'none';
//                 return false;
//             }
//         });
//     };
//     validationCheck();
// };
// nextBtn01();
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
