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

const stickyContainerOption = {
  keyboard: behavior.useKeyInteraction,
  slidesPerView: 2,
  slidesPerGroup: 1,
  spaceBetween: 24,
  breakpoints: {
    [bp.tablet + 1]: {
      slidesPerView: 4,
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
const stickyContainerInit = (component, option) => {
  const codeBlock = component.querySelector('.c-package-deal-basket');
  const target = codeBlock.querySelector('.swiper');
  const nextEl = codeBlock.querySelector('.js-carousel-next');
  const prevEl = codeBlock.querySelector('.js-carousel-prev');
  runCarousel(target, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
    on: {
      breakpoint: (swiper, breakparam) => {
        const { slidesPerView = null } = breakparam;
        const count = slidesPerView || swiper.originalParams.slidesPerView;
        const itemLength =
          0 < swiper.slides.length ? swiper.slides.length : swiper.el.querySelectorAll('.swiper-slide').length;
        const areaRoot = swiper.el.closest('.c-package-deal-basket');
        if (swiper.slides instanceof Array && itemLength > count) {
          areaRoot.classList.add('swiper-start');
          areaRoot.classList.remove('swiper-steady');
        } else {
          areaRoot.classList.add('swiper-steady');
          areaRoot.classList.remove('swiper-start');
        }
      },
    },
  });
};

const panelToggle =
  toggleTarget =>
  ({ currentTarget }) => {
    if (toggleTarget.classList.contains('is-opened')) {
      // collapse
      toggleTarget.classList.remove('is-opened');
      currentTarget.setAttribute('aria-expanded', 'false');
    } else {
      // expand
      toggleTarget.classList.add('is-opened');
      currentTarget.setAttribute('aria-expanded', 'true');
    }
  };

const packageDealMobileSet = toggleTarget => {
  const isWeb = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`).matches;
  const toggleBtn = toggleTarget.querySelector('.js-toggle-area-button');
  if (isWeb) {
    toggleTarget.classList.add('is-opened');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
};

function init() {
  const component = document.querySelectorAll('.PR0004');
  if (beforeLaunch(component)) return false;

  component.forEach(c => {
    stickyContainerInit(c, stickyContainerOption);
    promotionSelectorInit(c, promotionSelectorOption);

    const panelToggleButton = c.querySelector('.js-toggle-area-button');
    const toggleTarget = c.querySelector('.c-package-deal-basket');
    panelToggleButton.addEventListener('click', panelToggle(toggleTarget));
    packageDealMobileSet(toggleTarget);
  });
}
init();
// export defaults
