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
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: 3,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
    [bp.tablet + 1]: {
      slidesPerView: 6,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
  },
};

const swiperInit = function (target) {
  const bodySwiper = target.parentElement.querySelector('.component:not(.type-banner__slide2) .c-carousel--gallery');
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
  const component = document.querySelectorAll('.CS0017 .type-home');
  if (beforeLaunch(component)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const gallerySwiper = document.querySelectorAll('.CS0017 .type-img__slide .c-gallery-container');
  // const typeAccordion = document.querySelectorAll('.CS0200');

  gallerySwiper.forEach(target => {
    return swiperInit(target);
  });

  const viewChangeHandler = function (mediaQueryList) {
    component.forEach(function (element) {
      // console.log(element);
      const itemCount = element.querySelectorAll('.swiper-slide').length;
      const isWeb = mediaQueryList.matches;
      const typeHome = element.classList.contains('type-home');
      const showHandler = element.classList.contains('type-img__slide');
      const target = element.querySelector('.c-carousel');
      const carouselHas = target.swiper !== undefined;
      const handler = element.querySelector('.c-carousel__handler');
      const swiperWrapper = element.querySelector('.swiper-wrapper');
      if (typeHome && !isWeb) {
        classfier('swiper init', target);
      }
      if (typeHome && showHandler && isWeb && itemCount <= 6) {
        handler.classList.add('less6');
        if (isWeb && itemCount < 6) {
          // eslint-disable-next-line no-return-assign
          return (swiperWrapper.style.justifyContent = 'center');
        }
        if (isWeb && itemCount === 6) {
          // eslint-disable-next-line no-return-assign
          return (swiperWrapper.style.justifyContent = 'flex-start');
        }
        // eslint-disable-next-line no-unused-expressions
        return carouselHas && classfier('swiper destroy', target);
      }
    });
  };
  // typeAccordion.forEach(el => accordion.run(el));
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}

init();

// Change label when option is selected
// const selectLabelChange = function (el) {
//     const changeLabel = el.parentElement.parentElement.querySelector('.c-product-qrcode__name');
//     const dataResult = el[el.selectedIndex];
//     changeLabel.innerHTML = dataResult.dataset.changeLabel;
// };
// function init4() {
//     const component = document.querySelectorAll('#orderBy');
//     console.log(component);
//     if (beforeLaunch(component)) return false;
//     component.forEach(el => {
//         el.addEventListener('change', function () {
//             return selectLabelChange(el);
//         });
//     });
// }
// init4();
