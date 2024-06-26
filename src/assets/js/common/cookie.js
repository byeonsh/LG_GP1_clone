// cookie list

import { cookieConst } from './constant.js';

// - Make cookieName start with LGGP1_.
const cookieList = [...Object.values(cookieConst)];
const globalPath = cookieList;
const needDomain = [];
const needPath = cookieList;
const expiresAfterDay = [];
const expiresAfterMonth = []; // ['LGGP1_PackageDeal'];
const expiresAfterYear = [];
const maxLength = {
  // Maximum number of model ids to be stored in each cookie
  LGGP1_RecentlyView: 10,
};

// set for all the paths
const multiCountry = [
  cookieConst.customerGroupName,
  cookieConst.authToken,
  cookieConst.accessToken,
  cookieConst.refreshToken,
  cookieConst.cardId,
];

/**
 * This sets the cookie
 * @param {String} cookieName name of the cookie
 * @param {String} cookieValue value of the cookie
 * @param {Number} expireDays number of days
 * @param {Number} expiresMilliSec  is an optional param in miliseconds
 * @param {Object} options  additional options
 */
const setCookie = (cookieName, cookieValue, expireDays, expiresMilliSec, options = {}) => {
  const cookieTexts = [];
  // cookieExpire, cookiePath, cookieDomain are managed here according to cookieName.
  let cookieText = `${cookieName}=${encodeURIComponent(cookieValue)}`;

  // for domain
  const locationHost = window.location.host;
  let cookieDomain = '.lg.com';
  if (locationHost.indexOf('lge.com') >= 0) {
    cookieDomain = '.lge.com';
  } else if (locationHost.indexOf('localhost') >= 0) {
    cookieDomain = 'localhost';
  }
  if (needDomain.indexOf(cookieName) !== -1) {
    cookieText += cookieDomain ? `; DOMAIN=${cookieDomain}` : '';
  }

  // for expires
  let days = 0;
  if (!expireDays) {
    if (expiresAfterDay.indexOf(cookieName) !== -1) {
      days = 1;
    } else if (expiresAfterMonth.indexOf(cookieName) !== -1) {
      days = 30;
    } else if (expiresAfterYear.indexOf(cookieName) !== -1) {
      days = 365;
    }
  } else {
    days = expireDays;
  }
  if (days !== 0) {
    const cookieExpire = new Date();
    cookieExpire.setTime(cookieExpire.getTime() + days * 24 * 60 * 60 * 1000);
    cookieText += cookieExpire ? `; EXPIRES=${cookieExpire.toGMTString()}` : '';
  } else if (expiresMilliSec) {
    const cookieExpire = new Date();
    cookieExpire.setTime(cookieExpire.getTime() + expiresMilliSec);
    cookieText += cookieExpire ? `; EXPIRES=${cookieExpire.toGMTString()}` : '';
  } else if (options?.expiryTime) {
    cookieText += `; EXPIRES=${options.expiryTime?.toGMTString()}`;
  }

  // for path  - For cookies that are used separately for each site, path is used.
  let cookiePath = document.documentElement.dataset?.cookiePath || '/';
  const isLocal = locationHost.indexOf('localhost') >= 0;
  const COUNTRY_CODE = document.documentElement.dataset.countrycode; // e.g) ch_de
  cookieText += ';secure';
  if (window.location.port === '9004') {
    // localhost gulp
    cookiePath = '/components';
  } else if (globalPath.indexOf(cookieName) !== -1) {
    cookiePath = `${cookiePath.toLowerCase()}`;
  } else {
    const getAemPath =
      locationHost.indexOf('adobeaemcloud.com') >= 0 ? `/content/lge/${COUNTRY_CODE.toLowerCase()}` : '';
    if (getAemPath) {
      cookiePath = getAemPath;
    } else if (isLocal) {
      cookiePath = '/';
    } else if (COUNTRY_CODE) {
      // dev, stg, www
      cookiePath = `/${COUNTRY_CODE.toLowerCase()}`;
    }
  }
  if (needPath.indexOf(cookieName) !== -1) {
    const splitPaths = cookiePath.split(',');
    // set cookie path for all languges only for multiCountry cookies
    const paths = multiCountry.includes(cookieName) ? splitPaths : [splitPaths[0]];
    paths.forEach(path => {
      const cookie = cookieText + (cookiePath ? `; PATH=${path}` : '');
      cookieTexts.push(cookie);
    });
  }
  // set cookie here to avaoid not setting cookie which dont need path
  cookieTexts.forEach(text => {
    document.cookie = text;
  });
};
const getCookie = cookieName => {
  let cookieValue = null;
  if (document.cookie) {
    const array = document.cookie.split(`${encodeURIComponent(cookieName)}=`);
    if (array.length >= 2) {
      const arraySub = array[1].split(';');
      cookieValue = decodeURIComponent(arraySub[0]);
    }
  }
  return cookieValue;
};
const removeCookie = cookieName => {
  const temp = getCookie(cookieName);
  if (temp) {
    setCookie(cookieName, temp, -1);
  }
};

const addCookie = (cookieName, cookieValue) => {
  // addCookie is a function that adds a value by adding a delimiter to an existing cookie value.
  let items = getCookie(cookieName);
  let maxItemNum = 0;
  if (cookieName in maxLength) {
    maxItemNum = maxLength(cookieName);
  }
  if (items) {
    let itemArray = items.split('|');
    if (itemArray.indexOf(encodeURIComponent(cookieValue)) !== -1) {
      // If the value already exists,
      // the existing value is deleted and a new one is added to change the order.
      itemArray = itemArray.filter(function (data) {
        return data !== encodeURIComponent(cookieValue);
      });
    }
    // max length
    itemArray.unshift(decodeURIComponent(cookieValue));
    if (maxItemNum !== 0 && itemArray.length > maxItemNum) itemArray.length = maxItemNum;
    items = itemArray.join('|');
    setCookie(cookieName, items);
  } else {
    // new cookie
    setCookie(cookieName, cookieValue);
  }
};

export { setCookie, getCookie, removeCookie, addCookie };
