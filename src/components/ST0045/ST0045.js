import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import share from '../../assets/js/common/share.js';

// init
function init() {
  const component = document.querySelectorAll('.ST0045');
  if (beforeLaunch(component)) return false;
  if (!document.querySelector('.c-tooltip')) return false;
  if (!document.querySelector('.c-sns-share') && !document.getElementById('modal_help_library')) return false;
  const shareObj = document.querySelector('.c-sns-share');
  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);
  if (!config) return false;
  share(shareObj, config);
}
init();
