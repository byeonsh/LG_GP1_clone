import { keyboard, bp } from './constant.js';
import { beforeLaunch, pageScroll, activateLoopFocus } from './utils.js';
import runCarousel, { behavior } from './carousel.js';

let focusBtn;
const closeEvent = btn => {
  const targetCont = btn.closest('.c-pop-msg');
  targetCont.classList.remove('active');
  targetCont.removeAttribute('tabindex');
  const allLayerHidden = !(
    0 < [...document.querySelectorAll('.c-pop-msg')].filter(layer => layer.classList.contains('active')).length
  );
  if (allLayerHidden) pageScroll.able();

  const contentsBox = btn.closest('.c-pop-msg').querySelector('.c-pop-msg__contents');
  const needToReset = contentsBox && contentsBox.classList.contains('c-pop-msg__contents--reset');

  // Reset From
  const form = btn.closest('.c-pop-msg').querySelector('.c-pop-msg-form');
  const countingNumber = form?.querySelectorAll('.counting-num');
  if (needToReset && form) {
    form.reset();
    if (countingNumber) {
      countingNumber.forEach(element => {
        const updateElement = element;
        updateElement.textContent = 0;
        return updateElement;
      });
    }
  }
};
const initLayerPopup = layer => {
  // If there is a video in the layer popup, force the video to turn off.
  const btnVideoClose = layer.querySelectorAll('.js-video-close');
  if (btnVideoClose.length > 0) {
    btnVideoClose.forEach(close => {
      close.click();
    });
  }
  // If there is a carousel inside the layer popup, go to the first slide
  const carousels = layer.querySelectorAll('.cmp-carousel');
  if (carousels.length > 0) {
    carousels.forEach(el => {
      if (el.swiper) el.swiper.slideTo(0);
    });
  }
};
export const popMsg = function (href, popOpenBtn = false) {
  // href = href value or id value
  const popCloseBtns = document.querySelectorAll('.js-pop-close');
  const popId = href?.replace('#', '');
  const targetCont = document.getElementById(popId);
  const targetContButtons = targetCont.querySelectorAll('a, button, input, textarea');
  const dimmed = targetCont.querySelector('.c-pop-msg__dimmed');
  targetCont.classList.add('active');
  targetCont.setAttribute('tabindex', '0');
  // move focus to specific element when modal is opened.
  if (targetCont.dataset.focusSelector) {
    targetCont.querySelector(targetCont.dataset.focusSelector)?.focus();
  } else {
    // else move the focus to modal itself
    targetCont.focus();
  }

  // When same modal opens for 2nd time, reseting the scroll position to top
  const scrollCont = targetCont.querySelector('.mem-scroll__container');
  if (scrollCont) {
    scrollCont.scrollTop = 0;
  }

  if (popOpenBtn) focusBtn = popOpenBtn;

  // page scroll
  pageScroll.disable();

  // close
  popCloseBtns.forEach(b =>
    b.addEventListener('click', () => {
      initLayerPopup(b.closest('.c-pop-msg'));
      closeEvent(b);
      if (focusBtn) focusBtn.focus();
    })
  );
  // dimmed
  dimmed.addEventListener('click', () => {
    const closeBtn = dimmed.closest('.c-pop-msg').querySelector('.c-pop-msg__close-button');
    if (closeBtn) closeBtn.click();
    else closeEvent(dimmed);
    if (focusBtn) focusBtn.focus();
  });
  activateLoopFocus({
    nodeList: targetContButtons,
    layerClass: '.c-pop-msg',
    targetSelector: 'a, button, input, textarea',
  });
};

export const initPopMsg = elements => {
  const popOpenBtns = elements;
  popOpenBtns.forEach(function (btn) {
    // href = href value or id value
    let href = btn.getAttribute('aria-controls') || btn.getAttribute('href');
    href = href?.replace('#', '');
    btn.addEventListener('click', function (event) {
      // Prevent scrolling up after layer popup
      event.preventDefault();
      if (btn.getAttribute('disabled') === null) {
        popMsg(href);
        focusBtn = btn;
      }
    });
  });
  const keyupEvent = function (event) {
    const key = event.keyCode;
    if (key === keyboard.esc) {
      const popLayer = document.querySelectorAll('.c-pop-msg');
      popLayer.forEach(layer => {
        if (layer.classList.contains('active')) {
          initLayerPopup(layer);
        }
        layer.classList.remove('active');
        // popInLayer
        if (layer.classList.contains('popInLayer')) {
          layer.classList.remove('popInLayer');
          layer.querySelector('.inLayer').classList.remove('layer__active');
          layer.querySelector('.inLayer').removeAttribute('tabindex');
        }
      });
      if (focusBtn) focusBtn.focus();
      pageScroll.able();
    }
  };
  window.addEventListener('keyup', keyupEvent);
};

