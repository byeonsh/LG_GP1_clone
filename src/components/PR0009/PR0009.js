// import module
// import module
import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const bannerOption = {
  keyboard: behavior.useKeyInteraction,
  slidesPerGroup: 1,
  spaceBetween: 10,
  loopAdditionalSlides: true,
};

const countTwoCase = element => {
  const breakpoint = window.matchMedia(`(max-width:${bp.mobile}px)`);
  const target = element.querySelector('.swiper');
  const rollingArea = element.closest('.c-promotion-banner__rolling-area');
  // const controls = element.closest('.c-rolling-banner__actions');
  const items = element.querySelectorAll('.swiper-slide');
  const nextEl = element.querySelector('.js-carousel-next');
  const prevEl = element.querySelector('.js-carousel-prev');

  // set identifier
  element.classList.add('c-rolling-banner--no-enough-loop');
  // deactivate prev button
  prevEl.setAttribute('disabled', true);

  // event listening
  const handler = {
    next(event) {
      event.currentTarget.setAttribute('disabled', true);
      prevEl.removeAttribute('disabled');
      items[1].classList.add('swiper-slide-active');
      items[0].classList.remove('swiper-slide-active');
      rollingArea.setAttribute('style', 'justify-content:flex-end');
    },
    prev(event) {
      event.currentTarget.setAttribute('disabled', true);
      nextEl.removeAttribute('disabled');
      items[0].classList.add('swiper-slide-active');
      items[1].classList.remove('swiper-slide-active');
      rollingArea.setAttribute('style', 'justify-content:flex-start');
    },
  };

  let carousel = null;
  const viewChangeHandler = mediaQueryList => {
    const onMobile = mediaQueryList.matches;

    // 768 ~
    if (!onMobile) {
      nextEl.addEventListener('click', handler.next, false);
      prevEl.addEventListener('click', handler.prev, false);

      if (carousel) {
        const keepIndex = carousel.realIndex;
        console.log(10);
        carousel.destroy(true);
        carousel = undefined;
        items[keepIndex].classList.add('swiper-slide-active');
        console.log(1231);
      }
      if (2 === items.length) {
        rollingArea.setAttribute('style', `justify-content:flex-start`);
      }
      if (1 === items.length) {
        target.classList.add('swiper--single-item');
      }
    }
    // ~ 768
    if (onMobile) {
      nextEl.removeEventListener('click', handler.next, false);
      prevEl.removeEventListener('click', handler.prev, false);

      if (carousel == null) {
        carousel = runCarousel(target, {
          ...bannerOption,
          slidesPerView: 1,
          initialSlide: [...items]
            .map(item => item.classList.value)
            .findIndex(string => string.includes('swiper-slide-active')),
          navigation: {
            prevEl,
            nextEl,
          },
        });
      }
    }
  };
  viewChangeHandler(breakpoint);
  breakpoint.addEventListener('change', viewChangeHandler, false);
};

const bannerInit = (component, option) => {
  const codeBlock = component.querySelector('.c-rolling-banner');
  if (beforeLaunch(codeBlock)) return false;

  const target = codeBlock.querySelector('.swiper');
  const itemCount = target.querySelectorAll('.swiper-slide').length;
  const loopCondition = 2 < itemCount;
  if (!loopCondition) return countTwoCase(codeBlock);

  const nextEl = target.querySelector('.js-carousel-next');
  const prevEl = target.querySelector('.js-carousel-prev');

  runCarousel(target, {
    ...option,
    slidesPerView: 1,
    loop: loopCondition,
    navigation: {
      prevEl,
      nextEl,
    },
    breakpoints: {
      // min
      [bp.mobile + 1]: {
        slidesPerView: 3,
        spaceBetween: 24,
        centeredSlides: true,
        centeredSlidesBounds: true,
        speed: 1000,
      },
    },
  });
};

// component
function init() {
  const component = document.querySelectorAll('.PR0009');
  if (beforeLaunch(component)) return false;

  component.forEach(c => bannerInit(c, bannerOption));
}
init();
// export default
