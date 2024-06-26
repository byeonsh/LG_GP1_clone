// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
// component
const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  loop: false,
  speed: 500,
  autoplay: false,
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  centeredSlides: false,
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.tablet + 1]: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 24,
      allowTouchMove: false,
    },
  },
};

export const swiperInit = function (component) {
  const bodySwiper = component.querySelector('.c-carousel--compare');
  const swiperFraction = component.querySelector('.c-carousel__pagination');
  const nextButton = component.querySelector('.js-carousel-next');
  const prevButton = component.querySelector('.js-carousel-prev');
  return runCarousel(bodySwiper, {
    ...carouselOption,
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
};

export const panelToggle =
  component =>
  ({ currentTarget }) => {
    if (component.classList.contains('is-opened')) {
      // collapse
      component.classList.remove('is-opened');
      currentTarget.setAttribute('aria-expanded', 'false');
    } else {
      // expand
      component.classList.add('is-opened');
      currentTarget.setAttribute('aria-expanded', 'true');
    }
  };

// const setOnScreenPosition = ({ component, bottomSheet }) => {
//     if (beforeLaunch(bottomSheet)) return false;

//     const target = component.querySelector('.cmp-container');

//     const observeTarget = bottomSheet;
//     const callback = entries => {
//         entries.forEach(entry => {
//             const height = getElementRenderStyle(entry.target, 'height');
//             target.setAttribute('style', `bottom:${height}`);
//         });
//     };
//     const observer = new ResizeObserver(callback);
//     observer.observe(observeTarget);
// };

// const presetOnPDP = component => {
//     const selector = '.PD0033.type-pdp';
//     const pdpBottomSheet = document.querySelector(`${selector} .c-bottom-sheet--pdp`);
//     if (beforeLaunch(pdpBottomSheet)) return false;

//     pdpBottomSheet.classList.add('c-bottom-sheet--square-edge');
//     setOnScreenPosition({ component, bottomSheet: pdpBottomSheet });
// };

function init() {
  const component = document.querySelectorAll('.PD0014');
  if (beforeLaunch(component)) return false;

  component.forEach(c => {
    const panelToggleButton = c.querySelector('.c-compare-toggle');
    panelToggleButton.addEventListener('click', panelToggle(c));
    swiperInit(c);
  });
}
init();
// export default init;
