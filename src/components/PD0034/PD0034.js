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

// component
function init() {
  const component = document.querySelectorAll('.PD0034');
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
  });
}
init();
