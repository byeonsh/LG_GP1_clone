import { bp } from '../../assets/js/common/constant.js';
import accordion from '../../assets/js/common/accordion.js';

// 20240428 add script
const dateSetting = function () {
  const monthControl = document.querySelectorAll('input[type="date"]');
  monthControl.forEach(function (el) {
    const theElement = el;
    theElement.value = new Date().toISOString().slice(0, 10);
  });
};
dateSetting();

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

const isHidden = elem => {
  const styles = window.getComputedStyle(elem);
  return styles.display === 'none' || styles.visibility === 'hidden';
};

const validationCheck = function () {
  const registerSubmit = document.querySelectorAll('.c-submit');
  registerSubmit.forEach(submit => {
    const inputContainer = submit.parentNode.parentNode.parentNode;
    const listBox = inputContainer.querySelector('.c-list-area');
    let listBoxScrollTop = 0;
    const topicBox = inputContainer.querySelector('.c-list-area__box-topic');
    const subtopicBox = inputContainer.querySelector('.c-list-area__box-subtopic');

    const pcOnly = inputContainer.querySelector('.pc-only');
    const mobileOnly = inputContainer.querySelector('.mobile-only');

    const responsavelValid = inputContainer.querySelector('.c-responsavel-valid');
    const responsavelRequired = inputContainer.querySelector('.c-responsavel-required');
    const messageValid = inputContainer.querySelector('.c-message-valid');
    const messageRequired = inputContainer.querySelector('.c-message-required');

    submit.addEventListener('click', e => {
      e.preventDefault();

      if (listBox) {
        listBoxScrollTop = listBox.offsetTop;
      }
      const topicRequiredPC = pcOnly.querySelector('.c-topic-required');
      const topicRequiredMO = mobileOnly.querySelector('.c-topic-required');
      const subtopicRequiredPC = pcOnly.querySelector('.c-subtopic-required');
      const subtopicRequiredMO = mobileOnly.querySelector('.c-subtopic-required');
      // topic validation
      if (topicSelectArr.length < 1) {
        if (listBox) {
          window.scrollTo(0, listBoxScrollTop);
        }
        topicBox.classList.add('c-list-area__box--error');
        if (isHidden(mobileOnly)) {
          topicRequiredPC.style.display = 'block';
        } else {
          topicRequiredMO.style.display = 'block';
        }
      } else if (subtopicSelectArr.length < 1) {
        if (listBox) {
          window.scrollTo(0, listBoxScrollTop);
        }
        subtopicBox.classList.add('c-list-area__box--error');

        if (isHidden(mobileOnly)) {
          subtopicRequiredPC.style.display = 'block';
        } else {
          subtopicRequiredMO.style.display = 'block';
        }
      } else {
        topicBox.classList.remove('c-list-area__box--error');
        subtopicBox.classList.remove('c-list-area__box--error');
        if (isHidden(mobileOnly)) {
          topicRequiredPC.style.display = 'none';
          subtopicRequiredPC.style.display = 'none';
        } else {
          topicRequiredMO.style.display = 'none';
          subtopicRequiredMO.style.display = 'none';
        }
      }

      if (responsavelValid !== null) {
        // eslint-disable-next-line no-template-curly-in-string
        if (responsavelValid.value === '${option.value_01}') {
          responsavelValid.classList.add('c-error');
          responsavelRequired.style.display = 'block';
          responsavelValid.focus();
          // eslint-disable-next-line no-else-return
        } else if (responsavelValid.value.length < 5) {
          responsavelValid.classList.add('c-error');
          responsavelRequired.style.display = 'block';
          responsavelValid.focus();
          // eslint-disable-next-line no-else-return
        } else {
          responsavelRequired.style.display = 'none';
          responsavelRequired.classList.remove('c-error');
        }
      }
      if (messageValid !== null) {
        if (messageValid.value === '') {
          messageValid.classList.add('c-error');
          messageRequired.style.display = 'block';
          console.log(messageRequired);
          messageValid.focus();
          // eslint-disable-next-line no-else-return, no-undef
        } else if (el.value.length < 5) {
          messageValid.classList.add('c-error');
          messageRequired.style.display = 'block';
          messageValid.focus();
          // eslint-disable-next-line no-else-return
        } else {
          messageRequired.style.display = 'none';
          messageValid.classList.remove('c-error');
        }
      }

      // File Upload Validation
      const uploadRequiredContainer = submit.parentNode.parentNode.parentNode;
      const uploadFile = uploadRequiredContainer.querySelector('.c-btn-upload');
      const uploadFileMessage = uploadFile.querySelector('.c-message-required');

      if (uploadFileMessage) {
        uploadFile.classList.add('c-error');
        uploadFile.focus();
        uploadFileMessage.style.display = 'block';
      } else {
        uploadFile.classList.remove('c-error');
        uploadFileMessage.style.display = 'none';
      }
    });
  });
};
validationCheck();
