// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';

const carouselOption = {
  keyboard: behavior.useKeyInteraction,
  pagination: behavior.pagination,
  loop: false,
  speed: 500,
  autoplay: false,
  preloadImages: false,
  allowTouchMove: true,
  lazy: false,
  slidesPerView: 1,
  spaceBetween: 10,
};
const swiperInit = function (target) {
  const nextEl = target.closest('.c-carousel').querySelector('.js-carousel-next');
  const prevEl = target.closest('.c-carousel').querySelector('.js-carousel-prev');
  return runCarousel(target, {
    ...carouselOption,
    navigation: {
      nextEl,
      prevEl,
    },
  });
};

const pickerEvent = picker => {
  // const visualArea = picker.querySelector('.c-picker__visual');
  const mediaArea = picker.querySelector('.c-picker__media');
  const textArea = picker.querySelector('.c-picker__text');
  const itemAll = picker.querySelectorAll('.c-list__item');
  const firstItem = itemAll[0];
  const mediaList = mediaArea.querySelectorAll('.c-image');
  const textList = textArea.querySelectorAll('.c-text-contents');
  const activeEvent = (activeItem, idx) => {
    const thisPicker = activeItem.closest('.c-picker');
    // reset active
    itemAll.forEach(item => {
      item.classList.remove('cmp-tabs__tab--active', 'active');
      item.setAttribute('aria-selected', 'false');
    });
    // set active
    activeItem.classList.add('cmp-tabs__tab--active', 'active');
    activeItem.setAttribute('aria-selected', 'true');

    // media active : video, image
    const contActive = () => {
      mediaList.forEach(el => {
        el.classList.remove('active');
      });
      mediaList[idx].classList.add('active');
      textList.forEach(el => {
        el.classList.remove('active');
      });
      textList[idx].classList.add('active');
      // horizontal case
      if (thisPicker.classList.contains('c-picker--horizontal')) {
        const buttonArea = thisPicker.querySelector('.c-picker__buttons');
        const buttonList = buttonArea.querySelectorAll('.c-cta');
        buttonList.forEach(el => {
          el.classList.remove('active');
        });
        buttonList[idx].classList.add('active');
      }
    };
    contActive();
  };
  // set active first
  activeEvent(firstItem, 0);
  itemAll.forEach((item, index) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      activeEvent(item, index);
    });
  });
};
function init() {
  // component
  const component = document.querySelectorAll('.ST0009');
  if (beforeLaunch(component)) return false;

  // picker
  const pickerAll = document.querySelectorAll('.ST0009 .c-picker');
  pickerAll.forEach(el => {
    pickerEvent(el);
  });

  // swiper
  function carouselControl(element) {
    const target = element.querySelector('.c-carousel');
    return swiperInit(target);
  }
  component.forEach(function (element) {
    const target = element.querySelectorAll('.c-carousel');
    if (beforeLaunch(target)) return false;
    carouselControl(element);
  });
}
init();
