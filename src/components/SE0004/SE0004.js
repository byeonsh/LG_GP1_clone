// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelector('.SE0004');
  if (beforeLaunch(component)) return false;
}
init();
// export default
