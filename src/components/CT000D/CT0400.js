// import { popMsg } from '../../assets/js/common/popMsg';
function copyToClipboard(value) {
  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = value;
  tempInput.select();

  // 복사 명령 실행
  document.execCommand('copy');

  document.body.removeChild(tempInput);
}

window.onload = function () {
  const copyButton = document.querySelector('.copy-button');
  copyButton.addEventListener('click', () => {
    const copyText = document.querySelector('.c-copy-wrap__text');
    const textValue = copyText.textContent;
    copyToClipboard(textValue);
  });
};
