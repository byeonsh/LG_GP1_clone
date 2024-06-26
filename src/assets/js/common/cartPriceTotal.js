import { beforeLaunch } from './utils.js';

function detectMobileDevice(agent) {
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some(mobile => agent.match(mobile));
}

const isMobile = detectMobileDevice(window.navigator.userAgent);

export function cartPriceTotal(componentClass) {
  const component = document.querySelector(componentClass);
  if (beforeLaunch(component)) return false;

  const footer = document.querySelector('.CM0002');
  // price toggle slide up, down
  const priceEl = component.querySelector('.c-product-price-sticky');
  const priceInfo = priceEl.querySelector('.c-product-price-information');
  const priceToggleBtn = priceEl.querySelector('.c-product-price-information__btn-toggle');

  const payment = document.querySelector('.buy-checkout__item--payment');
  /* const paymentComplete = document.querySelector('.buy-checkout__item--payment.buy-checkout__item--complete');
    const nextBtn = document.querySelectorAll(
        '.buy-checkout__item--payment:not(.buy-checkout__item--complete) .cmp-button.next'
    );
    const editBtn = document.querySelector(
        '.buy-checkout__item--payment.buy-checkout__item--complete .c-checkout-step__edit'
    ); */
  const priceBox = document.querySelector('.c-price-box__item').clientHeight;
  const support = document.querySelector('.c-support');
  // const DR = document.querySelector('.CT-buy-checkout__DR');
  let bottomSheetHeight = priceInfo.clientHeight - priceBox;
  const fnMoResizeing = () => {
    const loadViewportHeight = window.outerHeight;

    window.addEventListener('resize', () => {
      const currentViewportHeight = window.outerHeight;
      if (currentViewportHeight - loadViewportHeight < 0) {
        priceEl.style.bottom = `-${loadViewportHeight - currentViewportHeight}px`;
      } else {
        priceEl.style.bottom = 0;
      }
    });
  };
  // scroll margin
  const bottomSheetMargin = () => {
    if (componentClass === '.CT000C' || componentClass === '.CT000E') {
      if (footer) {
        footer.style.marginBottom = payment ? `${bottomSheetHeight + 24}px` : `${bottomSheetHeight + 48}px`;
      }
    } else {
      if (support) {
        bottomSheetHeight = priceInfo.clientHeight - priceBox - 24;
      }
      if (footer) {
        footer.style.marginBottom = `${bottomSheetHeight}px`;
      }
    }
  };
  if (isMobile) {
    bottomSheetMargin();
    fnMoResizeing();
  }

  const addActive = (clicked = false) => {
    priceInfo.classList.add('active');
    priceToggleBtn.querySelector('button').setAttribute('aria-expanded', 'true');
    if (clicked) {
      priceInfo.classList.add('open');
      priceInfo.classList.remove('close');
    }
  };
  const removeActive = (clicked = false) => {
    priceInfo.classList.remove('active');
    priceToggleBtn.querySelector('button').setAttribute('aria-expanded', 'false');
    if (clicked) {
      priceInfo.classList.remove('open');
      priceInfo.classList.add('close');
    }
  };
  const stickyClickEvent = () => {
    const elClassList = priceInfo.classList;
    if (elClassList.contains('close')) {
      addActive(true);
    } else if (elClassList.contains('open') || !elClassList.contains('open')) {
      removeActive(true);
    }
  };
  priceToggleBtn.querySelector('button').addEventListener('click', stickyClickEvent);

  // if js-sticky
  /* const fnSticky = () => {
        const priceSticky = component.querySelector('.js-sticky');
        if (beforeLaunch(priceSticky)) return false;
        if (beforeLaunch(nextBtn)) return false;
        nextBtn.forEach(el => {
            el.addEventListener('click', () => {
                priceSticky.classList.add('c-product-price--expand-bottom');
                priceEl.style.marginTop = 0;
                priceInfo.style.marginTop = 0;
                paymentComplete.style.borderRadius = 0;
                component.style.marginBottom = 0;
                if (DR) {
                    DR.style.borderRadius = 0;
                }
                addActive(false);
            });
        });

        if (beforeLaunch(editBtn)) return false;
        editBtn.addEventListener('click', () => {
            priceSticky.classList.remove('c-product-price--expand-bottom');
            bottomSheetMargin();
            if (DR) {
                DR.style.borderRadius = '1.75rem';
                DR.style.borderTopLeftRadius = 0;
                DR.style.borderTopRightRadius = 0;
            }
            if (priceInfo.classList.contains('close')) {
                removeActive(false);
            }
            footer.style.marginBottom = 0;
            addActive(false);
        });
    };
    fnSticky(); */
  // let priceStickyHeight = 0;
  // let memo = document.body.scrollHeight - priceStickyHeight;
  // const stickyScrollEvent = () => {
  //     if (isPaymentComplete) {
  //         const winY = window.scrollY;
  //         const winH = window.innerHeight;
  //         const winB = winY + winH - priceStickyHeight;
  //         if (winB >= memo) {
  //             // bottom
  //             priceSticky.classList.add('c-product-price--expand-bottom');
  //             addActive(false);
  //         } else {
  //             // sticky
  //             priceSticky.classList.remove('c-product-price--expand-bottom');
  //             if (priceInfo.classList.contains('close')) {
  //                 removeActive(false);
  //             }
  //         }
  //     }
  // };
  // const stickyResizeEvent = () => {
  //     priceStickyHeight = priceSticky.clientHeight;
  //     memo = document.body.scrollHeight - priceStickyHeight;
  // };
  // stickyResizeEvent();
  // window.addEventListener('scroll', stickyScrollEvent);
  // window.addEventListener('resize', stickyResizeEvent);
}

