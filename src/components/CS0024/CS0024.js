// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import { bp, isRTL } from '../../assets/js/common/constant.js';
import share from '../../assets/js/common/share.js';

// rate for WAI
// const ratePoint = function () {
//     console.log('ratePoint');
//     const faceIcon = document.querySelectorAll('.c-rating-star__wrap input');
//     console.log(faceIcon);
//     faceIcon.forEach(el => {
//         const selectedInput = el.getAttribute('checked');
//         console.log(selectedInput);

//         el.addEventListener('click', function () {
//             if(el.checked) {
//                 const test = el.getAttribute('value');
//                 console.log(test);
//             }
//         });
//     });
// };
// ratePoint();

// 20230327 add modal script
function scrollContentHeight(breakpoint) {
  const modalHead = document.querySelector('.c-modal__head');
  const modalHeadHeight = modalHead.offsetHeight;

  const modalTop = document.querySelector('.c-modal__box .c-detail-content__top');
  const modalTopHeight = modalTop.offsetHeight;

  const modalBottom = document.querySelector('.c-modal__box .c-detail-content__bottom');
  const modalBottomHeight = modalBottom.offsetHeight;

  const modalContent = document.querySelector('.c-modal__box .c-detail-content__content');
  const modalContentHeight = modalHeadHeight + modalTopHeight + modalBottomHeight;

  if (breakpoint > bp.mobile) {
    modalContent.style.height = `calc(90vh - ${modalContentHeight}px)`;
  } else {
    modalContent.style.height = 'auto';
  }
}

// 20230309 add modal script
// init
function init() {
  let breakpoint = window.innerWidth;
  scrollContentHeight(breakpoint);

  window.addEventListener('resize', () => {
    breakpoint = window.innerWidth;
    scrollContentHeight(breakpoint);
  });
}

init();

const printEvent = event => {
  console.log(event);
  const printBtn = event.currentTarget;
  const component = printBtn.closest('.c-wrapper');
  // console.log(component)
  const cssURLs = printBtn.dataset.cssUrl.split(',');
  console.log(printBtn);
  console.log(cssURLs);

  let cssHtml = '';
  cssURLs.forEach(url => {
    cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
  });
  const newWin = window.open('', '_blank');
  newWin.document.writeln(
    // eslint-disable-next-line max-len
    `<html dir=${isRTL}><head>${cssHtml}</head><body><div class="c-wrapper CS0024">${component.innerHTML}</div></body></html>`
  );
  newWin.document.querySelector('.c-print-area').remove();

  const backList = newWin.document.querySelector('.c-back-to-list');
  if (backList) {
    backList.remove();
  }
  // newWin.document.querySelector('.c-control-link').remove();
  const isTabs = newWin.document.querySelector('.tabs');
  if (isTabs) {
    isTabs.querySelector('.cmp-tabs__inner').remove();
    isTabs.closest('.cmp-container').querySelector('.c-text-contents').remove();
  }

  const popupPrint = newWin.document.querySelector('.c-detail-content__pc-scroll-box');
  console.log(popupPrint);
  if (popupPrint) {
    popupPrint.classList.add('popup-print');
  }
  // popupPrint.classList.add('.popup-print');
  newWin.document.close();
  newWin.focus();
  newWin.print();
  setTimeout(function () {}, 100);
};
const helpCheckEvent = () => {
  const radios = document.querySelectorAll(".radio input[type='radio']");
  radios.forEach(radio => {
    radio.addEventListener('change', e => {
      const current = e.target;
      const currentHasClass = current.closest('.c-radio-item').classList.contains('noShowForm');
      const currentTargetHelp = current.closest('.cmp-form').querySelector('.c-help');
      if (currentTargetHelp) {
        if (currentHasClass && current.checked) {
          currentTargetHelp.style.display = 'block';
        } else {
          currentTargetHelp.style.display = 'none';
        }
      }
    });
  });
};
// component
function init2() {
  const component = document.querySelectorAll('.CS0024');
  if (beforeLaunch(component)) return false;
  component.forEach(c => {
    // print button event
    // comparePrint(c);
    const printBtn = c.querySelector('.js-print');
    if (printBtn) printBtn.addEventListener('click', printEvent);
  });
  if (!document.querySelector('.c-tooltip')) return false;
  if (!document.querySelector('.c-sns-share') && !document.getElementById('modal_help_library')) return false;
  const shareObj = document.querySelector('.c-sns-share');
  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);
  if (!config) return false;
  share(shareObj, config);
  helpCheckEvent();
}
init2();
