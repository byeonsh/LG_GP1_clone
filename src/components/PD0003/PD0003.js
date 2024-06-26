// import module
import accordion from '../../assets/js/common/accordion.js';
import {
  addKeyWordToCookie,
  beforeLaunch,
  getComponentConfigFromElem,
  pageScroll,
} from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { popMsg } from '../../assets/js/common/popMsg.js';
import share from '../../assets/js/common/share.js';
import { bp, carouselPerView, cookieConst, review, keyboard } from '../../assets/js/common/constant.js';
import { writeReview } from '../../assets/js/common/write-a-review.js';
import { checkFunctionalCookieEnabled, showOneTrustCookiePopup } from '../../assets/js/common/onetrustHelper.js';

// import runBVStaticPLP from '../../assets/js/common/bv.js';
// import runSPStaticPLP from '../../assets/js/common/sp.js';

// const scrollToStep = area => {
//   if (!area) return false;
//   const wh = window.innerHeight;
//   const { top, height } = area.getBoundingClientRect();
//   const distance = (wh - height) / 2 - top;
//   const st = window.scrollY;
//   window.scroll({
//     top: st - distance,
//     left: 0,
//     behavior: 'smooth',
//   });
// };
// const gotoStep = area => {
//   if (!area) return false;
//   if (area.classList.contains('c-sibling-option-box')) {
//     if (!area.classList.contains('c-accordion__box--expand'))
//       area.querySelector('.c-accordion__head .js-accordion-trigger').click();
//   }
//   setTimeout(function () {
//     scrollToStep(area);
//   }, 100);
// };
// const autoScrolling = component => {
//   const siblingWrapper = component.querySelector('.c-product-summary-siblings');
//   const siblingItems = siblingWrapper.querySelectorAll('.c-sibling-option-box, .c-product-pincode');
//   siblingItems.forEach((area, idx) => {
//     const radio = area.querySelectorAll('.c-sibling-option__input');
//     if (radio.length > 0) {
//       radio.forEach(r => {
//         r.addEventListener('click', () => {
//           if (r.nextElementSibling.querySelector('.c-date-input__input')) {
//             if (r.nextElementSibling.querySelector('.c-date-input__input').value !== '')
//               gotoStep(siblingItems[idx + 1]);
//           } else if (r.nextElementSibling.querySelector('.c-sibling-option__input')) {
//             if (r.nextElementSibling.querySelector('.c-sibling-option__input').value !== '')
//               gotoStep(siblingItems[idx + 1]);
//           } else {
//             gotoStep(siblingItems[idx + 1]);
//           }
//         });
//       });
//     }
//   });
// };

