import { isRTL } from './constant.js';
import { beforeLaunch } from './utils.js';

export const settingFormWithCountingEl = () => {
  const ratingBox = document.querySelectorAll('.c-input-item__rating');
  if (ratingBox) {
    ratingBox.forEach(box => {
      const ratingInput = box.querySelectorAll('.c-input-item__rating input');
      const spanCounting = box.querySelector('.counting-num');
      ratingInput.forEach(input => {
        input.addEventListener('change', function () {
          if (input.checked) {
            spanCounting.textContent = `${input.getAttribute('value')}`;
          }
        });
      });
    });
  }

  const textArea = document.querySelectorAll('textarea');
  if (textArea) {
    textArea.forEach(el => {
      const lengthArea = el.closest('.c-input-item')?.querySelector('.counting-num');
      el.addEventListener('keyup', () => {
        if (lengthArea) {
          const len = el.value.length;
          lengthArea.textContent = len;
        }
      });
    });
  }
};

export const rangeInit = target => {
  const dataKey = target.dataset.range;
  const inputLeft = target.querySelector('.input-left');
  const inputRight = target.querySelector('.input-right');
  const realLeft = target.querySelector('.real-left');
  const realRight = target.querySelector('.real-right');
  const thumbLeft = target.querySelector('.c-range-thumb__left');
  const thumbRight = target.querySelector('.c-range-thumb__right');
  const range = target.querySelector('.c-range-active');
  const txtLeft = target.querySelector('.c-range-min');
  const txtRight = target.querySelector('.c-range-max');
  // eslint-disable-next-line no-undef
  const data = dragbarVal[dataKey];

  const setLeftValue = () => {
    const el = inputLeft;
    const [min, max] = [parseInt(el.min, 10), parseInt(el.max, 10)];
    el.value = Math.min(parseInt(el.value, 10), parseInt(inputRight.value, 10));
    const k = Object.getOwnPropertyNames(data[el.value]);
    const v = data[el.value][k];
    realLeft.value = v;
    txtLeft.innerHTML = k;

    // the input and thumb move together.
    const percent = ((el.value - min) / (max - min)) * 100;
    if (percent === 0 || percent === 100) {
      document.querySelector('.c-range-min__box .sr-only').classList.add('hidden');
    } else {
      document.querySelector('.c-range-min__box .sr-only').classList.remove('hidden');
    }
    if (isRTL) {
      thumbLeft.style.right = `${percent}%`;
      range.style.right = `${percent}%`;
    } else {
      thumbLeft.style.left = `${percent}%`;
      range.style.left = `${percent}%`;
    }
  };

  const setRightValue = () => {
    const el = inputRight;
    const [min, max] = [parseInt(el.min, 10), parseInt(el.max, 10)];
    el.value = Math.max(parseInt(el.value, 10), parseInt(inputLeft.value, 10));
    const k = Object.getOwnPropertyNames(data[el.value]);
    const v = data[el.value][k];
    realRight.value = v;
    txtRight.innerHTML = k;

    // the input and thumb move together.
    const percent = ((el.value - min) / (max - min)) * 100;
    if (percent === 100 || percent === 0) {
      document.querySelector('.c-range-max__box .sr-only').classList.add('hidden');
    } else {
      document.querySelector('.c-range-max__box .sr-only').classList.remove('hidden');
    }
    if (isRTL) {
      thumbRight.style.left = `${100 - percent}%`;
      range.style.left = `${100 - percent}%`;
    } else {
      thumbRight.style.right = `${100 - percent}%`;
      range.style.right = `${100 - percent}%`;
    }
  };
  inputLeft.addEventListener('input', setLeftValue);
  inputRight.addEventListener('input', setRightValue);
};

export const changeSelectTag = (target, event, guide) => {
  const $box = target.closest('.c-change-select').querySelector('.c-change-select__box');
  const $boxItems = $box.querySelectorAll('.c-change-select__item');
  const $select = target.closest('.c-change-select').querySelector('.c-select-item select');
  const $selected = $select.selectedIndex;
  if (event.type === 'change') {
    $boxItems.forEach(el => {
      el.classList.remove('active');
    });
    if (guide) {
      try {
        $box.children[$selected - 1].classList.add('active');
        $box.children[$selected - 1].setAttribute('aria-selected', true);
      } catch (err) {
        console.log('Select Guide Text');
      }
    } else {
      $box.children[$selected].classList.add('active');
      $box.children[$selected].setAttribute('aria-selected', true);
    }
  } else if (event.type === 'click') {
    $boxItems.forEach(el => {
      el.classList.remove('active');
      el.removeAttribute('aria-selected');
    });
    target.parentElement.classList.add('active');
    target.parentElement.setAttribute('aria-selected', true);

    const $items = [...$box.children];
    const $index = $items.indexOf(target.parentElement);

    if (guide) {
      try {
        $select.selectedIndex = $index + 1;
      } catch (err) {
        console.log('Not exist option element');
      }
    } else {
      $select.selectedIndex = $index;
    }
  }
};
export const changeSelect = () => {
  const elements = document.querySelectorAll('.c-change-select');
  if (beforeLaunch(elements)) return false;
  const handler = hasGuideOption => {
    return function (event) {
      return changeSelectTag(event.currentTarget, event, hasGuideOption);
    };
  };
  elements.forEach(el => {
    const hasGuideOption = el.classList.contains('has-guide');
    const $form = el.querySelector('select');
    $form.addEventListener('change', handler(hasGuideOption), false);

    const $boxItem = el.querySelectorAll('.c-change-select__box button');
    $boxItem.forEach(item => item.addEventListener('click', handler(hasGuideOption), false));
  });
};

export const multiRange = () => {
  const rangeComponent = document.querySelectorAll('.c-form-range');
  if (beforeLaunch(rangeComponent)) return false;
  rangeComponent.forEach(target => {
    return rangeInit(target);
  });
};

export const formsToggle = () => {
  const toggleBtns = document.querySelectorAll('.c-form-box__toggle .c-toggle-button');
  if (beforeLaunch(toggleBtns)) return false;
  const runToggle = event => {
    const el = event.target;
    const isPressed = event.target.ariaPressed === 'true';
    if (isPressed) {
      el.ariaPressed = 'false';
    } else {
      el.ariaPressed = 'true';
    }
  };
  toggleBtns.forEach(target => {
    target.addEventListener('click', runToggle);
  });
};

export const inputClear = () => {
  const clearBtns = document.querySelectorAll('.c-input-item .js-input-clear');
  if (beforeLaunch(clearBtns)) return false;
  const resetEvent = (targetInput, clearBtn) => {
    const input = targetInput;
    input.value = '';
    clearBtn.classList.remove('active');
  };
  const keyupEvent = (targetInput, clearBtn) => {
    const inputValueLength = targetInput.value.length;
    if (inputValueLength > 0) {
      clearBtn.classList.add('active');
    } else {
      clearBtn.classList.remove('active');
    }
  };
  clearBtns.forEach(clearBtn => {
    const targetInput = clearBtn.closest('.c-input-item').querySelector('input[type="text"]');
    clearBtn.addEventListener('click', () => {
      resetEvent(targetInput, clearBtn);
    });
    targetInput.addEventListener('keyup', () => {
      keyupEvent(targetInput, clearBtn);
    });
  });
};

export default {};
