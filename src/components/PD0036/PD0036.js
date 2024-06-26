// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

const toggleFilter = function (event) {
  const btn = event.target;
  const component = btn.closest('.PD0036');
  const filterContainer = component.querySelector('.c-find-a-dealer-body');
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

// component
function init() {
  const component = document.querySelectorAll('.PD0036');
  if (beforeLaunch(component)) return false;
  component.forEach(el => {
    const btnCollapse = el.querySelector('.c-find-a-dealer-information__toggle');
    btnCollapse.addEventListener('click', toggleFilter);
  });
}
init();
// export default