const runGallery = component => {
  // define
  const galleryPopup = document.getElementById('popSummaryGallery');
  const galleryPage = component.querySelector('.c-summary-area__primary-sticky > .c-summary-gallery');
  // gallery (for page)
  if (galleryPage) {
    // swiper
    const pageSwiper = galleryPage.querySelector('.c-gallery__display .swiper');
    const pageThumbSwiper = galleryPage.querySelector('.c-gallery__thumbnail .swiper');
    const nextEl = galleryPage.querySelector('.js-carousel-next');
    const prevEl = galleryPage.querySelector('.js-carousel-prev');
    const paginationEl = galleryPage.querySelector('.c-carousel__pagination');
    const pageThumbCarouselOption = {
      slidesPerView: 5,
      spaceBetween: 20,
      watchSlidesProgress: true,
    };
    const pageCarouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: {
        el: paginationEl,
        enabled: true,
        type: 'fraction',
      },
      slidesPerView: 1,
      spaceBetween: 24,
      thumbs: {
        swiper: runCarousel(pageThumbSwiper, pageThumbCarouselOption),
      },
      on: {
        breakpoint: behavior.togglePagination(),
        init() {
          galleryPage.querySelector('.swiper-thumbs .swiper-slide-thumb-active')?.setAttribute('aria-current', 'true');
        },
        slideChange() {
          galleryPage.querySelectorAll('.swiper-thumbs .swiper-slide').forEach(el => {
            el.removeAttribute('aria-current');
          });
          galleryPage.querySelector('.swiper-thumbs .swiper-slide-thumb-active')?.setAttribute('aria-current', 'true');
        },
      },
      navigation: {
        prevEl,
        nextEl,
      },
    };
    if (pageSwiper) runCarousel(pageSwiper, pageCarouselOption);
    // sort - click
    const sortBtns = galleryPage.querySelectorAll('.c-summary-gallery__sort button');
    if (sortBtns) {
      sortBtns.forEach(btn => {
        btn.addEventListener('click', event => {
          const popId = event.currentTarget.getAttribute('aria-controls');
          const dataType = event.currentTarget.dataset.type;
          popMsg(popId, btn);
          setTimeout(() => {
            galleryPopup.querySelector(`.c-summary-gallery__sort button[data-type="${dataType}"]`).click();
          }, 200);
        });
      });
    }
    // gallery - click
    const galleryImg = pageSwiper.querySelectorAll('.c-carousel__item [aria-controls]');
    if (galleryImg) {
      galleryImg.forEach((el, idx) => {
        el.addEventListener('click', event => {
          event.preventDefault();
          const popId = event.currentTarget.getAttribute('aria-controls');
          const dataType = 'image';
          popMsg(popId, el);
          document.getElementById(popId).dataset.initNumber = idx;
          setTimeout(() => {
            galleryPopup.querySelector(`.c-summary-gallery__sort button[data-type="${dataType}"]`).click();
          }, 200);
        });
      });
    }
  }
};

// const bundleCarouselOption = {
//     keyboard: behavior.useKeyInteraction,
//     pagination: behavior.pagination,
//     slidesPerView: 1,
//     slidesPerGroup: 1,
//     breakpoints: {
//         // min
//         [columns(4 * 2, 'mobile') + 25 * 2]: {
//             // 680
//             slidesPerView: 2,
//             spaceBetween: 10,
//             pagination: {
//                 enabled: true,
//             },
//         },
//         [bp.mobile + 1]: {
//             slidesPerView: 2,
//             spaceBetween: 24,
//             pagination: {
//                 enabled: true,
//             },
//         },
//         [columns(9) + margin['inset padding'] * 2]: {
//             // 1122
//             slidesPerView: 3,
//             spaceBetween: 24,
//             pagination: {
//                 enabled: true,
//             },
//         },
//     },
//     on: {
//         breakpoint: behavior.togglePagination(),
//     },
// };

