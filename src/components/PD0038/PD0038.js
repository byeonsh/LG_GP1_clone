// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import specs from '../../assets/js/common/specs.js';

// component
function init() {
  const component = document.querySelectorAll('.PD0038');
  if (beforeLaunch(component)) return false;

  component.forEach(c => {
    specs.sticky(c);
    specs.compareScroll(c);
    specs.allSpecDisclosure(c);
    specs.changeText(c);
  });
}
init();
// export default
