/* eslint-disable max-len */
// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { bp, carouselPerView } from '../../assets/js/common/constant.js';

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
  const featureListCarousel = document.querySelectorAll('.PD0053 .c-feature-list .swiper');
  if (beforeLaunch(featureListCarousel)) return false;

  featureListCarousel.forEach(el => {
    const carouselOption = {
      keyboard: behavior.useKeyInteraction,
      pagination: behavior.pagination,
      slidesPerView: carouselPerView.small,
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

const runHotSpots = {
  obj: document.querySelectorAll('.PD0053'),
  init() {
    const self = this;
    self.obj.forEach(c => {
      // const hotSpots = component.querySelectorAll('.c-interactive-images__hotspot');
      // const buttonContainer = c.querySelector('.c-interactive-images__hotspot-area');
      const layerContainer = c.querySelector('.c-interactive-images__visual');
      const templateHTML = c.querySelector('template').cloneNode(true).innerHTML;
      const data = c.querySelector('.c-interactive-images').dataset.modalInfo.replace(/ {2}|\n/gi, '');
      const dataJson = JSON.parse(data);
      dataJson.data.forEach(d => {
        // add hotspot button
        // const buttonHTML = `<button class="c-interactive-images__hotspot cmp-button" type="button" id="${d.pid}-button" aria-controls="${d.pid}"><span class="sr-only">${d.title}</span></button>`;
        // buttonContainer.insertAdjacentHTML('beforeend', buttonHTML);
        const btn = document.getElementById(`${d.pid}-button`);
        btn.querySelector('.sr-only').innerText = d.title;
        const themeBlack = !!btn.classList.contains('dark-theme');
        // add layer html
        let layerHTML = templateHTML;
        // GA4
        const ctaHTML = `<a class="cmp-button c-button c-button--default default transparent m-small w-medium" href="${d['cta-url']}" target="${d['cta-target']}" data-link-name="${d['link-name']}" data-link-destination="${d['link-destination']}" data-link-menu="${d['link-menu']}" data-link-page-type="${d['link-page-type']}"><span class="cmp-button__text c-button__text">${d['cta-name']}</span></a>`;
        let descHTML = '';
        if (d.description.indexOf('|') === -1) {
          descHTML = `<p>${d.description}</p>`;
        } else {
          descHTML = '<ul>';
          const desc = d.description.split('|');
          desc.forEach(txt => {
            descHTML += `<li>${txt}</li>`;
          });
          descHTML += '</ul>';
        }
        layerHTML = layerHTML
          .replace(/\*pid\*/g, d.pid)
          .replace(/\*title\*/g, d.title)
          .replace(/\*img-w\*/g, d['img-w'])
          .replace(/\*img-m\*/g, d['img-m'])
          .replace(/\*description\*/g, descHTML)
          .replace(/\*cta\*/g, ctaHTML);
        // btn.dataset.index = idx;
        layerContainer.insertAdjacentHTML('beforeend', layerHTML);
        // click close button
        const currentPop = document.getElementById(d.pid);
        if (themeBlack) currentPop.querySelector('.c-interactive-images__popup-dialog').classList.add('dark-theme');
        const close = currentPop.querySelector('.c-interactive-images__popup-close');
        close.addEventListener('click', () => {
          currentPop.classList.remove('active');
        });
        btn.addEventListener('click', function () {
          const popups = c.querySelectorAll('.c-interactive-images__popup');
          popups.forEach(p => {
            p.classList.remove('active');
          });
          currentPop.classList.add('active');
          self.fixLayerPosition();
        });
      });
    });
    self.runHotSpot();
    window.addEventListener('resize', self.fixLayerPosition);
  },
  runHotSpot() {
    const self = this;
    const component = self.obj;
    const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
    component.forEach(c => {
      const img = c.querySelector('.c-interactive-images__visual img');
      const fixHotspotPosition = function (mediaQueryList) {
        const data = c.querySelector('.c-interactive-images').dataset.modalInfo.replace(/ {2}|\n/gi, '');
        const dataJson = JSON.parse(data);
        dataJson.data.forEach(d => {
          const btn = document.getElementById(`${d.pid}-button`);
          btn.classList.add('ready');
          // set position
          if (!mediaQueryList.matches) {
            btn.style.left = d['position-m'].left;
            btn.style.top = d['position-m'].top;
          } else {
            btn.style.left = d['position-w'].left;
            btn.style.top = d['position-w'].top;
          }
        });
      };
      breakpoint.addEventListener('change', fixHotspotPosition);
      // Make the hotspot visible after the image is loaded
      if (img.naturalHeight) {
        fixHotspotPosition(breakpoint);
      } else {
        img.addEventListener('load', function () {
          fixHotspotPosition(breakpoint);
        });
      }
    });
  },
  fixLayerPosition() {
    const obj = document.querySelectorAll('.PD0053');
    obj.forEach(c => {
      const convertSize = (val, dir, type) => {
        const bgImg = c.querySelector('.c-interactive-images__visual');
        const bgWidth = bgImg.getBoundingClientRect().width;
        const bgHeight = bgImg.getBoundingClientRect().height;
        if (type === 'toPercentage') {
          if (dir === 'w') {
            return (parseInt(val, 10) / bgWidth) * 100;
          }
          return (parseInt(val, 10) / bgHeight) * 100;
        }
        if (dir === 'w') {
          return (parseInt(val, 10) * bgWidth) / 100;
        }
        return (parseInt(val, 10) * bgHeight) / 100;
      };
      const marginLR = window.innerWidth > bp.mobile ? 32 : 25;
      const activePopup = c.querySelector('.c-interactive-images__popup.active');
      if (activePopup) {
        const btn = document.getElementById(`${activePopup.getAttribute('id')}-button`);
        const bgImg = c.querySelector('.c-interactive-images__visual');
        const bgWidth = bgImg.getBoundingClientRect().width;
        const bgHeight = bgImg.getBoundingClientRect().height;
        const btnLeft = convertSize(btn.style.left, 'w', 'toPX');
        const btnTop = convertSize(btn.style.top, 'h', 'toPX');
        const cpWidth = activePopup.getBoundingClientRect().width;
        const cpHeight = activePopup.getBoundingClientRect().height;
        // default
        const defaultPosLeft = parseInt(btnLeft - cpWidth / 2, 10);
        const defaultPosTop = parseInt(btnTop + marginLR, 10);
        activePopup.style.left = `${convertSize(defaultPosLeft, 'w', 'toPercentage')}%`;
        activePopup.style.top = `${convertSize(defaultPosTop, 'h', 'toPercentage')}%`;
        // top
        if (defaultPosTop + cpHeight > bgHeight) {
          const newPosTop = btnTop - cpHeight - marginLR;
          if (newPosTop < marginLR) {
            activePopup.style.top = `${convertSize((bgHeight - cpHeight) / 2, 'h', 'toPercentage')}%`;
          } else {
            activePopup.style.top = `${convertSize(newPosTop, 'h', 'toPercentage')}%`;
          }
        }
        // left
        if (defaultPosLeft < marginLR) activePopup.style.left = `${convertSize(marginLR, 'w', 'toPercentage')}%`;
        if (defaultPosLeft + cpWidth > bgWidth) {
          activePopup.style.left = `${convertSize(bgWidth - cpWidth - marginLR, 'w', 'toPercentage')}%`;
        }
      }
    });
  },
};

// init
function init() {
  const component = document.querySelectorAll('.PD0053');
  if (beforeLaunch(component)) return false;

  runFeatureSwiper();
  runHotSpots.init();
}
init();
