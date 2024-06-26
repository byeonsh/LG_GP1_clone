import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

// 카루젤 옵션
const carouselOption = {
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: 'auto',
  centeredSlides: false,
  spaceBetween: 10,
  breakpoints: {
    // min
    769: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
};

const swiperInit = function (target) {
  const bodySwiper = target.parentElement.querySelector('.c-carousel--gallery');
  const swiperFraction = target.parentElement.querySelector('.c-carousel__pagination');
  const nextButton = target.parentElement.querySelector('.js-carousel-next');
  const prevButton = target.parentElement.querySelector('.js-carousel-prev');
  runCarousel(bodySwiper, {
    ...carouselOption,
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    slidesPerView: 1,
  });
};

const classfier = function (type, target) {
  // let { swiper = undefined } = target;
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
  const component = document.querySelectorAll('.CS0090');
  if (beforeLaunch(component)) return false;

  // swiper
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    function carouselControl(element) {
      const target = element.querySelector('.c-carousel');
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      const itemCount = element.querySelectorAll('.swiper-slide').length;
      const handler = element.querySelector('.c-carousel__handler');
      // const swiperWrapper = element.querySelector('.swiper-wrapper');

      if (!isWeb && carouselHas) {
        console.log('destroy');
        return classfier('swiper destroy', target);
      }
      if (isWeb && carouselNone) {
        console.log('init');
        if (itemCount <= 6) {
          console.log('6 이하');
          handler.style.display = 'none';
          // if (isWeb && itemCount === 6) {
          //     // eslint-disable-next-line no-return-assign
          //     return (swiperWrapper.style.justifyContent = 'flex-start');
          // }
        }

        return classfier('swiper init', target);
      }
    }
    component.forEach(function (element) {
      const target = element.querySelectorAll('.c-carousel');
      if (beforeLaunch(target)) return false;
      carouselControl(element);
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}

init();
