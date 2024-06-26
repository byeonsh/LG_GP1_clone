// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import runBVStaticPLP from '../../assets/js/common/bv.js';
import runSPStaticPLP from '../../assets/js/common/sp.js';
import accordion from '../../assets/js/common/accordion.js';
import share from '../../assets/js/common/share.js';
import { review, bp } from '../../assets/js/common/constant.js';

const promotionSelectorOption = {
  ...behavior.useRollingLikeScroll({ useSticky: true, useLoop: false }),
  keyboard: behavior.useKeyInteraction,
  slidesPerGroup: 1,
  slidesPerView: 'auto',
  spaceBetween: 16,
  freeMode: {
    enabled: true,
    sticky: true,
  },
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      spaceBetween: 30,
    },
  },
};
const swiperInit = function (el, option = promotionSelectorOption) {
  // somehow `el` is coming as `null`. so doing a check first to handle JS error.
  if (!el) {
    return false;
  }
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  const swiper = el.querySelector('.swiper');
  runCarousel(swiper, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};
// Wa Type Check
const waChack = () => {
  const TabItem = document.querySelectorAll('.c-roll-selector__item');
  TabItem.forEach(c => {
    if (c.closest('.c-roll-selector').getAttribute('data-wa-type') === 'tab') {
      c.setAttribute('role', 'tab');
      c.closest('.c-roll-selector').querySelector('.c-roll-selector__item').removeAttribute('aria-selected');
      c.closest('.c-roll-selector')
        .querySelector('.c-roll-selector__item--active')
        .setAttribute('aria-selected', 'true');
      c.closest('.c-roll-selector').querySelector('.swiper-wrapper').setAttribute('role', 'tablist');
    } else if (c.closest('.c-roll-selector').getAttribute('data-wa-type') === 'page') {
      c.closest('.c-roll-selector').querySelector('.c-roll-selector__item').removeAttribute('aria-current');
      c.closest('.c-roll-selector')
        .querySelector('.c-roll-selector__item--active')
        .setAttribute('aria-current', 'page');
    }
  });
};

// component
function init() {
  const component = document.querySelectorAll('.PD0015');
  if (beforeLaunch(component)) return false;
  const promotionSelector = [...component].map(el => el.querySelector('.c-roll-selector'));
  promotionSelector.forEach(s => swiperInit(s));

  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);

  component.forEach(el => {
    // bv
    if (review.type === 'BV1') runBVStaticPLP(el);
    else if (review.type === 'SP') runSPStaticPLP(el);

    // filter accordion
    accordion.run(el);

    // share
    const productItems = el.querySelectorAll('.c-product-item');
    productItems.forEach(product => {
      if (!config) return false;
      share(product, config);
    });
  });
  waChack();
}
init();
