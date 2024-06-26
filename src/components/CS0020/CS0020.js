import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import swiper from '../../assets/js/vendors/swiper.js';

// eslint-disable-next-line new-cap, no-unused-vars
const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 3,
});
// eslint-disable-next-line new-cap, no-unused-vars
const selectedPrdSwiper = new swiper('.c-selected-prd__list.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  spaceBetween: 8,
});

// 카루젤 옵션
const carouselOption2 = {
  pagination: behavior.pagination,
  spaceBetween: 10,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  slidesPerView: 1,
  breakpoints: {
    769: {
      slidesPerGroup: 3,
      spaceBetween: 50,
      pagination: {
        enabled: true,
      },
    },
  },
};

const swiperInit2 = el => {
  const swiperFraction2 = el.parentElement.querySelector('.CS0020 .type-card__slide .c-carousel__pagination');
  const nextButton = el.parentElement.querySelector('.js-carousel-next');
  const prevButton = el.parentElement.querySelector('.js-carousel-prev');
  let activeSlide = '';
  runCarousel(el, {
    ...carouselOption2,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      el: swiperFraction2,
      type: 'fraction',
    },
    breakpoints: {
      // min
      769: {
        slideToClickedSlide: true,
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 12,
        pagination: {
          enabled: true,
        },
        preventClicks: false,
        loopFillGroupWithBlank: true,
      },
    },
    on: {
      init: () => {
        activeSlide = el.parentElement.querySelector('.swiper-slide-active');
      },
      click: index => {
        if (el.closest('.type-card__slide').classList.contains('type-card__slide--multiselect')) {
          index.clickedSlide.classList.toggle('custom-active');
        } else if (el.closest('.type-card__slide').classList.contains('type-card__slide--select')) {
          activeSlide.classList.remove('custom-active');
          index.clickedSlide.classList.add('custom-active');
          activeSlide = index.clickedSlide;
        }
      },
    },
  });
};

function init5() {
  const component = document.querySelectorAll('.CS0020');
  if (beforeLaunch(component)) return false;
  const viewedProductCarousel = document.querySelectorAll('.CS0020 .type-card__slide .swiper');
  if (beforeLaunch(viewedProductCarousel)) return false;

  // initialize carousel
  viewedProductCarousel.forEach(el => {
    const itemCount = el.querySelectorAll('.type-card__slide .swiper-slide:not(.emptyCard)').length;
    const cardMoreBtn = el.querySelector('.type-card__slide .c-viewMore-btn');
    if (itemCount <= 3) {
      cardMoreBtn.classList.add('hidden');
    }
    swiperInit2(el);
  });
}
init5();

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  slidesPerView: 1,
  spaceBetween: 10,
  on: {
    breakpoint: behavior.togglePagination(),
  },
};
const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');
  const carousel = el.querySelector('.c-selected-model__swiper .cmp-carousel.swiper');
  runCarousel(carousel, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });
};

// init
function init() {
  const component = document.querySelectorAll('.CS0020');
  if (beforeLaunch(component)) return false;

  component.forEach(el => swiperInit(el, carouselOption));
}

init();

function removeItem(arr, value) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
// select registered product popup
const productListActive = function () {
  const productListItem = document.querySelectorAll('.c-selected-registered__popup .swiper-slide');
  const selectArr = [];

  productListItem.forEach(item => {
    item.addEventListener('click', () => {
      // productListItem.forEach(el => {
      //     el.classList.remove('swiper-slide--active');
      // });

      if (selectArr.includes(item)) {
        removeItem(selectArr, item);
        item.classList.remove('swiper-slide--active');
      } else if (selectArr.length < 3) {
        selectArr.push(item);
        item.classList.add('swiper-slide--active');
      }
    });
  });
};

productListActive();

const carouselOption3 = {
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
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      slidesPerView: '2',
      allowTouchMove: false,
    },
    [bp.tablet + 1]: {
      slidesPerView: 3,
    },
  },
};

const swiperInit3 = function (target) {
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption3,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

const addBtnMore = function (target, items, addFlag = true) {
  const max = 5;
  // console.log(target)
  const ctaAreaColumn = target.closest('.carousel').querySelector('.c-cta');
  // console.log('ctaAreaColumn')
  // console.log(ctaAreaColumn)
  const button = ctaAreaColumn.querySelector('.c-button');
  // preset
  if (max >= items.length && addFlag) ctaAreaColumn.classList.add('hidden');
  if (max < items.length) ctaAreaColumn.classList.remove('hidden');
  if (!addFlag) ctaAreaColumn.classList.add('hidden');
  items.forEach((item, index) => {
    if (index > max - 1 && addFlag) item.classList.add('hidden');
  });
  // event listening
  const handler = function (event) {
    event.preventDefault();
    [...items].filter(item => item.classList.contains('hidden')).forEach(item => item.classList.remove('hidden'));
    this.classList.remove('hidden');
    ctaAreaColumn.classList.add('hidden');
  };
  if (!addFlag) return button.removeEventListener('click', handler);
  button.addEventListener('click', handler, false);
};

const classfier = function (type, target, items = null) {
  // let { swiper = undefined } = target;
  switch (type) {
    case 'swiper init':
      return swiperInit3(target);
    case 'swiper destroy':
      target.swiper.destroy(true, true);
      // eslint-disable-next-line no-param-reassign
      target.swiper = undefined;
      return;
    case 'add more button':
      return addBtnMore(target, items);
    case 'remove more button':
      return addBtnMore(target, items, false);
    default:
      return console.log('non case');
  }
};

// init
function init2() {
  const component = document.querySelectorAll('.CS0020');
  if (beforeLaunch(component)) return false;

  // carousel
  const carousel = document.querySelectorAll('.CS0020 .c-carousel');
  if (beforeLaunch(carousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);

  // no swiper
  // item.length <= 1 isMobile
  // item.length <= 4 isWeb
  // type:home isMobile

  // more
  // type:home isMobile

  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    const webNum = 4;
    const mobileNum = 1;
    // component.forEach(function (element) {
    // const typeHome = element.classList.contains('type-home');
    const typeHome = document.querySelector('.type-home');
    const target = typeHome.querySelector('.c-carousel');
    const items = target.querySelectorAll('.swiper-slide');
    const num = mediaQueryList.matches ? webNum : mobileNum;
    const carouselHas = target.swiper !== undefined;
    const carouselNone = target.swiper === undefined;
    // type:home
    if (typeHome && isWeb) {
      classfier('remove more button', target, items);
    }
    if (typeHome && !isWeb) {
      // eslint-disable-next-line no-unused-expressions
      carouselHas && classfier('swiper destroy', target);
      return classfier('add more button', target, items);
    }
    // type:category(default)
    if (num >= items.length && carouselHas) return classfier('swiper destroy', target);
    if (num < items.length && carouselNone) return classfier('swiper init', target);
    // });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}
init2();
