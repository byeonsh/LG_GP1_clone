import { Swiper } from '../vendors/swiper.js';
import countDown from './countdown.js';
import { Media } from './media.js';

export const behavior = {
  bullets: {
    el: '.c-carousel__pagination',
    enabled: true,
    type: 'bullets',
    bulletElement: 'li',
    bulletClass: 'cmp-carousel__indicator c-carousel__bullet',
    bulletActiveClass: 'cmp-carousel__indicator--active',
    clickable: true,
  },
  pagination: {
    el: '.c-carousel__pagination',
    enabled: true,
    type: 'fraction',
    handlerCheck: false,
  },
  useKeyInteraction: {
    enabled: true,
    onlyInViewport: false,
  },
  autoplayEvent(button, swiper) {
    const buttonDisable = 'aria-hidden';
    const handler = {
      play() {
        button.pause.removeAttribute(buttonDisable);
        this.setAttribute(buttonDisable, 'true');
        swiper.autoplay.run();
      },
      pause() {
        button.play.removeAttribute(buttonDisable);
        this.setAttribute(buttonDisable, 'true');
        swiper.autoplay.pause();
      },
    };
    button.play.addEventListener('click', handler.play, false);
    button.pause.addEventListener('click', handler.pause, false);
  },
  togglePagination(targetSelector = '.c-carousel__handler', markingTarget = null) {
    // console.log('targetSelector :', targetSelector);
    return (swiper, breakpointParams) => {
      const count = swiper.$el[0].querySelectorAll('.swiper-slide').length;
      const lowCount = count <= breakpointParams?.slidesPerView;
      // console.log(breakpointParams?.slidesPerView, lowCount);
      // write flag
      const useParamElement = null != markingTarget && markingTarget?.tagName && markingTarget;
      const where = useParamElement || swiper.wrapperEl;
      if (lowCount) {
        // console.log('lowcount');
        where.classList.remove('swiper-start');
        where.classList.add('swiper-steady');
      } else {
        where.classList.add('swiper-start');
        where.classList.remove('swiper-steady');
      }
      const criterion = breakpointParams?.pagination || swiper.originalParams.pagination;
      const unablePagination = lowCount || criterion.enabled !== true;
      const myself = swiper.$el[0];
      let handler = myself.querySelector(targetSelector);
      // if (unablePagination) return handler.classList.add('hidden');
      // handler.classList.remove('hidden');
      const pagination = swiper.originalParams.pagination.el;
      if (swiper.originalParams.pagination.handlerCheck) {
        const totalCountElement = handler.querySelector(`.${swiper.originalParams.pagination.totalClass}`);
        handler = handler || pagination.closest(targetSelector);

        if (handler) {
          const condition = totalCountElement?.innerText === '1';
          if (unablePagination || condition) {
            handler.classList.add('hidden');
          } else {
            handler.classList.remove('hidden');
          }
        }
      } else {
        if (!handler) handler = pagination.closest(targetSelector);
        if (handler) {
          if (unablePagination) return handler.classList.add('hidden');
          handler.classList.remove('hidden');
        }
      } // handlerCheck condition
    };
  },
  toggleArrow(swiper) {
    const handleClassname = 'swiper-allow-arrow';
    const useArrow = swiper.allowSlideNext;
    if (useArrow) return swiper.wrapperEl.classList.add(handleClassname);
    swiper.wrapperEl.classList.remove(handleClassname);
  },
  useRollingLikeScroll({ useLoop }) {
    return {
      slidesPerView: 4,
      // freeMode: {
      //     enabled: true,
      //     sticky: useSticky,
      // },
      loop: useLoop,
      on: {
        afterInit: behavior.toggleArrow,
        resize: behavior.toggleArrow,
      },
    };
  },
  focusWhenSlideChanged(swiper) {
    const currentIndex = swiper.realIndex;
    if (currentIndex >= swiper.slides.length) return false;
    const activeSwiperSlide = swiper.slides[currentIndex];
    const firstFocusableElement = activeSwiperSlide.querySelector('a, button:not(:disabled), input, [tabindex="0"]');
    if (firstFocusableElement) firstFocusableElement.focus();
  },
};

// for clone slide event on
export function duplicateSlideInit(swiper) {
  // when use "loop" check,
  const loopFlag = swiper.originalParams.loop;
  // event module execute to clone items.
  if (loopFlag) {
    const dynamicSlide = swiper.el.querySelector('.swiper-slide-duplicate .c-media');
    const dynamicCountdown = swiper.el.querySelector('.swiper-slide-duplicate .c-countdown');
    // console.log('dynamicCountdown', dynamicCountdown);
    // media
    if (dynamicSlide) Media(dynamicSlide);
    // other
    if (dynamicCountdown) countDown();
    // ....
  }
}

function runCarousel(item, option) {
  const swiper = new Swiper(item, option);
  return swiper;
}
export default runCarousel;
