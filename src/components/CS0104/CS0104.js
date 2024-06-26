import { bp } from '../../assets/js/common/constant.js';
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

const topicSelectArr = [];
const subtopicSelectArr = [];

// 20230321 modify script
function selectContent(i, contentTitle) {
  let selectlistTitle2;
  contentTitle.forEach((el, index) => {
    const listTitle2 = contentTitle[index].querySelectorAll('.c-wide-list__item');
    listTitle2.forEach((el2, index2) => {
      el2.parentElement.classList.remove('active');
      el2.classList.remove('c-wide-list__item--active');

      el2.addEventListener('click', function () {
        if (i !== index || i === index) {
          // const firstItemActive = el.querySelector('.c-wide-list__item .c-text-contents');

          if (selectlistTitle2 !== index2 && selectlistTitle2 !== undefined) {
            listTitle2[selectlistTitle2].classList.remove('c-wide-list__item--active');
            // firstItemActive.classList.add('active');
          }
          el2.classList.add('c-wide-list__item--active');
          // firstItemActive.classList.remove('active');
          selectlistTitle2 = index2;
        }
      });

      if (i === index) {
        // const firstItemActive = el.querySelector('.c-wide-list__item .c-text-contents');
        const disabledText = document.querySelector('.c-list-area__disabled-text');

        disabledText.classList.add('c-list-area__disabled-text--disabled');
        // firstItemActive.classList.add('active');
        el2.parentElement.classList.add('active');
      }
    });
  });
}

// 20230321 modify script
function pcClickList() {
  const targetPC = document.querySelector('.pc-only').querySelectorAll('.c-list-area__box');
  const listTitle = targetPC[0].querySelectorAll('.c-wide-list__item');
  const listContentTitle = targetPC[1].querySelectorAll('.category-text');
  const listScrollBox = document.querySelectorAll('.c-list-area__scroll');
  let selectlistTitle;
  const contentTitle = document.querySelector('.pc-only').querySelectorAll('.c-wide-list__item-category');

  contentTitle.forEach(elem => {
    elem.classList.add('c-all-disabled');
    listTitle.forEach((el, index) => {
      function enterAction() {
        elem.classList.remove('c-all-disabled');
        if (selectlistTitle !== index && selectlistTitle !== undefined) {
          listTitle[selectlistTitle].classList.remove('c-wide-list__item--active');
        }
        el.classList.add('c-wide-list__item--active');
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

        topicSelectArr.push(el);
        console.log('topicSelectArr', topicSelectArr.length);
      }
      el.addEventListener('click', function () {
        enterAction();
      });
      el.addEventListener('keyup', function () {
        if (window.event.keyCode === 13) {
          enterAction();
        }
      });
    });
  });
}

function mobileClickList() {
  const targetMobile = document.querySelector('.mobile-only').querySelectorAll('.c-accordion__box');
  // const mobileTop = document.querySelector('.c-list-area').clientTop;

  targetMobile.forEach(el =>
    el.querySelector('.c-accordion__head').addEventListener('click', () => {
      el.closest('.c-mobile-accordion').classList.add('c-accordion__box--expand');
      el.closest('.c-mobile-accordion').querySelector('.cmp-button').setAttribute('aria-expanded', 'true');
      // el.querySelector('.cmp-button').setAttribute('aria-expanded','true');
      const subAccOpen = document.querySelector('.c-accordion__box--expand--sub');
      if (subAccOpen != null && subAccOpen !== el) {
        subAccOpen.classList.remove('c-accordion__box--expand--sub');
      }
      el.classList.toggle('c-accordion__box--expand--sub');
      if (el.classList.contains('c-accordion__box--expand--sub')) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    })
  );
}

