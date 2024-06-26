// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

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

const updateVideoSrc = function () {
  const videoCards = document.querySelectorAll('.PR0015 .card-item.has-video');
  if (beforeLaunch(videoCards)) return false;

  videoCards.forEach(function (el) {
    const video = el.querySelector('video');

    function updatePath() {
      const moSrc = video.getAttribute('data-mo-src');
      const pcSrc = video.getAttribute('data-pc-src');
      if (window.innerWidth < 769 && video.src !== moSrc) {
        video.src = moSrc;
      } else if (window.innerWidth >= 769 && video.src !== pcSrc) {
        video.src = pcSrc;
      }
    }

    updatePath();
  });
};

function handleVideo(card, isMobile) {
  const hasBgVideo = card.classList.contains('has-video');
  if (!hasBgVideo) return;

  const video = card.querySelector('video');
  const btnPlay = card.querySelector('.btn-play');
  const btnPause = card.querySelector('.btn-pause');
  const thumbnail = card.querySelector('.thumbnail-cover');
  const isCardActivated = card.classList.contains('swiper-slide-active');

  function playVideo() {
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          thumbnail.classList.add('hide');
          btnPlay.disabled = true;
          btnPause.disabled = false;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  function deactiveVideo() {
    thumbnail.classList.remove('hide');
    video.pause();
    btnPlay.disabled = false;
    btnPause.disabled = true;
  }

  if (isMobile) {
    if (isCardActivated) {
      playVideo();
    } else {
      deactiveVideo();
    }
  }
}

function handleVideoPlayback(swiper, isMobile) {
  const activeCard = swiper.slides[swiper.activeIndex];
  const previousCard = swiper.slides[swiper.previousIndex];
  if (!previousCard) {
    handleVideo(activeCard, isMobile);
  } else {
    handleVideo(activeCard, isMobile);
    handleVideo(previousCard, isMobile);
  }
}

function deviceCheck() {
  const isMobile = document.querySelector('body').classList.contains('device-mo');
  return isMobile;
}

const runFeatureSwiper = function () {
  const featureListCarousel = document.querySelectorAll('.PR0015 .swiper');
  if (beforeLaunch(featureListCarousel)) return false;

  featureListCarousel.forEach(el => {
    const carouselOption = {
      effect: 'slide',
      keyboard: behavior.useKeyInteraction,
      pagination: {
        ...behavior.pagination,
        handlerCheck: true,
      },
      slidesPerView: 'auto',
      on: {
        init: swiper => {
          behavior.togglePagination();
          const timerId = setInterval(() => {
            const isMobile = deviceCheck();
            if (isMobile) {
              handleVideoPlayback(swiper, isMobile);
              clearInterval(timerId);
            }
          }, 500);
        },
        resize: () => {
          behavior.togglePagination();
          updateVideoSrc();
        },
        slideChangeTransitionEnd: swiper => {
          const isMobile = deviceCheck();
          handleVideoPlayback(swiper, isMobile);
        },
      },
    };
    swiperInit(el, carouselOption);
  });
};

const cardVideoAction = function () {
  const videoCards = document.querySelectorAll('.PR0015 .card-item.has-video');
  if (beforeLaunch(videoCards)) return false;

  videoCards.forEach(function (el) {
    const video = el.querySelector('video');
    const btnPlay = el.querySelector('.btn-play');
    const btnPause = el.querySelector('.btn-pause');
    const thumbnail = el.querySelector('.thumbnail-cover');

    function playVideo() {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            thumbnail.classList.add('hide');
            btnPlay.disabled = true;
            btnPause.disabled = false;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }

    function pauseVideo() {
      video.pause();
      btnPlay.disabled = false;
      btnPause.disabled = true;
    }

    function pauseVideoMouseLeave() {
      thumbnail.classList.remove('hide');
      video.pause();
      btnPlay.disabled = false;
      btnPause.disabled = true;
    }

    btnPlay.addEventListener('click', playVideo);
    btnPause.addEventListener('click', pauseVideo);
    el.addEventListener('mouseenter', function () {
      if (!btnPlay.disabled) {
        playVideo();
      }
    });
    el.addEventListener('mouseleave', function () {
      if (!btnPause.disabled) {
        pauseVideoMouseLeave();
      }
    });
  });
};

// init
function init() {
  const component = document.querySelectorAll('.PR0015');
  if (beforeLaunch(component)) return false;
  runFeatureSwiper();
  updateVideoSrc();
  cardVideoAction();
}
init();
