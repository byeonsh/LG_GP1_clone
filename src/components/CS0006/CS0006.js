import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

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
  const swiperFraction2 = el.parentElement.querySelector('.type-card__slide .c-carousel__pagination');
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
        // 20230308 spaceBetween number change
        spaceBetween: 24,
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

function init2() {
  const component = document.querySelectorAll('.CS0006');
  if (beforeLaunch(component)) return false;
  const viewedProductCarousel = document.querySelectorAll('.CS0006 .type-card__slide .swiper');
  if (beforeLaunch(viewedProductCarousel)) return false;

  // initialize carousel
  viewedProductCarousel.forEach(el => {
    const itemCount = el.querySelectorAll('.type-card__slide .swiper-slide:not(.emptyCard)').length;
    const cardMoreBtn = el.querySelector('.type-card__slide .c-viewMore-btn');
    const handler = el.querySelector('.c-carousel__handler');
    if (itemCount <= 3) {
      cardMoreBtn.classList.add('hidden');
    }
    if (itemCount < 2) {
      handler.classList.add('hidden');
      el.classList.add('noEmptyCard');
    }
    swiperInit2(el);
  });
}

init2();

const toastPopup = function () {
  const component = document.querySelector('.CS0006 .c-with-toast');
  const toastBox = component.querySelector('.toast');
  const toastOpen = document.querySelectorAll('.CS0006 .toastOpen');
  const toastCloseBtn = document.querySelector('.CS0006 .closeBtn');

  toastOpen.forEach(toastItem => {
    toastItem.addEventListener('click', function () {
      toastBox.className = 'show';
      setTimeout(function () {
        toastBox.className = toastBox.className.replace('show', '');
      }, 3000);
      if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', function () {
          toastBox.className = '';
        });
      }
    });
  });
};
toastPopup();

const clickRoleGroup = function () {
  // const clickDiv = document.querySelectorAll('.cmp-carousel__item');
  const clickDiv = document.querySelectorAll(
    '.type-card__slide--select .cmp-carousel__item, .type-card__slide--multiselect .cmp-carousel__item'
  );
  clickDiv.forEach(function (i) {
    i.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        this.classList.toggle('custom-active');
      }
    });
  });
};
clickRoleGroup();
