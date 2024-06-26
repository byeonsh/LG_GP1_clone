/* eslint-disable */
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import swiper from '../../assets/js/vendors/swiper.js';

const dateSetting = function () {
  const monthControl = document.querySelectorAll('input[type="date"]');
  monthControl.forEach(el => {
    const theElement = el;
    theElement.value = new Date().toISOString().slice(0, 10);
  });
};
dateSetting();

// 20230321
const hoverImg = function () {
  const iconImgNormal = document.querySelectorAll('.CS0109 .c-prd-grid > div');
  iconImgNormal.forEach((item, index) => {
    const norIcon = item.querySelector('img');
    const norIconAttr = norIcon.getAttribute('src');
    const hoverIcon = norIconAttr.replace('_normal', '_active');
    item.addEventListener('mouseover', function () {
      norIcon.setAttribute('src', hoverIcon);
      item.classList.add('hover');
    });
    item.addEventListener('mouseout', function () {
      norIcon.setAttribute('src', norIconAttr);
      item.classList.remove('hover');
    });
  });
};
hoverImg();

// const inputEvent = {
//     textClear() {
//         const buttonDelete = document.querySelectorAll('.c-button-delete');
//         const searchLayer = document.querySelector('.searchLayer');
//         buttonDelete.forEach(el => {
//             const input = el.parentElement.querySelector('.textInput__input');
//             el.addEventListener('click', () => {
//                 input.value = '';
//                 el.classList.remove('c-button-delete--active');
//                 input.focus();
//                 searchLayer.classList.remove('c-display');
//             });
//         });
//     },
//     deleteButtonOn() {
//         const input = document.querySelectorAll('.textInput__input');
//         input.forEach(el => {
//             const buttonDelete = el.parentElement.querySelector('.c-button-delete');
//             el.addEventListener('click', () => {
//                 // buttonDelete.classList.add('c-button-delete--active');
//                 if (el.value.length === 0) {
//                     el.classList.remove('c-button-delete--active');
//                     // searchLayer.classList.remove('c-display');
//                 }
//             });
//             el.addEventListener('keyup', () => {
//                 buttonDelete.classList.add('c-button-delete--active');
//                 if (el.value.length === 0) {
//                     el.classList.remove('c-button-delete--active');
//                     // searchLayer.classList.remove('c-display');
//                 }
//             });
//         });
//     },
//     layerOpen() {
//         const searchLayer = document.querySelector('.searchLayer');
//         const searchBtn = document.querySelector('.searchBar__form .fieldIcons__before');
//         searchBtn.addEventListener('click', function () {
//             searchLayer.classList.add('c-display');
//         });
//     },
//     layerClose() {
//         const searchLayer = document.querySelector('.searchLayer');
//         const cancelBtn = searchLayer.querySelector('.c-cancel');
//         cancelBtn.addEventListener('click', function () {
//             searchLayer.classList.remove('c-display');
//         });
//     },
//     inputTxt() {
//         const pInput = document.querySelector('.CS0109__search .textInput__input');
//         const mInput = document.getElementById('textInput__input');
//         const searchLayer = document.querySelector('.searchLayer');
//         const cancelBtn = searchLayer.querySelector('.c-cancel');
//         pInput.addEventListener('input', function (e) {
//             let inValue = e.target.value;
//             if (inValue) {
//                 searchLayer.classList.add('c-display');
//                 mInput.value = inValue;
//                 //mInput.focus();
//             }
//             else {
//                 searchLayer.classList.remove('c-display')
//             }
//         });
//         mInput.addEventListener('input', function (e) {
//             let inValue = e.target.value;
//             if (inValue) {
//                 searchLayer.classList.add('c-display');
//                 pInput.value = inValue;
//                 //pInput.focus();
//             }
//         });
//         cancelBtn.addEventListener('click', function () {
//             pInput.value = '';
//         });
//     },
//     inputTxt2() {
//         const pInput = document.querySelector('.CS0109__search .textInput__input2');
//         const mInput = document.getElementById('textInput__input2');
//         const searchLayer = document.querySelector('.searchLayer2');
//         const cancelBtn = searchLayer.querySelector('.c-cancel');
//         pInput.addEventListener('input', function (e) {
//             let inValue = e.target.value;
//             if (inValue) {
//                 searchLayer.classList.add('c-display');
//                 mInput.value = inValue;
//                 //mInput.focus();
//             }
//             else {
//                 searchLayer.classList.remove('c-display')
//             }
//         });
//         mInput.addEventListener('input', function (e) {
//             let inValue = e.target.value;
//             if (inValue) {
//                 searchLayer.classList.add('c-display');
//                 pInput.value = inValue;
//                 //pInput.focus();
//             }
//         });
//         cancelBtn.addEventListener('click', function () {
//             pInput.value = '';
//         });
//     },
//     inputTxt3() {
//         const pInput = document.querySelector('.CS0109__search .textInput__input3');
//         const mInput = document.getElementById('textInput__input3');
//         const searchLayer = document.querySelector('.searchLayer3');
//         const cancelBtn = searchLayer.querySelector('.c-cancel');
//         pInput.addEventListener('input', function (e) {
//             let inValue = e.target.value;
//             if (inValue) {
//                 searchLayer.classList.add('c-display');
//                 mInput.value = inValue;
//                 //mInput.focus();
//             }
//             else {
//                 searchLayer.classList.remove('c-display')
//             }
//         });
//         mInput.addEventListener('input', function (e) {
//             let inValue = e.target.value;
//             if (inValue) {
//                 searchLayer.classList.add('c-display');
//                 pInput.value = inValue;
//                 //pInput.focus();
//             }
//         });
//         cancelBtn.addEventListener('click', function () {
//             pInput.value = '';
//         });
//     },
//     init() {
//         inputEvent.textClear();
//         inputEvent.deleteButtonOn();
//         inputEvent.layerOpen();
//         inputEvent.layerClose();
//         inputEvent.inputTxt();
//         inputEvent.inputTxt2();
//         inputEvent.inputTxt3();
//     },
// };

