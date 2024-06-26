import { beforeLaunch } from '../../assets/js/common/utils.js';

// init
function init() {
  const component = document.querySelectorAll('.CM0009');
  if (beforeLaunch(component)) return false;
}

init();
