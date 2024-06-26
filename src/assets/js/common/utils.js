/* eslint-disable max-len */
import { bp, cookieConst, keyboard } from './constant.js';
import { getCookie, setCookie } from './cookie.js';
import { checkFunctionalCookieEnabled } from './onetrustHelper.js';
// uncomment for AEM repo
// import { countryConst } from '../react-library/helper/cartConstant.js';
// only for publishing Repo. comment it on AEM repo.
const countryConst = {};

export const getConfig = (elementSelector, datasetItem) => {
  if (!elementSelector || !datasetItem) {
    return {};
  }
  const element = document.querySelector(elementSelector);
  if (element) {
    const config = element.dataset[datasetItem];
    if (config) {
      try {
        return JSON.parse(config);
      } catch {
        return {};
      }
    }
  }
  return {};
};

const productConfig = getConfig('.productGlobal__config', 'productConfig');

export function beforeLaunch(DOM) {
  // case : DOM catch by querySelector.
  if (null == DOM) return true;
  // case : HTMLCollection or NodeList or what mutate them.
  const isIterable = !!DOM[Symbol.iterator] || 0 <= DOM.length;
  const reject = isIterable ? 0 === DOM.length : null == DOM;
  if (reject) return true;
  // case : default
  return false;
}

export function isSafeToLoad(component) {
  return !beforeLaunch(document.querySelector(`.${component}`));
}

export function lazyloadJS(url, target) {
  const d = document;
  const s = d.createElement('script');
  const b = target || d.body || d.getElementsByTagName('body')[0];
  const attributes = {
    src: url,
    defer: 'defer',
  };
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const i in attributes) {
    s.setAttribute(i, attributes[i]);
  }
  b.appendChild(s);
}

function imageLoad(_target) {
  const target = _target;
  if (target instanceof HTMLImageElement) {
    if (target.dataset.src) {
      target.src = _target.dataset.src;
      target.classList.remove('lazyload');
      target.classList.add('lazyloaded');
      target.removeAttribute('data-src');
    }
  }
  if (target instanceof HTMLSourceElement) {
    target.srcset = _target.dataset.srcset;
    target.classList.remove('lazyload');
    target.classList.add('lazyloaded');
  }
}

export function lazyload(_target, _options = {}, _loader = null) {
  /*! 2023-06-13 : REMOVE- Deleted by 'jinmoongi@cnspartner.com' request */
  const options = {
    // root: _target.closest('.component'),
    // rootMargin: '0px',
    // threshold: 0.01,
    ..._options,
  };
  const behavior = () => {
    // image
    imageLoad(_target);

    // video
    if (_target instanceof HTMLVideoElement) {
      // ...
      _target.load();
      _target.play();
      if (!_target.paused) {
        _target.classList.add('c-media__video--loaded');
        if (!_target.loop) {
          _target.addEventListener('ended', function () {
            const control = _target.closest('.c-media').querySelector('.js-video-pause');
            if (control) {
              control.click();
            }
          });
        }
      }
      if (_options.button) {
        _target.addEventListener('play', () => _options.button.play.setAttribute('disabled', ''), false);
      }
    }
  };
  const lazyloader = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        behavior();
        observer.disconnect(); // cancel watch
      }
    });
  };
  const loader = _loader || lazyloader;
  const observeTarget = options?.observe_target || _target;
  const observer = new IntersectionObserver(loader, options);
  observer.observe(observeTarget);
}

