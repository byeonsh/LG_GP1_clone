import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

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
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    // min
    [bp.mobile + 1]: {
      spaceBetween: 24,
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

// folding action
const foldingEvent = function (target) {
  const foldingTarget = target.querySelectorAll('.c-folding');
  if (beforeLaunch(foldingTarget)) return false;
  // toggle
  function toggleFold(toggleBtn, closeBtn, foldingCont) {
    const getAriaExpand = toggleBtn.getAttribute('aria-expanded');
    foldingCont.classList.toggle('active');
    if (getAriaExpand === 'true') {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('active');
      closeBtn.setAttribute('aria-expanded', 'false');
    } else {
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.classList.add('active');
      closeBtn.setAttribute('aria-expanded', 'true');
    }
  }
  // close
  function closeFold(toggleBtn, closeBtn, foldingCont) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('active');
    toggleBtn.focus();
    closeBtn.setAttribute('aria-expanded', 'false');
    foldingCont.classList.remove('active');
  }
  foldingTarget.forEach(function (element) {
    const toggleBtn = element.querySelector('.c-folding__toggle');
    if (toggleBtn == null) return false;
    const closeBtn = element.querySelector('.c-folding__close');
    const foldingWrapper = toggleBtn.closest('.c-folding__wrapper');
    const foldingArea = foldingWrapper.querySelector('.c-folding__folding-area');
    toggleBtn.addEventListener(
      'click',
      function () {
        toggleFold(toggleBtn, closeBtn, foldingArea);
      },
      false
    );
    closeBtn.addEventListener(
      'click',
      function () {
        closeFold(toggleBtn, closeBtn, foldingArea);
      },
      false
    );
  });
};

function init() {
  const component = document.querySelectorAll('.ST0016');
  if (beforeLaunch(component)) return false;

  function carouselControl(element) {
    const target = element.querySelector('.c-carousel__card');
    const items = target.querySelectorAll('.swiper-slide');
    // Run swiper when there are more than 2 items
    if (items.length >= 2) return swiperInit(target);
  }

  component.forEach(function (element) {
    // carousel
    const target = element.querySelector('.c-carousel__card');
    if (target) {
      carouselControl(element);
    }

    // folding
    const foldingTarget = element.querySelector('.c-folding');
    if (foldingTarget) {
      foldingEvent(element);
    }
  });
}
init();
