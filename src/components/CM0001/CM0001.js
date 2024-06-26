import { bp, cookieConst, keyboard, carouselDuration } from '../../assets/js/common/constant.js';
import {
  beforeLaunch,
  activateLoopFocus,
  jwtDecode,
  getElementRenderStyle,
  promotionDateChecker,
} from '../../assets/js/common/utils.js';
import runCarousel, { behavior } from '../../assets/js/common/carousel.js';
import { getCookie } from '../../assets/js/common/cookie.js';
import logoutUser from '../../assets/js/common/logout.js';
import { checkAnalyticsCookieEnabled } from '../../assets/js/common/onetrustHelper.js';
import { checkAndInsertATNotification } from './notificationBannerHelper.js';

let loadedDesktop = false;
let loadedMobile = false;

/**
 *
 * @param {string} string - the source string on which masking will be applied
 * @param {*} maskLength - the length of the masked string
 * @returns a masked string
 */
const maskString = (string, maskLength = 0) => {
  const noOfMasked = maskLength || string.length - Math.round(string.length / 2);
  // from string, remove number of characters to be masked and replace * instead
  return string.slice(0, -noOfMasked).concat('*'.repeat(noOfMasked));
};

/**
 * A function to mask the username or emailId of logged in user
 * In case if firstName or lastName is present name will be masked with * from length/2
 * In case if firstName and lastName are not present then
 * last one-fourth characters in email will be masked with *
 * @returns a masked string
 */
const getMaskedUsername = ({ firstName, lastName, emailAddr }) => {
  const { reverseUsername = '' } = document.querySelector('#header').dataset;
  const {
    dataset: { countrycode = '' },
  } = document.documentElement;
  /**
   * To show user unmasked name for italy
   * Added below code to check for country
   */
  const showUnmaskedName = countrycode.toLowerCase() === 'it';
  const checkReverseUsername = reverseUsername === 'true';
  const fname = firstName || '';
  const lname = lastName || '';
  const username = checkReverseUsername ? `${lname} ${fname}` : `${fname} ${lname}`;
  const name = username.trim();
  if (name) {
    return showUnmaskedName ? name : maskString(name);
  }
  const [first] = emailAddr.split('@');
  const maskLength = Math.floor(first.length / 4);
  return showUnmaskedName ? first : maskString(first, maskLength);
};

/**
 * A function to add signout logic on element click event.
 * @param {Element} element - the element on which click handler will be added
 */
const signoutEventListener = element => {
  if (element) {
    element.addEventListener('click', event => {
      event.preventDefault();
      logoutUser(event.currentTarget.href);
    });
  }
};

/**
 * A function to search and add call event listener function on singout buttons
 * @param {Element} parent - the container element under which the signout buttons are rendered
 */
const handleSignout = parent => {
  const logoutLink = parent.querySelector('#signout');
  const mobileLogoutLink = parent.querySelector('#mobile-signout');
  signoutEventListener(logoutLink);
  signoutEventListener(mobileLogoutLink);
};

// based on access-token remove post login and pre login menu items
const showLoginInfo = component => {
  const accessToken = getCookie(cookieConst.accessToken);
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    // check if, token is not expired
    if (decodedToken && Date.now() <= decodedToken.exp * 1000) {
      const userDetails = decodedToken.context.user;
      const maskedUsername = getMaskedUsername(userDetails);
      const nameElements = component.querySelectorAll('header .navigation .c-gnb__info span');
      nameElements.forEach(element => {
        const nameElement = element;
        nameElement.textContent = maskedUsername;
      });
      const userIcons = component.querySelectorAll('header .navigation .icon-my');
      // add 'after-login' class to user icon element as per html
      userIcons.forEach(element => {
        // element.classList.add('after-login');
        // Mobile
        const mobElem = element.closest('.c-gnb__utils');
        if (mobElem) {
          mobElem.classList.add('after-login');
        }
        // Desktop
        const desktopElem = element.closest('.c-gnb__item.c-gnb__item--utility');
        if (desktopElem) {
          desktopElem.classList.add('after-login');
        }
      });
      const preLoginElements = component.querySelectorAll('header .navigation .pre-login');
      // Remove the non-logged-in elements
      preLoginElements.forEach(element => element.remove());
      // add signout logic.
      handleSignout(component);
      return null;
    }
  }
  const postLoginElements = component.querySelectorAll('header .navigation .post-login');
  // Removes the logged-in elements as access token not valid
  postLoginElements.forEach(element => element.remove());
};

