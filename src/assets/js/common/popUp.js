/* eslint-disable max-len */
import { isRTL } from './constant.js';
import { beforeLaunch, getClientlibsStylesheets } from './utils.js';

const popUp = function (anchors) {
  const popUpSet = function ({ url, width, height, left, top }) {
    const name = 'popup';
    const feature = [`width=${width}`, `height=${height}`, `top=${top}`, `left=${left}`, `scrollbars=yes`];
    window.open(url, name, feature.join(','));
    return false;
  };

  const openPopUp = function (anchor) {
    const { href: url = null } = anchor;
    if (url == null) return false;
    const {
      width = 600,
      height = window.screen.height - 100,
      left = window.screen.width * 0.5 - 600 * 0.5,
      top = window.screen.height * 0.5 - 800 * 0.5,
    } = anchor.dataset;
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      popUpSet({ url, width, height, left, top });
    });
  };

  anchors.forEach(anchor => openPopUp(anchor));
};

const printEvent = event => {
  const printBtn = event.currentTarget;
  const root = printBtn.closest('.c-wrapper') || printBtn.closest('.c-pop-msg__contents');
  const cssUrlDataSet = printBtn.dataset.cssUrl;
  // add AEM client-lib css if available else returns ''
  let cssHtml = getClientlibsStylesheets();
  event.preventDefault();
  if (cssUrlDataSet) {
    const cssURLs = cssUrlDataSet.split(',');
    // add url from dataset
    cssURLs.forEach(url => {
      cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
    });
  }

  const newWin = window.open('', '_blank');
  newWin.document.writeln(
    `<html dir=${isRTL}><head>${cssHtml}</head><body><div class="c-wrapper" style="max-width:1440px; margin:auto;">${root.innerHTML}</div></body></html>`
  );

  const printElements = newWin.document.querySelectorAll('.c-print-area');
  if (printElements) {
    printElements.forEach(elem => elem.remove());
  }
  if (root.classList.contains('PD0008')) {
    newWin.document.querySelectorAll('.c-all-specs-area__more').forEach(button => button.remove());
    newWin.document.querySelector('.c-all-specs-area').classList.add('active');
  }
  newWin.document.close();
  newWin.focus();
  setTimeout(function () {
    newWin.print();
  }, 1000);
};

export const usePrintPopUp = function (buttonElement) {
  const trigger = buttonElement;
  const onPrintPop = printEvent;
  return [trigger, onPrintPop];
};
export const printPopUp = function () {
  const printPopOpenButton = document.querySelectorAll('.js-print');
  if (beforeLaunch(printPopOpenButton)) return false;
  printPopOpenButton.forEach(button => {
    const [printBtn, onPrintPop] = usePrintPopUp(button);
    printBtn.addEventListener('click', onPrintPop);
  });
};
export default popUp;
