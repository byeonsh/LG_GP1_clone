// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { keyboard } from '../../assets/js/common/constant.js';
// eslint-disable-next-line import/default
import cartPriceTotal from '../../assets/js/common/cartPriceTotal.js';

function init() {
  const component = document.querySelectorAll('.CT000E');
  if (beforeLaunch(component)) return false;
}

init();

// Total Area
cartPriceTotal('.CT000E');

const tablist = document.querySelectorAll('.buy-checkout__tablist');

const tabFn = () => {
  const tab = document.querySelectorAll('.CT000E .buy-checkout__tab');
  tab.forEach(el => {
    el.addEventListener('click', () => {
      for (let i = 0; i < tab.length; i += 1) {
        tab[i].classList.remove('buy-checkout__tab--active');
        tab[i].setAttribute('tabindex', -1);
      }
      el.classList.add('buy-checkout__tab--active');
      el.setAttribute('tabindex', 0);
      const targetControls = el.getAttribute('aria-controls');
      const targetPanels = document.querySelectorAll('.buy-checkout__tabpanel');
      for (let i = 0; i < targetPanels.length; i += 1) {
        targetPanels[i].classList.remove('buy-checkout__tabpanel--active');
        targetPanels[i].setAttribute('tabindex', -1);
        if (targetPanels[i].getAttribute('id') === targetControls) {
          targetPanels[i].classList.add('buy-checkout__tabpanel--active');
          targetPanels[i].setAttribute('tabindex', 0);
        }
      }
    });
  });
};

const keyupTab = event => {
  const keycode = event.keyCode;
  const tabList = event.target.closest('.buy-checkout__tablist');
  const currentItem = event.target.closest('.buy-checkout__tab');
  const nodes = [...tabList.children];
  let index = nodes.indexOf(currentItem);
  if (currentItem.length === 0) return false;
  if (keycode === keyboard.left) {
    // left arrow key
    index -= 1;
  } else if (keycode === keyboard.right) {
    // right arrow key
    index += 1;
  }
  if (index >= 0 && index < nodes.length) {
    const tab = nodes[index];
    tab.focus();
    tab.click();
  }
};
tablist.forEach(el => {
  el.addEventListener('keyup', keyupTab);
});

tabFn();
