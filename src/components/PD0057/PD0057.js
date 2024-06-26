// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp, keyboard } from '../../assets/js/common/constant.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

let popFocus = '';
let storeSwiper = '';
// distance event
const selectDistance = btn => {
  const reset = btn.closest('.c-map-btn__box').querySelectorAll('li button');
  const listActive = document.querySelector('.store-list-area .store-search-result');
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
const quickStatus = status => {
  const checkd = document.getElementsByClassName('CM0007').length;
  if (checkd) {
    if (status) {
      document.body.classList.add('quick-hidden');
    } else {
      document.body.classList.remove('quick-hidden');
    }
  }
};
// List side view event
const selectView = btn => {
  const reset = btn.closest('.store-list').querySelectorAll('.store-list .store-link');
  const sideActive = document.querySelector('.store-map__view');
  const closeBtn = document.querySelector('.store-side__close');
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
  quickStatus(true);
  setTimeout(function () {
    closeBtn?.focus();
  }, 100);
};
const closeView = btn => {
  btn?.addEventListener('click', () => {
    const sideActive = document.querySelector('.store-map__view');
    const before = document.querySelector('.store-link.act');
    sideActive?.classList.remove('side-active');
    before?.classList.remove('act');
    before?.closest('li').classList.remove('act');
    before?.setAttribute('aria-current', 'false');
    quickStatus(false);
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
  const recommendListCarousel = document.querySelectorAll('.store-side__gallery .swiper');
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
      const sideActive = document.querySelector('.store-map__view');
      const closeBtn = document.querySelector('.store-side__close');
      sideActive?.classList.add('side-active');
      quickStatus(true);
      setTimeout(function () {
        closeBtn?.focus();
      }, 100);
      popFocus = el;
    });
  });
};
const dimmedClose = () => {
  const dimmed = document.querySelector('.store-map__view');
  dimmed?.addEventListener('click', e => {
    if (e.target.classList.contains('side-active')) {
      document.querySelector('.store-map__view').classList.remove('side-active');
      quickStatus(false);
      popFocus?.focus();
    }
  });
};
const listFilterkey = () => {
  const listFilter = document.querySelector('.filter-active');
  const focusBtn = document.querySelector('.store-filter__close');
  listFilter?.addEventListener('keyup', e => {
    if (document.querySelector('.store-list-area').classList.contains('filter-active') && e.keyCode === keyboard.tab) {
      if (!e.target.closest('.store-list-filter__contents')) {
        e.preventDefault();
        focusBtn?.focus();
      }
    }
  });
};

const toogleBtn = () => {
  const searchResultBtn = document.querySelector('.store-btnList');
  const searchResult = document.querySelector('.store-search-result');
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
const mapBtnExpand = () => {
  const mapEnpand = document.querySelector('.btn-map');
  mapEnpand?.addEventListener('click', e => {
    if (e.target.closest('.store-map').classList.contains('full')) {
      e.target.closest('.store-map').classList.remove('full');
      e.target.setAttribute('aria-expanded', 'false');
    } else {
      e.target.closest('.store-map').classList.add('full');
      e.target.setAttribute('aria-expanded', 'true');
    }
  });
};
// mobile check
const mobileSize = () => {
  const ww = window.innerWidth;
  const isMobile = ww <= bp.mobile + 1;
  return isMobile;
};
// filter popup
const filterView = btn => {
  btn?.addEventListener('click', e => {
    e.preventDefault();
    const filterActive = document.querySelector('.store-list-area');
    const focusAfter = document.querySelector('.store-filter__close');
    filterActive?.classList.add('filter-active');
    quickStatus(true);
    setTimeout(function () {
      focusAfter?.focus();
    }, 100);
    listFilterkey();
  });
};
// filter close btn
const filterClose = btn => {
  btn?.addEventListener('click', () => {
    const focusBefore = document.querySelector('.c-icon-button--filter');
    const filterRemove = document.querySelector('.store-list-area');
    filterRemove?.classList.remove('filter-active');
    quickStatus(false);
    setTimeout(function () {
      focusBefore?.focus();
    }, 100);
  });
};
// filter event
const selectFilter = () => {
  const filterSelect = document.querySelectorAll('.store-filter__list li');
  filterSelect?.forEach(el => {
    el?.addEventListener('click', e => {
      e.preventDefault();
      if (e?.target.classList.contains('act')) {
        e.target.classList.add('act');
        e.target.classList.remove('act');
      } else {
        e.target.classList.add('act');
      }
    });
  });
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
// quickHidden
const quickHidden = () => {
  const wtbArea = document.querySelector('.PD0057');
  if (window.pageYOffset + window.innerHeight < wtbArea.offsetTop + wtbArea.offsetHeight + 150) {
    quickStatus(true);
  } else {
    quickStatus(false);
  }
};

// quick + top btn mobile event
const quickBtnScrollEvent = () => {
  const isMobile = mobileSize();
  if (isMobile) {
    window.addEventListener('scroll', () => {
      quickHidden();
    });
  }
};

function init() {
  // eslint-disable-next-line no-shadow
  const component = document.querySelectorAll('.PD0057');
  const listBtn = document.querySelectorAll('.c-map-btn__box li button');
  const storeLink = document.querySelectorAll('.store-link');
  const storeToolBtn = document.querySelectorAll('.s-maps-btn button');
  const closeBtn = document.querySelector('.store-side__close');
  const toolcloseBtn = document.querySelectorAll('.s-maps-tooltip__close');
  const storeFilterBtn = document.querySelector('.store-list__txt button');
  const filterCloseBtn = document.querySelector('.store-filter__close');
  if (beforeLaunch(component)) return false;
  distanceBtn(listBtn);
  storeLinkBtn(storeLink);
  toolView(storeToolBtn);
  closeView(closeBtn);
  filterView(storeFilterBtn);
  filterClose(filterCloseBtn);
  runRecommendSwiper();
  dimmedClose();
  toogleBtn();
  mapBtnExpand();
  selectFilter();
  autoplayEvent();
  quickBtnScrollEvent();
  tooltipClose(toolcloseBtn);
}
init();
