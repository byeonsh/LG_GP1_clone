// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { isRTL, bp, carouselPerView } from '../../assets/js/common/constant.js';
// component

const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');

  const swiper = runCarousel(el, {
    ...option,
    lazy: false,
    preloadImages: false,
    navigation: {
      prevEl,
      nextEl,
    },
  });

  return swiper;
};

const viewProductCarouselOption = {
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
  slidesPerView: carouselPerView.small,
  spaceBetween: 10,
  on: {
    slideChangeTransitionEnd: behavior.focusWhenSlideChanged,
    breakpoint: behavior.togglePagination(),
  },
  breakpoints: {
    [bp.mobile + 1]: {
      slidesPerView: 1,
    },
  },
};

const menuOption = tabPanels => {
  return {
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 6,
    initialSlide: 0,
    centeredSlides: true,
    centeredSlidesBounds: true,
    observer: true,
    // spaceBetween: 40,
    on: {
      breakpoint: behavior.togglePagination(),
      init(swiper) {
        swiper.el.classList.add('loaded');
        tabPanels[0].classList.add('cmp-tabs__tabpanel--active');
      },
      observerUpdate(swiper) {
        swiper.slideTo(0);
        // eslint-disable-next-line no-param-reassign
        swiper.params.observer = false;
      },
    },
  };
};

function init() {
  const component = document.querySelectorAll('.PD0018');
  if (beforeLaunch(component)) return false;

  const viewedProductCarousel = document.querySelectorAll(`.PD0018 .c-view-carousel .swiper`);

  const menuCarousel = document.querySelector('.PD0018 .c-menu-carousel .c-carousel');
  const menuListButton = document.querySelectorAll('.list-btn');
  const menuNextBtn = document.querySelector('.c-menu-carousel__action--next');
  const menuPrevBtn = document.querySelector('.c-menu-carousel__action--prev');

  const tabs = document.querySelectorAll('.PD0018 .cmp-tabs .cmp-tabs__tab');
  const tablist = document.querySelector('.PD0018 .cmp-tabs .cmp-tabs__tablist');
  const tabPanels = document.querySelectorAll('.PD0018 .cmp-tabs .cmp-tabs__tabpanel');

  // let currentIndex = 0;

  const menuIndex = {
    currentIndex: 0,

    get current() {
      return this.currentIndex;
    },
    set current(value) {
      this.currentIndex = value;
      if (this.currentIndex === 0) {
        // console.log('1111');
        menuPrevBtn?.classList.add('disabled');
      } else if (this.current === menuListButton.length - 1) {
        // console.log('2222');
        menuNextBtn?.classList.add('disabled');
      } else {
        // console.log('333');
        menuPrevBtn?.classList.remove('disabled');
        menuNextBtn?.classList.remove('disabled');
      }
      // console.log('바뀜', this.currentIndex);
    },
  };

  // Product Swiper
  const menuSwiper = menuListButton.length > 6 ? swiperInit(menuCarousel, menuOption(tabPanels)) : undefined;

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      menuListButton[index].click();
    });
  });

  if (menuNextBtn !== null && menuPrevBtn !== null) {
    menuNextBtn.addEventListener('click', function () {
      if (menuIndex.currentIndex + 1 < menuListButton.length) menuListButton[menuIndex.currentIndex + 1].click();
    });

    menuPrevBtn.addEventListener('click', function () {
      if (menuIndex.currentIndex - 1 >= 0) menuListButton[menuIndex.currentIndex - 1].click();
    });
  }

  // initialize carousel
  viewedProductCarousel.forEach((el, index) => {
    const slideLength = el.querySelectorAll('.swiper-slide').length;
    const handler = el.querySelector('.c-carousel__handler');
    if (slideLength < 2) {
      handler.classList.add('disabled');
    }
    // running to async 1st, 2nd carousel.
    if (index > 2) {
      const chanceStackEmpty = 0;
      setTimeout(() => swiperInit(el, viewProductCarouselOption), chanceStackEmpty);
    }
    swiperInit(el, viewProductCarouselOption);
  });

  // list button event
  menuListButton.forEach((button, index) => {
    button.addEventListener('click', function () {
      menuIndex.current = index;
      if (menuSwiper) menuSwiper.slideTo(menuIndex.currentIndex);
      menuListButton.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      tabs.forEach(el => el.classList.remove('cmp-tabs__tab--active'));
      tabs[menuIndex.currentIndex].classList.add('cmp-tabs__tab--active');

      tabPanels.forEach(el => el.classList.remove('cmp-tabs__tabpanel--active'));
      tabPanels[menuIndex.currentIndex].classList.add('cmp-tabs__tabpanel--active');
    });
  });

  // list button init
  menuListButton[0].classList.add('active');
  tabs[0].classList.add('cmp-tabs__tab--active');
  tabPanels[0].classList.add('cmp-tabs__tabpanel--active');
  menuPrevBtn.classList.add('disalbed');

  // Resize event(tab align)
  window.addEventListener('resize', function () {
    const obj = document.querySelector('.cmp-tabs__tab--active');
    const activeTabPos = obj.offsetLeft;
    const w = obj.clientWidth;
    const scrollSize = activeTabPos - 25;
    const scrollSizeRTL = document.body.clientWidth - activeTabPos - w - 25;
    if (isRTL) {
      tablist.scrollTo(-scrollSizeRTL, 0);
    } else {
      tablist.scrollTo(scrollSize, 0);
    }
  });
}
init();
// export default
