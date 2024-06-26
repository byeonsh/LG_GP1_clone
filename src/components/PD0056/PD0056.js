// import module
import { beforeLaunch, lazyloadJS } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

// popFocus target
let popFocus = '';
let storeSwiper = '';
const storePop = document.querySelector('#popStore');
// distance event
const selectDistance = btn => {
  const reset = btn.closest('.sch-distance-list').querySelectorAll('li button');
  const listActive = storePop.querySelector('.store-list-area .store-search-result');
  if (btn?.classList.contains('act')) {
    btn.classList.remove('act');
    btn.setAttribute('aria-pressed', 'false');
    listActive?.classList.remove('list-active');
  } else {
    reset?.forEach(c => {
      c.classList.remove('act');
      c.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('act');
    btn.setAttribute('aria-pressed', 'true');
    listActive?.classList.add('list-active');
  }
};
const distanceBtn = btn => {
  btn?.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      selectDistance(el);
    });
  });
};
// List side view event
const selectView = btn => {
  const reset = btn.closest('.store-list').querySelectorAll('.store-list .store-link');
  const sideActive = storePop.querySelector('.store-map__view');
  const closeBtn = storePop.querySelector('.store-side__close');
  reset?.forEach(c => {
    c.classList.remove('act');
    c.setAttribute('aria-current', 'false');
    c.closest('li').classList.remove('act');
    sideActive?.classList.remove('side-active');
  });
  btn.classList.add('act');
  btn.setAttribute('aria-current', 'true');
  btn.closest('li').classList.add('act');
  sideActive?.classList.add('side-active');
  setTimeout(function () {
    closeBtn?.focus();
  }, 100);
};
const closeView = btn => {
  btn?.addEventListener('click', () => {
    const sideActive = storePop.querySelector('.store-map__view');
    const before = storePop.querySelector('.store-link.act');
    sideActive?.classList.remove('side-active');
    before?.classList.remove('act');
    before?.closest('li').classList.remove('act');
    before?.setAttribute('aria-current', 'false');
    popFocus?.focus();
  });
};
const storeLinkBtn = btn => {
  btn?.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      selectView(el);
      popFocus = el;
    });
  });
};
const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');

  const swiper = runCarousel(el, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });
  storeSwiper = swiper;
  return swiper;
};
const runRecommendSwiper = function () {
  const recommendListCarousel = storePop.querySelectorAll('.store-side__gallery .swiper');
  if (beforeLaunch(recommendListCarousel)) return false;
  recommendListCarousel.forEach(el => {
    const carouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.bullets,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      autoplay: true,
      on: {
        breakpoint: behavior.togglePagination(),
      },
    };
    swiperInit(el, carouselOption);
  });
};
// tool
const toolView = btn => {
  btn?.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const sideActive = storePop.querySelector('.store-map__view');
      const closeBtn = storePop.querySelector('.store-side__close');
      sideActive?.classList.add('side-active');
      setTimeout(function () {
        closeBtn?.focus();
      }, 100);
      popFocus = el;
    });
  });
};
const dimmedClose = () => {
  const dimmed = storePop.querySelector('.store-map__view');
  dimmed?.addEventListener('click', e => {
    if (e.target.classList.contains('side-active')) {
      storePop.querySelector('.store-map__view').classList.remove('side-active');
      popFocus?.focus();
    }
  });
};
const toogleBtn = () => {
  const searchResultBtn = storePop.querySelector('.store-btnList');
  const searchResult = storePop.querySelector('.store-search-result');
  searchResultBtn?.addEventListener('click', e => {
    e.preventDefault();
    if (e?.target.classList.contains('act')) {
      e.target.classList.add('act');
      e.target.classList.remove('act');
      e.target.setAttribute('aria-expanded', 'false');
      searchResult?.classList.remove('expand');
    } else {
      e.target.classList.add('act');
      e.target.setAttribute('aria-expanded', 'true');
      searchResult?.classList.add('expand');
    }
  });
};
const tooltipClose = btn => {
  btn?.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const pin = e.target.closest('.store-map__pin');
      const locationBtn = document.querySelector('.btn-my-location');
      pin?.classList.remove('active');
      setTimeout(function () {
        locationBtn?.focus();
      }, 100);
    });
  });
};
// Onlinestore more btn event
const mobileSize = () => {
  const ww = window.innerWidth;
  const isMobile = ww <= bp.mobile + 1;
  return isMobile;
};
const getDisplayNumber = list => {
  let len = list.dataset.lengthMobile;
  const isMobile = mobileSize();
  if (isMobile) {
    len = list.dataset.lengthMobile;
  } else {
    len = list.dataset.lengthDesktop;
  }
  return parseInt(len, 10);
};
const resetList = el => {
  el?.forEach(c => {
    const list = c.querySelector('.store-pannel-box .c-online-shop-list');
    if (list) {
      const isMobile = mobileSize();
      const len = getDisplayNumber(list);
      const btnArea = c.querySelector('.more-btn');
      if (list.dataset.first === 'true') {
        // If the user has not yet clicked the more button,
        // the number displayed on the screen is changed according to the browser size.
        const allList = list.querySelectorAll('.c-online-shop-box:not(.c-online-shop-box--primary)');
        const primaryList = list.querySelectorAll('.c-online-shop-box--primary');
        allList.forEach(item => {
          const index = [...item.parentElement.children].indexOf(item) - primaryList.length;
          if (index >= len) {
            item.classList.add('hidden');
          } else {
            item.classList.remove('hidden');
          }
        });
      } else if (!isMobile) {
        // After the user clicks the more button once, when resizing, show more items
        // Only Desktop size
        // let moreItemLength = 0;
        const hiddenList = list.querySelectorAll('.c-online-shop-box.hidden:not(.c-online-shop-box--primary)');
        const shownList = list.querySelectorAll('.c-online-shop-box:not(.hidden):not(.c-online-shop-box--primary)');
        if (shownList.length % len > 0) {
          // If the number of currently displayed items is not a multiple of len,
          // find the number of items to be displayed
          // moreItemLength = len * Math.ceil(shownList.length / len) - shownList.length;
        }
        hiddenList.forEach(item => {
          const index = [...item.parentElement.children].indexOf(item) - shownList.length;
          if (index <= len) {
            item.classList.remove('hidden');
          }
        });
      }
      // Controls whether to show the more button based on hidden items.
      const hiddenList = list.querySelectorAll('.c-online-shop-box.hidden:not(.c-online-shop-box--primary)');
      if (hiddenList.length === 0) {
        btnArea.classList.add('hidden');
      } else {
        btnArea.classList.remove('hidden');
      }
    }
  });
};
const clickMore = e => {
  const boxArea = e.target.closest('.store-pannel-box');
  const list = boxArea.querySelector('.c-online-shop-list');
  const btnArea = boxArea.querySelector('.more-btn');
  if (list.dataset.first) {
    // After the user clicks the more button even once,
    // the number displayed on the screen no longer changes.
    list.dataset.first = false;
  }
  // Depending on the resolution, more items as many as len are displayed
  const len = getDisplayNumber(list);
  let hiddenList = list.querySelectorAll('.c-online-shop-box.hidden:not(.c-online-shop-box--primary)');
  const shownList = list.querySelectorAll('.c-online-shop-box:not(.hidden):not(.c-online-shop-box--primary)');
  hiddenList.forEach(item => {
    const index = [...item.parentElement.children].indexOf(item) - shownList.length;
    if (index + 1 <= len) {
      item.classList.remove('hidden');
    }
  });
  // Controls whether to show the more button based on hidden items.
  hiddenList = list.querySelectorAll('.c-online-shop-box.hidden:not(.c-online-shop-box--primary)');
  if (hiddenList.length === 0) {
    btnArea.classList.add('hidden');
    boxArea.classList.add('store-scroll');
  } else {
    btnArea.classList.remove('hidden');
  }
};
// gallery autoplay event
const autoplayEvent = function () {
  const galleryLists = document.querySelectorAll('.store-side__gallery .swiper');
  galleryLists.forEach(function (el) {
    const itemPause = el.querySelector('.c-carousel-controls__action--pause');
    const itemPlay = el.querySelector('.c-carousel-controls__action--play');
    function pause() {
      itemPause.setAttribute('disabled', 'disabled');
      itemPlay.removeAttribute('disabled');
      storeSwiper.autoplay.stop();
    }
    function play() {
      itemPlay.setAttribute('disabled', 'disabled');
      itemPause.removeAttribute('disabled');
      storeSwiper.autoplay.start();
    }
    storeSwiper.autoplay.running = true;
    itemPause?.addEventListener('click', pause);
    itemPlay?.addEventListener('click', play);
  });
};
// 3rd-Party
const run3rdParty = cont => {
  const jsfiles = cont.querySelectorAll('.js-eprivacy-load-inline:not(.load-complete)');
  const commerceConnector = cont.querySelector('.js-commerce-connector:not(.load-complete)');
  const iframes = cont.querySelector('.js-iframe-load:not(.load-complete)');
  const observerLoadJS = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const { url } = entry.target.dataset;
        lazyloadJS(url);
        entry.target.classList.add('load-complete');
        if (cont.querySelectorAll('.js-eprivacy-load-inline:not(.load-complete)').length === 0) {
          observerLoadJS.disconnect();
        }
      }
    });
  }, {});
  const observerCommerceConnector = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const dataList = entry.target.dataset;
        const jsLink = dataList.src;
        const tmpJS = document.createElement('script');
        tmpJS.src = jsLink;
        // eslint-disable-next-line no-restricted-syntax
        for (const key in dataList) {
          if (key !== 'src') {
            tmpJS.setAttribute(`data-${key}`, dataList[key]);
          }
        }
        entry.target.parentElement.appendChild(tmpJS);
        entry.target.classList.add('load-complete');
        if (cont.querySelectorAll('.js-commerce-connector:not(.load-complete)').length === 0) {
          observerCommerceConnector.disconnect();
        }
      }
    });
  }, {});
  const observerIframes = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const iframeUrl = entry.target.dataset.src;
        // eslint-disable-next-line no-param-reassign
        entry.target.src = iframeUrl;
        entry.target.classList.add('load-complete');
        if (cont.querySelectorAll('.js-iframe-load:not(.load-complete)').length === 0) {
          observerIframes.disconnect();
        }
      }
    });
  }, {});
  // include js
  if (jsfiles) {
    jsfiles.forEach(file => {
      observerLoadJS.observe(file);
    });
  }
  // commerce connector
  if (commerceConnector) {
    observerCommerceConnector.observe(commerceConnector);
  }
  // iframe
  if (iframes) {
    observerIframes.observe(iframes);
  }
};

