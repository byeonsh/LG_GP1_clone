// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelectorAll('.AL0009 .component');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}
init();
// export default
