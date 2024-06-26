import { beforeLaunch } from '../../assets/js/common/utils.js';

// init
function init() {
  const component = document.querySelectorAll('.BU0001');
  if (beforeLaunch(component)) return false;
}

init();
