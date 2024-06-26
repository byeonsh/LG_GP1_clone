import swiper from '../../assets/js/vendors/swiper.js';

// function motionSlideActive(slideActiveIndex) {
//     const motionSlideList = document.querySelectorAll('.c-motion-slide__step-list');

//     motionSlideList.forEach((listItem, listIndex) => {
//         console.log('listItem', listItem);
//         if (listIndex === slideActiveIndex) {
//             console.log('같다');
//             listItem.classList.add('c-motion-slide__step-list--active');
//         } else {
//             listItem.classList.remove('c-motion-slide__step-list--active');
//         }
//     });
// }

const motionImageSwiper = document.querySelectorAll('.c-motion-slide__top.swiper');
const motionNavSwiper = document.querySelectorAll('.c-motion-slide__nav.swiper');
const motionNavigationNext = document.querySelectorAll('.c-motion-slide .swiper-button-next');
const motionNavigationPrev = document.querySelectorAll('.c-motion-slide .swiper-button-prev');
const motionNavigationNextClass = 'swiper-button-next-';
const motionNavigationPrevClass = 'swiper-button-prev-';

motionImageSwiper.forEach((slideItem, slideIndex) => {
  motionNavigationNext[slideIndex].classList.add(motionNavigationNextClass + slideIndex);

  motionNavigationPrev[slideIndex].classList.add(motionNavigationPrevClass + slideIndex);

  // eslint-disable-next-line new-cap, no-unused-vars
  const imageSwiper = new swiper(slideItem, {
    slidesPerView: 'auto',
    // initialSlide: 0,
    speed: 1000,
    loop: true,
    centeredSlides: true,
    roundLengths: false,
    slideToClickedSlide: true,
    grabCursor: true,
    navigation: {
      nextEl: `.${motionNavigationNextClass + slideIndex}`,
      prevEl: `.${motionNavigationPrevClass + slideIndex}`,
    },
    // effect: 'coverflow',
    // coverflowEffect: {
    //     depth: 0,
    //     modifier: 0.2,
    //     scale: 0.6,
    //     rotate: 0,
    //     slideShadows: false,
    //     stretch: 0,
    // },
  });
});

motionNavSwiper.forEach((slideItem, slideIndex) => {
  motionNavigationNext[slideIndex].classList.add(motionNavigationNextClass + slideIndex);
  motionNavigationPrev[slideIndex].classList.add(motionNavigationPrevClass + slideIndex);

  // eslint-disable-next-line new-cap, no-unused-vars
  const navSwiper = new swiper(slideItem, {
    slidesPerView: 1,
    // effect: 'fade',
    speed: 1000,
    loop: true,
    loopedSlides: 1,
    navigation: {
      nextEl: `.${motionNavigationNextClass + slideIndex}`,
      prevEl: `.${motionNavigationPrevClass + slideIndex}`,
    },
    // effect: 'coverflow',
    // coverflowEffect: {
    //     depth: 0,
    //     scale: 1,
    //     rotate: 0,
    //     slideShadows: false,
    // },
  });
});
