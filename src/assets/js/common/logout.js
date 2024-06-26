import { cookieConst } from './constant.js';
import { removeCookie } from './cookie.js';
// import { cookieConst } from '../react-library/helper/constants';

const logoutUser = redirectUrl => {
  removeCookie(cookieConst.authToken); // obs token
  removeCookie(cookieConst.accessToken); // ACCESS_TOKEN
  removeCookie(cookieConst.refreshToken); // REFRESH_TOHEN
  removeCookie(cookieConst.coveoSearchToken); // coveo
  removeCookie(cookieConst.cookieName); // cartid
  removeCookie(cookieConst.customerGroupName); // for coveo usage when authen
  // to redirect when the url is given
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};

export default logoutUser;
