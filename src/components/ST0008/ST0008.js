// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { keyboard, isRTL } from '../../assets/js/common/constant.js';

const compareImg = function (el) {
  const defaultImg = el.querySelector('.c-image-compare__default');
  const cover = el.querySelector('.c-image-compare__cover');
  const defaultText = defaultImg.querySelector('.c-image-compare__text');
  const coverText = cover.querySelector('.c-image-compare__text');
  const dir = defaultImg.closest('.type-vertical-tb, .type-vertical-lr') ? 'y' : 'x';
  const track = el.querySelector('.c-image-compare__track');
  const handle = el.querySelectorAll('.c-image-compare__handle');
  const handleLeft = el.querySelector('.move-left');
  const handleRight = el.querySelector('.move-right');
  let isClicked = false;
  // init
  if (dir === 'x') {
    cover.style.width = '50%';
    defaultText.style.width = '50%';
    if (isRTL) {
      track.style.right = '50%';
    } else {
      track.style.left = '50%';
    }
  } else {
    cover.style.height = '50%';
    defaultText.style.height = '50%';
    track.style.top = '50%';
  }
  // Apply the calculated percentage to each element
  const move = function (percent) {
    if (dir === 'x') {
      if (isRTL) {
        cover.style.width = `${100 - percent}%`;
        track.style.right = `${100 - percent}%`;
        defaultText.style.width = `${percent}%`;
        if (percent < 20) defaultText.style.opacity = 0;
        else defaultText.style.opacity = 1;
        if (percent > 80) coverText.style.opacity = 0;
        else coverText.style.opacity = 1;
      } else {
        cover.style.width = `${percent}%`;
        track.style.left = `${percent}%`;
        defaultText.style.width = `${100 - percent}%`;
        if (percent > 80) defaultText.style.opacity = 0;
        else defaultText.style.opacity = 1;
        if (percent < 20) coverText.style.opacity = 0;
        else coverText.style.opacity = 1;
      }
    } else {
      cover.style.height = `${percent}%`;
      track.style.top = `${percent}%`;
      defaultText.style.height = `${100 - percent}%`;
      if (percent > 80) defaultText.style.opacity = 0;
      else defaultText.style.opacity = 1;
      if (percent < 20) coverText.style.opacity = 0;
      else coverText.style.opacity = 1;
    }
    return false;
  };
  // mousedown, touchstart event
  const dragStart = function (event) {
    event.preventDefault();
    event.stopPropagation();
    isClicked = true;
  };
  // mousemove, touchmove event
  const dragMove = function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (!isClicked) return;
    if (dir === 'x') {
      const coverLeft = defaultImg.getBoundingClientRect().left;
      let x = (event.pageX || event.changedTouches[0].pageX) - coverLeft;
      if (x < 0) x = 0;
      if (x > defaultImg.offsetWidth) x = defaultImg.offsetWidth;
      const percent = (x * 100) / defaultImg.offsetWidth;
      move(percent);
    } else {
      let y = (event.pageY || event.changedTouches[0].pageY) - (cover.getBoundingClientRect().top + window.scrollY);
      if (y < 0) y = 0;
      if (y > defaultImg.offsetHeight) y = defaultImg.offsetHeight;
      const percent = (y * 100) / defaultImg.offsetHeight;
      move(percent);
    }
    return false;
  };
  const clickMove = function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (dir === 'x') {
      let percent = parseInt(cover.style.width, 10);
      if (!cover.style.width) percent = '50';
      if (event.target.classList.contains('move-left')) {
        percent -= 10;
      } else if (event.target.classList.contains('move-right')) {
        percent += 10;
      }
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      move(percent);
    } else {
      let percent = parseInt(cover.style.height, 10);
      if (!cover.style.height) percent = '50';
      if (event.target.classList.contains('move-left')) {
        percent -= 10;
      } else if (event.target.classList.contains('move-right')) {
        percent += 10;
      }
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      move(percent);
    }
  };
  // keyup event
  const keyupEvent = function (event) {
    event.preventDefault();
    const key = event.keyCode;
    if (dir === 'x') {
      // x
      let percent = parseInt(cover.style.width, 10);
      if (!cover.style.width) percent = '50';
      if (key === keyboard.left) {
        // left
        percent -= 5;
      } else if (key === keyboard.right) {
        // right
        percent += 5;
      }
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      move(percent);
    } else {
      // y
      let percent = parseInt(cover.style.height, 10);
      if (!cover.style.height) percent = '50';
      if (key === keyboard.up) {
        // top
        percent -= 5;
      } else if (key === keyboard.down) {
        // bottom
        percent += 5;
      }
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      move(percent);
    }
  };
  // addEventListener
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('mouseup', () => {
      isClicked = false;
    });
    window.addEventListener('touchend', () => {
      isClicked = false;
    });
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('touchmove', dragMove, { passive: true });
    // eslint-disable-next-line no-shadow
    handle.forEach(el => {
      el.addEventListener('blur', () => {
        isClicked = false;
      });
      el.addEventListener('mousedown', dragStart);
      el.addEventListener('touchstart', dragStart, { passive: false });
      el.addEventListener('keyup', keyupEvent);
    });
    handleLeft.addEventListener('click', clickMove);
    handleRight.addEventListener('click', clickMove);
  });
};

// component
function init() {
  const component = document.querySelectorAll('.ST0008');
  if (beforeLaunch(component)) return false;
  component.forEach(el => {
    compareImg(el);
  });
}
init();
