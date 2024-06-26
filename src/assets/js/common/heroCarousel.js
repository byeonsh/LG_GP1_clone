import runCarousel, { behavior, duplicateSlideInit } from './carousel.js';
import { carouselDuration } from './constant.js';
import { beforeLaunch, promotionDateChecker } from './utils.js';

const HeroBullets = {
  el: '.c-carousel-controls__pagination',
  enabled: true,
  type: 'bullets',
  bulletElement: 'li',
  bulletClass: 'cmp-carousel__indicator c-carousel-controls__bullet',
  bulletActiveClass: 'cmp-carousel__indicator--active',
  clickable: true,
};

const featureClassName = {
  play: '.js-carousel-play',
  pause: '.js-carousel-pause',
  next: '.js-carousel-next',
  prev: '.js-carousel-prev',
  handler: '.c-carousel-controls',
};

const swiperInit = (el, option) => {
  // preset
  promotionDateChecker(el);

  // run
  const nextEl = el.querySelector(featureClassName.next);
  const prevEl = el.querySelector(featureClassName.prev);
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

// for bullet
const bulletHTML = {
  title(name = '') {
    return `
            <div class="cmp-carousel__indicator c-carousel-controls__bullet" role="button" aria-label="${name}-slide">
                <span class="c-carousel-controls__item-name font-w-normal-16 font-m-normal-14i">${name}</span>
            </div>
        `.trim();
  },
  basic() {
    return `<span class="cmp-carousel__indicator c-carousel-controls__bullet"></span>`;
  },
};
// for text bullet
const getSlideTitle = function (slides) {
  const result = slides.reduce((acc, slide) => {
    const { title = '' } = slide.dataset;
    acc.push(title);
    return acc;
  }, []);

  return result;
};

// decide slide theme
const getSlideTheme = function (swiper) {
  // decide slide theme
  const array = 0 === swiper.slides.length ? [...swiper.el.querySelectorAll('.swiper-slide')] : swiper.slides;
  const slideData = array[swiper.activeIndex]?.querySelector('.c-hero-banner')?.classList;
  if (slideData) {
    const [slideTheme] = [...slideData].filter(classname => classname.match(/font-(white|black)/gi));
    if (slideTheme === 'font-white') {
      swiper.el.classList.add('dark-theme');
    } else if (slideTheme === 'font-black') {
      swiper.el.classList.remove('dark-theme');
    }
  }
};

const Options = function (el, option) {
  const {
    type = 'default',
    swiperOption = {},
    callbackGroup = {},
    loopUse = true,
    timeDelay = carouselDuration,
    autoPause = false,
  } = option;
  const slides = el.querySelectorAll('.swiper-slide');
  const title = getSlideTitle([...slides]);

  const defaultOption = {
    loop: !!loopUse,
    keyboard: behavior.useKeyInteraction,
    slidesPerView: 1,
    pagination: {
      ...HeroBullets,
      renderBullet(index) {
        // if (title.length > 0) return
        return bulletHTML.title(title[index]);
        // return bulletHTML.basic();
      },
    },
    on: {
      // slideChangeTransitionEnd: behavior.focusWhenSlideChanged,

      breakpoint: behavior.togglePagination(featureClassName.handler),
      afterInit(swiper) {
        if (callbackGroup.afterInit) {
          callbackGroup.afterInit(swiper);
        }
      },
      slideChange(swiper) {
        // execute callback list.
        if (callbackGroup.slideChange) {
          callbackGroup.slideChange(swiper);
        }
      },
      slideChangeTransitionStart: getSlideTheme,
    },
    ...swiperOption,
  };

  if (type === 'default') {
    return defaultOption;
  }
  if (type === 'autoplay') {
    return {
      ...defaultOption,
      loop: loopUse,
      autoplay: {
        delay: timeDelay,
        disableOnInteraction: false, // 자동 멈춤 기능 해제
        pauseOnMouseEnter: autoPause,
      },
      on: {
        breakpoint: behavior.togglePagination(),
        init(swiper) {
          if (swiper.wrapperEl.childElementCount < 2) {
            swiper.wrapperEl.closest('.swiper-initialized')?.classList.add('least-item');
          }
        },
        slideChange(swiper) {
          const { bullets } = swiper.pagination;
          if (beforeLaunch(bullets)) return;

          const carouselRunning = swiper.autoplay.running;
          bullets.forEach((bullet, index, array) => {
            // cleaning
            bullet.classList.remove('paused', 'on');
            // escape : autoplay ing...
            if (carouselRunning) {
              if (index === swiper.realIndex) bullet.classList.add('on');
              return;
            }
            // autoplay paused...
            if (!array[swiper.realIndex].classList.contains('on')) {
              array[swiper.realIndex].classList.add('paused', 'on');
            }
          });

          // execute callback list.
          if (callbackGroup.slideChange) {
            callbackGroup.slideChange(swiper);
          }
        },
        // Event will fired right after initialization.
        afterInit(swiper) {
          // for clone slide event on
          duplicateSlideInit(swiper);

          // "on" class add active item's bullet.
          const activePaging = swiper.pagination.bullets[swiper.realIndex];
          if (activePaging) activePaging.classList.add('on');
        },
        slideChangeTransitionStart(swiper) {
          // decide slide theme
          const array = 0 === swiper.slides.length ? [...swiper.el.querySelectorAll('.swiper-slide')] : swiper.slides;
          const slideData = array[swiper.activeIndex].querySelector('.c-hero-banner').classList;
          const [slideTheme] = [...slideData].filter(classname => classname.match(/font-(white|black)/gi));
          if (slideTheme === 'font-white') {
            swiper.el.classList.add('dark-theme');
          } else if (slideTheme === 'font-black') {
            swiper.el.classList.remove('dark-theme');
          }
        },
      },
    };
  }

  return defaultOption;
};

const autoplayEventHandler = {
  pause(swiper) {
    return () => {
      const activePaging = swiper.pagination.bullets[swiper.realIndex];
      activePaging.classList.add('paused');
      this.setAttribute('disabled', true);
      swiper.authorParams.play.removeAttribute('disabled');
      swiper.autoplay.stop();
    };
  },
  play(swiper) {
    return () => {
      const activePaging = swiper.pagination.bullets[swiper.realIndex];
      activePaging.classList.remove('paused');
      this.setAttribute('disabled', true);
      swiper.authorParams.pause.removeAttribute('disabled');
      swiper.autoplay.start();
    };
  },
};

const heroCarousel = function (el, option) {
  if (beforeLaunch(el)) return false;
  const carouselOptions = Options(el, option);
  const swiper = swiperInit(el, carouselOptions);
  const pause = el.querySelector(featureClassName.pause);
  const play = el.querySelector(featureClassName.play);
  const pauseHandler = autoplayEventHandler.pause.bind(pause);
  const playHandler = autoplayEventHandler.play.bind(play);
  const { type } = option;

  swiper.authorParams = { pause, play };

  if (type === 'autoplay') {
    el.classList.add('autoplay'); // for css
    pause.addEventListener('click', pauseHandler(swiper), false);
    play.addEventListener('click', playHandler(swiper), false);
  }
};

export default heroCarousel;