const swiperInit = function (target, option) {
  const nextEl = target.closest('.c-carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.c-carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...option,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

const expandEvent = (target, btn) => {
  const getAriaExpand = btn.getAttribute('aria-expanded');
  if (getAriaExpand === 'true') {
    btn.setAttribute('aria-expanded', 'false');
    target.classList.remove('expanded');
  } else {
    btn.setAttribute('aria-expanded', 'true');
    target.classList.add('expanded');
  }
};
// RO
// const expandEvent = (target, btn) => {
//     const getAriaExpand = btn.getAttribute('aria-expanded');
//     const productSpecsBtn = document.querySelector('.c-key-feature__button--footer');
//     if (getAriaExpand === 'true') {
//         btn.setAttribute('aria-expanded', 'false');
//         target.classList.remove('expanded');
//         productSpecsBtn.classList.remove('expanded');
//     } else {
//         btn.setAttribute('aria-expanded', 'true');
//         target.classList.add('expanded');
//         productSpecsBtn.classList.add('expanded');
//     }
// };
// const keyFeatureEvnet = function () {
//     const keyFeatureWrap = document.querySelectorAll('.c-key-feature');
//     const keyFeatureWrapitemCount = keyFeatureWrap.querySelectorAll('.c-list .c-list__item').length;
//     const keyFeatureMoreBtn = keyFeatureWrap.querySelector('.c-key-feature__button--expand');
//     if (keyFeatureWrapitemCount <= 3) {
//         keyFeatureMoreBtn.classList.add('hidden');
//     } else {
//         keyFeatureMoreBtn.classList.remove('hidden');
//     }
// };

const moreText = btn => {
  const targetId = btn.getAttribute('aria-controls');
  const target = document.querySelector(`#${targetId}`);
  btn.addEventListener('click', () => {
    expandEvent(target, btn);
  });
};

// const quantity = qty => {
//   const input = qty.querySelector('.c-qty__input[type="number"]');
//   if (beforeLaunch(input)) return false;

//   // console.log('input.value', typeof input.value);
//   let count = parseInt(input.value, 10);
//   const min = 1;
//   const max = Number(input.getAttribute('max'));

//   const btnMinus = qty.querySelector('.c-qty__btn--minus');
//   const btnPlus = qty.querySelector('.c-qty__btn--plus');

//   // input.onkeydown = function (e) {
//   //     if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8)) {
//   //         return false;
//   //     }
//   // };
//   const store = value => {
//     // console.log('store', value);
//     if (min >= value) {
//       btnMinus.setAttribute('disabled', true);
//       count = min;
//     } else if (max <= value) {
//       btnPlus.setAttribute('disabled', true);
//       count = max;
//     } else {
//       btnMinus.removeAttribute('disabled');
//       btnPlus.removeAttribute('disabled');
//       count = value;
//     }

//     input.value = count;
//   };

//   store(count);

//   const onInput = event => {
//     count = parseInt(event.currentTarget.value, 10);
//     store(count);
//   };
//   const increase = () => {
//     count += 1;
//     store(count);
//   };
//   const decrease = () => {
//     count -= 1;
//     store(count);
//   };

//   input.addEventListener('input', onInput);
//   btnPlus.addEventListener('click', increase);
//   btnMinus.addEventListener('click', decrease);
// };

const focusClose = btn => {
  btn?.addEventListener('keydown', e => {
    if (e.keyCode === keyboard.esc && btn.getAttribute('aria-pressed') === 'true') {
      btn.setAttribute('aria-pressed', 'false');
      btn.closest('.c-tooltip').querySelector('.c-tooltip__container').classList.remove('active');
    } else if (e.keyCode === keyboard.esc && btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      btn.closest('.c-tooltip').querySelector('.c-tooltip__container').classList.remove('active');
    }
  });
};

const focusInClose = () => {
  const target = document.querySelectorAll('.c-tooltip__container .cmp-button');
  target?.forEach(btn => {
    btn.addEventListener('keydown', e => {
      const tooltip = btn.closest('.c-tooltip');
      const tooltipBtn = tooltip.querySelector('.button .c-tooltip__button');
      if (e.keyCode === keyboard.esc && tooltipBtn.getAttribute('aria-pressed') === 'true') {
        tooltipBtn.setAttribute('aria-pressed', 'false');
        tooltip.querySelector('.c-tooltip__container').classList.remove('active');
        tooltipBtn.focus();
      } else if (e.keyCode === keyboard.esc && tooltipBtn.getAttribute('aria-expanded') === 'true') {
        tooltipBtn.setAttribute('aria-expanded', 'false');
        tooltip.querySelector('.c-tooltip__container').classList.remove('active');
        tooltipBtn.focus();
      }
    });
  });
};

const warrantyRadioChange = () => {
  const radioEl = document.querySelectorAll('.c-addon-product-box--selection .c-sibling-option');
  radioEl.forEach(el => {
    el.querySelector('label').addEventListener('click', e => {
      const targetIpt = e.target.closest('.c-sibling-option').querySelector('.c-sibling-option__input');
      if (targetIpt.checked) {
        targetIpt.checked = false;
      } else {
        targetIpt.checked = true;
      }
    });
  });
};

warrantyRadioChange();

const selectItem = btn => {
  const targetId = btn.getAttribute('role');
  if (targetId === 'radio') {
    const reset = btn.closest('.c-sibling-option-box__option-moreGroup').querySelectorAll('.radio-item');
    reset.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-checked', 'false');
      if (c.querySelector('.c-sibling-option__secondary-detail')) {
        c.setAttribute('aria-expanded', 'false');
      }
    });
    btn.classList.add('active');
    btn.setAttribute('aria-checked', 'true');
    if (btn.querySelector('.c-sibling-option__secondary-detail')) {
      btn.setAttribute('aria-expanded', 'true');
    }
  }
};