export function lazyloadScript(attr) {
  if (attr) {
    const d = document;
    const s = d.createElement('script');
    const b = d.body || d.getElementsByTagName('body')[0];
    attr
      .replace(/ +/gi, ' ')
      .split(' ')
      .forEach(function (item) {
        if (item.indexOf('=') > -1) {
          const test = item.split('=');
          s.setAttribute(test[0], test[1].replace(/"/gi, ''));
        } else {
          s.setAttribute(item, '');
        }
      });
    b.appendChild(s);
  }
}

export function lazyloadInit() {
  window.addEventListener('load', function () {
    document.querySelectorAll('[data-lazyload-js]')?.forEach(function (el) {
      lazyloadScript(el.dataset.lazyloadAttr);
    });
    document.querySelectorAll('[data-lazyload-image]')?.forEach(function (el) {
      imageLoad(el);
    });
    if (checkFunctionalCookieEnabled()) {
      // if onetrust functional cookie(C0003) enabled load scripts
      document.querySelectorAll('[data-lazyload-js-eprivacy]')?.forEach(function (el) {
        lazyloadScript(el.dataset.lazyloadAttr);
      });
    }
  });
  const img = document.querySelectorAll('img.lazyload');
  const source = document.querySelectorAll('source.lazyload');
  [...img, ...source].forEach(function (el) {
    lazyload(el);
  });
}

export function strToElement(htmlString) {
  if ('string' !== typeof htmlString) return console.log(`Parameter's datatype is not string`);
  const doc = new DOMParser().parseFromString(htmlString, 'text/xml');
  const element = doc?.body || doc.children;
  return element;
}

export function createParsingElement(classname = 'virtual-element') {
  const element = document.createElement('div');
  element.classList.add(classname);
  return element;
}

export function findUp({ element, findTarget, limit }) {
  if (element === findTarget) return true;
  if (element === limit) return false;
  return findUp(element.parentElement);
}

function inViewport(target, targetSelector) {
  const els = target.querySelectorAll(targetSelector);
  const matches = [];
  const elCt = els.length;
  for (let i = 0; i < elCt; i += 1) {
    const el = els[i];
    const b = el.getBoundingClientRect();
    const c = window.getComputedStyle(el);
    if (
      b.width > 0 &&
      b.height > 0 &&
      b.left + b.width > 0 &&
      b.right - b.width < window.outerWidth &&
      b.top + b.height > 0 &&
      b.bottom - b.width < window.outerHeight &&
      c &&
      c.getPropertyValue('visibility') === 'visible' &&
      c.getPropertyValue('opacity') !== 'none'
    ) {
      matches.push(el);
    }
  }
  return matches;
}

export const debugMarkup = () => {
  const stringToHTML = function (str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.querySelector('div');
  };
  window.debugMarkup = () => {
    const [...component] = document.querySelectorAll('.c-wrapper');
    const runDebug = el => {
      const c = el;
      // console.log(c);
      // outline
      // c.style.outline = '1px solid darkturquoise';
      if (c.querySelector('.component')) c.querySelector('.component').style.outline = '1px solid lightcoral';
      if (c.querySelector('.cmp-container')) c.querySelector('.cmp-container').style.outline = '1px solid palegreen';
      // get component id
      const cid = c.getAttribute('class').match(/[A-Z]{2}[0-9]{4}/g);
      if (cid) {
        const html = `<div style="position:absolute;right:0;top:0;padding:5px 10px;font-size:8px;line-height:1;background:rgba(88,88,88,.5);color:#fff;">${cid[0]}</div>`;
        c.appendChild(stringToHTML(html));
      }
      // heading tag
      // - Fixed a bug.
      const headings = c.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(h => {
        const html = `<div style="position:absolute;right:0;top:0;padding:5px 10px;font-size:8px;line-height:1;background:rgba(88,88,88,.5);color:#fff;">${h.tagName}</div>`;
        Object.assign(h.style, { outline: '1px solid red', position: 'relative' });
        h.appendChild(stringToHTML(html));
      });
    };
    component.map(c => runDebug(c));
  };
  // window.fontTest = () => {
  //     document.documentElement.classList.add('lgei-test');
  // };
  // if (document.cookie) {
  //     const cookieName = 'fontTest';
  //     const array = document.cookie.split(`${encodeURIComponent(cookieName)}=`);
  //     if (array.length >= 2) {
  //         const arraySub = array[1].split(';');
  //         if (decodeURIComponent(arraySub[0]) === 'Y') {
  //             document.documentElement.classList.add('lgei-test');
  //             setTimeout(function () {
  //                 console.log(
  //                     '%c---------------------------------------------------------',
  //                     'color: red;font-size:30px'
  //                 );
  //                 console.log('%cYou are currently testing for font changes.', 'color: red;font-size:30px');
  //                 console.log(
  //                     '%cIf you do not want to test, please delete cookies from your browser.',
  //                     'color: red;font-size:30px'
  //                 );
  //                 console.log(
  //                     '%c---------------------------------------------------------',
  //                     'color: red;font-size:30px'
  //                 );
  //             }, 3000);
  //         }
  //     }
  // }
};

// A function that finds and returns the first and last elements
// among the elements that meet the 'targetSelector' condition
// existing under the 'layerClass' element based on the 'link' element.
export const pickupFocusable = (link, layerClass, targetSelector) => {
  const layer = link.closest(layerClass);
  if (layer) {
    const focusableVisibleEls = inViewport(layer, targetSelector);
    const firstFocusable = focusableVisibleEls[0];
    const lastFocusable = focusableVisibleEls[focusableVisibleEls.length - 1];
    if (link === firstFocusable) {
      return { code: 'first', el: lastFocusable };
    }
    if (link === lastFocusable) {
      return { code: 'last', el: firstFocusable };
    }
    return undefined;
  }
};

export const activateLoopFocus = function ({ nodeList, layerClass, targetSelector }) {
  nodeList.forEach(el => {
    let result;
    el.addEventListener('focus', () => {
      result = pickupFocusable(el, layerClass, targetSelector);
    });
    el.addEventListener('keydown', function (event) {
      const { key, keyCode, shiftKey } = event;
      // escape : incorrect key
      if (key !== 'Tab' || keyCode !== keyboard.tab) return;
      // escape : cannot to collect focusable element
      if (!result) return;

      const resultEl = result.el;
      const blurOnLast = !shiftKey && result.code === 'last';
      const blurOnFirst = shiftKey && result.code === 'first';
      if (blurOnLast || blurOnFirst) {
        event.preventDefault();
        result = {};
        return resultEl.focus();
      }
    });
  });
};

export function endDateOver(endDate, callback, watch) {
  const theDay = new Date(endDate);
  const now = new Date();
  const timeover = theDay.getTime() < now.getTime();
  if (!timeover) return;

  // first of all, use carousel case check, non-carousel is next.
  const target =
    watch.closest('.c-carousel__item') || //
    watch.closest('.swiper-slide') || //
    watch.closest('.c-hero-banner');
  callback(target);
}

export function startDateUnder(startDate, callback, watch) {
  const theDay = new Date(startDate);
  const now = new Date();
  const notToReach = theDay.getTime() > now.getTime();
  if (!notToReach) return false;
  // first of all, use carousel case check, non-carousel is next.
  const target =
    watch.closest('.c-carousel__item') || //
    watch.closest('.swiper-slide') || //
    watch.closest('.c-hero-banner');
  callback(target);
}

function showBannerDate(startDate, endDate, watch, untilText = null) {
  const language = document.documentElement.lang || 'en-GB';
  const bannerDateElem = watch.querySelector('.cmp-text');
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  try {
    if (startDate && endDate) {
      const startLocaleDate = new Date(startDate);
      const endLocaleDate = new Date(endDate);
      if (untilText) {
        bannerDateElem.innerHTML = `${untilText} ${new Intl.DateTimeFormat(language, options).format(endLocaleDate)}`;
      } else {
        bannerDateElem.innerHTML = `${new Intl.DateTimeFormat(language, options).format(
          startLocaleDate
        )} - ${new Intl.DateTimeFormat(language, options).format(endLocaleDate)}`;
      }
    }
  } catch (err) {
    console.log(err, 'Date Format Method Error');
  }
}

export function promotionDateChecker(element) {
  const carouselComponentId = 'ST0048';
  // remove slide or entire component by expire or not reach to promotion date.
  const expireCleaner = target => {
    const rootElement = target.closest(`.${carouselComponentId}`) || target.closest(`.c-wrapper`);
    // remove target slide
    target.remove();
    // if element is gnb menu then not remove whole component
    const gnbMenu = element.closest('.CM0001');
    if (!gnbMenu && rootElement) {
      // if slide no more, no more display the component.
      const noSlide = 1 > rootElement.querySelectorAll('.c-hero-banner').length;
      if (noSlide) rootElement.remove();
    }
  };

  const promotionWatches = element.querySelectorAll('.js-date-range');
  // check "end date"...
  promotionWatches.forEach(watch => endDateOver(watch.dataset.endDate, expireCleaner, watch));

  // collect the rest of them.
  const restWatches = element.querySelectorAll('.js-date-range');
  // check "start date"...
  restWatches.forEach(watch => startDateUnder(watch.dataset.startDate, expireCleaner, watch));

  // Show banner Date in locale time.
  promotionWatches.forEach(watch => {
    const { startDate, endDate, untilText, campaignStartDate, campaignEndDate } = watch.dataset;
    showBannerDate(campaignStartDate || startDate, campaignEndDate || endDate, watch, untilText);
  });
}

/**
 * get component configuration using data attribute which contains API, url or i18n texts
 * @param {String} data
 * @returns Object
 */

export const convertDataToJson = data => {
  let toJson = null;
  if (data) {
    try {
      toJson = JSON.parse(data);
    } catch (e) {
      toJson = null;
      console.error(e);
    }
  }
  return toJson;
};

/**
 * get component configuration which contains API, url or i18n texts
 * @param {HTMLObject} elem
 * @returns Object
 */
export const getComponentConfigFromElem = elem => {
  const configContent = elem?.textContent;
  return convertDataToJson(configContent);
};

export const pageScroll = {
  element: document.documentElement,
  able() {
    const { element: page } = this;
    page.removeAttribute('style');
  },
  disable() {
    const { element: page } = this;
    const style = `overflow:hidden`;
    page.setAttribute('style', style);
  },
};

/**
 * Date Formatter for different locales
 * @param {String} inputDate
 * @param {String} locale
 * @param {Boolean} noReplace
 * @returns String (formatted date)
 */
export const dateFormatter = (inputDate, locale, noReplace) => {
  if (!inputDate) return '';
  const localDate = new Date(inputDate).toLocaleDateString(locale || 'en-GB');
  if (noReplace) {
    return localDate;
  }
  return localDate.replaceAll('/', '.');
};

/**
 * To validate mobile viewport
 * @returns Boolean
 */

export const isMobile = () => {
  if (window.matchMedia(`(max-width: ${bp.mobile + 1}px)`).matches) {
    return true;
  }
};

/**
 * genarate unique ids to avaoid duplicate ids in one page
 * @param {String} prefix
 * @returns String (unique id)
 */
export const getUniqueID = prefix => {
  const timeStap = Date.now();
  const random = Math.random().toString().slice(2);
  const id = `${prefix || ''}_${timeStap}_${random}`;
  return id;
};

/**
 * Get element render style
 * @param {HTMLObject} element
 * @param {String} exportStyleName
 * @returns String
 */

export function getElementRenderStyle(element, exportStyleName) {
  if (beforeLaunch(element)) {
    return new Error('First Parameter must be exist element node. Check if the element is rendered.');
  }
  return window.getComputedStyle(element, null).getPropertyValue(exportStyleName);
}

/**
 * Function to get currency symbol before the price
 * @param {Array} priceArray
 * @returns Currency Symbol befor the price
 */
const getCurrencySymbolBeforePrice = priceArray => {
  if (priceArray.length) {
    let finalAmount = '';
    const currencySymbol = priceArray.find(p => p.type === 'currency').value;
    priceArray.forEach(p => {
      if (p.type !== 'currency') {
        finalAmount += p.value;
      }
    });
    return `${currencySymbol}${finalAmount}`;
  }
  return '';
};

/**
 *
 * @param {number} price - price in number
 * @param {string} currency - Currency abbr like INR/GBP/USD
 * @param {Boolean} formatToParts - to indicate whether the formatted price or formatted parts should be returned
 * @returns - formatted price with currency symbol. eg: 1000.00 => $1,000.00 or 1999.99 => £1,999.99
 */
export const formatPriceWithSymbol = (price, currency, formatToParts = false) => {
  // to avoid NaN error. if no price then return empty
  if (['undefined', 'null'].includes(typeof price)) {
    return '';
  }
  // to handle error, when no currency is passed then return the price as-is.
  if (!currency) {
    return price;
  }

  /*
   * below code returns text without fomatting
   * input price-"Free"
   * output "Free"
   */
  if (Number.isNaN(Number(price))) {
    return price;
  }

  let { lang } = document.documentElement;

  const {
    dataset: { localeCode },
  } = document.documentElement;

  const currencyUpper = currency.toUpperCase();

  const options = {
    currency,
    style: 'currency',
    useGrouping: true,
    currencyDisplay: 'narrowSymbol',
  };

  if (productConfig.removeTrailingZeros) {
    // "stripIfInteger": remove the fraction digits if they are all zero
    options.trailingZeroDisplay = 'stripIfInteger';
  }

  if (productConfig.showAmountInEnglish && lang.includes('-')) {
    lang = `${lang.split('-')[0]}-US`;
  }

  if (currencyUpper === 'HKD') {
    options.currencyDisplay = 'symbol';
  }

  if (formatToParts) {
    return new Intl.NumberFormat(lang, options).formatToParts(price);
  }

  if (countryConst.italy.toUpperCase() === localeCode.toUpperCase()) {
    const priceArray = new Intl.NumberFormat(lang, options).formatToParts(price);
    return getCurrencySymbolBeforePrice(priceArray);
  }

  if (currencyUpper === 'INR') {
    options.useGrouping = false;
  }

  let returnPriceWithSymbol = new Intl.NumberFormat(lang, options).format(price);
  // GOR-2589 - if `Turkey` currency then removing the `₺` and appending with `TL`.
  // For eg: ₺845.199,00 ==> 845.199,00 TL
  // AEM config may give currency in lowercase that's why changing it to upper case.
  if (currencyUpper === 'TRY') {
    returnPriceWithSymbol = `${returnPriceWithSymbol.replace('₺', '')} TL`;
  }
  return returnPriceWithSymbol;
};

/**
 * It reads and returns the stylesheets added from AEM clientlibs
 * @param {string} clientlibsStylesheetsSelector - to provide custom stylesheets selector
 * @returns - a string contains all clientlibs stylesheets in the form of link tags.
 */
export const getClientlibsStylesheets = (clientlibsStylesheetsSelector = '') => {
  let clientlibsStylesheets = '';
  let defaultClientlibsSelector = 'link[href*="etc.clientlibs"][rel="stylesheet"]';
  /** Only for Local development. On prod, this code will be removed automatically. */
  if (process.env.NODE_ENV !== 'production') {
    defaultClientlibsSelector = 'link[href*="clientlib-"][rel="stylesheet"]';
  }
  const stylesheetsSelector = clientlibsStylesheetsSelector || defaultClientlibsSelector;
  const clientlibsElements = document.querySelectorAll(stylesheetsSelector);
  clientlibsElements.forEach(
    // eslint-disable-next-line no-return-assign
    elem => (clientlibsStylesheets += `<link rel="stylesheet" href="${elem.href}" type="text/css" />`)
  );
  return clientlibsStylesheets;
};

/**
 * This function will inject dynamic data based on option object into the string.
 * if text is "You have {couponsLength} coupons"
 * and options is {couponsLength: 10}
 * response will be "You have 10 coupons"
 * @param {String} text
 * @param {Object} options
 * @returns {String} processedText
 */
export const injectDataInText = (text, options) => {
  let processedText = text;
  try {
    Object.keys(options).forEach(key => {
      processedText = processedText?.replaceAll(`{${key}}`, options[key] || '');
    });
  } catch (e) {
    console.error(e);
  }

  return processedText;
};

/**
 * This function will inject dynamic data based on HTML markup into the string.
 * if text is ""You have <b>{couponsCount} coupons</b> Apply at checkout."
 * it will inject markup into this given html reference.
 * @param {Object} ref
 * @param {String} text
 * @param {String} tag
 * @param {String} attribute
 * @param {String} attributeVal
 */
export const injectDataInHTML = (ref, text, tag, attribute, attributeVal) => {
  const parser = new DOMParser();
  const paramref = ref;
  if (paramref.current) {
    try {
      const doc = parser.parseFromString(text, 'text/html');
      const elements = doc.getElementsByTagName(tag);
      [...elements].forEach(element => {
        element.setAttribute(attribute, attributeVal);
      });
      paramref.current.innerHTML = doc.documentElement.innerHTML;
    } catch (e) {
      console.error(e);
    }
  }
};

/**
 * This function will return HTML markup
 * @param {string} selector
 * @returns {HTMLCollection}
 */
export const retrieveMarkup = selector => {
  const element = document.querySelector(selector);
  if (element) {
    try {
      return element.innerHTML;
    } catch (e) {
      console.error(e);
    }
  }
};

/**
 * A helper function to toggle the active class of password fields
 * to show or hide the password value.
 * @param {MouseEvent} event - a default event object provided by browser
 * @returns undefined
 */
const togglePasswordFieldState = event => {
  const targetItem = event.target.closest('.c-input-item');
  const input = targetItem;
  const changeInput = targetItem.querySelector('input');
  const targetText = input.querySelector('.my-form__eye span');
  const isActive = input.classList.contains('active');
  if (isActive) {
    input.classList.remove('active');
    changeInput.type = 'password';
    targetText.innerText = changeInput.dataset.showPassword || '';
  } else {
    input.classList.add('active');
    changeInput.type = 'text';
    targetText.innerText = changeInput.dataset.hidePassword || '';
  }
};

/**
 * This function will be called through component scripts and
 * internally it uses the togglePasswordFieldState function
 * @param {string} selector - to provide a selector for pick elements on page.
 * @returns undefined
 */
export const togglePasswordField = selector => {
  const eye = document.querySelectorAll(selector);
  eye.forEach(el => {
    el.addEventListener('click', togglePasswordFieldState);
  });
};

// JWT decoder. Source: https://github.com/auth0/jwt-decode/blob/master/build/jwt-decode.js
function base64UrlDecode(str) {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      // throw new Error('Illegal base64url string!');
      window.console.error('Illegal base64url string!');
  }

  try {
    const b64DecodeUnicode = window.decodeURIComponent(
      window.atob(output).replace(/(.)/g, (m, p) => {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
          code = `0${code}`;
        }
        return `%${code}`;
      })
    );
    return b64DecodeUnicode;
  } catch (err) {
    return window.atob(output);
  }
}