// inputEvent.init();

function searchBarAction() {
  const searchBar = document.querySelectorAll('.searchbar');

  if (searchBar) {
    searchBar.forEach(el => {
      const searchLayer = el.querySelector('.searchLayer');
      const searchIcon = el.querySelector('.fieldIcons__before');
      const searchInput = el.querySelectorAll('.textInput__input');
      const searchText = el.querySelector('.c-modal-open');
      const searchType = el.querySelector('.c-search-type');
      const normalType = el.querySelector('.c-normal-type');
      const mobileClose = el.querySelector('.c-cancel');

      if (searchInput) {
        searchInput.forEach(el2 => {
          const deleteBtn = el2.parentElement.querySelector('.c-button-delete');

          el2.addEventListener('click', function () {
            searchLayer.classList.add('c-display');
          });

          el2.addEventListener('keydown', function (e) {
            deleteBtn.classList.add('c-button-delete--active');
            if (e.keyCode == 13) {
              e.preventDefault();
              searchLayer.classList.remove('c-display');
            }
          });

          if (deleteBtn) {
            deleteBtn.addEventListener('click', function () {
              el2.value = '';
              deleteBtn.classList.remove('c-button-delete--active');
              searchLayer.classList.remove('c-display');
            });
          }
        });
      }

      if (searchText) {
        if (el.classList.contains('CS0109__search--type2')) {
          searchText.addEventListener('click', function () {
            el.querySelector('.c-subject-required').style.display = 'none';
            if (searchType.style.display === 'none') {
              searchType.style.display = 'block';
              normalType.style.display = 'none';
              searchType.querySelector('input').value = '';
              searchText.textContent = 'Can’t Find the Place?';
              searchLayer.classList.remove('c-display');
              searchType.querySelector('input').classList.remove('c-error');
            } else {
              searchType.style.display = 'none';
              normalType.style.display = 'block';
              normalType.querySelector('input').value = '';
              searchText.textContent = 'Select the place';
              searchLayer.classList.remove('c-display');
              normalType.querySelector('input').classList.remove('c-error');
            }
          });
        }
      }

      if (searchIcon) {
        searchIcon.addEventListener('click', function () {
          searchLayer.classList.add('c-display');
        });
      }

      if (searchLayer) {
        document.addEventListener('click', function (e) {
          if (!el.contains(e.target)) {
            if (searchLayer.classList.contains('c-display')) {
              searchLayer.classList.remove('c-display');
            }
          }
        });

        const searchOption = searchLayer.querySelectorAll('.c-search-category-name');

        if (searchOption) {
          searchOption.forEach(el => {
            el.addEventListener('click', function () {
              const searchValue = el.textContent;

              if (searchValue) {
                searchInput.value = searchValue;
              }

              searchLayer.classList.remove('c-display');
            });
          });
        }

        if (mobileClose) {
          mobileClose.addEventListener('click', function () {
            searchLayer.classList.remove('c-display');
          });
        }
      }
    });
  }
}

