import accordion from '../../assets/js/common/accordion.js';

// init
function init() {
  const typeAccordion = document.querySelectorAll('.type-accordion');
  typeAccordion.forEach(el => {
    if (!el.classList.contains('type-product')) {
      accordion.run(el);
    }
  });
}

init();

function openAccordion() {
  const accordionList = document.querySelectorAll('.c-accordion:not(.list-type) > .c-accordion__box');
  accordionList[0].classList.add('c-accordion__box--expand');
}
openAccordion();
