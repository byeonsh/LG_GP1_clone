// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

const addBundleCheck = () => {
  const btnBundleItem = document.querySelectorAll('.CT-AddBundlePopup .add-bundle__btn .c-button');
  const addCheckItem = el => {
    const curEl = el;
    if (curEl.classList.contains('black')) {
      curEl.classList.remove('black');
      curEl.classList.add('red');
      // 2023-05-26 : UPDATE- add-bundle button toggle text
      curEl.innerText = 'Remove';
    } else {
      curEl.classList.remove('red');
      curEl.classList.add('black');
      curEl.innerText = 'Add To Basket';
    }
    const numAddItemTotal = curEl
      .closest('.c-pop-msg__container')
      .querySelector('.CT-AddBundlePopup .add-bundle-bottom__item .font-red');
    numAddItemTotal.innerText = curEl
      .closest('.c-pop-msg__container')
      .querySelectorAll('.add-bundle__btn .c-button.red').length;
  };
  btnBundleItem.forEach(el => {
    el.addEventListener('click', () => {
      addCheckItem(el);
    });
  });
};
const addBundleRadio = () => {
  const btnRadioBundleItem = document.querySelectorAll(
    '.CT-AddBundlePopup .add-bundle-warranty .c-sibling-option .c-sibling-option__input'
  );

  const addRadioItem = el => {
    const numAddItemTotal = el
      .closest('.c-pop-msg__container')
      .querySelector('.CT-AddBundlePopup .add-bundle-bottom__item .font-red');
    let cnt = 0;
    btnRadioBundleItem.forEach(item => {
      if (item.checked) {
        cnt += 1;
      }
    });
    numAddItemTotal.innerText = cnt;
  };
  btnRadioBundleItem.forEach(el => {
    el.addEventListener('click', () => {
      addRadioItem(el);
    });
  });
};

addBundleCheck();
addBundleRadio();

const deleteBtnZipCode = () => {
  const zipCode = document.querySelector('#ZIPCodePopup');
  if (zipCode) {
    const zipCodeDelete = zipCode?.querySelectorAll('.buy-zip-register__item button');
    zipCodeDelete?.forEach(el => {
      el.addEventListener('click', item => {
        item.target.closest('.buy-zip-register__item').remove();
      });
    });
    const zipCodeAllBtn = zipCode?.querySelector('.buy-zip-register__head .buy-zip-register__delete button');
    zipCodeAllBtn?.addEventListener('click', el => {
      el.target.closest('.buy-zip-register').remove();
    });
  }
};
deleteBtnZipCode();

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
learnMore();

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
moreContents();

const tabFn = () => {
  const tab = document.querySelectorAll('.CT0019 .cmp-tabs__tab');
  if (beforeLaunch(tab)) return false;

  tab.forEach(el => {
    el.addEventListener('click', () => {
      for (let i = 0; i < tab.length; i += 1) {
        tab[i].classList.remove('cmp-tabs__tab--active');
      }
      el.classList.add('cmp-tabs__tab--active');
      const targetIndex = el.getAttribute('tabindex');
      const targetPanels = document.querySelectorAll('.cmp-tabs__tabpanel');
      for (let i = 0; i < targetPanels.length; i += 1) {
        targetPanels[i].classList.remove('cmp-tabs__tabpanel--active');
        if (targetPanels[i].getAttribute('tabindex') === targetIndex) {
          targetPanels[i].classList.add('cmp-tabs__tabpanel--active');
        }
      }
    });
  });
};
tabFn();

const huContent = () => {
  const moreButton = document.querySelectorAll('.buy-klarna-desc__button');
  if (beforeLaunch(moreButton)) return false;

  moreButton.forEach(el => {
    // console.log(el);
    el.addEventListener('click', () => {
      const contents = el.closest('.buy-klarna-desc__bodycopy').querySelector('.c-cetlemmel-contents');
      if (contents.classList.contains('active')) {
        el.classList.remove('active');
        contents.classList.remove('active');
      } else {
        el.classList.add('active');
        contents.classList.add('active');
      }
    });
  });
};
huContent();

// const exchangeStep = () => {
//     const radioEl = document.querySelectorAll('.exchange-step-num input[type="radio"]');
//     const resultTxt01 = document.querySelector('.choose-result-two');
//     const resultTxt02 = document.querySelector('.choose-result-black');
//     const objText = { type: '', size: '', condition: '' };
//     radioEl.forEach(el => {
//         const targetType = el.getAttribute('name');
//         const targetValue = el.getAttribute('value');
//         if (targetType === 'type' || targetType === 'size' || targetType === 'condition') {
//             el.addEventListener('change', () => {
//                 if (targetType === 'type') objText.type = targetValue;
//                 if (targetType === 'size') objText.size = `${targetValue}`;
//                 if (targetType === 'condition') objText.condition = targetValue;
//                 resultTxt01.innerText = `${objText.size || ''} ${objText.type || ''}`;
//                 resultTxt02.innerText = `${objText.condition || ''}`;
//             });
//         }
//     });
// };

// exchangeStep();

const deleteBorder = () => {
  const cancelButton = document.querySelectorAll('#AddWarrantyPopup .add-bundle-warranty__list .cmp-button');

  for (let i = 0; i < cancelButton.length; i += 1) {
    cancelButton[i].addEventListener('click', event => {
      const checkInput = event.target.closest('.c-sibling-option').querySelector('.c-sibling-option__input');

      if (checkInput.checked) {
        checkInput.checked = false;
      }
    });
  }
};

const changeUl = () => {
  const checkInput = document.querySelectorAll('#productcondition .c-radio-item');
  const childeUl = document.querySelectorAll('#productcondition .condition-list li');

  for (let i = 0; i < checkInput.length; i += 1) {
    checkInput[i].addEventListener('click', () => {
      childeUl.forEach(el => {
        el.classList.remove('active');
      });
      childeUl[i].classList.add('active');
    });
  }
};

deleteBorder();
changeUl();