const focusRadio = btn => {
  const radioList = btn.target.closest('.c-sibling-option-box__option-moreGroup');
  const currentItem = btn.target.closest('.radio-item');
  const nodes = [...radioList.children];
  let index = nodes.indexOf(currentItem);
  if (currentItem.length === 0) return false;
  if (btn.keyCode === keyboard.up) {
    btn.preventDefault();
    index -= 1;
    if (index >= 0 && index < nodes.length) {
      nodes[index].focus();
    }
  } else if (btn.keyCode === keyboard.down) {
    btn.preventDefault();
    index += 1;
    if (index >= 0 && index < nodes.length) {
      nodes[index].focus();
    }
  }
};

const radioItem = () => {
  const selectItems = document.querySelectorAll('.radio-item');
  selectItems.forEach(btn => {
    btn.addEventListener('click', () => {
      selectItem(btn);
    });
    btn.addEventListener('keydown', e => {
      if (e.keyCode === keyboard.enter || e.keyCode === keyboard.spacebar) {
        e.preventDefault();
        selectItem(btn);
      }
    });
    btn.addEventListener('keydown', focusRadio);
  });
};

const focusHandler = e => {
  /* PDP focusing controls */
  // Common Condition: 엘리먼트의 focusing 가능 / offsetBottom 값과 stickyElement의 OffsetTop 값 비교.
  // Constants
  const stickyElement = document.querySelector('.c-product-price-sticky');
  // Variables
  let presentScrollTop = 0;
  let target = null;
  let isFocusable = false;
  target = e.target;
  isFocusable =
    target.matches('[tabindex]:not([tabindex="-1"]), [role="button"], a, input, button, select') &&
    !target.getAttribute('aria-hidden') &&
    !!target.closest('.PD0003 .c-summary-area__secondary');
  // Value Assign
  presentScrollTop = window.scrollY;
  // Condition
  if (
    isFocusable &&
    stickyElement.classList.contains('sticky') &&
    stickyElement.getBoundingClientRect().top < target.getBoundingClientRect().bottom
  ) {
    window.scrollTo({
      top: presentScrollTop + stickyElement.getBoundingClientRect().height,
    });
  }
};

const valuedationRegion = components => {
  if (beforeLaunch(components)) return false;
  const twikleCta = document.querySelector('.c-valuedation-region .c-cta button');
  components.forEach(select => {
    select.addEventListener('change', () => {
      let valueCount = 0;
      components.forEach(item => {
        if (item.value !== '') {
          if (valueCount < components.length) {
            valueCount += 1;
          }
          if (valueCount === components.length && select.id === 'Comuna') {
            twikleCta?.classList.add('highlight');
          } else {
            twikleCta?.classList.remove('highlight');
          }
        }
      });
    });
  });
};

