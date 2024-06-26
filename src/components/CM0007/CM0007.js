// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { bp, keyboard } from '../../assets/js/common/constant.js';

// eslint-disable-next-line no-unused-vars
const mobileSize = () => {
  const ww = window.innerWidth;
  const isMobile = ww <= bp.mobile + 1;
  return isMobile;
};

// component
function init() {
  const wrapper = document.querySelector('.CM0007');
  if (beforeLaunch(wrapper)) return false;
  const component = wrapper.querySelector('.al-quick');
  const componentData = wrapper.querySelector('.component').dataset;
  const toast = wrapper.querySelector('.al-proactive-msg');
  const toastMsg = toast.querySelector('.al-proactive-msg__box');
  const toastMsgClose = toast.querySelector('.al-proactive-msg__close');
  const BtnWrap = component.querySelector('.al-quick-btn');
  const quickBtn = BtnWrap.querySelector('.al-quick-btn__quickbtn');
  const topBtn = BtnWrap.querySelector('.al-quick-btn__topbtn');
  const quickMenu = component.querySelector('.al-quick-menu');
  const closeQuickMenu = quickMenu.querySelector('.al-quick-menu__close');
  const shoppingChatBtn = quickMenu.querySelector('.al-quick-menu-shopping-chat .cmp-button');
  const shoppingChatBox = document.querySelector('#spr-live-chat-app .spr-chat__box');
  const shoppingChatCount = document.querySelector('.al-quick-menu-shopping-chat .chat-count');
  const quickMenuChatCount = quickBtn.querySelector('.chat-count');
  // eslint-disable-next-line no-unused-vars
  // const serviceChatCloseBtn = wrapper.querySelector('.c-btn-close');
  const serviceChatBtn = document.querySelector('.open-chat');
  let timeout = null;
  const metaViewport = document.getElementsByTagName('head')[0].querySelector('[name=viewport][content]');
  const saveViewport = metaViewport.content;

  // Sending the events
  function onEventTriggered({ response: { data } }) {
    if (data.eventType === 'CONVERSATION_WINDOW_OPENED') {
      clearTimeout(timeout);
    }
    if (data.eventType === 'BUTTON_CLICKED' && data.eventId === 'cs_support_btn') {
      window.sprChat('close');
      serviceChatBtn.click();
    }
  }

  function onUnreadCountChanged({
    response: {
      data: { count },
    },
  }) {
    if (shoppingChatCount && quickMenuChatCount && count !== 0) {
      shoppingChatCount.style.display = 'inline-block';
      quickMenuChatCount.style.display = 'inline-block';
      shoppingChatCount.innerHTML = count;
      quickMenuChatCount.innerHTML = count;
    } else {
      shoppingChatCount.style.display = 'none';
      quickMenuChatCount.style.display = 'none';
    }
  }

  if (Object.prototype.hasOwnProperty.call(window, 'sprChat')) {
    window.sprChat('subscribeToUpdate', {
      topic: 'eventTriggered',
      subscriber: onEventTriggered,
    });

    window.sprChat('subscribeToUpdate', { topic: 'unreadCountChanged', subscriber: onUnreadCountChanged });
  }

  /* lg-chatbot iframe 가이드 */
  const epromotorIframe = () => {
    let innerIframe = '';
    innerIframe += `<div class="al-quick-chat chat_drag iframe_type ui-draggable">`;
    innerIframe += `<!-- iframe - just sample-->`;
    innerIframe += `<div class="iframe-container chat_bar ui-draggable-handle"> `;
    // eslint-disable-next-line max-len
    innerIframe += `<iframe class="epromotor-chatbot-area ready active" id="chat-iframe" src="${componentData.servicectaurl}"></iframe>`;
    innerIframe += `</div>`;
    innerIframe += `</div>`;
    quickMenu.insertAdjacentHTML('beforeend', innerIframe);
  };

  // lg-chatbot iframe 가이드
  // sticky
  const addActive = (clicked = false) => {
    if (clicked) {
      BtnWrap.classList.add('al-quick-btn--open');
      quickMenu.classList.add('al-quick-menu--active');
      wrapper.classList.add('CM0007--active');
      quickMenu.setAttribute('aria-modal', 'true');
      quickMenu.querySelector('button').setAttribute('aria-expanded', 'true');
      quickBtn.setAttribute('aria-expanded', 'true');
      toast?.classList.add('active');
      quickBtn.classList.remove('al-quick-btn__quickbtn--animation');
      quickMenu.setAttribute('tabindex', '0');
      setTimeout(function () {
        quickMenu.focus();
      }, 100);
    }
  };
  const removeActive = (clicked = false) => {
    if (clicked && quickMenu.classList.contains('al-quick-menu--active')) {
      metaViewport.setAttribute('content', saveViewport);
      BtnWrap.classList.remove('al-quick-btn--open');
      quickMenu.classList.remove('al-quick-menu--active');
      wrapper.classList.remove('CM0007--active');
      quickMenu.setAttribute('aria-modal', 'false');
      quickMenu.querySelector('button').setAttribute('aria-expanded', 'false');
      quickBtn.setAttribute('aria-expanded', 'false');
      toast?.classList.remove('active');
      quickBtn.classList.add('al-quick-btn__quickbtn--animation');
    }
  };
  const quickBtnClickEvent = () => {
    if (quickMenu.classList.contains('al-quick-menu--active')) {
      removeActive(true);
    } else {
      window.sprChat?.('close');
      addActive(true);
    }
  };
  window.addEventListener('keydown', e => {
    if (e.keyCode === keyboard.esc) {
      removeActive(true);
    }
  });
  window.addEventListener('message', function (e) {
    const eventMessage = e.data;
    if (eventMessage === 'lg-chatbot-close') {
      wrapper.querySelector('.al-quick-chat').style.display = 'none';
      removeActive(true);
      setTimeout(function () {
        quickMenu.querySelector('.al-quick-menu__imgbox').style.display = 'block';
        quickMenu.querySelector('.al-quick-menu__link').style.display = 'block';
      }, 1000);
    } else if (eventMessage === 'lg-chatbot-mkt') {
      wrapper.querySelector('.al-quick-chat').style.display = 'none';
      removeActive(true);
      setTimeout(function () {
        quickMenu.querySelector('.al-quick-menu__imgbox').style.display = 'block';
        quickMenu.querySelector('.al-quick-menu__link').style.display = 'block';
      }, 1000);
      if (window.sprChat) {
        window.sprChat?.('open');
      }
    }
  });

  const openChat = () => {
    if (serviceChatBtn) {
      serviceChatBtn.addEventListener('click', () => {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
        /* lg-chatbot iframe 가이드 */
        const iframe = document.querySelector('.epromotor-chatbot-area');
        if (!iframe) {
          epromotorIframe();
        }
        serviceChatBtn.closest('.al-quick').querySelector('.al-quick-menu__imgbox').style.display = 'none';
        serviceChatBtn.closest('.al-quick').querySelector('.al-quick-menu__link').style.display = 'none';

        // lg-chatbot iframe 가이드
        serviceChatBtn.closest('.al-quick').querySelector('.al-quick-chat').style.display = 'block';
        addActive(true);
      });
    }
  };
  openChat();

  // To hide the toasr message.
  const closeToast = () => {
    if (toastMsg.classList.contains('al-proactive-msg__box--active')) {
      toastMsg.classList.remove('al-proactive-msg__box--active');
      toast.classList.add('al-proactive-msg--hidden');
    }
  };

  // Handles the toast message events.
  const toastEvent = toastItem => {
    let closeTimeout = null;
    if (toastMsg) {
      const target = toastMsg.querySelector('.al-proactive-msg__second-txt');
      const { disappearTimeout, message, openQuickMenu, openShoppingChat, openServiceChat, proactiveMessageLink } =
        toastItem;
      target.innerHTML = message;
      const startTime = new Date().getTime();
      toastMsg.classList.add('al-proactive-msg__box--active');
      const toastMsgText = toastMsg.querySelector('.al-proactive-msg__txt');

      // On toast message click.
      toastMsgText.addEventListener('click', () => {
        if (proactiveMessageLink) {
          window.location.href = proactiveMessageLink;
        } else if (openQuickMenu) {
          addActive(true);
          closeToast();
        } else if (openServiceChat) {
          serviceChatBtn.click();
          closeToast();
        } else if (openShoppingChat) {
          window.sprChat('open');
          closeToast();
        }
      });

      if (disappearTimeout !== 0) {
        // Hides the toast message.
        closeTimeout = setTimeout(() => {
          closeToast();
        }, disappearTimeout * 1000);

        toastMsg.addEventListener('mouseenter', () => {
          clearTimeout(closeTimeout);
        });

        const delay = disappearTimeout * 1000 - (new Date().getTime() - startTime);
        toastMsg.addEventListener('mouseleave', () => {
          closeTimeout = setTimeout(() => {
            closeToast();
          }, delay);
        });
      }

      toastMsgClose.addEventListener('click', closeToast);
      toastMsgClose.addEventListener('click', () => {
        component.classList.add('al-quick--active');
        BtnWrap.classList.add('al-quick-btn--active');
      });
    }
  };

  // Triggers the toast event.
  const triggerToast = () => {
    if (componentData && componentData.toastmsgconfiglist) {
      const toastConfig = JSON.parse(componentData.toastmsgconfiglist);
      toastConfig.forEach(toastItem => {
        const { pageSet, visibleTimeout } = toastItem;
        const rootClassList = document.querySelector('body').classList;
        rootClassList.forEach(className => {
          if (className === pageSet) {
            timeout = setTimeout(() => toastEvent(toastItem), visibleTimeout * 1000);
          }
        });
      });
    }
  };
  triggerToast();

  // topBtn
  const topClickEvent = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const topScrollEvent = () => {
    const scrollTop = window.pageYOffset;

    if (scrollTop < 70) {
      component.classList.remove('al-quick--active');
      BtnWrap.classList.remove('al-top-btn--active');
    } else if (scrollTop > 70) {
      component.classList.add('al-quick--active');
      BtnWrap.classList.add('al-top-btn--active');
    }
  };
  removeActive(true);
  quickBtn.addEventListener('click', quickBtnClickEvent);
  if (closeQuickMenu) closeQuickMenu.addEventListener('click', quickBtnClickEvent);
  window.addEventListener('DOMContentLoaded', () => {
    component.classList.add('al-quick--active');
    BtnWrap.classList.add('al-quick-btn--active');
  });
  topBtn.addEventListener('click', topClickEvent);
  window.addEventListener('scroll', () => topScrollEvent());

  // open quick menu
  const openButtons = document.querySelectorAll('a[href="#CM0007"]');
  openButtons.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      addActive(true);
    });
  });

  shoppingChatBtn?.addEventListener('click', () => {
    if (!shoppingChatBox) {
      window.sprChat('open');
    }
    removeActive(true);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