/**
 * Decode JWT Token
 * @param {string} token
 * @param {object} options
 * @returns Object
 */
export const jwtDecode = (token, options = {}) => {
  if (typeof token !== 'string') {
    window.console.error('Invalid token specified');
    return null;
  }

  const pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64UrlDecode(token.split('.')[pos]));
  } catch (e) {
    window.console.error(`Invalid token specified: ${e.message}`);
    return null;
  }
};

/**
 * Add recent data to cookie and they are separated by delimiter
 * @param {string} cookie - cookie name
 * @param {string} keyword - could be search keywork, sku for compare
 * @param {number} limit - Default 5. Limit added to cookie
 * @param {string} delimiter - Default "|". Data separator like "data1|data2|data3"
 * @returns boolean
 */
export const addKeyWordToCookie = (cookie, keyword, limit = 5, delimiter = '|') => {
  // if no search query parameter then do nothing
  if (!keyword) {
    return false;
  }

  // Add search keyword to cookie
  const getDataFromCookie = getCookie(cookie);
  let list = getDataFromCookie ? getDataFromCookie.split(delimiter) : [];
  if (list.length) {
    // if keyword already exist then do nothing
    if (list.includes(keyword)) {
      list = list.filter(val => {
        return val !== keyword;
      });
    }
    // if cookie data limit is reached then remove the last item
    if (list.length >= limit) {
      list.pop();
    }
    // then add new keyword to cookie at first
    list.unshift(keyword);
  } else {
    // if new cookie
    list.push(keyword);
  }
  // update cookie when there is search results count.
  setCookie(cookie, list.join('|'));
  return true;
};

