// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelectorAll('.ML000M .my-infoBox__accordion');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}
init();
// export default
