import { beforeLaunch } from '../../assets/js/common/utils.js';

function detectMobileDevice(agent) {
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some(mobile => agent.match(mobile));
}

// eslint-disable-next-line no-unused-vars
const isMobile = detectMobileDevice(window.navigator.userAgent);

export default function priceInformation() {
  const componentOrderTotal = document.querySelector('.buy-summary-area__secondary');
  // let priceInformationHeight = document.querySelector('.c-product-price-information').clientHeight;

  // const componentAddPadding = () => {
  //     const headerMsgHeight = document.querySelector('.buy-header-msg').clientHeight;
  //     const component = document.querySelector('.CT0100');
  //     if (component) {
  //         if (isMobile) {
  //             // 모바일 여부 체크
  //             if (priceInformationHeight && !headerMsgHeight) {
  //                 component.style.paddingBottom = `${priceInformationHeight}px`;
  //             } else if (priceInformationHeight && headerMsgHeight) {
  //                 component.style.paddingBottom = `${headerMsgHeight + priceInformationHeight + 10}px`;
  //             }
  //         }
  //     }
  // };
  // componentAddPadding();

  if (beforeLaunch(componentOrderTotal)) return false;
  // price sticky
  const priceSticky = componentOrderTotal.querySelector('.c-product-price-sticky');
  const priceInfo = priceSticky.querySelector('.c-product-price-information');
  const priceToggleBtn = priceSticky.querySelector('.c-product-price-information__btn-toggle');
  const addActive = (clicked = false) => {
    priceInfo.classList.add('active');
    // priceInfo.classList.remove('remove-active');
    priceToggleBtn.querySelector('button').setAttribute('aria-expanded', 'true');
    // priceInformationHeight = document.querySelector('.c-product-price-information').clientHeight;
    if (clicked) {
      priceInfo.classList.add('open');
      priceInfo.classList.remove('close');
    }
  };
  const removeActive = (clicked = false) => {
    priceInfo.classList.remove('active');
    // priceInfo.classList.add('remove-active');
    priceToggleBtn.querySelector('button').setAttribute('aria-expanded', 'false');
    // priceInformationHeight = document.querySelector('.c-product-price-information').clientHeight;
    if (clicked) {
      priceInfo.classList.remove('open');
      priceInfo.classList.add('close');
    }
  };
  const stickyClickEvent = () => {
    if (priceInfo.classList.contains('close') || !priceInfo.classList.contains('open')) {
      addActive(true);
    } else {
      removeActive(true);
    }
    // componentAddPadding();
  };
  priceToggleBtn.querySelector('button').addEventListener('click', stickyClickEvent);
}
