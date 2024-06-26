const findCheckedFilter = target => {
  const filterLayer = target.closest('.c-filter');
  const boxes = filterLayer.querySelectorAll('.c-accordion__box');
  boxes.forEach(box => {
    // When closing the filter layer, check if there is a checked filter item.
    // If there is a checked item, add the active class to the button of c-filter-bar and change it to a black line.
    const button = document.querySelector(
      `.c-filter-bar button[aria-controls=${box.querySelector('.c-accordion__body').getAttribute('id')}]`
    );
    let hasCheckedItem = false;
    if (box.querySelectorAll('.c-form-range').length > 0) {
      // case - range
      const isRangeChecked =
        !!box.querySelector('input.real-left')?.value || !!box.querySelector('input.real-right')?.value;
      if (isRangeChecked) hasCheckedItem = true;
    } else {
      // case - input
      // input radio
      const isRadioChecked = !!box.querySelectorAll('input[type=radio]:checked').length;
      // input checkbox and color
      const isCheckboxChecked = !!box.querySelectorAll('input[type=checkbox]:checked').length;
      if (isRadioChecked || isCheckboxChecked) hasCheckedItem = true;
    }
    if (button) {
      if (hasCheckedItem) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }
  });
};
// close filter layer
export const closeFilterLayer = target => {
  target.closest('.c-filter').classList.remove('active', 'done');
  findCheckedFilter(target);
};
// open filter layer
export const openFilterLayer = el => {
  const component = el.closest('.productlist');
  const openTarget = document?.getElementById(el.getAttribute('aria-controls'));
  const filterLayer = component.querySelector('.c-filter');
  filterLayer.classList.add('active');
  if (openTarget && openTarget !== filterLayer) {
    // close all c-accordion__body
    const boxes = filterLayer.querySelectorAll('.c-accordion__box');
    boxes.forEach(box => {
      const b = box;
      b.classList.remove('c-accordion__box--expand');
      b.querySelector('.js-accordion-trigger').ariaExpanded = false;
    });
    // open and focus - current box
    const box = openTarget.closest('.c-accordion__box');
    box.classList.add('c-accordion__box--expand');
    box.querySelector('.js-accordion-trigger').ariaExpanded = true;
    // focus current area
    const focusTarget = box.querySelector('.c-accordion__head .c-accordion__button');
    focusTarget.focus();
  }
  setTimeout(() => {
    filterLayer.classList.add('done');
  }, 300);
};

export const filter = (openElem = null, closeElem = null) => {
  const openElement = openElem || document.querySelectorAll('.c-filter-bar .c-filter-bar__text-button');
  const closeElement = closeElem || document.querySelectorAll('.c-filter .c-filter__close');
  // if no element then stop here.
  if (!openElement.length) {
    return false;
  }
  // find checked input

  // init
  const init = () => {
    // close filter layer
    const filterCloseBtn = closeElement; // document.querySelectorAll('.c-filter .c-filter__close');
    filterCloseBtn.forEach(el => {
      el.addEventListener('click', e => {
        closeFilterLayer(e.target);
      });
    });
    // open filter layer
    const filterOpenBtn = openElement; // document.querySelectorAll('.c-filter-bar .c-filter-bar__text-button');
    // .c-filter-bar .c-filter-bar__button,
    filterOpenBtn.forEach(el => {
      el.addEventListener('click', e => {
        openFilterLayer(e.target);
      });
    });
  };
  init();
};

export default {};