searchBarAction();

// purchase input toggle
// const inputChange = () => {
//     const inputToggleButton = document.querySelector('.change-search');
//     const inputPurchase1 = document.querySelector('.CS0109 .c-search-type');
//     const inputPurchase2 = document.querySelector('.CS0109 .c-normal-type');
//     const searchLayer = document.querySelector('.searchLayer');
//     inputToggleButton.addEventListener('click', () => {
//         if (inputPurchase1.style.display === 'none') {
//             inputPurchase1.style.display = 'block';
//             inputPurchase2.style.display = 'none';
//             inputPurchase1.value = '';
//             inputToggleButton.textContent = 'Can’t Find the Place?';
//             searchLayer.classList.remove('c-display')
//         } else {
//             inputPurchase1.style.display = 'none';
//             inputPurchase2.style.display = 'block';
//             inputPurchase2.querySelector('.textInput__input').value = '';
//             inputToggleButton.textContent = 'Select the place';
//             searchLayer.classList.remove('c-display')
//         }
//     });
// };
// inputChange();

// purchase input toggle
// const inputToggle = () => {
//     const inputToggleButton = document.querySelector('.CS0109 .c-button');
//     const inputPurchase1 = document.querySelector('.CS0109 .c-placePurchase-text');
//     const inputPurchase2 = document.querySelector('.CS0109 .c-purchase-input');
//     inputToggleButton.addEventListener('click', () => {
//         if (inputPurchase1.style.display === 'none') {
//             inputPurchase1.style.display = 'block';
//             inputPurchase2.style.display = 'none';
//             inputPurchase1.value = '';
//             inputToggleButton.textContent = 'Can’t Find the Place?';
//         } else {
//             inputPurchase1.style.display = 'none';
//             inputPurchase2.style.display = 'block';
//             inputPurchase2.querySelector('.textInput__input').value = '';
//             inputToggleButton.textContent = 'Select the place';
//         }
//     });
// };
// inputToggle();

// carouselOption
const carouselOption2 = {
  pagination: behavior.pagination,
  spaceBetween: 10,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  slidesPerView: 1,
  breakpoints: {
    769: {
      slidesPerGroup: 3,
      spaceBetween: 50,
      pagination: {
        enabled: true,
      },
    },
  },
};

const swiperInit2 = el => {
  const swiperFraction2 = el.parentElement.querySelector('.type-card__slide .c-carousel__pagination');
  const nextButton = el.parentElement.querySelector('.js-carousel-next');
  const prevButton = el.parentElement.querySelector('.js-carousel-prev');
  let selectSlide = '';
  runCarousel(el, {
    ...carouselOption2,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      el: swiperFraction2,
      type: 'fraction',
    },
    breakpoints: {
      // min
      769: {
        slideToClickedSlide: true,
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 12,
        pagination: {
          enabled: true,
        },
        preventClicks: false,
        loopFillGroupWithBlank: true,
      },
    },
    on: {
      click: index => {
        console.log(selectSlide);
        if (index.clickedIndex !== selectSlide) {
          index.slides.forEach(slide => {
            slide.classList.remove('custom-active');
          });
        }
        index.clickedSlide.classList.toggle('custom-active');

        selectSlide = index.clickedIndex;
      },
    },
  });
};