const carouselOption = {
  'gnb banner': {
    pagination: behavior.pagination,
    loop: false,
    speed: 500,
    autoplay: false,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    preloadImages: false,
    allowTouchMove: true,
    lazy: false,
    spaceBetween: 24,
    on: {
      breakpoint: behavior.togglePagination(),
    },
  },
  'notification banner': {
    loop: true,
    keyboard: behavior.useKeyInteraction,
    slidesPerView: 1,
    pagination: behavior.pagination,
    // autoplay: false,
    autoplay: {
      delay: carouselDuration,
      disableOnInteraction: false, // 자동 멈춤 기능 해제
    },
    lazy: false,
    preloadImages: false,
    // allowTouchMove: true,
    spaceBetween: 0,
    autoHeight: true,
    on: {
      breakpoint: behavior.togglePagination(),
      init() {
        const welcomeCont = this.el.closest('.c-notification-banner');
        const bgColor = this.slides[this.activeIndex].getAttribute('data-bg-color');
        welcomeCont.classList.add(bgColor);
      },
      activeIndexChange() {
        const welcomeCont = this.el.closest('.c-notification-banner');
        const bgColor = this.slides[this.activeIndex].getAttribute('data-bg-color');
        if (bgColor === 'red') {
          welcomeCont.classList.remove('black');
          welcomeCont.classList.add(bgColor);
        } else if (bgColor === 'black') {
          welcomeCont.classList.remove('red');
          welcomeCont.classList.add(bgColor);
        }
      },
    },
  },
};
const featureClassName = {
  play: '.js-carousel-play',
  pause: '.js-carousel-pause',
  next: '.js-carousel-next',
  prev: '.js-carousel-prev',
  handler: '.c-carousel-controls',
};

const swiperInit = function (target, option, perView) {
  const nextEl = target.closest('.carousel').querySelector(featureClassName.next);
  const prevEl = target.closest('.carousel').querySelector(featureClassName.prev);
  return runCarousel(target, {
    ...option,
    navigation: {
      nextEl,
      prevEl,
    },
    slidesPerView: perView,
    slidesPerGroup: perView,
  });
};

