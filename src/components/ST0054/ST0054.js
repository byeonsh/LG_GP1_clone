// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

// init
function init() {
  const carousel = document.querySelectorAll('.ST0054');
  if (beforeLaunch(carousel)) return false;

  const url = window.location.href;
  if (url.indexOf('?tabType=empCookie')) {
    const cookieTab = document.querySelectorAll('.ST0054 .cmp-tabs__tab')[1];
    cookieTab?.click();
  }
}

init();
