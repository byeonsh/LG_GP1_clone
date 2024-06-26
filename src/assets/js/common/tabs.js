import { beforeLaunch } from './utils.js';
import { keyboard } from './constant.js';

function tabs(elements = null) {
  // Use the cmp-tabs attribute only when performing an actual tab function,
  // and use only the c-tab attribute without the cmp-tabs attribute for links that look like tabs.
  const tablist = elements ?? document.querySelectorAll('.cmp-tabs__tablist');
  if (beforeLaunch(tablist)) return false;

  const clickTab = event => {
    const currentTab = event.target.closest('.cmp-tabs__tab');
    if (currentTab) {
      const container = currentTab.closest('.c-wrapper') || currentTab.closest('.c-pop-msg');
      const tab = currentTab;
      const panel = document.getElementById(currentTab.getAttribute('aria-controls'));
      const tabAll = event.target.closest('.cmp-tabs').querySelectorAll('.cmp-tabs__tab')
        ? event.target.closest('.cmp-tabs').querySelectorAll('.cmp-tabs__tab')
        : container.querySelectorAll('.cmp-tabs__tab');
      const panelAll = container.querySelectorAll('.cmp-tabs__tabpanel');
      // init
      tabAll.forEach(el => {
        el.classList.remove('cmp-tabs__tab--active');
        el.setAttribute('tabindex', -1);
      });
      panelAll.forEach(el => {
        if (el.closest('.cmp-tabs')) {
          event.target
            .closest('.cmp-tabs')
            .querySelectorAll('.cmp-tabs__tabpanel')
            .forEach(e => {
              e.classList.remove('cmp-tabs__tabpanel--active');
              e.setAttribute('tabindex', -1);
            });
        } else {
          el.classList.remove('cmp-tabs__tabpanel--active');
          el.setAttribute('tabindex', -1);
        }
      });
      // current
      tab.classList.add('cmp-tabs__tab--active');
      tab.setAttribute('tabindex', 0);
      panel.classList.add('cmp-tabs__tabpanel--active');
      panel.setAttribute('tabindex', 0);
    }
  };
  const keyupTab = event => {
    const keycode = event.keyCode;
    const tabList = event.target.closest('.cmp-tabs__tablist');
    if (tabList === null) {
      return false;
    }
    const currentItem = event.target.closest('.cmp-tabs__tab');
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

  // if url contains tab id - trigger its click event so it becomes active
  const tabActiveSelection = () => {
    if (window.location.hash && window.location.hash !== '#') {
      document
        .querySelector(`.cmp-tabs__tab[aria-controls="${window.location.hash.replace('#', '')}-tabpanel"]`)
        ?.click();
    }
  };

  tablist.forEach(el => {
    el.addEventListener('click', clickTab);
    el.addEventListener('keyup', keyupTab);
  });
  ['hashchange', 'load'].forEach(event => window.addEventListener(event, tabActiveSelection));
}

export default tabs;
