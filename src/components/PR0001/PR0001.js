// import module
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp } from '../../assets/js/common/constant.js';

const promotionSelectorOption = {
  ...behavior.useRollingLikeScroll({ useSticky: true, useLoop: false }),
  keyboard: behavior.useKeyInteraction,
  slidesPerGroup: 1,
  slidesPerView: 4,
  spaceBetween: 16,
  freeMode: {
    enabled: true,
    sticky: true,
  },
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      spaceBetween: 30,
      slidesPerView: 'auto',
    },
  },
};
const swiperInit = function (el, option = promotionSelectorOption) {
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
  TabItem?.forEach(c => {
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
  const component = document.querySelectorAll('.PR0001');
  if (beforeLaunch(component)) return false;
  const promotionSelector = [...component].map(el => el.querySelector('.c-roll-selector'));
  promotionSelector.forEach(s => swiperInit(s));
  waChack();
}
init();
// export default
