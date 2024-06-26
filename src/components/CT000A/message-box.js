export default function messageBox() {
  const msgBox = document.querySelector('.toast-popup');
  if (msgBox) {
    msgBox.style.top = `-${msgBox.clientHeight + 10}px`;
  }
}
