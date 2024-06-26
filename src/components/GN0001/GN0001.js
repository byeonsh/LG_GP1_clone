// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import heroCarousel from '../../assets/js/common/heroCarousel.js';
import { bp } from '../../assets/js/common/constant.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

function recentStory() {
  const recentStoryCarousel = document.querySelectorAll('.GN0001 .c-recentStory .swiper');
  if (beforeLaunch(recentStoryCarousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const carouselOptions = {
    keyboard: behavior.useKeyInteraction,
    pagination: behavior.pagination,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
  };
  recentStoryCarousel.forEach(target => {
    let targetSwiper;
    const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
    const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
    const togglemySwiper = function (mediaQuery) {
      // mobile view
      if (!mediaQuery.matches) {
        targetSwiper =
          targetSwiper === undefined
            ? runCarousel(target, {
                ...carouselOptions,
                navigation: {
                  nextEl,
                  prevEl,
                },
              })
            : undefined;
        return;
      }
      if (targetSwiper !== undefined) {
        targetSwiper.destroy(true, true);
        targetSwiper = undefined;
      }
    };
    breakpoint.addEventListener('change', togglemySwiper);
    togglemySwiper(breakpoint);
  });
}
// init
function init() {
  const carousel = document.querySelectorAll('.GN0001 .c-banner .swiper');
  if (beforeLaunch(carousel)) return false;

  // carousel
  const onlyComponentCarousel = [...carousel].filter(el => !el.closest('.c-hero-banner__contents'));
  if (beforeLaunch(onlyComponentCarousel)) return false;

  onlyComponentCarousel.forEach(target => {
    if (target) {
      console.log(target, target.dataset, target.dataset.cmpAutoplay);
      const carouselEventType = target.dataset.cmpAutoplay;
      const carouselOption = {
        type: carouselEventType,
      };
      heroCarousel(target, carouselOption);
    }
  });

  recentStory();
}

init();
