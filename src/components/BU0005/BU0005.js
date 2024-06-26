// import module
import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

// component
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

const promotionSelectorInit = function (component, option) {
  const codeBlock = component.querySelector('.c-roll-selector');
  const target = codeBlock.querySelector('.swiper');
  const nextEl = codeBlock.querySelector('.js-carousel-next');
  const prevEl = codeBlock.querySelector('.js-carousel-prev');
  runCarousel(target, {
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

function init() {
  const component = document.querySelectorAll('.BU0005');
  if (beforeLaunch(component)) return false;

  component.forEach(c => {
    promotionSelectorInit(c, promotionSelectorOption);
  });
  waChack();
}
init();
// export defaults
