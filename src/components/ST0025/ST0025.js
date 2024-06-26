// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelectorAll('.ST0025');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}
init();
// export default