function initCont() {
  const component = document.querySelectorAll('.CS0109__container');
  if (beforeLaunch(component)) return false;
  const viewedProductCarousel = document.querySelectorAll('.CS0109__container .type-card__slide .swiper');
  if (beforeLaunch(viewedProductCarousel)) return false;

  // initialize carousel
  viewedProductCarousel.forEach(el => {
    console.log(el);
    const itemCount = el.querySelectorAll('.type-card__slide .swiper-slide:not(.emptyCard)').length;
    console.log(itemCount);
    const cardMoreBtn = el.querySelectorAll('.type-card__slide .c-viewMore-btn');
    console.log(cardMoreBtn);
    const handler = el.querySelector('.c-carousel__handler');
    // running to async 1st, 2nd carousel.
    // if (index > 3) {
    //     const chanceStackEmpty = 0;
    //     setTimeout(() => swiperInit2(el), chanceStackEmpty);
    // }
    // if (itemCount <= 3) {
    //     cardMoreBtn.classList.add('hidden');
    // }
    if (itemCount <= 3) {
      cardMoreBtn.forEach(items => {
        items.classList.add('hidden');
      });
    }
    if (itemCount < 2) {
      handler.classList.add('hidden');
      el.classList.add('noEmptyCard');
    }
    swiperInit2(el);
  });
  const clickRoleGroup = function () {
    // const clickDiv = document.querySelectorAll('.cmp-carousel__item');
    const clickDiv = document.querySelectorAll(
      '.type-card__slide--select .cmp-carousel__item, .type-card__slide--multiselect .cmp-carousel__item'
    );
    clickDiv.forEach(function (i) {
      i.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
          e.preventDefault();
          this.classList.toggle('custom-active');
        }
      });
    });
  };
  clickRoleGroup();
  const selectCard01 = () => {
    const countInputs = document.querySelectorAll('.c-list-product__wrap > a');
    const btnNext = document.querySelector('.c-next-btn');
    countInputs.forEach(el => {
      el.addEventListener('click', item => {
        for (let i = 0; i < el.parentNode.children.length; i++) {
          el.parentNode.childNodes[i].classList.remove('is-active');
        }
        el.classList.add('is-active');
        btnNext.classList.add('highlight');
        btnNext.removeAttribute('disabled');
      });
    });
  };
  selectCard01();
}

initCont();

function initCont02() {
  const component = document.querySelectorAll('.CS0109__container');
  if (beforeLaunch(component)) return false;
  const submitButton = document.querySelectorAll('.c-btn__next');
  const dateRequiredCheck = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    const dateString = `${year}-${month}-${day}`;
    for (let index = 0; index < submitButton.length; index++) {
      submitButton[index].addEventListener('click', e => {
        // console.log(e.target);
        e.stopPropagation();
        const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="date"]');
        // console.log(e.target);
        countInputs.forEach(el => {
          const RequiredMsg = el.parentNode.querySelector('.c-subject-required');
          if (el.value === dateString) {
            el.classList.add('c-error');
            RequiredMsg.style.display = 'block';
            el.focus();
            return false;
            // eslint-disable-next-line no-else-return
          } else {
            RequiredMsg.style.display = 'none';
            el.classList.remove('c-error');
          }
        });
      });
    }
  };
  dateRequiredCheck();
  const selectRequiredCheck = () => {
    for (let index = 0; index < submitButton.length; index++) {
      submitButton[index].addEventListener('click', e => {
        // console.log(e.target);
        e.stopPropagation();
        const countInputs = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('input[type="text"]');
        const placeSearch = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('.c-search-type');
        const placeInput = submitButton[index].parentNode.parentNode.parentNode.querySelectorAll('.c-normal-type');
        countInputs.forEach(el => {
          const RequiredMsg = el.parentNode.querySelector('.c-subject-required');
          if (el.value === '') {
            if (!RequiredMsg === false) {
              el.classList.add('c-error');
              el.focus();
              RequiredMsg.style.display = 'block';
            }
            // eslint-disable-next-line no-else-return
          }
        });

        if (placeSearch) {
          placeSearch.forEach(el => {
            const placeError = el.parentNode.querySelector('.c-subject-required');
            const inputplace = el.querySelector('input');
            if (el.style.display != 'none') {
              if (inputplace.value === '') {
                if (!placeError === false) {
                  inputplace.classList.add('c-error');
                  inputplace.focus();
                  placeError.style.display = 'block';
                }
              }
            }
          });
        }

        if (placeInput) {
          placeInput.forEach(el => {
            const placeError = el.parentNode.querySelector('.c-subject-required');
            const inputplace = el.querySelector('input');
            if (el.style.display != 'none') {
              if (inputplace.value === '') {
                if (!placeError === false) {
                  inputplace.classList.add('c-error');
                  inputplace.focus();
                  placeError.style.display = 'block';
                }
              }
            }
          });
        }
      });
    }
  };
  selectRequiredCheck();
}

initCont02();

const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 3,
});
