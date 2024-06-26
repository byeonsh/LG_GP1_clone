import { beforeLaunch } from '../../assets/js/common/utils.js';

// init
function init() {
  const component = document.querySelectorAll('.CM0013');
  if (beforeLaunch(component)) return false;
}

init();
