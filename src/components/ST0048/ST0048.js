// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import heroCarousel from '../../assets/js/common/heroCarousel.js';

// init
function init() {
  const carousel = document.querySelectorAll('.ST0048 .swiper');
  if (beforeLaunch(carousel)) return false;

  // carousel
  const onlyComponentCarousel = [...carousel].filter(el => !el.closest('.c-hero-banner__contents'));
  if (beforeLaunch(onlyComponentCarousel)) return false;

  onlyComponentCarousel.forEach(target => {
    if (target) {
      const carouselEventType = target.dataset.cmpAutoplay;
      const timeDelay = target.dataset.cmpTimedelay;
      const autoPause = target.dataset.cmpAutopause === 'true';
      const carouselOption = {
        type: carouselEventType,
        timeDelay,
        autoPause,
      };
      heroCarousel(target, carouselOption);
    }
  });
}

init();
