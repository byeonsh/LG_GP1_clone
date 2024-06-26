import accordion from '../../assets/js/common/accordion.js';

// init
function init() {
  const typeAccordion = document.querySelectorAll('.type-accordion');
  typeAccordion.forEach(el => accordion.run(el));
}

init();

function openAccordion() {
  const accordionList = document.querySelectorAll('.c-accordion:not(.list-type) > .c-accordion__box');
  accordionList[0].classList.add('c-accordion__box--expand');
  accordionList[0].querySelector('.js-accordion-trigger').setAttribute('aria-expanded', 'true');
  accordionList[0].querySelector('.js-accordion-trigger').setAttribute('aria-current', 'step');
}

openAccordion();

// file upload for WAI
const fileBox = document.querySelectorAll('.c-btn-upload__inner');

const fileLoad = function () {
  fileBox.forEach(function (element) {
    const btnUpload = element.querySelector('[type="file"]');
    // const label = element.querySelector('.file-label');
    const fileText = element.querySelector('.file-name');

    btnUpload.addEventListener('change', function () {
      fileText.value = this.value;
    });
  });
};
fileLoad();
