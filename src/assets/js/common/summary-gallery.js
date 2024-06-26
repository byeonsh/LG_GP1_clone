// import module
import runCarousel, { behavior } from './carousel.js';
import { bp } from './constant.js';
// https://github.com/anvaka/panzoom
import panzoom from '../vendors/panzoom.min.js';

export const summaryGallery = () => {
  const galleryExpand = document.querySelector('.c-summary-gallery-expand');
  if (!galleryExpand) return false;
  const zoomArea = galleryExpand.querySelector('.c-gallery[data-type=image] .c-gallery__display');
  const zoomImg = zoomArea.querySelector('img');
  const videoResetArea = galleryExpand.querySelector(
    '.c-gallery[data-type=video] .c-gallery__display .c-media__container'
  );
  const thumbnailInit = (thumbnail, content) => {
    const thumbnails = content.querySelector('.c-gallery__thumbnail');
    // const iframe = content.querySelector('iframe[data-src]');
    // If the user clicks a large image in the gallery area of the page to open a layer popup,
    // the corresponding thumbnail is clicked, otherwise the first thumbnail is clicked.
    if (thumbnail) {
      const currentTarget = thumbnails.querySelector(`.c-carousel__item:nth-child(${parseInt(thumbnail, 10) + 1})`);
      currentTarget.querySelector('.c-gallery__item').click();
    } else {
      thumbnails.querySelector('.c-gallery__item').click();
    }
    // if (iframe) {
    //     // for iframe
    //     iframe.src = iframe.dataset.src;
    //     iframe.removeAttribute('data-src');
    // }
  };
  const contentInit = content => {
    const thumbnails = content.querySelector('.c-gallery__thumbnail');
    const iframe = content.querySelector('iframe[data-src]');
    if (thumbnails) {
      // for thumbnail
      const activeThumbnail = thumbnails.querySelector('.c-gallery__item');
      const imgIndex = galleryExpand.dataset.initNumber;
      galleryExpand.removeAttribute('data-init-number');
      if (imgIndex) thumbnailInit(imgIndex, content);
      else if (activeThumbnail) thumbnailInit(false, content);
    } else if (iframe) {
      // for iframe
      iframe.src = iframe.dataset.src;
      iframe.removeAttribute('data-src');
    }
  };
  const galleryExpandActive = dataType => {
    const sortBtns = galleryExpand.querySelectorAll('.c-summary-gallery__sort button');
    const contents = galleryExpand.querySelectorAll('.c-summary-gallery__contents .c-gallery');
    // sort btns
    sortBtns.forEach(btn => {
      if (btn.dataset.type === dataType) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
    // contents
    // -- video reset
    if (videoResetArea) {
      while (videoResetArea.firstChild) {
        videoResetArea.removeChild(videoResetArea.firstChild);
      }
    }
    contents.forEach(content => {
      if (content.dataset.type === dataType) {
        content.classList.remove('hidden');
        contentInit(content);
      } else {
        content.classList.add('hidden');
      }
    });
  };
  // swiper
  const popupThumbSwiper = galleryExpand.querySelectorAll('.c-gallery__thumbnail .swiper');
  if (popupThumbSwiper) {
    popupThumbSwiper.forEach(swiperEl => {
      const nextEl = swiperEl.closest('.c-gallery').querySelector('.js-carousel-next');
      const prevEl = swiperEl.closest('.c-gallery').querySelector('.js-carousel-prev');
      const paginationEl = swiperEl.closest('.c-gallery').querySelector('.c-carousel__pagination');
      const popupCarouselOption = {
        keyboard: behavior.useKeyInteraction,
        pagination: {
          el: paginationEl,
          enabled: true,
          type: 'fraction',
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        navigation: {
          prevEl,
          nextEl,
        },
        breakpoints: {
          // min
          360: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          [bp.mobile + 1]: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20,
          },
        },
        on: {
          breakpoint: behavior.togglePagination(),
        },
      };
      runCarousel(swiperEl, popupCarouselOption);
    });
  }
  // sort
  const sortBtns = galleryExpand.querySelectorAll('.c-summary-gallery__sort button');
  if (sortBtns) {
    sortBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        const dataType = event.currentTarget.dataset.type;
        galleryExpandActive(dataType);
      });
    });
  }
  // thumbnail click
  const thumbArea = galleryExpand.querySelectorAll('.c-gallery__thumbnail');
  // console.log(thumbArea.length);
  thumbArea.forEach(thumb => {
    const thumbnails = thumb.querySelectorAll('.c-gallery__item');
    if (thumbnails) {
      thumbnails.forEach((thumbnail, currentIdx) => {
        thumbnail.addEventListener('click', event => {
          event.preventDefault();
          const self = event.currentTarget;
          const dataType = self.closest('.c-gallery').dataset.type;
          if (dataType === 'image') {
            // change large image
            const largeImg = window.innerWidth > 768 ? self.dataset.largeD : self.dataset.largeM;
            zoomImg.src = largeImg;
          }
          // active
          thumbnails.forEach((btn, idx) => {
            if (currentIdx === idx) {
              btn.parentElement.classList.add('active');
              btn.parentElement.setAttribute('aria-current', 'true');
            } else {
              btn.parentElement.classList.remove('active');
              btn.parentElement.removeAttribute('aria-current');
            }
          });
          return false;
        });
      });
    }
  });
  // run panzoom
  const centerCenter = { x: 0.5, y: 0.5 };
  let instance;
  const zoom = {
    max: 3,
    min: 1,
  };
  if (window.innerWidth <= 768) {
    zoom.max = 3;
    zoom.min = 1;
  }
  const zoomTarget = zoomImg.closest('.cmp-image');
  const zoomInBtn = galleryExpand.querySelector('.c-gallery button.zoom-in');
  const zoomOutBtn = galleryExpand.querySelector('.c-gallery button.zoom-out');
  const cursorTarget = zoomTarget.closest('.c-gallery__display');
  const controlBtns = (obj, toZoom) => {
    if (toZoom > zoom.min) {
      zoomOutBtn.removeAttribute('disabled');
    } else {
      zoomOutBtn.setAttribute('disabled', 'disabled');
    }
    if (toZoom < zoom.max) {
      zoomInBtn.removeAttribute('disabled');
      cursorTarget.classList.remove('status-max');
    } else {
      zoomInBtn.setAttribute('disabled', 'disabled');
      cursorTarget.classList.add('status-max');
    }
  };
  if (zoomImg) {
    instance = panzoom(zoomTarget, {
      transformOrigin: centerCenter,
      maxZoom: zoom.max,
      minZoom: zoom.min,
      bounds: true,
      // zoomSpeed: 0.065,
      zoomSpeed: 1,
      boundsPadding: 1,
      zoomDoubleClickSpeed: 1, // disabled double click
      // pinchSpeed: 2,
      filterKey(/* e, dx, dy, dz */) {
        // don't let panzoom handle this event:
        return true;
      },
      beforeWheel(e) {
        // allow wheel-zoom only if altKey is down. Otherwise - ignore
        const shouldIgnore = !e.altKey || !zoomTarget.closest('.PD0005');
        // console.log(shouldIgnore);
        // If true, do not zoom with the mouse wheel
        return shouldIgnore;
        // return true;
      },
    });
    let isPanning = false;
    instance.on('zoom', () => {
      const { scale } = instance.getTransform();
      controlBtns(zoomTarget, scale);
    });
    instance.on('zoomend', () => {
      const { scale } = instance.getTransform();
      controlBtns(zoomTarget, scale);
    });
    instance.on('panstart', () => {
      isPanning = true;
    });
    instance.on('panend', () => {
      setTimeout(() => {
        isPanning = false;
      }, 300);
    });
    zoomArea.addEventListener('click', e => {
      if (isPanning) return false;
      if (e.target.tagName === 'BUTTON') return false;
      const imgRect = zoomTarget.getBoundingClientRect();
      const { scale } = instance.getTransform();
      const cx = imgRect.width / 2; //  - contRect.width / 2;
      const cy = imgRect.height / 2; // - contRect.height / 2;
      if (scale < zoom.max) {
        zoomInBtn.click();
      } else {
        instance.smoothZoom(cx / scale, cy / scale, zoom.min / zoom.max);
        // instance.smoothMoveTo(0, 0);
      }
    });
  }
  const handleClick = e => {
    e.preventDefault();
    // const container = zoomImg.closest('.c-gallery__display');
    // const contRect = container.getBoundingClientRect();
    const imgRect = zoomTarget.getBoundingClientRect();
    const { scale } = instance.getTransform();
    const cx = imgRect.width / 2; //  - contRect.width / 2;
    const cy = imgRect.height / 2; // - contRect.height / 2;
    const isZoomIn = e.target.classList.contains('zoom-in');
    const zoomBy = isZoomIn ? 1.5 : 0.67;
    instance.smoothZoom(cx / scale, cy / scale, zoomBy);
    // instance.smoothZoom(0, 0, zoomBy);
    let toZoom = zoomBy * scale;
    if (toZoom > zoom.max) toZoom = zoom.max;
    if (toZoom < zoom.min) toZoom = zoom.min;
    // console.log(cx * 2, cy * 2, zoomBy, toZoom);
    instance.setTransformOrigin(centerCenter);
    if (toZoom <= 1.2) {
      setTimeout(() => {
        instance.smoothMoveTo(0, 0);
      }, 300);
    }
  };
  const attachClickHandler = btn => {
    btn.addEventListener('click', handleClick);
    controlBtns(btn, zoom.min);
  };
  const zoomBtns = document.querySelectorAll('.c-gallery__image-zoom-handler button');
  Array.from(zoomBtns).forEach(attachClickHandler);
};

export default {};
