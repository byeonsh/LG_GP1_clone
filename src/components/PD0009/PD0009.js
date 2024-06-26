// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

// init
function init() {
  const component = document.querySelectorAll('.PD0009');
  if (beforeLaunch(component)) return false;
}
init();
