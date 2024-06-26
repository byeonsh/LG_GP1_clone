// import module
import accordion from '../../assets/js/common/accordion.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  slidesPerView: 1,
  slidesPerGroup: 1,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
  on: {
    breakpoint: behavior.togglePagination(),
  },
};

// const preventFeature = function (elements) {
//     const { offmode } = accordion.selector;
//     elements.forEach(el => el.classList.add(offmode));
// };

// const recoveryFeature = function (elements) {
//     const { offmode } = accordion.selector;
//     elements.forEach(el => el.classList.remove(offmode));
// };

// component
function init(elements = null) {
  const component = elements || document.querySelectorAll('.PD0048');
  if (beforeLaunch(component)) return false;

  const activateCount = 4;

  component.forEach(c => {
    accordion.run(c);

    const accordionBoxes = c.querySelectorAll(accordion.selector.handleTarget);
    const activateDeny = activateCount > accordionBoxes.length;
    // if (activateDeny) return preventFeature(accordionBoxes);
    if (activateDeny) return;

    const carousel = c.querySelector('.swiper');
    const nextEl = carousel.querySelector('.js-carousel-next');
    const prevEl = carousel.querySelector('.js-carousel-prev');
    runCarousel(carousel, {
      ...carouselOption,
      navigation: {
        prevEl,
        nextEl,
      },
    });
  });
}
init();
// export default
