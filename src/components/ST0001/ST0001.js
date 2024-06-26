import { beforeLaunch, promotionDateChecker } from '../../assets/js/common/utils.js';

// init
function init() {
  const component = document.querySelectorAll('.ST0001');
  if (beforeLaunch(component)) return false;

  // carousel
  component.forEach(c => promotionDateChecker(c));
}

init();