/**
 * Remove data from the cookie
 * @param {string} cookie - cookie name
 * @param {string} data - keyword to be removed from cookie
 * @param {string} delimiter - Default "|". Data separator like "data1|data2|data3"
 * @returns Updated array
 */
export const removeKeyWordFromCookie = (cookie, data, delimiter = '|') => {
  const cookieData = getCookie(cookie);
  const arr = cookieData ? cookieData.split(delimiter) : [];
  // updating the cookie when items are removed
  const updatedData = arr.filter(v => v !== data);
  setCookie(cookie, updatedData.join(delimiter));
  return updatedData;
};

/**
 * This function will convert string to html and return HTML text content
 * @param {string} string '8K@60p, 10bit&lt;br&gt;4K@120p, 10bit'
 * @returns {string} textContent '8K@60p, 10bit<br>4K@120p, 10bit'
 */
export const getHtmlTextContentFromString = str => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.textContent;
};

/**
 * Helper to get query param
 * @param {string} queryParam
 * @returns query param as string
 */
export const getQueryParam = queryParam => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlParamItem = urlParams.get(queryParam);
  return urlParamItem;
};

/**
 * function to format number to short notation. eg: 1000.00 => 1K or 1999.99 => 2K
 * @param {number | string} number - number
 * @returns {string}
 */