// clipboard copy
export const useClipboardCopy = (selector = '.js-clipboard-copy') => {
  const target = document.querySelectorAll(selector);
  const handler = event => {
    event.preventDefault();
    const { copyUrl = '', url = '', clipboard = '', doneMsg = '' } = event.currentTarget.dataset;
    const string = clipboard || copyUrl || url;
    if (!string && !doneMsg) return false;
    window.Clipboard.copy(string);

    const href = event.currentTarget.getAttribute('href');
    const popMsgId = href.replace('#', '');
    if (popMsgId.length <= 0) return false;
    popMsg(popMsgId);
  };
  return [target, handler];
};

export const clipboardCopy = (selector = '.js-clipboard-copy') => {
  const [targetGroup, handler] = useClipboardCopy(selector);

  if (beforeLaunch(targetGroup)) return false;
  targetGroup.forEach(target => target.addEventListener('click', handler, false));
};

export const specTabs = () => {
  const slideOptions = [
    {
      className: '.spec-slide',
      option: {
        keyboard: behavior.useKeyInteraction,
        pagination: behavior.pagination,
        slidesPerView: 2,
        spaceBetween: 8,
        on: {
          breakpoint: behavior.togglePagination(),
        },
      },
    },
  ];

  const swiperInit = (el, data) => {
    const nextEl = el.querySelector('.js-carousel-next');
    const prevEl = el.querySelector('.js-carousel-prev');
    const carousel = el.querySelector('.swiper');

    const setSwiper = options => {
      console.log(options);
      const { option } = options;
      const innerOption = {
        ...option,
        // breakpoints:
        // //     (className === '.spec-slide'),
        //     (className === '.spec-slide'),
        navigation: {
          prevEl,
          nextEl,
        },
      };

      if (el.querySelector('.c-carousel')) {
        runCarousel(carousel, innerOption);
      }
    };

    data.map(val => setSwiper(val));
  };

  const classfier = function (type, target) {
    // let { swiper = undefined } = target;
    switch (type) {
      case 'swiper init':
        return swiperInit(target, slideOptions);
      case 'swiper destroy':
        target.querySelector('.c-carousel').swiper.destroy(true, true);
        // eslint-disable-next-line no-param-reassign
        target.querySelector('.c-carousel').swiper = undefined;
        return;
      default:
        return console.log('non case');
    }
  };

  const carousel = document.querySelectorAll('.c-pop-msg .spec-slide');
  if (beforeLaunch(carousel)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    const webNum = 1;
    const mobileNum = 1;
    carousel.forEach(function (element) {
      const target = element;
      if (target) {
        const items = target.querySelectorAll('.swiper-slide');
        const num = mediaQueryList.matches ? webNum : mobileNum;
        const carouselHas = target.querySelector('.c-carousel').swiper !== undefined;
        const carouselNone = target.querySelector('.c-carousel').swiper === undefined;
        // type:category(default)
        if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
        if (num < items.length && carouselNone) return classfier('swiper init', target);
      }
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler);
};

// Layers in the pop-up Add
let Beforefocus;
const inLayerClose = btn => {
  const targetCont = btn.closest('.inLayer');
  targetCont.closest('.c-pop-msg').classList.remove('popInLayer');
  targetCont.classList.remove('layer__active');
  targetCont.removeAttribute('tabindex');
};

export const popInLayer = function (href, layerInBtn = false) {
  // href = href value or id value
  const inLayerBtn = document.querySelectorAll('.js-inLayer-close');
  const popId = href?.replace('#', '');
  const targetCont = document.getElementById(popId);
  const targetContButtons = targetCont.querySelectorAll('a, button, input, textarea');
  targetCont.closest('.c-pop-msg').classList.add('popInLayer');
  targetCont.classList.add('layer__active');
  targetCont.setAttribute('tabindex', '0');
  targetCont.focus();
  if (layerInBtn) Beforefocus = layerInBtn;
  // close
  inLayerBtn.forEach(b =>
    b.addEventListener('click', () => {
      inLayerClose(b);
      if (Beforefocus) Beforefocus.focus();
    })
  );
  activateLoopFocus({
    nodeList: targetContButtons,
    layerClass: '.inLayer',
    targetSelector: 'a, button, input, textarea',
  });
};

export const inLayerInit = elements => {
  const popInLayerBtn = elements;
  popInLayerBtn.forEach(function (btn) {
    let href = btn.getAttribute('aria-controls') || btn.getAttribute('href');
    href = href?.replace('#', '');
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      if (btn.getAttribute('disabled') === null) {
        popInLayer(href);
        Beforefocus = btn;
      }
    });
  });
};

export default {};
// promotion 추가
