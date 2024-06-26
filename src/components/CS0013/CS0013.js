import accordion from '../../assets/js/common/accordion.js';
import { bp, keyboard } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';

// eslint-disable-next-line new-cap, no-unused-vars
const breadcrumbSwiper = new swiper('.c-breadcrumb.swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  preventClicksPropagation: false,
  observer: true,
  observeParents: true,
  // spaceBetween: 30,
  initialSlide: 3,
});

function selectContent(i, contentTitle) {
  let selectlistTitle2;
  contentTitle.forEach((el, index) => {
    const listTitle2 = contentTitle[index].querySelectorAll('.c-wide-list__item');
    listTitle2.forEach((el2, index2) => {
      el2.parentElement.classList.remove('active');
      el2.classList.remove('c-wide-list__item--active');
      el2.addEventListener('click', function (e) {
        e.preventDefault();
        if (i !== index || i === index) {
          if (selectlistTitle2 !== index2 && selectlistTitle2 !== undefined) {
            listTitle2[selectlistTitle2].classList.remove('c-wide-list__item--active');
            listTitle2[selectlistTitle2].removeAttribute('aria-current', false);
          }
          el2.classList.add('c-wide-list__item--active');
          el2.setAttribute('aria-current', true);
          selectlistTitle2 = index2;
        }
      });

      if (i === index) {
        const disabledText = document.querySelector('.c-list-area__disabled-text');
        disabledText.classList.add('c-list-area__disabled-text--disabled');

        el2.parentElement.classList.add('active');
      }
    });
  });
}

function pcClickList() {
  const targetPC = document.querySelector('.pc-only').querySelectorAll('.c-list-area__box');
  const listTitle = targetPC[0].querySelectorAll('.c-wide-list__item');
  const listContentTitle = targetPC[1].querySelectorAll('.category-text');
  const listScrollBox = document.querySelectorAll('.c-list-area__scroll');
  let selectlistTitle;
  const contentTitle = document.querySelector('.pc-only').querySelectorAll('.c-wide-list__item-category');
  const listItem = document
    .querySelector('.pc-only')
    .querySelectorAll('.c-list-area__box:not(.c-list-area__box-category) .c-wide-list .c-wide-list__item');
  const listItemSub = document
    .querySelector('.pc-only')
    .querySelectorAll('.c-list-area__sub-topic .c-wide-list__item-category .c-wide-list__item');
  function keyupSearchLayer(btn) {
    const searchList = btn.target.closest('.wa-keylist');
    const currentList = btn.target.closest('.c-wide-list__item');
    const nodes = [...searchList.children];
    let index = nodes.indexOf(currentList);
    if (currentList.length === 0) return false;
    if (btn.keyCode === keyboard.up) {
      btn.preventDefault();
      index -= 1;
      if (index >= 0 && index < nodes.length) {
        if (nodes[index].querySelector('button')) {
          nodes[index].querySelector('button').focus();
        } else if (nodes[index].querySelector('a')) {
          nodes[index].querySelector('a').focus();
        }
      }
    } else if (btn.keyCode === keyboard.down) {
      btn.preventDefault();
      index += 1;
      if (index >= 0 && index < nodes.length) {
        if (nodes[index].querySelector('button')) {
          nodes[index].querySelector('button').focus();
        } else if (nodes[index].querySelector('a')) {
          nodes[index].querySelector('a').focus();
        }
      }
    }
  }
  contentTitle.forEach(elem => {
    elem.classList.add('c-all-disabled');
    listTitle.forEach((el, index) => {
      function enterAction() {
        elem.classList.remove('c-all-disabled');
        if (selectlistTitle !== index && selectlistTitle !== undefined) {
          listTitle[selectlistTitle].classList.remove('c-wide-list__item--active');
          listTitle[selectlistTitle].removeAttribute('aria-current', false);
        }
        el.classList.add('c-wide-list__item--active');
        el.setAttribute('aria-current', true);
        setTimeout(function () {
          const focusFirst = document.querySelectorAll('.c-wide-list__item-category.active .c-wide-list__item');
          focusFirst[0].querySelector('a').focus();
        }, 100);
        if (index <= listContentTitle.length) {
          if (index !== 0) {
            const movePosition = listContentTitle[index].offsetTop;
            listScrollBox[2].scrollTop = movePosition - 24;
          } else {
            listScrollBox[2].scrollTop = 0;
          }
          selectContent(index, contentTitle);
        }
        selectlistTitle = index;
      }
      el.addEventListener('click', function () {
        enterAction();
      });
      el.addEventListener('keyup', function () {
        if (window.event.keyCode === 13 || window.event.keyCode === 32) {
          enterAction();
        }
      });
    });
    listItem.forEach(el => {
      el.addEventListener('keyup', keyupSearchLayer);
    });
    listItemSub.forEach(el => {
      el.addEventListener('keyup', keyupSearchLayer);
    });
  });
}
function mobileClickList() {
  const targetMobile = document.querySelector('.mobile-only').querySelectorAll('.c-accordion__box');
  const mobileTop = document.querySelector('.c-modal__content-inner').offsetTop;
  targetMobile.forEach((el, index) =>
    el.querySelector('.c-accordion__head').addEventListener('click', () => {
      const subAccOpen = document.querySelector('.c-accordion__box--expand--sub');
      if (subAccOpen != null && subAccOpen !== el) {
        subAccOpen.classList.remove('c-accordion__box--expand--sub');
      }
      el.classList.toggle('c-accordion__box--expand--sub');

      if (el.classList.contains('c-accordion__box--expand')) {
        document.querySelector('.c-modal__content-inner').scrollTop = targetMobile[index].offsetTop - mobileTop - 10;
      }
    })
  );
}

