// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import { keyboard } from '../../assets/js/common/constant.js';
import share from '../../assets/js/common/share.js';

// component
function init() {
  const component = document.querySelectorAll('.PD0012');
  if (beforeLaunch(component)) return false;
  const keyEvent = function () {
    const keyupEvent = function (event) {
      const key = event.keyCode;
      if (key === keyboard.esc) {
        component.forEach(c => {
          const control = c.querySelector('.js-video-pause');
          if (control) {
            control.click();
          }
        });
      }
    };
    document.addEventListener('keyup', keyupEvent);
  };
  keyEvent();

  // share
  const shareObj = document.querySelector('.c-tooltip__share');
  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);
  if (config && shareObj) {
    share(shareObj, config);
  }
}
init();
// export default