export const minusPlusCount = () => {
  const minus = document.querySelectorAll('.buy-count-box.inStock .buy-count-box__minus');
  const plus = document.querySelectorAll('.buy-count-box.inStock .buy-count-box__plus');
  const input = document.querySelectorAll('.buy-count-box.inStock .buy-count-box__number input');
  const outStockMinus = document.querySelectorAll('.buy-count-box.outStock .buy-count-box__minus');
  const outStockPlus = document.querySelectorAll('.buy-count-box.outStock .buy-count-box__plus');
  const outStockInput = document.querySelectorAll('.buy-count-box.outStock .buy-count-box__number input');

  const isDisabled = component => {
    const target = component;
    for (let i = 0; i < target.length; i += 1) {
      target[i].disabled = true;
    }
  };
  isDisabled(outStockMinus);
  isDisabled(outStockPlus);
  isDisabled(outStockInput);

  minus.forEach(el => {
    el.addEventListener('click', event => {
      const targetMinus = event.target;
      const targetInput = targetMinus.closest('.buy-count-box');
      const targetNumber = targetInput.querySelector('.buy-count-box__number input');
      let targetCount = targetNumber.value;
      targetCount = Number(targetCount);
      if (targetCount > 1) {
        targetCount -= 1;
        targetNumber.value = targetCount;
      }
      if (targetCount === 1) {
        targetMinus.classList.remove('active');
      }
    });
  });

  plus.forEach(el => {
    el.addEventListener('click', event => {
      const targetPlus = event.target;
      const targetInput = targetPlus.closest('.buy-count-box');
      const targetMinus = targetInput.querySelector('.buy-count-box__minus');
      const targetNumber = targetInput.querySelector('.buy-count-box__number input');
      let targetCount = targetNumber.value;
      targetCount = Number(targetCount);
      targetCount += 1;
      targetNumber.value = targetCount;
      if (targetCount > 1) {
        targetMinus.classList.add('active');
      }
    });
  });

  input.forEach(el => {
    el.addEventListener('keyup', event => {
      const targetInput = event.target;
      const targetMinus = targetInput.closest('.buy-count-box').querySelector('.buy-count-box__minus');
      let targetCount = targetInput.value;
      targetCount = Number(targetCount);
      if (targetCount > 1) {
        targetMinus.classList.add('active');
      }
      if (targetCount === 1) {
        targetMinus.classList.remove('active');
      }
    });
  });
};
