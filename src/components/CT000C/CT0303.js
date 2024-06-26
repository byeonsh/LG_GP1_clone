// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';
import { minusPlusCount } from '../../assets/js/common/cartPriceTotal.js';

function init() {
  const accordionEl = document.querySelectorAll('.c-checkout-step03-payment__item .js-accordion-handle-target');
  const addFn = document.querySelectorAll('.c-checkout-step03-payment__item .js-accordion');
  addFn.forEach(el => {
    el.querySelector('.js-accordion-trigger').addEventListener('click', () => {
      for (let i = 0; i < accordionEl.length; i += 1) {
        accordionEl[i].classList.remove('c-accordion__box--expand');
      }
      if (el.querySelector('.js-accordion-handle-target').classList.contains('c-accordion__box--expand')) {
        el.querySelector('.js-accordion-handle-target').classList.add('c-accordion__box--expand');
      } else {
        el.querySelector('.js-accordion-handle-target').classList.remove('c-accordion__box--expand');
      }
    });
  });

  const component = document.querySelectorAll('.CT0303');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));

  const summaryComponent = document.querySelector('.CT0303 .buy-summary-area__secondary');

  if (beforeLaunch(summaryComponent)) return false;
}

const stepToggle = () => {
  const nextBtn = document.querySelectorAll(
    '.CT0303 .buy-checkout__item--payment:not(.buy-checkout__item--complete) .cmp-button.next'
  );
  const editBtn = document.querySelectorAll(
    '.CT0303 .buy-checkout__item--payment.buy-checkout__item--complete .c-checkout-step__edit'
  );
  nextBtn.forEach(nextEl => {
    nextEl.addEventListener('click', () => {
      const nextContent = nextEl
        .closest('.CT0303')
        .querySelector('.buy-checkout__item--payment:not(.buy-checkout__item--complete)');
      const editContent = nextEl
        .closest('.CT0303')
        .querySelector('.buy-checkout__item--payment.buy-checkout__item--complete');
      editContent.style.display = 'block';
      nextContent.style.display = 'none';
    });
  });
  editBtn.forEach(editEl => {
    editEl.addEventListener('click', () => {
      const nextContent = editEl
        .closest('.CT0303')
        .querySelector('.buy-checkout__item--payment:not(.buy-checkout__item--complete)');
      const editContent = editEl
        .closest('.CT0303')
        .querySelector('.buy-checkout__item--payment.buy-checkout__item--complete');
      editContent.style.display = 'none';
      nextContent.style.display = 'block';
    });
  });
};

const tabFn = () => {
  const tab = document.querySelectorAll('.CT0303 .c-zip-more-contents__tab');
  if (beforeLaunch(tab)) return false;

  tab.forEach(el => {
    el.addEventListener('click', () => {
      for (let i = 0; i < tab.length; i += 1) {
        tab[i].classList.remove('c-zip-more-contents__tab--active');
      }
      el.classList.add('c-zip-more-contents__tab--active');
      const targetIndex = el.getAttribute('tabindex');
      const targetPanels = document.querySelectorAll('.c-zip-more-contents__tabpanel');
      for (let i = 0; i < targetPanels.length; i += 1) {
        targetPanels[i].classList.remove('c-zip-more-contents__tabpanel--active');
        if (targetPanels[i].getAttribute('tabindex') === targetIndex) {
          targetPanels[i].classList.add('c-zip-more-contents__tabpanel--active');
        }
      }
    });
  });
};

const learnMore = () => {
  const learnMoreButton = document.querySelector('.c-zip-more__button');
  if (beforeLaunch(learnMoreButton)) return false;

  const targetContent = document.querySelector('.c-zip-more-contents');
  learnMoreButton.addEventListener('click', () => {
    if (targetContent.classList.contains('active')) {
      targetContent.classList.remove('active');
    } else {
      targetContent.classList.add('active');
    }
  });
};

const moreContents = () => {
  const moreButtons = document.querySelectorAll('.c-zip-more-contents-way__button');
  if (beforeLaunch(moreButtons)) return false;

  moreButtons.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.closest('.c-zip-more-contents-way__item');
      if (target.classList.contains('active')) {
        target.classList.remove('active');
      } else {
        target.classList.add('active');
      }
    });
  });
};

const paySelect = () => {
  const selectBox = document.querySelector('.c-payselect');
  const label = document.querySelector('.c-payselect__label');
  // const options = document.querySelectorAll('.c-payselect .c-payselect__item');
  if (beforeLaunch(label)) return false;

  label.addEventListener('click', () => {
    if (selectBox.classList.contains('active')) {
      selectBox.classList.remove('active');
    } else {
      selectBox.classList.add('active');
    }
  });
};

const payPalMxBtn = document.querySelector('.c-icon-button--payment-paypal-mx');
const payPalMxChk1 = document.getElementById('mxPayPalId01');
const payPalMxIframe = document.querySelector('.iframe-type1');
const payPalEwalletMxBtn = document.querySelector('.payment-paypal-ewallet-mx');
const payPalEwalletMxChk1 = document.getElementById('mxPayPalEwalletId01');

if (payPalMxChk1 && payPalMxBtn && payPalEwalletMxChk1) {
  const showPayPalMxIframe = () => {
    payPalMxIframe.style.display = 'block';
  };
  const paypalMx = () => {
    payPalMxBtn.disabled = !payPalMxChk1.checked;
    if (!payPalMxChk1.checked) {
      payPalMxIframe.style.display = 'none';
    }
  };

  const paypalEwalletMx = () => {
    payPalEwalletMxBtn.classList.toggle('disabled', !payPalEwalletMxChk1.checked);
  };

  payPalMxChk1.addEventListener('change', paypalMx);
  payPalMxBtn.addEventListener('click', showPayPalMxIframe);
  payPalEwalletMxChk1.addEventListener('change', paypalEwalletMx);
}

const paypalGroups = document.querySelectorAll('.c-mx-paypal__box-type2');
function togglePaypalButton(checkboxes, paypalButton) {
  const checkbox1 = checkboxes[0].checked;
  const checkbox2 = checkboxes[1].checked;

  if (checkbox1 && checkbox2) {
    paypalButton.classList.remove('disabled');
  } else {
    paypalButton.classList.add('disabled');
  }
}
paypalGroups.forEach(group => {
  const checkboxes = group.querySelectorAll("input[type='checkbox']");
  const paypalButton = group.querySelector('.payment-paypal-ewallet-mx');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => togglePaypalButton(checkboxes, paypalButton));
  });
});

init();
stepToggle();
tabFn();
learnMore();
moreContents();
paySelect();
minusPlusCount();