const gnb = function (mediaQueryList) {
  const gnbContDesktop = document.querySelector('.c-gnb__desktop');
  const gnbContMobile = document.querySelector('.c-gnb__mobile');
  const stickyArea = document.querySelectorAll('.c-gnb__sticky');
  const postalArea = document.querySelectorAll('.c-header-side');
  const isDesktop = mediaQueryList.matches;
  const isMobile = !mediaQueryList.matches;
  function siblings(t, removeClass) {
    const child = t.parentElement.children;
    for (let i = 0; i < child.length; i += 1) {
      child[i].classList.remove(removeClass);
      const layer = child[i].querySelector('.c-gnb__layer-wrap');
      if (layer) layer.classList.remove(removeClass);
    }
  }

  // JS for desktop
  function gnbDesktop() {
    const navi = gnbContDesktop?.querySelector('.c-gnb__nav');

    /** START: When there is no link in main menu, the JS error throws. Doing error handling */
    // when there is no `<nav>`
    if (!navi) {
      return false;
    }
    // if no `<ul> <li>` then stop parsing. THis is for error handling.
    if (!navi.querySelector('ul li')) {
      return false;
    }
    /** END */

    const primary = gnbContDesktop.querySelector('.primary');
    const depth1Link = primary.querySelectorAll('.c-gnb__item-link--depth1');
    const depth2Link = navi.querySelectorAll('.c-gnb__item-link--depth2');
    // const shop = gnbContDesktop.querySelector('.shop');
    // const isShop = gnbContDesktop.querySelector('.c-gnb__group--depth2') !== null;
    const layerWrap = gnbContDesktop.querySelectorAll('.c-gnb__layer-wrap');
    const dimmed = gnbContDesktop.querySelector('.c-gnb__dimmed');
    // const gnbLayerPrimary = gnbContDesktop.querySelector('.c-gnb__group--depth1.primary');
    const banner = gnbContDesktop.querySelectorAll('.c-carousel');
    const depthUtil = gnbContDesktop.querySelectorAll('.c-gnb__item--utility .c-gnb__item-link--utility');
    const itemLink = gnbContDesktop.querySelectorAll('.c-gnb__group--utility .c-gnb__layer');
    // if (isShop) {
    //     const shop = gnbContDesktop.querySelector('.c-gnb__group--depth2').closest('.c-gnb__item--depth1');
    //     const gnbLayerShopLinks = shop.querySelectorAll('.c-gnb__layer a, .c-gnb__layer button');
    //     activateLoopFocus({
    //         nodeList: gnbLayerShopLinks,
    //         layerClass: '.c-gnb__item--depth2',
    //         targetSelector: 'a[href], button',
    //     });
    // }

    // const gnbLayerLinks = gnbLayerPrimary.querySelectorAll(
    //     '.c-gnb__layer > .c-gnb__depth3 a, .c-gnb__layer > .c-gnb__depth3 button'
    // );
    // activateLoopFocus({
    //     nodeList: gnbLayerLinks,
    //     layerClass: '.c-gnb__layer-wrap',
    //     targetSelector: 'a[href], button',
    // });

    const closeEvent = function () {
      layerWrap.forEach(function (el) {
        el.classList.remove('active');
        dimmed?.classList.remove('active');
      });
    };
    const closeNav = e => {
      if (e.keyCode === keyboard.tab) {
        const lastIndex = gnbContDesktop.querySelector('.c-gnb__utils > ul:first-child > li:first-child');
        if (e.target === lastIndex.querySelectorAll('a')[0] && dimmed.classList.contains('active')) {
          dimmed.classList.remove('active');
          closeEvent();
        }
      }
    };
    window.addEventListener('keydown', e => {
      if (e.keyCode === keyboard.esc) {
        closeEvent();
      }
      closeNav(e);
    });
    // GP1 - WA
    window.addEventListener('keyup', e => {
      closeNav(e);
    });
    // GP1 - WA e
    const hover = el => {
      const item = el.closest('.c-gnb__item');
      // const itemLayer = item.querySelector('.c-gnb__layer');
      // const itemDepth3 = item.querySelector('.c-gnb__depth3');
      // const itemDepth2 = item.querySelector('.c-gnb__item--depth2');
      // const has3depth = itemDepth2 !== null;
      siblings(item, 'active');
      item.classList.add('active');
      // if (!has3depth && itemLayer) {
      //     itemLayer.classList.add('active');
      //     itemDepth3.classList.add('active');
      // }
    };
    const depth1CloseEvent = function (target, index, arr) {
      target.addEventListener('click', () => {
        const itemDepth1 = arr[index].closest('.c-gnb__item--depth1');
        const layer = itemDepth1.querySelector('.c-gnb__layer-wrap');
        // excluding tab in 2depth
        const isNot2Depth = itemDepth1.querySelector('.c-gnb__group--depth2') == null;
        if (isNot2Depth) {
          layer.classList.remove('active');
          dimmed?.classList.remove('active');
        }
      });
    };
    depth1Link.forEach(function (el, index, arr) {
      const itemDepth1 = el.closest('.c-gnb__item--depth1');
      const itemDepth2 = itemDepth1.querySelector('.c-gnb__item--depth2');
      const itemDepth3 = itemDepth1.querySelector('.c-gnb__item--depth3');
      const btnClose = itemDepth1.querySelector('.c-gnb__close');
      const layer = itemDepth1.querySelector('.c-gnb__layer-wrap');
      const has2depth = itemDepth2 !== null;
      const has3depth = itemDepth3 !== null;
      if (has2depth) itemDepth2.classList.add('active');
      if (btnClose !== null) {
        depth1CloseEvent(btnClose, index, arr);
        btnClose.setAttribute('aria-describedby', `gnb_1depth_${index + 1}`);
      }
      itemDepth1.addEventListener('mouseover', function () {
        dimmed?.classList.add('active');
        if (has3depth) layer.classList.add('active');
      });
      itemDepth1.addEventListener('mouseout', function () {
        dimmed?.classList.remove('active');
        if (has3depth) layer.classList.remove('active');
      });
      el.addEventListener('focus', function () {
        siblings(itemDepth1, 'active');
        dimmed?.classList.add('active');
        if (has3depth) layer.classList.add('active');
      });
    });
    const depth2CloseEvent = function (target, index, lastIndex, arr) {
      target.addEventListener('click', () => {
        const idx = index + 1;
        const itemDepth1 = arr[index].closest('.c-gnb__item--depth1');
        const itemDepth2 = arr[index].closest('.c-gnb__item--depth2');
        const layer = itemDepth1.querySelector('.c-gnb__layer-wrap');
        if (idx === lastIndex) {
          layer.classList.remove('active');
          dimmed?.classList.remove('active');
        } else {
          itemDepth2.classList.remove('active');
          arr[index + 1].focus();
        }
      });
    };
    depth2Link.forEach(function (el, index, arr) {
      const item = el.closest('.c-gnb__item');
      const lastIndex = arr.length;
      const itemLayer = item.querySelector('.c-gnb__depth3');
      const btnClose = item.querySelector('.c-gnb__close');
      item.addEventListener('mouseover', function () {
        hover(el);
      });
      el.addEventListener('focus', function () {
        if (itemLayer) hover(el);
      });
      if (btnClose) depth2CloseEvent(btnClose, index, lastIndex, arr);
    });
    depthUtil?.forEach(function (el) {
      const itemCheck = el.closest('.c-gnb__item').querySelector('.c-gnb__layer');
      if (itemCheck !== null) {
        el.addEventListener('mouseover', function () {
          el.setAttribute('aria-expanded', 'true');
        });
        el.addEventListener('mouseout', function () {
          el.setAttribute('aria-expanded', 'false');
        });
        el.addEventListener('focusin', function () {
          el.setAttribute('aria-expanded', 'true');
        });
        el.addEventListener('focusout', function () {
          el.setAttribute('aria-expanded', 'false');
        });
      }
    });
    itemLink?.forEach(function (el) {
      const target = el.closest('.c-gnb__item').querySelector('.c-gnb__item-link');
      el.addEventListener('mouseover', function () {
        target.setAttribute('aria-expanded', 'true');
      });
      el.addEventListener('mouseout', function () {
        target.setAttribute('aria-expanded', 'false');
      });
      el.addEventListener('focusin', function () {
        target.setAttribute('aria-expanded', 'true');
      });
      el.addEventListener('focusout', function () {
        target.setAttribute('aria-expanded', 'false');
      });
    });
    // for touch device
    dimmed?.addEventListener('click', () => {
      dimmed.classList.remove('active');
      document.body?.classList.remove('search-fixed');
    });
    // banner carousel
    if (beforeLaunch(banner)) return false;
    banner.forEach(target => {
      const onlyBanner = target.closest('.c-gnb__row').classList.contains('discover-full');
      const perViewNum = onlyBanner ? 4 : 3;
      if (target.querySelectorAll('.swiper-slide').length > perViewNum) {
        return swiperInit(target, carouselOption['gnb banner'], perViewNum);
      }
    });
  }

  // JS for mobile
  function gnbMobile() {
    const navi = gnbContMobile?.querySelector('.c-gnb__nav');

    /** START: When there is no link in main menu, the JS error throws. Doing error handling */
    // when there is no `<nav>`
    if (!navi) {
      return false;
    }
    // if no `<ul> <li>` then stop parsing. This is for error handling.
    if (!navi.querySelector('ul li')) {
      return false;
    }
    /** END */

    const toggleMenuBtn = gnbContMobile.querySelector('.c-gnb__utils .c-gnb__menu');
    const gnbLayer = gnbContMobile.querySelector('.c-gnb__container');
    const btnExpand = navi.querySelectorAll('button.c-gnb__item-link');
    const btnBack = navi.querySelectorAll('.c-gnb__mobile-layer--back button.back');
    const subLayerLinks = navi.querySelectorAll('.c-gnb__mobile-layer a, .c-gnb__mobile-layer button');
    const gnbLayerLinks = navi.querySelectorAll('a, button');
    const dimmed = gnbContMobile.querySelector('.c-gnb__dimmed');
    if (beforeLaunch(btnExpand)) return false;

    const toggleMenuLayer = event => {
      const menu = event.target;
      if (gnbLayer.classList.contains('show')) {
        // menu close
        gnbLayer.classList.remove('active', 'show');
        document.body.classList.remove('gnb-fixed');
        // icon change
        menu.classList.replace('icon-close', 'icon-menu');
      } else {
        // menu open
        gnbLayer.classList.add('active');
        setTimeout(function () {
          gnbLayer.classList.add('show');
        }, 300);
        // for body scroll
        document.body.classList.add('gnb-fixed');
        // icon change
        menu.classList.replace('icon-menu', 'icon-close');
      }
    };

    const clickExpand = btn => {
      const control = btn.getAttribute('aria-controls');
      const layer = document.getElementById(control);
      layer.classList.add('active');
      setTimeout(function () {
        layer.classList.add('show');
        setTimeout(function () {
          layer.querySelector('.c-gnb__mobile-layer--back button.back').focus();
        }, 500);
      }, 300);
    };
    const clickBack = btn => {
      const layer = btn.closest('.c-gnb__mobile-layer');
      layer.classList.remove('active', 'show');
      const id = layer.getAttribute('id');
      const targetButton = document.querySelector(`button[aria-controls=${id}]`);
      targetButton.focus();
    };

    // Toggle Menu
    toggleMenuBtn.addEventListener('click', toggleMenuLayer);
    // When clicking the menu in the mobile view, the submenu layer is opened.
    btnExpand.forEach(btn => {
      btn.addEventListener('click', () => {
        clickExpand(btn);
      });
    });
    // Clicking the Back button on the submenu layer closes the layer
    btnBack.forEach(btn => {
      btn.addEventListener('click', () => {
        clickBack(btn);
      });
    });
    // for touch device
    dimmed?.addEventListener('click', () => {
      // menu close
      gnbLayer.classList.remove('active', 'show');
      document.body.classList.remove('gnb-fixed');
      document.body?.classList.remove('search-fixed');
      // icon change
      toggleMenuBtn.classList.replace('icon-close', 'icon-menu');
    });
    // Prevents the focus from going out of the layer
    activateLoopFocus({
      nodeList: subLayerLinks,
      layerClass: '.c-gnb__mobile-layer',
      targetSelector: 'a[href], button',
    });
    activateLoopFocus({
      nodeList: gnbLayerLinks,
      layerClass: '.c-gnb__mobile',
      targetSelector: 'a[href], button',
    });
  }

  // gnb depending on scroll direction
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const { scrollY } = window;

    // Compare to previous scroll position
    const direction = scrollY > lastScrollY ? 'Scroll Down' : 'Scroll Up';
    const hasScrollTab = document.querySelector('.PD0033.type-pdp') || document.querySelector('.ST0002');

    // Save the current scroll value
    lastScrollY = scrollY;
    const gnbSscrollEvent = sticky => {
      if (hasScrollTab) {
        sticky.classList.add('scroll-down');
      } else if (direction === 'Scroll Up') {
        sticky.classList.remove('scroll-down');
      } else {
        sticky.classList.add('scroll-down');
      }
    };
    stickyArea.forEach(sticky => {
      gnbSscrollEvent(sticky);
    });
    postalArea.forEach(sticky => {
      gnbSscrollEvent(sticky);
    });
  });

  // Whether for mobile or desktop,
  // JS is executed only once for the width of the browser.
  if (isDesktop && !loadedDesktop) {
    loadedDesktop = true;
    gnbDesktop();
  }
  if (isMobile && !loadedMobile) {
    loadedMobile = true;
    gnbMobile();
  }
};
const skipContent = function () {
  const skipCont = document.querySelectorAll('.c-gnb__skip a');
  skipCont.forEach(target => {
    target.addEventListener('click', e => {
      e.preventDefault();
      if (target.getAttribute('href').indexOf('#') !== -1) {
        const link = target.getAttribute('href').split('#')[1];
        const linkElem = document.querySelectorAll(`#${link}`);
        if (linkElem.length > 0) {
          linkElem[0].setAttribute('tabindex', '0');
          linkElem[0].focus();
        }
      }
    });
  });
  // const mainCont = document.getElementById('contents');
  // skipCont.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     mainCont.focus();
  // });
};
const cookieCheck = cookieLayer => {
  const btnCookieChange = cookieLayer.querySelector('.js-cookie__change');
  const btnAcceptAll = cookieLayer.querySelectorAll('.js-cookie__apply-all');
  // const btnRejectAll = cookieLayer.querySelector('.js-cookie__reject-all');
  const cookieSetting = cookieLayer.querySelector('.js-cookie__setting');
  const cookieClose = cookieLayer.querySelector('.js-cookie__close');
  const cookieCheckbox = cookieSetting?.querySelectorAll('input[type=checkbox]') || [];
  // RO Cookie dimmed
  const cookieDimmed = document.querySelector('.cookie-dimmed');

  const cookieCloseAction = () => {
    cookieLayer.classList.remove('active');
    cookieSetting.classList.remove('active');
    // cookieLayer.setAttribute('tabindex', -1); WCAG :: The element has been placed in the Tab order using
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    // RO Cookie dimmed
    cookieDimmed?.classList.remove('on');
  };

  btnCookieChange?.addEventListener('click', () => {
    // btnCookieChange.classList.add('hidden');
    btnCookieChange.setAttribute('aria-expanded', 'true');
    cookieSetting?.classList.add('active');
    // btnAcceptAll.classList.add('active');
  });
  const checkEvent = status => {
    cookieCheckbox.forEach(checkbox => {
      const t = checkbox;
      const necessary = t.closest('.c-list__item').classList.contains('LGCOM_NECESSARY');
      if (t.disabled || necessary) return false;
      t.checked = status;
    });
  };
  btnAcceptAll.forEach(b => {
    b.addEventListener('click', () => {
      // const condition =
      //     [...cookieCheckbox].filter(checkbox => checkbox.disabled !== true).filter(checkbox => !checkbox.checked)
      //         .length > 0;
      checkEvent(true);

      if (!cookieSetting.classList.contains('active')) {
        cookieCloseAction();
      }
    });
  });
  // btnRejectAll.addEventListener('click', () => {
  //     checkEvent(false);
  // });
  function isChecked(checkbox) {
    const c = checkbox;
    c.checked = true;
  }
  cookieCheckbox.forEach(c => {
    c.addEventListener('click', () => {
      if (!c.closest('.c-list__item').classList.contains('LGCOM_NECESSARY')) return false;
      isChecked(c);
    });
  });
  cookieClose?.addEventListener('click', () => {
    cookieCloseAction();
  });
  const cookieLayerLinks = cookieLayer.querySelectorAll('a, button');
  activateLoopFocus({
    nodeList: cookieLayerLinks,
    layerClass: '.c-cookie-layer',
    targetSelector: 'a[href], button',
  });
  const cookieOpen = () => {
    const layer = cookieLayer;
    // layer.setAttribute('tabindex', 0); WCAG :: The element has been placed in the Tab order using
    layer.focus();
    // RO Cookie dimmed
    cookieDimmed?.classList.add('on');
  };
  if (cookieLayer.classList.contains('active')) cookieOpen();

  // eslint-disable-next-line max-len
  /* **** CNX team - this code causing P1 issue, not able to use any input fields when cookie banner is present. Please check. ***** */
  // document.addEventListener('click', () => {
  //   if (cookieLayer.classList.contains('active')) cookieOpen();
  // });
  /* **** END ***** */

  // const implicit = cookieLayer.querySelector('.c-cookie-implicit');
  // const explicit = cookieLayer.querySelector('.c-cookie-explicit');
  // if (implicit) {
  //     // const closeBtn = implicit.querySelector('.js-cookie__close');
  //     // closeBtn.addEventListener('click', () => {
  //     // });
  // }
  // if (explicit) {
  //     const openBtn = explicit.querySelector('.js-cookie__open');
  //     const closeBtn = explicit.querySelector('.js-cookie__close');
  //     const applyChange = explicit.querySelector('.js-cookie__change');
  //     const applyAllBtn = explicit.querySelector('.js-cookie__apply-all');
  //     const cookieMore = explicit.querySelector('.c-cookie-explicit__more');
  //     const explicitCheckbox = explicit.querySelectorAll('input[type=checkbox]');
  //     openBtn.addEventListener('click', () => {
  //         explicit.classList.add('active');
  //         openBtn.setAttribute('aria-expanded', 'true');
  //     });
  //     closeBtn.addEventListener('click', () => {
  //         explicit.classList.remove('active');
  //         openBtn.setAttribute('aria-expanded', 'false');
  //     });
  //     applyChange.addEventListener('click', () => {
  //         const getAriaExpand = applyChange.getAttribute('aria-expanded');
  //         cookieMore.classList.toggle('active');
  //         applyChange.setAttribute('aria-expanded', getAriaExpand === 'true' ? 'false' : 'true');
  //     });
  //     applyAllBtn.addEventListener('click', () => {
  //         const condition =
  //             [...explicitCheckbox]
  //                 .filter(checkbox => checkbox.disabled !== true)
  //                 .filter(checkbox => !checkbox.checked).length > 0;
  //         if (condition) {
  //             explicitCheckbox.forEach(checkbox => {
  //                 const t = checkbox;
  //                 if (t.disabled) return false;
  //                 t.checked = true;
  //             });
  //         } else {
  //             explicitCheckbox.forEach(checkbox => {
  //                 const t = checkbox;
  //                 if (t.disabled) return false;
  //                 t.checked = false;
  //             });
  //         }
  //     });
  // }
};
// Notification Banner
const notificationBanner = notificationBannerCont => {
  const breakpoint = window.matchMedia(`(min-width: ${bp.mobile + 1}px)`);
  const closeBtn = notificationBannerCont.querySelector('.c-notification-banner__close');
  const carousel = notificationBannerCont.querySelector('.c-carousel');
  const item = carousel.querySelectorAll('.swiper-slide');
  let maxHeight = 40;
  closeBtn.addEventListener('click', () => {
    sessionStorage.setItem('notificationBannerClosed', true);
    notificationBannerCont.classList.add('hidden');
  });
  const fold = () => {
    item.forEach(el => {
      const swiperWrapper = el.closest('.swiper-wrapper');
      const moreBtn = el.querySelector('.c-notification-banner__more');
      const cont = el.querySelector('.c-notification-banner__contents');
      const textArea = el.querySelector('.c-notification-banner__text');
      maxHeight = parseInt(getElementRenderStyle(textArea, 'line-height'), 10) * 2;
      // console.log(maxHeight);
      if (textArea.clientHeight > maxHeight) {
        cont.classList.add('fold');
      } else {
        cont.classList.add('unfold');
      }
      moreBtn.addEventListener('click', () => {
        cont.classList.remove('fold');
        cont.classList.add('unfold');
        swiperWrapper.style.height = '100%';
      });
    });
  };
  const foldEvent = () => {
    // if (!breakpoint.matches) fold();
    fold();
  };
  foldEvent();
  breakpoint.addEventListener('change', foldEvent);

  // carousel
  const autoplayEventHandler = {
    pause(swiper) {
      // eslint-disable-next-line no-unused-vars
      return event => {
        swiper.authorParams.play.removeAttribute('disabled');
        swiper.authorParams.pause.setAttribute('disabled', 'disabled');
        swiper.autoplay.stop();
      };
    },
    play(swiper) {
      // eslint-disable-next-line no-unused-vars
      return event => {
        swiper.authorParams.pause.removeAttribute('disabled');
        swiper.authorParams.play.setAttribute('disabled', 'disabled');
        swiper.autoplay.start();
      };
    },
  };
  let swiper;
  // `item` can be empty array which thows error, better check `item` has any data.
  if (item.length) {
    if (item.length > 1) {
      swiper = swiperInit(carousel, carouselOption['notification banner'], 1);
    } else {
      const bgColor = item[0]?.getAttribute('data-bg-color');
      // checking condition for not setting `undefined` in class attr.
      if (bgColor) {
        notificationBannerCont.classList.add(bgColor);
      }
    }
  }
  // play or stop
  if (swiper) {
    const pause = notificationBannerCont.querySelector('.c-carousel-controls__action--pause');
    const play = notificationBannerCont.querySelector('.c-carousel-controls__action--play');
    const pauseHandler = autoplayEventHandler.pause.bind(pause);
    const playHandler = autoplayEventHandler.play.bind(play);
    swiper.authorParams = { pause, play };
    pause.addEventListener('click', pauseHandler(swiper), false);
    play.addEventListener('click', playHandler(swiper), false);
  }
};
const chcngeEntity = tag => {
  const tagList = Array.from(tag);
  tagList.forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.innerHTML = el.textContent;
  });
};

