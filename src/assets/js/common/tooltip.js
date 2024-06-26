const tooltip = function (elements) {
  const tooltipCont = elements;
  if (tooltipCont.length === 0) return false;
  // Handle when tooltip goes off screen
  const tooltipFixPosition = target => {
    const container = target.querySelector('.c-tooltip__container');
    const contents = container.querySelector('.c-tooltip__contents');
    if (!container || !contents) return false;
    const c = container.getBoundingClientRect();
    const b = contents.getBoundingClientRect();
    // Calculate window width and height without tooltip
    // If the tooltip is displayed off the screen,
    // horizontal scrolling occurs and the width value is calculated incorrectly.
    container.classList.remove('active');
    const w = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    container.classList.add('active');
    // Get original class name
    const originalClass = container.classList.value;
    const oldClass = {
      tb: originalClass.indexOf('top-') !== -1 ? 'top' : 'bottom',
      lr: originalClass.indexOf('-left') !== -1 ? 'left' : 'right',
    };
    if (originalClass.indexOf('-center') !== -1) {
      oldClass.lr = 'center';
    }
    // The changed class will be saved in changeClass.
    const changeClass = {
      tb: oldClass.tb,
      lr: oldClass.lr,
    };
    // Check the vertical position
    // and change the direction if the screen goes over
    if (oldClass.tb === 'top') {
      if (b.bottom > w.height) {
        changeClass.tb = 'bottom';
      }
    } else if (oldClass.tb === 'bottom') {
      if (b.top < 0) {
        changeClass.tb = 'top';
      }
    }
    // Check the left and right positions
    // and change the direction if the screen goes over
    if (oldClass.lr === 'left' && b.right > w.width) {
      changeClass.lr = 'right';
    } else if (oldClass.lr === 'right' && b.left < 0) {
      changeClass.lr = 'left';
    }
    // Change to the class name stored in changeClass
    const oldClassName = `${oldClass.tb}-${oldClass.lr}`;
    const newClassName = `${changeClass.tb}-${changeClass.lr}`;
    if (oldClass.lr !== changeClass.lr || oldClass.tb !== changeClass.tb) {
      container.classList.remove(`${oldClass.tb}-${oldClass.lr}`);
      container.classList.add(newClassName);
      // Check whether it is displayed off screen after position correction
      if (oldClass.lr !== changeClass.lr) {
        const newB = contents.getBoundingClientRect();
        // Even though the tooltip view direction is changed,
        // it changes to the center direction when it goes off screen.
        if (newB.left < 0 || newB.right > w.width) {
          const centerClass = `${changeClass.tb}-center`;
          container.classList.add(centerClass);
          container.classList.remove(newClassName);
          const canCenter = c.left + newB.width / 2 <= w.width && c.left - newB.width / 2 > 0;
          // Nevertheless, if it goes off screen,
          // return the class to its original class and modify the left and width to handle it.
          if (!canCenter) {
            container.classList.remove(centerClass);
            container.classList.add(oldClassName);
            contents.style.right = 'auto';
            contents.style.left = `${16 - c.left}px`;
            contents.style.width = `${w.width - 32}px`;
          }
        }
      }
    }
  };
  // close all tooltip
  const tooltipReset = () => {
    const container = document.querySelectorAll('.c-tooltip__container');
    container.forEach(el => {
      const btnTootip = el.closest('.c-tooltip').querySelector('.c-tooltip__button');
      const btnAriaPress = btnTootip.getAttribute('aria-pressed');
      const btnAriaEpd = btnTootip.getAttribute('aria-expanded');
      el.classList.remove('active');
      if (btnAriaPress) {
        btnTootip.setAttribute('aria-pressed', 'false');
      } else if (btnAriaEpd) {
        btnTootip.setAttribute('aria-expanded', 'false');
      }
    });
  };
  // control - focus
  const controlFocus = el => {
    const container = el.querySelector('.c-tooltip__container');
    const btnTootip = container.closest('.c-tooltip').querySelector('.c-tooltip__button');
    const focusableElements = container.querySelectorAll('a, button');
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const btnType = btnTootip.getAttribute('data-wa-type');
    if (lastFocusable) {
      lastFocusable.addEventListener('blur', () => {
        container.classList.remove('active');
        if (btnType === 'press') {
          btnTootip.setAttribute('aria-pressed', 'false');
        } else {
          btnTootip.setAttribute('aria-expanded', 'false');
        }
      });
    }
  };
  // toggle button
  const toggleBtn = target => {
    const btnTootip = target.querySelector('.c-tooltip__button');
    const container = target.querySelector('.c-tooltip__container');
    const contents = container.querySelector('.c-tooltip__contents');
    const btnType = btnTootip.getAttribute('data-wa-type');
    if (btnTootip) {
      if (btnType === 'press') {
        btnTootip.addEventListener('focus', tooltipReset);
        btnTootip.addEventListener('click', function () {
          const getAriaExpand = btnTootip.getAttribute('aria-pressed');
          if (contents) contents.removeAttribute('style');
          if (getAriaExpand === 'true') {
            container.classList.remove('active');
            btnTootip.setAttribute('aria-pressed', 'false');
          } else {
            tooltipReset();
            container.classList.add('active');
            btnTootip.setAttribute('aria-pressed', 'true');
            tooltipFixPosition(target);
          }
        });
      } else {
        btnTootip.addEventListener('focus', tooltipReset);
        btnTootip.addEventListener('click', function () {
          const getAriaExpand = btnTootip.getAttribute('aria-expanded');
          if (contents) contents.removeAttribute('style');
          if (getAriaExpand === 'true') {
            container.classList.remove('active');
            btnTootip.setAttribute('aria-expanded', 'false');
          } else {
            tooltipReset();
            container.classList.add('active');
            btnTootip.setAttribute('aria-expanded', 'true');
            tooltipFixPosition(target);
          }
        });
      }
    }
  };
  // close button
  const closeBtn = target => {
    const btnClose = target.querySelector('.c-tooltip__close');
    const btnTootip = target.closest('.c-tooltip').querySelector('.c-tooltip__button');
    const container = target.querySelector('.c-tooltip__container');
    const contents = container.querySelector('.c-tooltip__contents');
    const btnType = btnTootip.getAttribute('data-wa-type');
    if (btnClose) {
      if (btnType === 'press') {
        btnClose.addEventListener('click', function () {
          container.classList.remove('active');
          btnTootip.setAttribute('aria-pressed', 'false');
          contents.removeAttribute('style');
        });
      } else {
        btnClose.addEventListener('click', function () {
          container.classList.remove('active');
          btnTootip.setAttribute('aria-expanded', 'false');
          contents.removeAttribute('style');
        });
      }
    }
  };
  const bindEvent = element => {
    // toggle button
    toggleBtn(element);
    // close button
    const btnClose = element.querySelectorAll('.c-tooltip__close');
    if (btnClose.length > 0) closeBtn(element);
    // control - focus
    controlFocus(element);
    // ready
    element.classList.add('ready');
  };
  document.addEventListener('click', e => {
    const currentTooltip = e.target.closest('.c-tooltip');
    if (currentTooltip == null) {
      tooltipCont.forEach(element => {
        const btnTootip = element.closest('.c-tooltip').querySelector('.c-tooltip__button');
        const container = element.querySelector('.c-tooltip__container');
        const contents = container.querySelector('.c-tooltip__contents');
        const btnType = btnTootip.getAttribute('data-wa-type');
        container.classList.remove('active');
        contents?.removeAttribute('style');
        if (btnType === 'press') {
          btnTootip?.setAttribute('aria-pressed', 'false');
        } else {
          btnTootip?.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
  const toggleTooltip = function (tooltipAll) {
    tooltipAll.forEach(element => {
      if (!element.classList.contains('ready')) bindEvent(element);
    });
  };
  toggleTooltip(tooltipCont);
};
export default tooltip;