const savingEvent = () => {
  if (beforeLaunch(document.querySelector('.questionnaire-list'))) return false;
  let savingCheack = '';
  const savingStatus = status => {
    savingCheack = status;
  };
  const savingBtn = document.querySelectorAll('.status-btn .js-pop-open');
  const removeCouponPop = document.querySelector('#popRemoveCoupon');
  const removeBtn = removeCouponPop.querySelector('a.cmp-button');
  const savingPop = document.querySelector('#popSaving');
  const continueBtn = savingPop.querySelector('.c-pop-msg__button-wrap .continue');
  const radios = document.querySelectorAll("input[name='terms_checked']");
  const confirmBtn = savingPop.querySelector('.c-pop-msg__button-wrap .confirm');
  // Status checked
  savingBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      savingStatus(e.target.closest('.questionnaire-status').querySelector('.questionnaire-title').getAttribute('id'));
    });
    btn.addEventListener('keydown', e => {
      if (e.keyCode === keyboard.enter || e.keyCode === keyboard.spacebar) {
        savingStatus(
          e.target.closest('.questionnaire-status').querySelector('.questionnaire-title').getAttribute('id')
        );
      }
    });
  });
  // List delete event
  removeBtn.addEventListener('click', e => {
    e.preventDefault();
    removeCouponPop.classList.remove('active');
    pageScroll.able();
    document.getElementById(savingCheack).closest('.questionnaire-status').classList.remove('saving-status');
    document.getElementById(savingCheack).closest('.questionnaire-status').setAttribute('aria-checked', 'false');
    document
      .getElementById(savingCheack)
      .closest('.questionnaire-status')
      .querySelector('.questionnaire-btns .popSaving')
      .focus();
  });
  // Step continueBtn event
  continueBtn.addEventListener('click', e => {
    e.preventDefault();
    continueBtn.classList.add('hidden');
    confirmBtn.classList.remove('hidden');
    savingPop.querySelector('.saving-form-step1').classList.add('hidden');
    savingPop.querySelector('.saving-form-step2').classList.remove('hidden');
    savingPop.querySelector('#saving-step1').classList.remove('step-act');
    savingPop.querySelector('#saving-step1').removeAttribute('aria-current');
    savingPop.querySelector('#saving-step2').classList.add('step-act');
    savingPop.querySelector('#saving-step2').setAttribute('aria-current', 'step');
    savingPop.focus();
  });
  // Terms checked
  radios.forEach(radio => {
    radio.addEventListener('change', e => {
      const current = e.currentTarget;
      if (current.id === 'terms_yes') {
        confirmBtn.disabled = false;
      } else {
        confirmBtn.disabled = true;
      }
    });
  });
  // ConfirmBtn event
  confirmBtn.addEventListener('click', e => {
    e.preventDefault();
    savingPop.classList.remove('active');
    pageScroll.able();
    document.getElementById(savingCheack).closest('.questionnaire-status').classList.add('saving-status');
    document.getElementById(savingCheack).closest('.questionnaire-status').setAttribute('aria-checked', 'true');
    document
      .getElementById(savingCheack)
      .closest('.questionnaire-status')
      .querySelector('.questionnaire-btns .popSavingRemove')
      .focus();
  });
};