// init
function init() {
  const component = document.querySelectorAll('.PD0056');
  if (beforeLaunch(component)) return false;
  const popStore = document.querySelectorAll(['#popStore', '#popStore_3rdAll']);
  const listBtn = storePop.querySelectorAll('.sch-distance-list li button');
  const storeLink = storePop.querySelectorAll('.store-link');
  const storeToolBtn = storePop.querySelectorAll('.s-maps-btn button');
  const closeBtn = storePop.querySelector('.store-side__close');
  const storelists = storePop.querySelector('.store-pannel-box .c-online-shop-list');
  const moreButtons = storePop.querySelector('#onlineStoreMore');
  const toolcloseBtn = storePop.querySelectorAll('.s-maps-tooltip__close');
  popStore.forEach(el => {
    // init
    const list = el.querySelector('.store-pannel-box .c-online-shop-list');
    if (list) {
      list.dataset.first = true;
    }
    // 3rd party
    const obj3rdParty = el.querySelectorAll('.c-box-3rd-party');
    obj3rdParty.forEach(cont => {
      run3rdParty(cont);
    });
  });
  moreButtons?.addEventListener('click', clickMore);
  distanceBtn(listBtn);
  storeLinkBtn(storeLink);
  toolView(storeToolBtn);
  closeView(closeBtn);
  runRecommendSwiper();
  getDisplayNumber(storelists);
  resetList(popStore);
  // resize
  const delay = 300;
  let timer = null;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      resetList(popStore);
    }, delay);
  });
  dimmedClose();
  toogleBtn();
  autoplayEvent();
  tooltipClose(toolcloseBtn);
}
init();