export const convertToCompact = number => {
  // to avoid NaN error. if no number then return empty
  if (['undefined', 'null'].includes(typeof number)) {
    return '';
  }
  return new Intl.NumberFormat(document.documentElement.lang, { notation: 'compact' }).format(number);
};

/**
 *
 * @returns - if access_token expired or not
 */
export const isTokenExpired = () => {
  const accessToken = getCookie(cookieConst.accessToken);
  if (!accessToken) {
    return true;
  }
  const decodedToken = jwtDecode(accessToken);
  // check if, token is not expired
  if (decodedToken && Date.now() <= decodedToken.exp * 1000) {
    return false;
  }
  return true;
};

/**
 * @returns - returns the token expiry time
 */
export const getAccessTokenExp = accessToken => {
  const decodedToken = jwtDecode(accessToken);
  return decodedToken?.exp ? new Date(decodedToken.exp * 1000) : null;
};

/**
 * focus the first focussable element
 */
export const focusElement = (element, selector = '') => {
  if (beforeLaunch(element)) return false;
  // selects not disabled link from list and focuses it
  const targetElement = element.querySelector(`${selector} a:not(disabled)`);
  if (targetElement) {
    targetElement.focus();
  }
};

/**
 * convert s to ms
 * @param {Number} expiryInSec
 * @returns expiry in mili seconds or null
 */
