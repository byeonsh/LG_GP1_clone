// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp, review, carouselPerView } from '../../assets/js/common/constant.js';
import runBVStaticPLP from '../../assets/js/common/bv.js';
import runSPStaticPLP from '../../assets/js/common/sp.js';
import heroCarousel from '../../assets/js/common/heroCarousel.js';
import share from '../../assets/js/common/share.js';

const swiperInit = (el, option) => {
  const nextEl = el.querySelector('.js-carousel-next');
  const prevEl = el.querySelector('.js-carousel-prev');

  const swiper = runCarousel(el, {
    ...option,
    navigation: {
      prevEl,
      nextEl,
    },
  });

  return swiper;
};

const runFeatureSwiper = function () {
  const featureListCarousel = document.querySelectorAll('.PD0046 .c-feature-list .swiper');
  if (beforeLaunch(featureListCarousel)) return false;

  featureListCarousel.forEach(el => {
    const carouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: carouselPerView.medium,
      spaceBetween: 10,
      breakpoints: {
        // min
        [bp.mobile + 1]: {
          slidesPerView: 3,
          spaceBetween: 24,
          pagination: {
            enabled: true,
          },
        },
        [bp.tablet + 1]: {
          slidesPerView: 3,
          spaceBetween: 24,
          pagination: {
            enabled: false,
          },
        },
      },
      on: {
        breakpoint: behavior.togglePagination(),
      },
    };
    swiperInit(el, carouselOption);
  });
};

// When the slide changes, the template changes
const changeTemplate = function (_templates, _swiper) {
  _templates.forEach(template => {
    const { index } = template.dataset;
    const matchedCarouselActiveIndex = Number(index) === _swiper.realIndex;

    if (matchedCarouselActiveIndex) {
      template.classList.add('active');
    } else {
      template.classList.remove('active');
    }
  });
};

// init
function init() {
  const component = document.querySelectorAll('.PD0046');
  if (beforeLaunch(component)) return false;

  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);

  // hero carousel
  const carousel = document.querySelectorAll('.PD0046 .c-product-hero .swiper');
  carousel.forEach(el => {
    const carouselEventType = el.dataset.carouselEvent;
    const carouselOption = {
      type: carouselEventType,
      callbackGroup: {
        afterInit(swiper) {
          // eslint-disable-next-line no-param-reassign
          swiper.realIndex = 0;
          const templates = swiper.el
            .closest('.c-product-hero')
            ?.nextElementSibling.querySelectorAll('.c-template-container__inner');

          if (templates?.length > 0) {
            templates.forEach(template => {
              template.classList.remove('active');
            });
            templates[0].classList.add('active');
          }
        },
        slideChange(swiper) {
          const templates = swiper.el
            .closest('.c-product-hero')
            ?.nextElementSibling.querySelectorAll('.c-template-container__inner');

          if (templates) {
            changeTemplate(templates, swiper);
          }
        },
      },
    };
    heroCarousel(el, carouselOption);
  });

  runFeatureSwiper();

  component.forEach(el => {
    if (review.type === 'BV1') runBVStaticPLP(el);
    else if (review.type === 'SP') runSPStaticPLP(el);

    // share
    const productItems = el.querySelectorAll('.c-product-item');
    productItems.forEach(product => {
      if (!config) return false;
      share(product, config);
    });
  });
}
init();
