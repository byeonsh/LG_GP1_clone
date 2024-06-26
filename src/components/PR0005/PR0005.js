// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import share from '../../assets/js/common/share.js';

const promotionShare = c => {
  const shareCont = c.querySelectorAll('.c-sns-share');
  shareCont.forEach(shareObj => {
    const configElem = document.querySelector('[data-component-config="snsShare"]');
    const config = getComponentConfigFromElem(configElem);
    if (!config) return false;
    share(shareObj, config);
  });
};

let prevScrollTop = 0;
const smoothHead = e => {
  const target = e.currentTarget;
  const scrollTarget = document.querySelectorAll('.smooth-head.active .c-pop-msg__contents');
  scrollTarget.forEach((el, idx, arry) => {
    const beforeElement = arry[idx].previousElementSibling;
    const t = beforeElement.getBoundingClientRect().top;
    const targetScroll = `${target.scrollTop}`;
    if (targetScroll > 100 + t) {
      beforeElement.classList.add('smoothHide');
    } else {
      beforeElement.classList.remove('smoothHide');
    }
    if (targetScroll - prevScrollTop < 0 && target === arry[idx]) {
      beforeElement.classList.remove('smoothHide');
    }
    setTimeout(() => {
      prevScrollTop = targetScroll;
    }, 100);
  });
};

// new
const receiptChecked = e => {
  const target = e.currentTarget;
  const rewarded = document.querySelector('#rewarded-Receipt');
  const cashback = document.querySelector('#cashback-Receipt');
  const checkRadio = document.querySelectorAll("input[name='claimReward']");
  const checkCashback = document.querySelectorAll('#cashback');
  if (target.checked) {
    if (target.getAttribute('name') === 'claimReward') {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < checkCashback.length; i++) {
        checkCashback[i].checked = false;
      }
      cashback.classList.add('hidden');
      rewarded.classList.remove('hidden');
    } else if (target.getAttribute('name') === 'cashback') {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < checkRadio.length; i++) {
        checkRadio[i].checked = false;
      }
      rewarded.classList.add('hidden');
      cashback.classList.remove('hidden');
    }
  } else if (target.getAttribute('name') === 'cashback') {
    cashback.classList.add('hidden');
  }
};

// edit
const receiptEditChecked = e => {
  const target = e.currentTarget;
  const rewarded = document.querySelector('#rewarded-Receipt-edit');
  const cashback = document.querySelector('#cashback-Receipt-edit');
  const checkRadio = document.querySelectorAll("input[name='claimEditReward']");
  const checkCashback = document.querySelectorAll('#cashbackEdit');
  if (target.checked) {
    if (target.getAttribute('name') === 'claimEditReward') {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < checkCashback.length; i++) {
        checkCashback[i].checked = false;
      }
      cashback.classList.add('hidden');
      rewarded.classList.remove('hidden');
    } else if (target.getAttribute('name') === 'cashbackEdit') {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < checkRadio.length; i++) {
        checkRadio[i].checked = false;
      }
      rewarded.classList.add('hidden');
      cashback.classList.remove('hidden');
    }
  } else if (target.getAttribute('name') === 'cashbackEdit') {
    cashback.classList.add('hidden');
  }
};

// component
function init() {
  const component = document.querySelectorAll('.PR0005');
  const scrollCon = document.querySelectorAll('.smooth-head .c-pop-msg__contents');
  const checkRadio = document.querySelectorAll("input[name='claimReward']");
  const checkCashback = document.querySelectorAll('#cashback');
  const checkRadioEdit = document.querySelectorAll("input[name='claimEditReward']");
  const checkCashbackEdit = document.querySelectorAll('#cashbackEdit');
  if (beforeLaunch(component)) return false;
  component.forEach(c => {
    if (!c.querySelector('.c-sns-share')) return false;
    promotionShare(c);
  });
  scrollCon.forEach(c => {
    c.addEventListener('scroll', smoothHead);
  });
  checkRadio.forEach(c => {
    c.addEventListener('change', receiptChecked);
  });
  checkCashback.forEach(c => {
    c.addEventListener('change', receiptChecked);
  });
  checkRadioEdit.forEach(c => {
    c.addEventListener('change', receiptEditChecked);
  });
  checkCashbackEdit.forEach(c => {
    c.addEventListener('change', receiptEditChecked);
  });
}
init();
