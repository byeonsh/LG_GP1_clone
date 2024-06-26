import { beforeLaunch } from '../../assets/js/common/utils.js';

const toggleTable = function (event) {
  const btn = event.currentTarget;
  const container = btn.closest('.component');
  if (container.classList.contains('folded')) {
    // expand
    container.classList.remove('folded');
  } else {
    // collapse
    container.classList.add('folded');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.ST0024');
  if (beforeLaunch(component)) return false;
  component.forEach(el => {
    const btnCollapse = el.querySelector('.c-cta button');
    btnCollapse.addEventListener('click', toggleTable);
  });
}

init();