function listItemToggle() {
  const listItem = document.querySelectorAll('.mobile-only .c-wide-list__item');

  listItem.forEach(item => {
    item.addEventListener('click', () => {
      listItem.forEach(el => {
        el.classList.remove('c-wide-list__item--active');
      });
      item.classList.add('c-wide-list__item--active');
    });
    item.addEventListener('keyup', () => {
      if (window.event.keyCode === 13) {
        listItem.forEach(el => {
          el.classList.remove('c-wide-list__item--active');
        });
        item.classList.add('c-wide-list__item--active');
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

function init3() {
  let breakpoint = window.innerWidth;
  clickEvent(breakpoint);

  window.addEventListener('resize', () => {
    breakpoint = window.innerWidth;
    clickEvent(breakpoint);
  });
}

init3();

function openAccordion() {
  const accordionList = document.querySelectorAll('.c-accordion:not(.list-type) > .c-accordion__box');
  accordionList[0].classList.add('c-accordion__box--expand');
}
openAccordion();

// validation
const validationCheck = function () {
  const submitButton = document.querySelector('.c-btn-next');

  const listBox = document.querySelector('.c-list-area');
  const listBoxScrollTop = listBox.offsetTop;

  const topicBox = document.querySelector('.c-list-area__box-topic');
  const topicRequired = document.querySelector('.c-topic-required');
  const topicRequired02 = document.querySelector('.c-topic-required02');

  const subtopicBox = document.querySelector('.c-list-area__box-subtopic');
  const subtopicRequired = document.querySelector('.c-subtopic-required');
  const subtopicRequired02 = document.querySelector('.c-subtopic-required02');

  const solutionValid = document.querySelector('.c-solution-valid');
  const solutionRequired = document.querySelector('.c-solution-required');

  const messageValid = document.querySelector('.c-message-valid');
  const messageRequired = document.querySelector('.c-message-required');

  submitButton.addEventListener('click', e => {
    e.preventDefault();

    // topic validation
    if (topicSelectArr.length < 1) {
      window.scrollTo(0, listBoxScrollTop);
      topicBox.classList.add('c-list-area__box--error');
      topicRequired.style.display = 'block';
      topicRequired02.style.display = 'block';
    } else if (subtopicSelectArr.length < 1) {
      window.scrollTo(0, listBoxScrollTop);
      subtopicBox.classList.add('c-list-area__box--error');
      subtopicRequired.style.display = 'block';
      subtopicRequired02.style.display = 'block';
    } else {
      topicBox.classList.remove('c-list-area__box--error');
      topicRequired.style.display = 'none';
      subtopicBox.classList.remove('c-list-area__box--error');
      subtopicRequired.style.display = 'none';
      subtopicRequired02.style.display = 'none';
    }

    // solution Validation
    if (solutionValid.value === '') {
      solutionValid.focus();
      solutionValid.classList.add('c-error');
      solutionRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else {
      solutionValid.classList.remove('c-error');
      solutionRequired.style.display = 'none';
    }

    // message Validation
    if (messageValid.value === '') {
      messageValid.focus();
      messageValid.classList.add('c-error');
      messageRequired.style.display = 'block';
      return false;
      // eslint-disable-next-line no-else-return
    } else if (messageValid.value.length > 3900) {
      messageValid.focus();
      messageValid.classList.add('c-error');
      messageRequired.style.display = 'block';
    } else {
      messageValid.classList.remove('c-error');
      messageRequired.style.display = 'none';
    }
  });
};
validationCheck();

const valueCheckSubmit = document.querySelector('.c-btn-next');
const inputRequiredCheck = () => {
  const countInputs = document.querySelectorAll('.c-subject-valid');
  valueCheckSubmit.addEventListener('click', () => {
    countInputs.forEach(el => {
      const RequiredMsg = el.parentNode.parentNode.nextSibling.nextSibling;
      if (el.value === '') {
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
};
inputRequiredCheck();

const slelectRequiredCheck = () => {
  const countInputs = document.querySelectorAll('.c-responsavel-valid');
  valueCheckSubmit.addEventListener('click', () => {
    countInputs.forEach(el => {
      const RequiredMsg = el.parentNode.querySelector('.c-responsavel-required');
      // console.log(RequiredMsg);
      if (el.value === 'Touch for solution') {
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
};
slelectRequiredCheck();
