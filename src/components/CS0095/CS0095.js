import { beforeLaunch } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';
import swiper from '../../assets/js/vendors/swiper.js';

// eslint-disable-next-line new-cap, no-unused-vars
const filterSwiper = new swiper('.CS0095 .swiper', {
  slidesPerView: 'auto',
  preventClicks: true,
  freeMode: true,
});

// init Open Method
const firstSet = (el, elements) => {
  const { accordionTarget, accordionTrigger } = elements;
  el.querySelectorAll(accordionTarget)[0].classList.add('c-accordion__box--expand');
  el.querySelectorAll(`${accordionTarget} ${accordionTrigger}`)[0].setAttribute('aria-expanded', true);
};

// Value Checker
const finderBoxCheck = (component, elements, selectData = 'all') => {
  const { accordionTarget, accordionItem, finderList } = elements;
  const glossaryData = [];

  const optionsCheck = (target, findClass) => {
    let result = 0;
    // eslint-disable-next-line no-plusplus
    target.forEach(i => i.classList.contains(findClass) === true && result++);
    return result;
  };

  component.querySelectorAll(accordionTarget).forEach(element => {
    const children = element.querySelectorAll(accordionItem);

    children.forEach(target =>
      selectData === 'all' || target.classList.contains(selectData)
        ? target.classList.remove('is-hide')
        : target.classList.add('is-hide')
    );

    glossaryData.push({
      name: element.getAttribute('aria-labelledby'),
      itemLength: children.length,
      hideLength: optionsCheck(children, 'is-hide'),
    });
  });

  glossaryData.forEach(data => {
    if (data.itemLength > 0 && data.itemLength !== data.hideLength) {
      component.querySelector(`${finderList}[data-id="${data.name}"]`).classList.add('is-active');
      component.querySelector(`${accordionTarget}[aria-labelledby="${data.name}"]`).classList.remove('is-hide');
    } else {
      component.querySelector(`${finderList}[data-id="${data.name}"]`).classList.remove('is-active');
      component.querySelector(`${accordionTarget}[aria-labelledby="${data.name}"]`).classList.add('is-hide');
    }
  });
};

// Sort Method
const sortMethod = (component, elements) => {
  component.querySelector(elements.sortSelectBox).addEventListener('change', e => {
    finderBoxCheck(component, elements, e.target.options[e.target.selectedIndex].classList.value);
  });
};

// init
function init() {
  const component = document.querySelectorAll('.CS0095');
  if (beforeLaunch(component)) return false;

  const elements = {
    sortSelectBox: '.c-glossary-sort select',
    finderList: '.c-glossary-sort__finder li',
    accordionTarget: '.js-accordion-handle-target',
    accordionTrigger: '.js-accordion-trigger',
    accordionBody: '.js-accordion .c-accordion__body',
    accordionItem: '.js-accordion .c-text-contents[role="listitem"]',
  };

  component.forEach(el => accordion.run(el));
  component.forEach(el => firstSet(el, elements));
  component.forEach(el => finderBoxCheck(el, elements));
  component.forEach(el => sortMethod(el, elements));
}

init();
