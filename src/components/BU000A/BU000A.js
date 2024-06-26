import { beforeLaunch } from '../../assets/js/common/utils.js';

// init
function init() {
  const component = document.querySelectorAll('.BU000A');
  if (beforeLaunch(component)) return false;
}

init();
