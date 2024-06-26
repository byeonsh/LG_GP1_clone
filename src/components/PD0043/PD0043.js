// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

// init
function init() {
  const component = document.querySelectorAll('.PD0043');
  if (beforeLaunch(component)) return false;
}
init();
// export default
