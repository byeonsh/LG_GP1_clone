import { bp, keyboard } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const casouselCommonOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  loop: false,
  autoplay: false,
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: 1,
};

const carouselListOption = {
  ...casouselCommonOption,
  speed: 500,
  slideToClickedSlide: true,
  watchSlidesProgress: true,
  on: {
    breakpoint: behavior.togglePagination(),
  },
  a11y: {
    slideRole: 'tab',
  },
  // watchSlidesVisibility: true,
  // breakpoints: {
  //     // min
  //     [bp.mobile + 1]: {
  //         slidesPerView: 'auto',
  //         pagination: {
  //             enabled: false,
  //         },
  //         allowTouchMove: false,
  //     },
  // },
};
const carouselpanelOption = {
  ...casouselCommonOption,
  speed: 1000,
  effect: 'fade',
  watchSlidesProgress: true,
  fadeEffect: {
    crossFade: true,
  },
  // breakpoints: {
  //     // min
  //     [bp.mobile + 1]: {
  //         slidesPerView: 1,
  //         // allowTouchMove: false,
  //     },
  // },
};

// on mobile
const swiperInit = function (target) {
  const listSwiper = target.querySelector('.c-carousel-tabs__list .c-carousel');
  const panelSwiper = target.querySelector('.c-carousel-tabs__panel .c-carousel');
  const listSwiperItem = listSwiper.querySelectorAll('.c-carousel__item');
  const nextEl = listSwiper.querySelector('.js-carousel-next');
  const prevEl = listSwiper.querySelector('.js-carousel-prev');
  listSwiperItem.forEach(el => {
    el.removeAttribute('tabindex');
  });

  const panelCarousel = runCarousel(panelSwiper, carouselpanelOption);
  const listCarousel = runCarousel(listSwiper, {
    ...carouselListOption,
    navigation: {
      nextEl,
      prevEl,
    },
    on: {
      init() {
        this.slides.forEach(el => {
          el.setAttribute('aria-selected', 'false');
        });
        this.slides[this.activeIndex].setAttribute('aria-selected', 'true');
      },
      activeIndexChange() {
        this.slides.forEach(el => {
          el.setAttribute('aria-selected', 'false');
        });
        this.slides[this.activeIndex].setAttribute('aria-selected', 'true');
      },
    },
  });
  listCarousel.controller.control = panelCarousel;
  panelCarousel.controller.control = listCarousel;
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

const keyupTab = event => {
  const keycode = event.keyCode;
  const tabList = event.target.closest('.swiper-wrapper');
  const currentItem = event.target.closest('.c-carousel__item');
  const nodes = [...tabList.children];
  let index = nodes.indexOf(currentItem);
  if (currentItem.length === 0) return false;
  if (keycode === keyboard.left) {
    // left arrow key
    index -= 1;
  } else if (keycode === keyboard.right) {
    // right arrow key
    index += 1;
  }
  if (index >= 0 && index < nodes.length) {
    const tab = nodes[index];
    tab.focus();
    tab.click();
  }
};

// on desktop
const desktopTab = function (target) {
  const listSwiper = target.querySelector('.c-carousel-tabs__list .c-carousel');
  const panelSwiper = target.querySelector('.c-carousel-tabs__panel .c-carousel');
  const listSwiperList = target.querySelector('.c-carousel-tabs__list .swiper-wrapper');
  const listItem = listSwiper.querySelectorAll('.c-carousel__item');
  const panelItem = panelSwiper.querySelectorAll('.c-carousel__item');
  const firstListItem = listItem[0];
  const activeEvent = (activeItem, index) => {
    listItem.forEach(item => {
      item.classList.remove('swiper-slide-active');
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('tabindex', '-1');
    });
    panelItem.forEach(item => {
      item.classList.remove('swiper-slide-active');
      // item.setAttribute('tabindex', '-1');
    });
    activeItem.classList.add('swiper-slide-active');
    activeItem.setAttribute('aria-selected', 'true');
    activeItem.setAttribute('tabindex', '0');
    panelItem[index].classList.add('swiper-slide-active');
    // panelItem[index].setAttribute('tabindex', '0');
  };

  // set active first
  if (target.classList.contains('desktop')) activeEvent(firstListItem, 0);
  listItem.forEach((el, index) => {
    el.addEventListener('click', () => {
      if (target.classList.contains('desktop')) activeEvent(el, index);
    });
  });
  if (target.classList.contains('desktop')) listSwiperList.addEventListener('keyup', keyupTab);
};

// init
function init() {
  const component = document.querySelectorAll('.ST0036');
  if (beforeLaunch(component)) return false;
  // carousel
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    function carouselControl(target) {
      const swiperAll = target.querySelectorAll('.c-carousel');
      swiperAll.forEach(el => {
        const carouselHas = el.swiper !== undefined;
        const carouselNone = el.swiper === undefined;
        // on desktop
        if (isWeb && carouselNone) {
          target.classList.add('desktop');
          desktopTab(target);
        }
        // mobile => desktop
        if (isWeb && carouselHas) {
          classfier('swiper destroy', el);
          target.classList.remove('mobile');
          target.classList.add('desktop');
          desktopTab(target);
        }
        // on mobile
        if (!isWeb && carouselNone) {
          target.classList.remove('desktop');
          target.classList.add('mobile');
          return classfier('swiper init', target);
        }
      });
    }
    component.forEach(element => {
      const target = element.querySelectorAll('.c-carousel-tabs');
      if (beforeLaunch(target)) return false;
      target.forEach(carouselTab => {
        carouselControl(carouselTab);
      });
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}
init();
