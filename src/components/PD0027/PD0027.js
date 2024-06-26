// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp, review } from '../../assets/js/common/constant.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import accordion from '../../assets/js/common/accordion.js';
import { writeReview } from '../../assets/js/common/write-a-review.js';

const carouselOption = {
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    [bp.mobile + 1]: {
      slidesPerView: 3,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
    [bp.tablet + 1]: {
      slidesPerView: 4,
      spaceBetween: 24,
      pagination: {
        enabled: true,
      },
    },
  },
  on: {
    breakpoint: behavior.togglePagination(),
  },
};

const showError = (input, el) => {
  if (input) {
    el.classList.add('show-error');
    el.querySelectorAll('.c-warning').forEach(warning => {
      warning.classList.add('hidden');
    });
    input.closest('.c-form__item').querySelector('.c-warning').classList.remove('hidden');
  } else {
    el.classList.remove('show-error');
    el.querySelectorAll('.c-warning').forEach(warning => {
      warning.classList.add('hidden');
    });
  }
};

const swiperInit = el => {
  const nextEl = el.closest('.carousel').querySelector('.js-carousel-next');
  const prevEl = el.closest('.carousel').querySelector('.js-carousel-prev');
  const swiper = runCarousel(el, {
    ...carouselOption,
    navigation: {
      prevEl,
      nextEl,
    },
  });
  return swiper;
};

// component
function init() {
  const component = document.querySelectorAll('.PD0027');
  if (beforeLaunch(component)) return false;

  component.forEach(el => {
    // filter accordion
    accordion.run(el);

    // carousel
    const target = el.querySelector('.c-carousel');
    if (target) {
      swiperInit(target);
    }

    // write a review - bv
    const items = el.querySelectorAll('.c-product-list__item');
    const form = el.querySelector('form.c-category-filter');
    if (review.type === 'BV1' || review.type === 'BV2') {
      const options = {
        campaign: el.querySelector('input[name=bvCampaignId]')
          ? el.querySelector('input[name=bvCampaignId]').value
          : '',
      };
      // submit
      form?.addEventListener('submit', event => {
        event.preventDefault();
        const category = form.querySelector('.js-select-category');
        if (category && !category.value) {
          showError(category, el.querySelector('.c-category-filter__body'));
        } else {
          const select = form.querySelector('.js-select-product');
          if (!select.value) {
            showError(select, el.querySelector('.c-category-filter__body'));
          } else {
            const pid = select.options[select.selectedIndex].dataset.modelid;
            writeReview(select, 'BV', pid, options);
          }
        }
      });
      // click - list items
      items.forEach(item => {
        item.addEventListener('click', event => {
          event.preventDefault();
          const pid = item.dataset.modelid;
          writeReview(item, 'BV', pid, options);
        });
      });
    } else if (review.type === 'LGCOM') {
      // submit
      form?.addEventListener('submit', event => {
        event.preventDefault();
        const category = form.querySelector('.js-select-category');
        if (category && category.value) {
          showError(category, el.querySelector('.c-category-filter__body'));
        }
        const select = form.querySelector('.js-select-product');
        if (!select.value) {
          showError(select, el.querySelector('.c-category-filter__body'));
        } else {
          const pid = select.options[select.selectedIndex].dataset.modelid;
          writeReview(select, 'LGCOM', pid);
        }
      });
      // onChange Dropdown - clear dropdown warnings
      const category = form?.querySelector('.js-select-category');
      const model = form?.querySelector('.js-select-product');
      [category, model].forEach(i => {
        i?.addEventListener('change', () => {
          category.closest('.c-form__item').querySelector('.c-warning').classList.add('hidden');
          model.closest('.c-form__item').querySelector('.c-warning').classList.add('hidden');
        });
      });
      // click - list items
      items.forEach(item => {
        item.addEventListener('click', event => {
          event.preventDefault();
          const pid = item.dataset.modelid;
          writeReview(item, 'LGCOM', pid);
        });
      });
    } else {
      // submit
      form?.addEventListener('submit', event => {
        event.preventDefault();
        // Go to PDP page review area
        const select = form.querySelector('.js-select-product');
        const url = select.value;
        window.location.href = url;
      });
    }
  });
}
init();
