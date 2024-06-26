import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp } from '../../assets/js/common/constant.js';

const mobileSize = () => {
  const ww = window.innerWidth;
  const isMobile = ww <= bp.mobile + 1;
  return isMobile;
};
const getDisplayNumber = list => {
  let len = list.dataset.lengthMobile;
  const isMobile = mobileSize();
  if (isMobile) {
    len = list.dataset.lengthMobile;
  } else {
    len = list.dataset.lengthDesktop;
  }
  return parseInt(len, 10);
};

const resetList = el => {
  el.forEach(c => {
    const list = c.querySelector('.c-list');
    const isMobile = mobileSize();
    const len = getDisplayNumber(list);
    const btnArea = c.querySelector('.c-load-more');
    if (list.dataset.first === 'true') {
      // If the user has not yet clicked the more button,
      // the number displayed on the screen is changed according to the browser size.
      const allList = list.querySelectorAll('.c-list__item:not(.c-list__item--primary)');
      const primaryList = list.querySelectorAll('.c-list__item--primary');
      allList.forEach(item => {
        const index = [...item.parentElement.children].indexOf(item) - primaryList.length;
        if (index >= len) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
      });
    } else if (!isMobile) {
      // After the user clicks the more button once, when resizing, show more items
      // Only Desktop size
      // let moreItemLength = 0;
      const hiddenList = list.querySelectorAll('.c-list__item.hidden:not(.c-list__item--primary)');
      const shownList = list.querySelectorAll('.c-list__item:not(.hidden):not(.c-list__item--primary)');
      // if (shownList.length % len > 0) {
      //     // If the number of currently displayed items is not a multiple of len,
      //     // find the number of items to be displayed
      //     moreItemLength = len * Math.ceil(shownList.length / len) - shownList.length;
      // }
      hiddenList.forEach(item => {
        const index = [...item.parentElement.children].indexOf(item) - shownList.length;
        if (index <= len) {
          item.classList.remove('hidden');
        }
      });
    }
    // Controls whether to show the more button based on hidden items.
    const hiddenList = list.querySelectorAll('.c-list__item.hidden:not(.c-list__item--primary)');
    if (hiddenList.length === 0) {
      btnArea.classList.add('hidden');
    } else {
      btnArea.classList.remove('hidden');
    }
  });
};

const clickMore = event => {
  const btn = event.target;
  const list = btn.closest('.component').querySelector('.c-list');
  const btnArea = btn.closest('.c-load-more');
  if (list.dataset.first) {
    // After the user clicks the more button even once,
    // the number displayed on the screen no longer changes.
    list.dataset.first = false;
  }
  // Depending on the resolution, more items as many as len are displayed
  const len = getDisplayNumber(list);
  let hiddenList = list.querySelectorAll('.c-list__item.hidden:not(.c-list__item--primary)');
  const shownList = list.querySelectorAll('.c-list__item:not(.hidden):not(.c-list__item--primary)');
  hiddenList.forEach(item => {
    const index = [...item.parentElement.children].indexOf(item) - shownList.length;
    if (index <= len) {
      item.classList.remove('hidden');
    }
  });
  // Controls whether to show the more button based on hidden items.
  hiddenList = list.querySelectorAll('.c-list__item.hidden:not(.c-list__item--primary)');
  if (hiddenList.length === 0) {
    btnArea.classList.add('hidden');
  } else {
    btnArea.classList.remove('hidden');
  }
};

// init
function init() {
  const component = document.querySelectorAll('.ST0028');
  if (beforeLaunch(component)) return false;

  component.forEach(el => {
    // init
    const list = el.querySelector('.c-list');
    list.dataset.first = true;
  });

  const moreButtons = document.querySelectorAll('.ST0028 .c-load-more button');
  moreButtons.forEach(btn => {
    btn.addEventListener('click', clickMore);
  });

  // resize
  const delay = 300;
  let timer = null;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      resetList(component);
    }, delay);
  });
  resetList(component);
}
init();
