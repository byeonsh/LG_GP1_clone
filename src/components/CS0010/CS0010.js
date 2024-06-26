import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

// 카루젤 옵션
console.log(bp.mobile);
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
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
};
const carouselOption2 = {
  keyboard: behavior.useKeyInteraction,
  // pagination: behavior.pagination,
  slidesPerView: 1,
  // width:10;
  // slidesPerGroup: 1,
  spaceBetween: 10,
  breakpoints: {
    [bp.mobile + 1]: {
      slidesPerView: 4,
      // slidesPerGroup: 4,
      // slidesPerGroup: 4,
      spaceBetween: 24,
    },
    // [bp.tablet + 1]: {
    //     slidesPerView: 4,
    //     spaceBetween: 24,
    // },
  },
};

// const carouselOption3 = {
//     pagination: behavior.pagination,
//     loop: false,
//     speed: 500,
//     spaceBetween: 0,
//     slidesPerGroup: 1,
//     slidesPerView: 1,
// };

const swiperInit = function (target) {
  const bodySwiper = target.parentElement.querySelector('.component:not(.type-home-col4) .c-carousel--gallery');
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

const swiperInit2 = function (target) {
  const bodySwiper = target.querySelector('.c-carousel--gallery');
  console.log(bodySwiper);
  // const swiperFraction = target.parentElement.querySelector('.c-carousel__pagination');
  const nextButton = target.parentElement.querySelector('.js-carousel-next');
  const prevButton = target.parentElement.querySelector('.js-carousel-prev');
  runCarousel(bodySwiper, {
    ...carouselOption2,
    // pagination: {
    //     el: swiperFraction,
    //     type: 'fraction',
    // },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    // slidesPerView: 1,
  });
};

// const swiperInit3 = function (target) {
//     const bodySwiper = target.parentElement
//          .querySelector('.component:not(.type-banner__slide2) .c-carousel--gallery');
//     const swiperFraction = target.parentElement.querySelector('.c-carousel__pagination');
//     const nextButton = target.parentElement.querySelector('.js-carousel-next');
//     const prevButton = target.parentElement.querySelector('.js-carousel-prev');
//     runCarousel(bodySwiper, {
//         ...carouselOption3,
//         pagination: {
//             el: swiperFraction,
//             type: 'fraction',
//         },
//         navigation: {
//             nextEl: nextButton,
//             prevEl: prevButton,
//         },
//         slidesPerView: 1,
//     });
// };

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
// const classfier2 = function (type, target) {
//     // let { swiper = undefined } = target;
//     switch (type) {
//         case 'swiper init':
//             return swiperInit2(target);
//         case 'swiper destroy':
//             target.swiper.destroy(true, true);
//             // eslint-disable-next-line no-param-reassign
//             target.swiper = undefined;
//             return;

//         default:
//             return console.log('non case');
//     }
// };
// const classfier3 = function (type, target) {
//     // let { swiper = undefined } = target;
//     switch (type) {
//         case 'swiper init':
//             return swiperInit3(target);
//         case 'swiper destroy':
//             target.swiper.destroy(true, true);
//             // eslint-disable-next-line no-param-reassign
//             target.swiper = undefined;
//             return;

//         default:
//             return console.log('non case');
//     }
// };
// init
function init() {
  const component = document.querySelectorAll('.CS0010 .type-home');
  if (beforeLaunch(component)) return false;

  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const gallerySwiper = document.querySelectorAll('.type-img__slide .c-gallery-container');
  // const typeAccordion = document.querySelectorAll('.CS0200');

  gallerySwiper.forEach(target => {
    return swiperInit(target);
  });

  const viewChangeHandler = function (mediaQueryList) {
    component.forEach(function (element) {
      // console.log(element);
      const itemCount = element.querySelectorAll('.swiper-slide').length;
      // console.log('itemCount : ', itemCount);
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
      if (typeHome && showHandler && isWeb && itemCount <= 3) {
        handler.style.display = 'none';

        if (isWeb && itemCount < 3) {
          // eslint-disable-next-line no-return-assign
          return (swiperWrapper.style.justifyContent = 'center');
        }
        if (isWeb && itemCount === 3) {
          // eslint-disable-next-line no-return-assign
          return (swiperWrapper.style.justifyContent = 'flex-start');
        }
        // eslint-disable-next-line no-unused-expressions
        carouselHas && classfier('swiper destroy', target);
      }

      if (typeHome && showHandler && !isWeb && itemCount >= 2) {
        handler.style.display = 'flex';
        swiperWrapper.style.justifyContent = 'flex-start';
        return classfier('swiper init', target);
      }
      if (typeHome && showHandler && !isWeb && itemCount === 1) {
        swiperWrapper.style.justifyContent = 'flex-start';
        // eslint-disable-next-line no-unused-expressions
        carouselHas && classfier('swiper destroy', target);
      }
    });
  };
  // typeAccordion.forEach(el => accordion.run(el));
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}
function init2() {
  const component = document.querySelectorAll('.CS0010 .type-home-col4');
  if (beforeLaunch(component)) return false;

  const gallerySwiper = document.querySelectorAll('.type-home-col4 .c-gallery-container');
  console.log(gallerySwiper);

  gallerySwiper.forEach(target => {
    console.log(target);
    return swiperInit2(target);
  });
}

init();
init2();
