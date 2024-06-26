// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';

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

const swiperInit = function (target) {
  const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
    },
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
function init2() {
  const component = document.querySelectorAll('.thinkq-popup');
  if (beforeLaunch(component)) return false;

  // carousel
  const carousel = document.querySelectorAll('.thinkq-popup .c-carousel');
  if (beforeLaunch(carousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    const webNum = 3;
    const mobileNum = 1;
    const typeHome = document.querySelectorAll('.thinkq-popup.type-home');
    console.log(typeHome);
    typeHome.forEach(el => {
      const target = el.querySelector('.c-carousel');
      console.log(target);
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
      if (num >= items.length && carouselHas) {
        el.classList.add('disableSwiper');
        return classfier('swiper destroy', target);
      }
      if (num < items.length && carouselHas) return classfier('swiper update', target);
      if (num < items.length && carouselNone) {
        el.classList.remove('disableSwiper');
        classfier('swiper init', target);
      }
      // });
    });
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
}
init2();

// select registered product popup
const productListActive = function () {
  const listItem = document.querySelectorAll('.thinkq-popup .swiper-slide');

  const selectArr = [];

  listItem.forEach(item => {
    item.addEventListener('click', () => {
      listItem.forEach(el => {
        el.classList.remove('swiper-slide--active');
      });
      item.classList.add('swiper-slide--active');
      selectArr.push(item);
    });
    item.addEventListener('keyup', () => {
      if (window.event.keyCode === 13) {
        listItem.forEach(el => {
          el.classList.remove('swiper-slide--active');
        });
        item.classList.add('swiper-slide--active');
      }
    });
  });
};

productListActive();

const wishlistAction = () => {
  const wishListEl = '.c-icon-button--wish';
  if (beforeLaunch(wishListEl)) return false;
  const wishlistBtn = document.querySelectorAll(wishListEl);
  wishlistBtn.forEach(el => {
    el.addEventListener('click', () => {
      const isCheck = el.closest(wishListEl).classList.contains('active');
      if (isCheck) {
        el.closest(wishListEl).classList.remove('active');
      } else {
        el.closest(wishListEl).classList.add('active');
      }
      // const target = el.closest('.c-product-list__item');
      // setTimeout(()=>{target.remove()},200)
    });
  });
};
wishlistAction();

const closeEventzone = document.querySelector('.ml-event__zone .clone-self');
closeEventzone.addEventListener('click', () => {
  document.querySelector('.ml-event__zone').style.display = 'none';
});
