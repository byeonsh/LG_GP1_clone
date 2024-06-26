// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const swiperInit = function (target, option) {
  const nextEl = target.closest('.c-carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.c-carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...option,
    navigation: {
      nextEl,
      prevEl,
    },
    spaceBetween: 8,
  });
};

const toggleTable = function (event) {
  const btn = event.currentTarget;
  const container = btn.closest('.cs-search-bar__title');
  if (container.classList.contains('cs-search-bar__folded')) {
    // expand
    container.classList.remove('cs-search-bar__folded');
  } else {
    // collapse
    container.classList.add('cs-search-bar__folded');
  }
};

// component
function init() {
  const component = document.querySelector('.SE0001');
  const fold = document.querySelectorAll('.cs-search-bar__fold');
  if (beforeLaunch(component)) return false;

  // banner carousel
  const recommendedCarousel = component.querySelector(`.c-summary-recommended-promotion .swiper`);
  if (!beforeLaunch(recommendedCarousel)) {
    swiperInit(recommendedCarousel, {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: 1,
      slidesPerGroup: 1,
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      },
    });
  }
  fold.forEach(el => {
    const btnCollapse = el.querySelector('button');
    btnCollapse.addEventListener('click', toggleTable);
  });
}
init();
// export default