// 20230317 modify script
function listItemToggle() {
  const listItem = document.querySelectorAll('.mobile-only .c-wide-list__item');

  listItem.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      listItem.forEach(el => {
        el.classList.remove('c-wide-list__item--active');
        el.removeAttribute('aria-current', false);
      });
      item.classList.add('c-wide-list__item--active');
      item.setAttribute('aria-current', true);
    });
    item.addEventListener('keyup', e => {
      e.preventDefault();
      if (window.event.keyCode === 13 || window.event.keyCode === 32) {
        listItem.forEach(el => {
          el.classList.remove('c-wide-list__item--active');
          el.removeAttribute('aria-current', false);
        });
        item.classList.add('c-wide-list__item--active');
        item.setAttribute('aria-current', true);
      }
    });
  });
}
listItemToggle();

function clickEvent(breakpoint) {
  if (breakpoint > bp.mobile) {
    pcClickList();
  } else {
    mobileClickList();
  }
}

// 20230309 add modal script
function scrollContentHeight(breakpoint) {
  const modal = document.querySelectorAll('.c-modal__box');

  modal.forEach(item => {
    const modalHead = item.childNodes[1];
    const modalHeadHeight = modalHead.offsetHeight;

    const modalBottom = item.childNodes[5];
    const modalBottomHeight = modalBottom.offsetHeight;

    const modalContent = item.childNodes[3].lastElementChild;
    const modalContentHeight = modalHeadHeight + modalBottomHeight;

    if (breakpoint > bp.mobile) {
      modalContent.style.height = `calc(90vh - ${modalContentHeight}px)`;
    } else {
      modalContent.style.height = `calc(100vh - ${modalContentHeight}px)`;
    }
  });
}

// 20230309 add modal script
// init
function init() {
  const typeAccordion = document.querySelectorAll('.CS0013 .type-accordion');
  typeAccordion.forEach(el => accordion.run(el));

  let breakpoint = window.innerWidth;
  clickEvent(breakpoint);
  scrollContentHeight(breakpoint);

  window.addEventListener('resize', () => {
    breakpoint = window.innerWidth;
    clickEvent(breakpoint);
    scrollContentHeight(breakpoint);
  });
}

init();
