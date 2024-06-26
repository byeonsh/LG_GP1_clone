import { beforeLaunch } from './utils.js';

export function orderSummary(componentClass) {
  const component = document.querySelector(componentClass);
  if (beforeLaunch(component)) return false;

  const toggleButtons = component.querySelectorAll('.btn-toggle-list');

  function openList(btnToggle, targetList) {
    btnToggle.classList.add('is-opened');
    btnToggle.setAttribute('aria-expanded', 'true');
    btnToggle.setAttribute('aria-label', 'close list');
    targetList.classList.add('is-opened');
  }

  function closeList(btnToggle, targetList) {
    btnToggle.classList.remove('is-opened');
    btnToggle.setAttribute('aria-expanded', 'false');
    btnToggle.setAttribute('aria-label', 'open list');
    targetList.classList.remove('is-opened');
  }

  toggleButtons.forEach(toggleButton => {
    toggleButton.addEventListener('click', () => {
      const targetListId = toggleButton.getAttribute('aria-controls');
      const orderList = document.getElementById(targetListId);
      const condition = toggleButton.classList.contains('is-opened');

      if (condition) {
        closeList(toggleButton, orderList);
      } else {
        openList(toggleButton, orderList);
      }
    });
  });
}

export default {};