const changePostal = () => {
  const postalInput = document.querySelector('#postal_Wa');
  const postalUpdate = document.querySelector('#postalUpdate');
  const postalChange = document.querySelector('.c-header-side__postalBtn');
  postalInput?.addEventListener('keydown', e => {
    if (e.keyCode === keyboard.enter) {
      e.preventDefault();
    }
  });
  postalInput?.addEventListener('keyup', () => {
    if (postalInput.value === '' || postalInput.value === null || postalInput.value === undefined) {
      postalUpdate.setAttribute('disabled', true);
    } else {
      postalUpdate.removeAttribute('disabled');
    }
  });
  postalUpdate?.addEventListener('click', () => {
    if (postalInput.value === '' || postalInput.value === null || postalInput.value === undefined) {
      postalChange.querySelector('span').textContent = postalChange.getAttribute('data-reset');
      postalChange.classList.remove('success');
    } else {
      postalChange.querySelector('span').textContent = postalInput.value;
      postalChange.classList.add('success');
    }
  });
};

const checkCookieHeight = () => {
  const cookieElement = document.querySelector('.c-cookie-layer');
  const searchLayer = document.querySelector('.pop-cs-search.c-pop-msg');
  if (beforeLaunch(cookieElement)) return false;

  const setSearchLayerTop = () => {
    const cookieHeight = cookieElement ? cookieElement.clientHeight : 0;
    if (beforeLaunch(searchLayer)) return false;
    searchLayer.style.top = `${cookieHeight}px`;
  };
  setSearchLayerTop();

  const schActive = document.querySelectorAll('.c-gnb__utils .icon-search');
  const schCloseBtn = document.querySelector('.c-pop-msg__close');
  const schLayerHeight = document.querySelectorAll([
    '.c-cookie-layer__default .button button',
    '.c-cookie-layer__setting .c-cookie-layer__setting-info button',
  ]);
  function statusLayer() {
    setSearchLayerTop();
  }
  function popActive() {
    document.body.classList.add('search-fixed');
    setTimeout(setSearchLayerTop, 100);
  }
  function popClose() {
    document.body.classList.remove('search-fixed');
    setSearchLayerTop();
  }

  window.addEventListener('resize', () => {
    setSearchLayerTop();
  });
  schLayerHeight?.forEach(c => {
    c.addEventListener('click', statusLayer);
  });
  schActive?.forEach(c => {
    c.addEventListener('click', popActive);
  });
  schCloseBtn?.addEventListener('click', popClose);
};

