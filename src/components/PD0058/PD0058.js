// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import heroCarousel from '../../assets/js/common/heroCarousel.js';

function popCheckClass(elemId, callback) {
  var elem = document.getElementById(elemId);
  var lastClassName = elem.className;
  window.setInterval(function () {
    var { className } = elem;
    if (className !== lastClassName) {
      callback();
      lastClassName = className;
    }
  }, 100);
}

// component
function init() {
  const component = document.querySelectorAll('.PD0058');
  if (beforeLaunch(component)) return false;
  const carousel = document.querySelectorAll('#popAppDetail .swiper');
  const appPopCarousel = [...carousel].filter(el => !el.closest('.c-hero-banner__contents'));
  if (beforeLaunch(appPopCarousel)) return false;
  appPopCarousel.forEach(target => {
    const carouselEventType = target.dataset.cmpAutoplay;
    const timeDelay = target.dataset.cmpTimedelay;
    const carouselOption = {
      type: carouselEventType,
      loopUse: false,
      timeDelay,
    };
    popCheckClass('popAppDetail', function () {
      setTimeout(function () {
        if (target.swiper) {
          target.swiper.destroy(true, true);
        }
        heroCarousel(target, carouselOption);
      }, 500);
    });
  });
}
init();
