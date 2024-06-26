// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { recheckScrolling, keyboard } from '../../assets/js/common/constant.js';

const dropToggle = btn => {
  const list = btn.closest('.c-tabs').querySelector('.c-tabs__list');
  btn.classList.toggle('active');
  list.classList.toggle('active');
  if (btn.getAttribute('aria-expanded') === 'true') {
    btn.setAttribute('aria-expanded', 'false');
    list.removeAttribute('tabindex');
  } else {
    btn.setAttribute('aria-expanded', 'true');
    list.setAttribute('tabindex', '0');
    list.focus();
  }
};

const controlTabAnchor = c => {
  const contentArea = [];
  const tabItems = c.querySelectorAll('.c-tabs__item');
  const tabActiveMobile = c.querySelector('.c-tabs__current');
  let timer = null;
  const stopCheckPos = () => {
    if (timer) {
      // clear previous timer if exist
      // console.log('stop');
      clearInterval(timer);
      timer = null;
      window.removeEventListener('wheel', stopCheckPos, false);
      window.removeEventListener('touchstart', stopCheckPos, false);
    }
  };
  const keyupEvent = function (event) {
    const key = event.keyCode;
    if (key === keyboard.up || key === keyboard.pgup || key === keyboard.down || key === keyboard.pgdn) {
      stopCheckPos();
    }
  };
  const closeDropMenu = () => {
    const tabLists = document.querySelectorAll('.c-tabs__list');
    const btnMenuToggles = document.querySelectorAll('.c-tabs__extra .c-tabs__btn');
    tabLists.forEach(tabList => {
      tabList.removeAttribute('tabindex');
      tabList.classList.remove('active');
    });
    btnMenuToggles.forEach(btnMenuToggle => {
      btnMenuToggle.setAttribute('aria-expanded', 'false');
      btnMenuToggle.classList.remove('active');
    });
  };
  tabItems.forEach(tab => {
    if (tab.href.indexOf('#') !== -1) {
      if (tab.href.split('#')[1].length > 1) {
        const tid = tab.href.split('#')[1];
        const currentContent = document.getElementById(tid);
        contentArea.push(currentContent);
        // select correct class from ST0002 container on DOM LGCOMMON-2870
        const stickyHeight = parseInt(c.querySelector('.can-sticky').offsetHeight, 10);
        const isFixPos = () => {
          const gap = stickyHeight - parseInt(currentContent.getBoundingClientRect().top, 10);
          if (0 <= gap < 10) {
            return true;
          }
          return false;
        };
        const goToPos = () => {
          if (!timer) return false;
          const { scrollY } = window;
          const targetTop = scrollY + currentContent.getBoundingClientRect().top - stickyHeight + 1;
          window.scrollTo({ top: targetTop });
          closeDropMenu();
        };
        tab.addEventListener('click', event => {
          event.preventDefault();
          if (!currentContent) return false;
          stopCheckPos();
          // currentContent.scrollIntoView(true);
          timer = setInterval(() => {
            // console.log('!');
            if (!isFixPos()) {
              goToPos();
            } else {
              stopCheckPos();
            }
          }, recheckScrolling);
          goToPos();
          tab.addEventListener('keyup', keyupEvent, false);
          window.addEventListener('wheel', stopCheckPos, false);
          window.addEventListener('touchstart', stopCheckPos, false);
        });
      }
    }
  });
  const activeTabs = (activeIdx, isActive) => {
    if (isActive) {
      tabItems[activeIdx].classList.add('active');
      tabItems[activeIdx].setAttribute('aria-selected', 'true');
      if (tabActiveMobile) tabActiveMobile.innerText = tabItems[activeIdx].innerText;
    } else {
      tabItems[activeIdx].classList.remove('active');
      tabItems[activeIdx].setAttribute('aria-selected', 'false');
    }
  };
  const findActiveTab = () => {
    let activeItem = -1;
    contentArea.forEach((content, idx) => {
      if (!content) {
        return;
      }
      const t = parseInt(content.getBoundingClientRect().top, 10);
      const b = parseInt(content.getBoundingClientRect().bottom, 10);
      const wh = parseInt(window.innerHeight, 10);
      if (contentArea[0].getBoundingClientRect().bottom >= wh * 0.3) {
        // first
        activeItem = 0;
      } else if ((t >= 0 && b < wh) || (t < 0 && b >= wh)) {
        // inside
        activeItem = idx;
      } else if (t >= 0 && t < wh * 0.3 && b >= wh) {
        // top
        activeItem = idx;
      } else if (t < 0 && b >= wh * 0.3 && b >= 0) {
        // bottom
        activeItem = idx;
      }
    });
    return activeItem;
  };
  const scrollTabs = () => {
    const activeItem = findActiveTab();
    tabItems.forEach((tab, idx) => {
      if (idx === activeItem && activeItem >= 0) activeTabs(idx, true);
      else activeTabs(idx, false);
    });
  };
  window.addEventListener('scroll', scrollTabs, false);
};

// component
function init() {
  const component = document.querySelectorAll('.ST0002');
  if (beforeLaunch(component)) return false;
  component.forEach(c => {
    controlTabAnchor(c);
  });

  const dropToggleBtns = document.querySelectorAll('.ST0002 .c-tabs__drop .c-tabs__btn');
  // drop down on mobile
  dropToggleBtns.forEach(target => {
    target.addEventListener('click', () => {
      dropToggle(target);
    });
  });
}
init();
