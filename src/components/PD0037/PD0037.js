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

/* export default function setSelectDisabled(event) {
    console.log(event);
    const $this = event.target;
    const selected = $this.options[$this.selectedIndex].value;
    const subCate = $this.parentElement.nextElementSibling.querySelector('select');

    if (selected === '') {
        subCate.setAttribute('disabled', 'disabled');
    } else {
        subCate.removeAttribute('disabled');
    }
} */

/* function setStateSelectDisabled(event) {
    setSelectDisabled(event.target, '.c-search-box__city');
}

function setCitySelectDisabled(event) {
    setSelectDisabled(event.target, '.c-search-box__category-main');
}

function setCategoryMainSelectDisabled(event) {
    setSelectDisabled(event.target, '.c-search-box__category-sub');
} */

// component
function init() {
  const component = document.querySelectorAll('.PD0037');
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

    /* // Set City Select box disabled
        const searchSelectState = el.querySelectorAll('.c-search-box__state');
        searchSelectState.forEach(target => {
            target.addEventListener('change', setStateSelectDisabled);
        });

        // Set City Select box disabled
        const searchSelectCity = el.querySelectorAll('.c-search-box__city');
        searchSelectCity.forEach(target => {
            target.addEventListener('change', setCitySelectDisabled);
        });

        // Set City Select box disabled
        const searchSelectCategoryMain = el.querySelectorAll('.c-search-box__category-main');
        searchSelectCategoryMain.forEach(target => {
            target.addEventListener('change', setCategoryMainSelectDisabled);
        }); */
  });
}
init();
