import accordion from '../../assets/js/common/accordion.js';
import { pageScroll } from '../../assets/js/common/utils.js';

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

// validation
const submitButton = document.querySelector('.c-btn-next');
// eslint-disable-next-line camelcase
const cs_form_chks = document.querySelectorAll('.cs-form .cs-form__chk');
submitButton.addEventListener('click', e => {
  e.preventDefault();
  // eslint-disable-next-line camelcase
  cs_form_chks.forEach(chks => {
    const privacyPolicyCheck = chks.querySelector('.c-checkbox-item label input[type="checkbox"]');
    const privacyPolicyWarning = chks.querySelector('.c-warning');

    if (privacyPolicyCheck.checked === false) {
      privacyPolicyWarning.classList.add('c-error');
      privacyPolicyWarning.style.display = 'block';
    } else {
      privacyPolicyWarning.classList.remove('c-error');
      privacyPolicyWarning.style.display = 'none';
    }
  });
});

// let focusBtn;
// modal
const popup = {
  focusBtn: '',
  closeEvent(elememt) {
    const targetCont = elememt.closest('.c-modal');
    targetCont.classList.remove('c-modal--active');
    targetCont.removeAttribute('tabindex');
    pageScroll.able();
  },
  popMsg(href, popOpenBtn = false) {
    // href = href value or id value
    const popCloseBtns = document.querySelectorAll('.c-modal__closebtn');
    const popId = href.replace('#', '');
    const targetCont = document.getElementById(popId);
    const dimmed = targetCont.querySelector('.c-modal__dimmed');
    targetCont.classList.add('c-modal--active');
    targetCont.setAttribute('tabindex', '0');
    targetCont.focus();
    if (popOpenBtn) popup.focusBtn = popOpenBtn;

    // page scroll
    pageScroll.disable();

    // close
    popCloseBtns.forEach(b =>
      b.addEventListener('click', () => {
        // initLayerPopup(b.closest('.c-pop-msg'));
        popup.closeEvent(b);
        if (popup.focusBtn) popup.focusBtn.focus();
      })
    );
    // dimmed
    dimmed.addEventListener('click', () => {
      popup.closeEvent(dimmed);
      if (popup.focusBtn) popup.focusBtn.focus();
    });
  },
  initPopup() {
    const popOpenBtns = document.querySelectorAll('.c-modal-open');
    popOpenBtns.forEach(function (btn) {
      // href = href value or id value
      let href = btn.getAttribute('aria-controls') || btn.getAttribute('href');
      href = href.replace('#', '');
      btn.addEventListener('click', function () {
        popup.popMsg(href);
        popup.focusBtn = btn;
      });
      // enter
      btn.addEventListener('keydown', function () {
        if (window.event.keyCode === 13) {
          popup.popMsg(href);
          popup.focusBtn = btn;
        }
      });
    });
    const keyupEvent = function (event) {
      const key = event.keyCode;
      // eslint-disable-next-line no-undef
      if (key === keyboard.esc) {
        const popLayer = document.querySelectorAll('.c-modal');
        popLayer.forEach(layer => {
          if (layer.classList.contains('c-modal--active')) {
            // initLayerPopup(layer);
          }
          layer.classList.remove('c-modal--active');
        });
        if (popup.focusBtn) popup.focusBtn.focus();
        pageScroll.able();
      }
    };
    window.addEventListener('keyup', keyupEvent);
  },
};

popup.initPopup();

// const textBoxRequiredCheck = () => {
//     const submitButton02 = document.querySelectorAll('.c-btn-next')[1];

//     const countInputs = document.querySelectorAll('#comment');
//     submitButton02.addEventListener('click', e => {
//         countInputs.forEach(el => {
//             const RequiredMsg = el.parentNode.parentNode.childNodes;
//             console.log(RequiredMsg);
//             if (el.value === '') {
//                 el.classList.add('c-error');
//                 RequiredMsg.style.display = 'block';
//                 el.focus();
//                 return false;
//                 // eslint-disable-next-line no-else-return
//             } else {
//                 RequiredMsg.style.display = 'none';
//                 el.classList.remove('c-error');
//             }
//         });
//     });
// };
// textBoxRequiredCheck();
