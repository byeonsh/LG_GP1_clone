// import module
import { beforeLaunch } from './utils.js';
import runCarousel, { behavior } from './carousel.js';
import { bp, margin, columns, carouselPerView } from './constant.js';

export const productListSwiper = function (elements) {
  const selector = {
    list: '.js-product-list',
  };
  const carouselOption = {
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    slidesPerView: carouselPerView.small,
    // slidesPerGroup: carouselPerView.small,
    spaceBetween: 10,
    breakpoints: {
      // min
      [columns(4 * 2, 'mobile') + 25 * 2]: {
        // 680
        slidesPerView: 2,
        // slidesPerGroup: 2,
        spaceBetween: 10,
        pagination: {
          enabled: true,
        },
      },
      [bp.mobile + 1]: {
        slidesPerView: 2,
        // slidesPerGroup: 2,
        spaceBetween: 24,
        pagination: {
          enabled: true,
        },
      },
      [columns(9) + margin['inset padding'] * 2]: {
        // 1122
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
        pagination: {
          enabled: true,
        },
      },
      [columns(12) + margin['inset padding'] * 2]: {
        // 1488
        slidesPerView: 4,
        // slidesPerGroup: 4,
        spaceBetween: 24,
        pagination: {
          enabled: true,
        },
      },
    },
    on: {
      breakpoint: behavior.togglePagination(),
    },
  };

  const swiperInit = el => {
    // const itemCount = el.querySelectorAll('.swiper-slide').length;
    const nextEl = el.closest(`${selector.list} .swiper`).querySelector('.js-carousel-next');
    const prevEl = el.closest(`${selector.list} .swiper`).querySelector('.js-carousel-prev');
    runCarousel(el, {
      ...carouselOption,
      // slidesPerView: 1 < itemCount ? 2 : 1, // for layout
      navigation: {
        prevEl,
        nextEl,
      },
    });
  };

  function init() {
    const viewedProductCarousel = elements;

    if (beforeLaunch(viewedProductCarousel)) return false;
    // initialize carousel
    viewedProductCarousel.forEach((el, index) => {
      // running to async 1st, 2nd carousel.
      if (index > 2) {
        const chanceStackEmpty = 0;
        setTimeout(() => swiperInit(el), chanceStackEmpty);
      }
      swiperInit(el);
    });
  }
  init();
};

export const toggleCompare = function () {
  const toggleBtns = document.querySelectorAll('.c-result-area__compare .c-toggle-button');
  const runToggleCompare = event => {
    const el = event.target;
    const component = el.closest('.component');
    if (beforeLaunch(component)) return false;
    const productList = component.querySelector('.c-product-list');
    if (beforeLaunch(productList)) return false;
    if (productList.classList.contains('show-compare')) {
      productList.classList.remove('show-compare');
      el.setAttribute('aria-pressed', false);
    } else {
      productList.classList.add('show-compare');
      el.setAttribute('aria-pressed', true);
    }
  };
  toggleBtns.forEach(el => {
    el.addEventListener('click', runToggleCompare);
  });
};

export const toggleTooltip = function () {
  const infoTooltipArea = document.querySelectorAll('.infoTooltipArea');
  const runToggleTooltip = (event, infoTooltipNote) => {
    const arrowUi = infoTooltipNote.querySelector('.bottomArrow');
    console.log(infoTooltipNote);
    let leftValue = 0;
    if (window.innerWidth <= 770) {
      leftValue = event.target.offsetLeft;
    } else {
      leftValue = event.target.offsetLeft + 3;
    }
    console.log('infoTooltipNote.classList', infoTooltipNote.classList);
    infoTooltipNote.classList.toggle('active');
    arrowUi.style.left = `${leftValue}px`;
  };

  infoTooltipArea.forEach(el => {
    el.querySelector('.btnInfoTooltip').addEventListener('click', e =>
      runToggleTooltip(e, el.querySelector('.infoTooltipNote'))
    );
    el.querySelector('.infoTooltipNote .btnClose').addEventListener('click', e =>
      e.target.closest('.infoTooltipNote').classList.remove('active')
    );
  });
};

export const listBoxObserver = function () {
  const listBoxs = document.querySelectorAll('.c-product-item__model-group .inner');

  const outputsize = () => {
    listBoxs.forEach(box => {
      const childrenCount = box.childElementCount;
      const limitedEl = box.closest('.c-product-item__model-group').querySelector('.limited-number');
      const items = box.querySelectorAll('li');

      items.forEach(item => {
        const textLength = item.querySelector('span').textContent.length;
        const isDefaultSize = item.clientWidth < 40 && textLength < 5;
        const isMediumSize = item.clientWidth < 100 && textLength > 5;
        const parentBox = box.closest('.c-product-item__model-group');
        const colorBox = box.closest('.group-type-color');

        if (!colorBox && isMediumSize) {
          parentBox.classList.add('limited-long', 'limited');
        } else {
          parentBox.classList.add('limited');
        }

        if (limitedEl) {
          if ((isDefaultSize && childrenCount >= 6) || (isMediumSize && childrenCount >= 4)) {
            limitedEl.style.display = 'block';
          } else {
            limitedEl.style.display = 'none';
            parentBox.classList.remove('limited');
          }
        }
      });
    });
  };
  listBoxs.forEach(el => {
    if (beforeLaunch(el)) return false;
    new ResizeObserver(outputsize).observe(el);
  });
};

export default {};