export const getExpiryMs = expiryInSec => {
  return expiryInSec ? expiryInSec * 1000 : null;
};

/**
 * Detect mobile device
 * @param {string} agent
 * @returns Boolean
 */
export function detectMobileDevice(agent) {
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return mobileRegex.some(mobile => agent.match(mobile));
}

// WAI scale 200% 400%
export const zoomWCA = () => {
  function handleZoomCheck() {
    const zoomRatio = window.devicePixelRatio;
    const device = document.body.classList.contains('device-pc');
    if (device) {
      if (zoomRatio >= 2 && zoomRatio < 3) {
        document.body.classList.add('wa-zoom');
        document.body.classList.remove('wa-fixed-off');
      } else if (zoomRatio >= 3) {
        document.body.classList.add('wa-zoom');
        document.body.classList.add('wa-fixed-off');
      } else {
        document.body.classList.remove('wa-zoom');
        document.body.classList.remove('wa-fixed-off');
      }
    } else {
      document.body.classList.remove('wa-zoom');
      document.body.classList.remove('wa-fixed-off');
    }
  }
  window.addEventListener('DOMContentLoaded', handleZoomCheck);
  window.addEventListener('resize', handleZoomCheck);
};

export const deviceCheck = () => {
  function device() {
    const { userAgent } = navigator;
    if (
      userAgent.match(
        /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
      ) != null ||
      userAgent.match(/LG|SAMSUNG|Samsung/) != null
    ) {
      document.body.classList.remove('device-pc');
      document.body.classList.add('device-mo');
    } else {
      document.body.classList.remove('device-mo');
      document.body.classList.add('device-pc');
    }
  }
  window.addEventListener('DOMContentLoaded', device);
  window.addEventListener('resize', device);
};

