import media from './assets/js/common/media.js';
import countDown from './assets/js/common/countdown.js';
import specInfo from './assets/js/common/specInfo.js';
import { beforeLaunch, debugMarkup, zoomWCA, deviceCheck, observerIMG } from './assets/js/common/utils.js';
import { productListSwiper, toggleCompare, toggleTooltip, listBoxObserver } from './assets/js/common/productList.js';
import tabs from './assets/js/common/tabs.js';
import tooltip from './assets/js/common/tooltip.js';
import {
  multiRange,
  changeSelect,
  settingFormWithCountingEl,
  formsToggle,
  inputClear,
} from './assets/js/common/forms.js';
import { filter } from './assets/js/common/filter.js';
import { initPopMsg, popMsg, clipboardCopy, specTabs, inLayerInit } from './assets/js/common/popMsg.js';
import tabScroll from './assets/js/common/tabScroll.js';
import { summaryGallery } from './assets/js/common/summary-gallery.js';
import { recommendedProductCarousel } from './assets/js/common/recommended-products.js';
import { similarProductCarousel } from './assets/js/common/similar-products.js';
// import { popMsg, clipboardCopy } from './assets/js/common/popMsg.js';
import { controlStickyTop } from './assets/js/common/controlStickyTop.js';
import calendarPop from './assets/js/common/calendar.js';
import watchSticky from './assets/js/common/watchSticky.js';
import toastDelete from './assets/js/common/toast.js';
// import togglePassword from './assets/js/common/togglePassword.js';
import myComponent from './assets/js/common/myComponent.js';
import { printPopUp } from './assets/js/common/popUp.js';
// model name copy
import modelNameCopy from './assets/js/common/modelNameCopy.js';
import specs from './assets/js/common/specs.js';

function init() {
  const agent = navigator.userAgent.toLowerCase();
  const isIE = (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || agent.indexOf('msie') != -1;
  if (isIE) {
    // if ie
    popMsg('popBrowserNotSupported', false);
  }
  deviceCheck();
  media();
  countDown();
  specInfo();
  debugMarkup();
  productListSwiper(document.querySelectorAll('.js-product-list .swiper'));
  toggleCompare();
  toggleTooltip();
  listBoxObserver();
  tabs();
  tooltip(document.querySelectorAll('.c-tooltip'));
  multiRange();
  formsToggle();
  inputClear();
  filter();
  initPopMsg(document.querySelectorAll('.js-pop-open'));
  settingFormWithCountingEl();
  tabScroll(document.querySelectorAll('.js-tab-scroll'));
  summaryGallery();
  recommendedProductCarousel();
  similarProductCarousel();
  controlStickyTop();
  changeSelect();
  calendarPop();
  watchSticky();
  toastDelete();
  // togglePassword();
  clipboardCopy();
  specTabs();
  myComponent();
  printPopUp();
  zoomWCA();
  modelNameCopy();
  specs.changeText(document.querySelectorAll('.c-pop-msg'));
  window.modelNameCopy = modelNameCopy;
  observerIMG();
  inLayerInit(document.querySelectorAll('.js-inLayer-btn'));
}

init();
