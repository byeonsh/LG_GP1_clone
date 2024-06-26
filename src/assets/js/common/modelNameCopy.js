// import module
import { getConfig } from './utils.js';
import toastDelete from './toast.js';

export const modelNameCopy = function () {
  const modelNameTypeItem = document.querySelectorAll('.c-product-item__sku-inner');
  const modelNameTypeEyebrow = document.querySelectorAll('.c-text-contents__eyebrow.sku');
  // Use '.productGlobal__config' script data in head
  const modelnameConfig = getConfig('.productGlobal__config', 'copyModelname');
  const $buttonText = modelnameConfig.copyBtnAlt;
  const $toastText = modelnameConfig.successMsg;
  const $toastClose = modelnameConfig.closBtnAlt;

  if (!$buttonText || !$toastText || !$toastClose) return false;

  const createButton = (modelNameArea, type) => {
    // Excluding cases where there is an a tag at the top, such as ML000D, and cases where the value in sku is empty
    if ((type === 'eyebrow' && !modelNameArea.querySelector('p')) || modelNameArea.closest('a')) return false;

    // Except in cases where the copy button has already been created
    if (modelNameArea.querySelector('.btn-copy')) return false;

    let modelName;
    switch (type) {
      case 'item':
        modelName = modelNameArea.innerText.trim();
        break;
      case 'PD0012':
        modelName = modelNameArea.querySelector('span').textContent.trim();
        break;
      default:
        modelName = modelNameArea.querySelector('p').textContent.trim();
    }

    // Except when the value in sku is empty
    if (modelName === '' || modelName === null || modelName === undefined) return false;

    // Create Button
    const buttonEl = document.createElement('button');
    buttonEl.className = 'btn-copy';
    buttonEl.setAttribute('data-sku', modelName);
    const $buttonTextEl = document.createElement('span');
    $buttonTextEl.textContent = $buttonText;
    $buttonTextEl.className = 'sr-only';
    buttonEl.appendChild($buttonTextEl);
    if (type === 'item') {
      modelNameArea.appendChild(buttonEl);
    } else if (type === 'eyebrow') {
      modelNameArea.querySelector('.cmp-text p').appendChild(buttonEl);
    } else if (type === 'PD0012') {
      modelNameArea.querySelector('.sku-copy')?.appendChild(buttonEl);
    }
  };
  // Create toast message
  const createToast = (text, close) => {
    const toastEl = document.createElement('div');
    toastEl.className = 'toast-popup full';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
            <div class="toast-popup__item toast-popup__item--success">
                <div class="toast-popup__container">
                    <i class="toast-popup__icon toast-popup__icon--success">
                        <span class="sr-only" aria-hidden="true">success</span>
                    </i>
                    <div class="toast-popup__title">${text}</div>
                </div>
                <button class="toast-popup__remove" type="button"><span class="sr-only">${close}</span></button>
            </div>
        `;
    const toastPop = document.querySelector('.toast-popup.full');
    if (toastPop) toastPop.remove();
    document.body.appendChild(toastEl);
    toastDelete();
    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  };
  // Copy the model name and print a toast message
  const runCopy = event => {
    const el = event.target;
    const modelName = el.dataset.sku;

    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(modelName).then(() => {
        createToast($toastText, $toastClose);
      });
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = modelName;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      createToast($toastText, $toastClose);
    }
  };
  // Button settings
  const setButton = (modelNameArea, type) => {
    createButton(modelNameArea, type);
    modelNameArea.querySelectorAll('.btn-copy').forEach(el => {
      el.addEventListener('click', runCopy);
    });
  };

  // Since the model name has two layouts, the script is entered differently.
  if (modelNameTypeItem.length > 0) {
    modelNameTypeItem.forEach(el => {
      setButton(el, 'item');
    });
  }
  if (modelNameTypeEyebrow.length > 0) {
    modelNameTypeEyebrow.forEach(el => {
      setButton(el, 'eyebrow');
    });
  }

  // PD0012 Exception Case
  const productVisual = document.querySelectorAll('.PD0012 .c-product-item .c-text-contents__eyebrow');
  if (productVisual.length > 0) {
    productVisual.forEach(el => {
      setButton(el, 'PD0012');
    });
  }
};

export default modelNameCopy;
