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

const addFocusClass = function (event) {
  const boxFinderSearch = event.target.closest('.c-map-search__box-inner');
  boxFinderSearch.classList.add('is-focus');
};
const removeFocusClass = function (event) {
  const boxFinderSearch = event.target.closest('.c-map-search__box-inner');
  boxFinderSearch.classList.remove('is-focus');
};

const setCategorySelectDisabled = function (event) {
  const $this = event.target;
  const selected = $this.options[$this.selectedIndex].value;
  const subCate = $this.closest('.c-search-box__form').querySelector('.c-search-box__sub');

  if (selected === '') {
    subCate.setAttribute('disabled', 'disabled');
  } else {
    subCate.removeAttribute('disabled');
  }
};

// component
function init() {
  const component = document.querySelectorAll('.PD0035');
  if (beforeLaunch(component)) return false;

  component.forEach(el => {
    // Finder Map Toggle Button
    const btnCollapse = el.querySelectorAll('.c-map-search__toggle');
    btnCollapse.forEach(target => {
      target.addEventListener('click', toggleFilter);
    });

    // Finder Search Input
    const inputFinderSearch = el.querySelectorAll('.c-map-search__box-input');
    inputFinderSearch.forEach(target => {
      target.addEventListener('focus', addFocusClass);
      target.addEventListener('blur', removeFocusClass);
    });

    // Set City Select box disabled
    const searchSelectCategory = el.querySelectorAll('.c-search-box__main');
    searchSelectCategory.forEach(target => {
      target.addEventListener('change', setCategorySelectDisabled);
    });
  });
}
init();