async function init() {
  const component = document.querySelectorAll('.CM0001');
  if (beforeLaunch(component)) return false;
  // carousel
  component.forEach(c => promotionDateChecker(c));
  // Show/hide login menu items from header
  document.addEventListener('SESSION_HANDLER_LOADED', () => {
    component.forEach(cmp => showLoginInfo(cmp));
  });
  const breakpoint = window.matchMedia(`(min-width: ${bp.gridFull}px)`);
  gnb(breakpoint);
  breakpoint.addEventListener('change', gnb, false);
  skipContent();
  const cookieLayer = document.querySelector('.c-cookie-layer');
  if (cookieLayer) {
    cookieCheck(cookieLayer);
    // accordion.run(cookieLayer);
  }

  /* ****KEEP BELOW PORTION OF CODE ALWAYS AT END AS IT AWAITS***** */
  // if analytics cookies enabled load notification from adobe target
  if (checkAnalyticsCookieEnabled()) {
    await checkAndInsertATNotification();
  }
  const notificationBannerCont = document.querySelector('.c-notification-banner');
  if (notificationBannerCont && sessionStorage.getItem('notificationBannerClosed') !== 'true') {
    notificationBannerCont.classList.remove('hidden');
    notificationBanner(notificationBannerCont);
  }
  chcngeEntity(document.querySelectorAll('.c-gnb__desktop .c-gnb__item > .c-button > .c-button__text'));
  chcngeEntity(document.querySelectorAll('.c-gnb__mobile .c-gnb__group .c-gnb__item--outlinks > .c-gnb__item-link'));

  const btnLanguage = document.querySelector('.icon-language').closest('.c-gnb__item').querySelector('.c-gnb__layer');
  btnLanguage?.querySelector('.c-gnb__item.active').querySelector('a').setAttribute('aria-current', 'true');
  changePostal();
  window.addEventListener('load', checkCookieHeight);
}

init();
