/* eslint-disable import/namespace */
/* eslint-disable max-len */
// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp, isRTL } from '../../assets/js/common/constant.js';
import FullCalendar from '../CT000C/index-global.js';

// component
const errorMsg = () => {
  const msgRemoveBtn = document.querySelectorAll('.error-content-msg__remove');
  msgRemoveBtn.forEach(el => {
    el.addEventListener('click', () => {
      const targetMsg = el.closest('.error-content-msg__item');
      targetMsg.remove();
    });
  });
};

errorMsg();

// [Start] 2023-04-25 : UPDATE - Print Invoice
const printEvent = event => {
  const printBtn = event.currentTarget;
  const component = printBtn.closest('.c-pop-msg');
  const cssURLs = printBtn.dataset.cssUrl.split(',');
  let cssHtml = '';
  cssURLs.forEach(url => {
    cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
  });
  const newWin = window.open('', '_blank');
  if (isRTL) {
    newWin.document.writeln(
      `<html dir="rtl"><head>${cssHtml}</head><body><div class="c-wrapper c-print-wrapper ML000D"><div class="c-pop-msg ML000D__modal-container ML000D__modal-container--invoice active">${component.innerHTML}</div></div></body></html>`
    );
  } else {
    newWin.document.writeln(
      `<html dir="ltr"><head>${cssHtml}</head><body><div class="c-wrapper c-print-wrapper ML000D"><div class="c-pop-msg ML000D__modal-container ML000D__modal-container--invoice active">${component.innerHTML}</div></div></body></html>`
    );
  }
  newWin.document.querySelector('.c-pop-msg__button-wrap').remove();
  newWin.document.querySelector('.c-pop-msg__close').remove();
  newWin.document.querySelector('.c-pop-msg__dimmed').remove();
  newWin.document.close();
  newWin.focus();
  // newWin.print();
  setTimeout(() => {
    newWin.print();
  }, 1000);
};
const printPop = () => {
  const btnPrint = document.querySelectorAll('.js-print');
  btnPrint.forEach(el => {
    el.addEventListener('click', printEvent);
  });
};
printPop();
// [End] 2023-04-25 : UPDATE - Print Invoice

// popup calendar\
const calendarPop = () => {
  const calendarBtn = document.querySelectorAll('.c-button__calendar');
  calendarBtn.forEach(element => {
    element.addEventListener('click', () => {
      const calendarEl = document.querySelector('.Buy-calendar__box');

      const dateActive = targetEl => {
        if (
          targetEl.closest('.fc-day').classList.contains('fc-day-future') &&
          !targetEl.closest('.fc-day').classList.contains('selected')
        ) {
          const prevEl = document.querySelectorAll('.fc-day-future.selected');
          if (prevEl) {
            prevEl.forEach(el => el.classList.remove('selected'));
          }
          targetEl.closest('.fc-day').classList.add('selected');
        }
      };

      const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
          left: '',
          center: 'prev,title,next',
          right: '',
        },
        dayCellDidMount(options) {
          if (!options.el.classList.contains('fc-day-other') && options.el.classList.contains('fc-day-future')) {
            options.el.querySelector('a').setAttribute('tabindex', '0');
          }
        },
      });
      calendar.render();

      const date = calendarEl.querySelectorAll('.fc-daygrid-day-number');
      date.forEach(targetEl => {
        targetEl.addEventListener('click', e => {
          e.preventDefault();
          dateActive(targetEl);
        });
        targetEl.addEventListener('keyup', e => {
          if (e.keyCode === 13 || e.which === 13) {
            dateActive(targetEl);
          }
        });
      });
    });
  });
};
calendarPop();

// Cancellation Success popup
const cancelSuccessPop = () => {
  const successPop = document.querySelectorAll('.ML000D__modal-container--success');
  if (beforeLaunch(successPop)) return false;

  // coupon 'view detail' button toggle
  successPop.forEach(coupon => {
    const couponBtn = coupon.querySelectorAll('.my-coupons__aside .cmp-button:not(.initialized)');
    const couponParent = '.my-coupons__item';
    const toggleTarget = '.my-coupons .c-text-contents__bottom';
    couponBtn.forEach(el => {
      el.addEventListener('click', () => {
        el.classList.add('initialized');
        const target = el.closest(couponParent).querySelector(toggleTarget);
        const couponScrollbox = el.closest('.c-pop-msg__contents');
        if (target.classList.contains('open')) {
          el.classList.remove('active');
          target.classList.remove('open');
          target.classList.add('close');
          target.setAttribute('aria-expanded', 'false');
        } else {
          el.classList.add('active');
          target.classList.remove('close');
          target.classList.add('open');
          target.setAttribute('aria-expanded', 'true');
          couponScrollbox.scrollTop = couponScrollbox.scrollHeight;
        }
      });
    });
  });

  // coupon copy clipboard
  successPop.forEach(coupon => {
    const CopyBtn = coupon.querySelectorAll('.c-text-contents__code .cmp-button');
    const couponParent = '.c-text-contents__code';
    const codeEl = '.my-coupons__code';
    CopyBtn.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.closest(couponParent).querySelector(codeEl);
        const code = target.innerText;
        window.navigator.clipboard.writeText(code);
      });
    });
  });
};
cancelSuccessPop();

function init() {
  const component = document.querySelector('.PD0003');
  if (beforeLaunch(component)) return false;

  // popup
  const galleryPopup = document.getElementById('popPDPSummaryGallery');
  const popupThumbSwiper = galleryPopup.querySelectorAll('.c-gallery__thumbnail .swiper');
  popupThumbSwiper.forEach(swiper => {
    const nextEl = swiper.closest('.c-gallery').querySelector('.js-carousel-next');
    const prevEl = swiper.closest('.c-gallery').querySelector('.js-carousel-prev');
    const paginationEl = swiper.closest('.c-gallery').querySelector('.c-carousel__pagination');
    const popupCarouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: {
        el: paginationEl,
        enabled: true,
        type: 'fraction',
      },
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        prevEl,
        nextEl,
      },
      breakpoints: {
        // min
        [bp.mobile + 1]: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
      // on: {
      //     breakpoint: behavior.togglePagination(),
      // },
    };
    runCarousel(swiper, popupCarouselOption);
  });

  // gallery
  const gallery = component.querySelector('.left .c-summary-gallery');
  const pageSwiper = gallery.querySelector('.c-gallery__display .swiper');
  const pageThumbSwiper = gallery.querySelector('.c-gallery__thumbnail .swiper');
  const nextEl = gallery.querySelector('.js-carousel-next');
  const prevEl = gallery.querySelector('.js-carousel-prev');
  const paginationEl = gallery.querySelector('.c-carousel__pagination');
  const pageThumbCarouselOption = {
    slidesPerView: 5,
    spaceBetween: 20,
    watchSlidesProgress: true,
  };
  const pageCarouselOption = {
    keyboard: behavior.useKeyInteraction,
    pagination: {
      el: paginationEl,
      enabled: true,
      type: 'fraction',
    },
    slidesPerView: 1,
    spaceBetween: 24,
    thumbs: {
      swiper: runCarousel(pageThumbSwiper, pageThumbCarouselOption),
    },
    on: {
      breakpoint: behavior.togglePagination(),
    },
    navigation: {
      prevEl,
      nextEl,
    },
  };
  runCarousel(pageSwiper, pageCarouselOption);

  // form
  accordion.run(component);

  // etc
}
init();
// export default
