import { bp } from './constant.js';
import { beforeLaunch } from './utils.js';
import runCarousel, { behavior } from './carousel.js';

function specInfo() {
  const component = document.querySelectorAll('.c-spec-info');
  if (beforeLaunch(component)) return false;

  const carouselOptions = {
    loop: false,
    spaceBetween: 10,
    pagination: behavior.pagination,
    // on: {
    //     touchStart(swiper, event) {
    //         const isNested = swiper.$el.closest('.inside-component').length > 0;
    //         if (isNested) {
    //             event.stopImmediatePropagation();
    //         }
    //     },
    // },
  };

  // carousel
  const carousel = document.querySelectorAll('.c-spec-info .c-carousel');
  if (beforeLaunch(carousel)) return false;
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);

  carousel.forEach(target => {
    let myswiper;
    const nextEl = target.closest('.carousel').querySelector('.js-carousel-next');
    const prevEl = target.closest('.carousel').querySelector('.js-carousel-prev');
    const togglemySwiper = function (mediaQueryList) {
      // mobile view
      if (!mediaQueryList.matches) {
        myswiper =
          myswiper === undefined
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
      if (myswiper !== undefined) {
        myswiper.destroy(true, true);
        myswiper = undefined;
      }
    };
    breakpoint.addEventListener('change', togglemySwiper);
    togglemySwiper(breakpoint);
  });
}

export default specInfo;
