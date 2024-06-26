import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelectorAll('.ST0061');
  if (beforeLaunch(component)) return false;
}
init();
// export default
