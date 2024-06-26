// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp, carouselPerView } from '../../assets/js/common/constant.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const tabletView = 2;
const mobileView = 1;

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: carouselPerView.small,
  slidesPerGroup: 1,
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: tabletView,
      allowTouchMove: false,
      spaceBetween: 24,
    },
  },
};

const swiperInit = function (target) {
  const swiperFraction = target.querySelector('.c-carousel__pagination');
  const nextEl = target.querySelector('.js-carousel-next');
  const prevEl = target.querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

const classfier = function (type, target) {
  switch (type) {
    case 'swiper init':
      return swiperInit(target);
    case 'swiper destroy':
      target.swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.swiper = undefined;
      return;
    default:
      return console.log('non case');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.PR0008');
  if (beforeLaunch(component)) return false;
  // carousel
  const viewChangeHandler = function () {
    const ww = window.innerWidth;
    const desktopSize = ww >= bp.tablet + 1;
    const tabletSize = ww >= bp.mobile + 1 && ww <= bp.tablet;
    const mobileSize = ww <= bp.mobile + 1;
    let num;
    if (tabletSize) num = tabletView;
    if (mobileSize) num = mobileView;
    function carouselControl(element) {
      const target = element.querySelectorAll('.c-carousel');
      target.forEach(slide => {
        const items = slide.querySelectorAll('.swiper-slide');
        const carouselHas = slide.swiper !== undefined;
        const carouselNone = slide.swiper === undefined;
        if (desktopSize && carouselHas) {
          return classfier('swiper destroy', slide);
        }
        if (num >= items.length && carouselHas) {
          return classfier('swiper destroy', slide);
        }
        if (num < items.length && carouselNone) {
          return classfier('swiper init', slide);
        }
      });
    }
    component.forEach(element => {
      const target = element.querySelectorAll('.c-carousel');
      if (beforeLaunch(target)) return false;
      carouselControl(element);
    });
  };
  viewChangeHandler();
  window.addEventListener('resize', viewChangeHandler, false);
}
init();
// export default
