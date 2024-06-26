import { beforeLaunch } from '../../assets/js/common/utils.js';
import popUp from '../../assets/js/common/popUp.js';

function init() {
  const component = document.querySelectorAll('.ST0021');
  if (beforeLaunch(component)) return false;
  const popupCont = document.querySelectorAll('.ST0021 .js-open-popup');
  if (beforeLaunch(popupCont)) return false;
  popUp(popupCont);
}
init();
