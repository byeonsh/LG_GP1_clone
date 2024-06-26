// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp } from '../../assets/js/common/constant.js';
import popUp from '../../assets/js/common/popUp.js';

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 10,
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
function init() {
  // component
  const component = document.querySelectorAll('.PD0006');
  if (beforeLaunch(component)) return false;
  const popupCont = document.querySelectorAll('.PD0006 .js-open-popup');
  // window popup
  if (popupCont.length) {
    popUp(popupCont);
  }

  // swiper
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const viewChangeHandler = function (mediaQueryList) {
    const isWeb = mediaQueryList.matches;
    function carouselControl(element) {
      const target = element.querySelector('.c-carousel');
      const carouselHas = target.swiper !== undefined;
      const carouselNone = target.swiper === undefined;
      if (isWeb && carouselHas) {
        return classfier('swiper destroy', target);
      }
      if (!isWeb && carouselNone) {
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

  component.forEach(elem => {
    const chatElem = elem.querySelector('.chat-with-us');
    if (chatElem) {
      chatElem.addEventListener('click', () => {
        let selector = 'service';
        // temporary fix for singapore to open Shopping chat.
        if (document.documentElement?.dataset?.countrycode?.toLowerCase() === 'sg') {
          selector = 'shopping';
        }
        const chat = document.querySelector(`.CM0007 .al-quick-menu .al-quick-menu-${selector}-chat .cmp-button`);
        if (chat) {
          chat.click();
        } else {
          const notOutl = document.querySelector('.al-quick-menu__box-top');
          if (notOutl) {
            notOutl.style.outline = 'none';
          }
          const chatQuickMenu = document.querySelector('.CM0007 .al-quick-btn__quickbtn');
          if (chatQuickMenu) {
            chatQuickMenu.click();
          }
        }
      });
    }
  });
}
init();
