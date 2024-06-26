/* eslint-disable */
import swiper from '../../assets/js/vendors/swiper.js';

const noticeSwiper = document.querySelectorAll('.CS0080 .swiper');

noticeSwiper.forEach((el, i) => {
  const noticeBar = new swiper(el, {
    slidesPerView: 'auto',
    preventClicks: true,
    preventClicksPropagation: false,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 20000,
      // delay: 200,
    },
    loop: true,
    navigation: {
      nextEl: el.closest('.carousel').querySelector('.js-carousel-next'),
      prevEl: el.closest('.carousel').querySelector('.js-carousel-prev'),
    },
    on: {
      init: swiper => {
        document.querySelectorAll('.swiper-slide').forEach(function (slide) {
          slide.classList.add('changed');
        });
        btnStop(swiper);
        btnStart(swiper);
      },

      slideChangeTransitionStart: () => {
        document.querySelectorAll('.swiper-slide').forEach(function (slide) {
          slide.classList.add('changing');
          slide.classList.remove('changed');
        });
      },

      slideChangeTransitionEnd: () => {
        // changing : transition O
        // changed : transition X
        document.querySelectorAll('.swiper-slide').forEach(function (slide) {
          slide.classList.remove('changing');
          slide.classList.add('changed');
        });
      },
    },
  });
});

function btnStop(sw) {
  sw.el
    .closest('.carousel')
    .querySelector('.auto-stop')
    .addEventListener('click', function () {
      sw.autoplay.stop();
      this.style.display = 'none';
      this.closest('.btn-wrapper').querySelector('.auto-start').style.display = 'block';
    });
}
function btnStart(sw) {
  sw.el
    .closest('.carousel')
    .querySelector('.auto-start')
    .addEventListener('click', function () {
      sw.autoplay.start();
      this.style.display = 'none';
      this.closest('.btn-wrapper').querySelector('.auto-stop').style.display = 'block';
    });
}
