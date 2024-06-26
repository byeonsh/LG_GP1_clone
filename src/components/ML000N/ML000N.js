// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
// component
function init() {
  const component = document.querySelectorAll('.ML000N');
  if (beforeLaunch(component)) return false;
}
init();
// export default