export const autoSpacingMobileNumber = function () {
  const countryCodeField = document.querySelector('.country-code');
  if (countryCodeField) {
    document.getElementById('mobileNumber').addEventListener('keyup', function (event) {
      const { key } = event;
      if (key === 'Backspace' || key === 'Delete') {
        return;
      }

      const txt = this.value;
      if (txt.length === 3 || txt.length === 7 || txt.length === 10 || txt.length === 14) {
        this.value += ' ';
      }
    });
  }
};

// Sort Array Object with key
export const sortAlphabetically = (list, key) =>
  // eslint-disable-next-line no-nested-ternary
  list?.sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0)) || [];

export const observerIMG = () => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0 && entry.target.loading !== 'auto') {
        entry.target.setAttribute('loading', '');
      }
    });
  });
  const imagesToObserve = document.querySelectorAll('img');
  imagesToObserve.forEach(el => {
    io.observe(el);
  });
};

export const convertTZ = (date, timeZone) => {
  const dateToBeconverted = typeof date === 'string' ? new Date(date) : date;
  if (timeZone) {
    return new Date(dateToBeconverted.toLocaleString('en-US', { timeZone }));
  }
  // convert current time to GMT if timeZone not present
  const localTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(dateToBeconverted.setTime(dateToBeconverted.getTime() + localTimezoneOffset));
};
