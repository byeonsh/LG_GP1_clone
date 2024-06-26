import { beforeLaunch } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';

function init5() {
  const component = document.querySelectorAll('.CS0047');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}
init5();