// component
function init() {
  const component = document.querySelector('.PD0003');
  if (beforeLaunch(component)) return false;

  const componentContainer = component.querySelector('.cmp-container');
  // gets sku from dataset and adds to recently view cookie if Functional cookies enabled
  if (componentContainer?.dataset?.sku && checkFunctionalCookieEnabled()) {
    addKeyWordToCookie(cookieConst.recentlyViewCookie, componentContainer.dataset.sku);
  }

  // gallery (page and popup)
  runGallery(component);

  // write a review
  const reviewWrapper = document.querySelector('.write-a-review-area');
  if (reviewWrapper) {
    const { modelid } = reviewWrapper.dataset;
    let reviewType;
    const options = {
      campaign: component.querySelector('input[name=bvCampaignId]')
        ? component.querySelector('input[name=bvCampaignId]').value
        : '',
    };
    if (review.type === 'BV1' || review.type === 'BV2') {
      reviewType = 'BV';
    } else if (review.type === 'LGCOM') {
      reviewType = 'LGCOM';
    }
    const reviewButton = reviewWrapper.querySelector('.write-a-review');
    reviewButton?.addEventListener('click', event => {
      event.preventDefault();
      if (!checkFunctionalCookieEnabled()) {
        // if functional cookie group not enabled show cookie preference popup
        showOneTrustCookiePopup();
        return false;
      }
      writeReview(reviewButton, reviewType, modelid, options);
    });
  }

  // form
  accordion.run(component);
  /* 
    const qtyAll = component.querySelectorAll('.c-qty');
    qtyAll.forEach(q => {
      quantity(q);
    }); */

  // bundle
  // const bundleCarousel = component.querySelector(`.js-product-bundle-list .swiper`);
  // if (!beforeLaunch(bundleCarousel)) {
  //     swiperInit(bundleCarousel, bundleCarouselOption);
  // }
  // banner carousel
  const recommendedCarousel = component.querySelectorAll(`.c-summary-recommended-promotion .swiper`);
  if (!beforeLaunch(recommendedCarousel)) {
    recommendedCarousel.forEach(el => {
      swiperInit(el, {
        keyboard: behavior.useKeyInteraction,
        pagination: behavior.pagination,
        slidesPerView: carouselPerView.small,
        slidesPerGroup: 1,
        spaceBetween: 10,
        breakpoints: {
          [bp.mobile + 1]: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 24,
          },
        },
        on: {
          breakpoint: behavior.togglePagination(),
        },
      });
    });
  }
  // price sticky
  const priceSticky = component.querySelector('.c-product-price-sticky');
  if (priceSticky) {
    const priceStickyPrev = priceSticky.previousElementSibling;
    const priceInfo = priceSticky.querySelector('.c-product-price-information');
    const priceToggleBtn = priceSticky.querySelector('.c-product-price-information__btn-toggle');
    let priceStickyHeight = 0;
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
    const stickyScrollEvent = () => {
      const memo = priceStickyPrev.offsetTop + priceStickyPrev.offsetHeight;
      const winY = window.scrollY;
      const winH = window.innerHeight;
      const winB = winY + winH - priceStickyHeight;
      //  - document.querySelector('.c-product-pay-cta').offsetHeight
      if (winB >= memo) {
        // bottom
        priceStickyPrev.style.marginBottom = '0';
        priceSticky.classList.remove('sticky');
        addActive(false);
        priceSticky.classList.remove('can-sticky');
      } else {
        // sticky
        priceStickyPrev.style.marginBottom = '500px';
        priceSticky.classList.add('sticky');
        priceSticky.classList.add('can-sticky');
        if (priceInfo.classList.contains('close')) {
          removeActive(false);
        }
      }
    };
    const stickyResizeEvent = () => {
      if (priceSticky.classList.contains('can-sticky')) priceStickyHeight = priceSticky.clientHeight;
    };
    const stickyClickEvent = () => {
      if (priceInfo.classList.contains('close')) {
        addActive(true);
      } else {
        removeActive(true);
      }
    };
    removeActive(true);
    stickyResizeEvent();
    priceSticky.classList.add('ready');
    priceSticky.classList.remove('can-sticky');
    priceStickyPrev.style.marginBottom = '500px';
    stickyScrollEvent();
    window.addEventListener('scroll', stickyScrollEvent);
    window.addEventListener('resize', stickyResizeEvent);
    priceToggleBtn.querySelector('button').addEventListener('click', stickyClickEvent);
  }

  // share
  const shareObj = document.querySelector('.c-tooltip__share');
  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);
  if (config && shareObj) {
    share(shareObj, config);
  }
  // review
  // - PD0004.js

  // auto scrolling
  // autoScrolling(component);

  // more text
  const moreBtn = component.querySelectorAll('.js-more-text-trigger');
  moreBtn.forEach(btn => {
    moreText(btn);
  });
  const wishBtn = component.querySelector('.c-icon-button--wish');
  const shareBtn = component.querySelector('.c-icon-button--share');
  focusClose(wishBtn);
  focusClose(shareBtn);
  radioItem();
  focusInClose();
  document.addEventListener('focusin', focusHandler);
  const selects = document.querySelectorAll('.c-valuedation-region .c-select-item select');
  valuedationRegion(selects);
  savingEvent();
}
init();
// export default
