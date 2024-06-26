// specified breakpoint
// if use matchMedia with min-width, you must be to value + 1
export const bp = {
  mobile: 768,
  tabletMiddle: 1024,
  tablet: 1279,
  gridFull: 1440,
};

export const mobileHeight = 667;

export const carouselPerView = {
  small: 1.06, // PD0053
  medium: 1.35, // PD0046
};

// Time to recheck if the page is scrolled after button click
export const recheckScrolling = 500;

// use these value when swiper's breakpoint key or calculating element.
export const margin = {
  'inset padding': 24,
};

// keycode convert to string;easier name
export const keyboard = {
  tab: 9,
  enter: 13,
  shift: 16,
  esc: 27,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  home: 36,
  end: 35,
  pgdn: 34,
  pgup: 33,
  spacebar: 32,
};

export const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

export const review = {
  // BV1
  // BV2
  // LGCOM
  // SP
  // CENEO
  // NONE
  type: document.documentElement.dataset.reviewType,
};

export const columns = function (count, viewport = 'web') {
  const column = 'web' === viewport ? 98 : 70;
  const gutter = 'web' === viewport ? 24 : 10;

  return count * column + (count - 1) * gutter;
};

export const carouselDuration = 500 * 10; // = 5 seconds

export const userConstant = {
  guestCheckoutSetEmail: 'GUEST_CHECKOUT_SET_GUEST_EMAIL_ID',
  guestCheckoutSetEmailFailed: 'GUEST_CHECKOUT_SET_GUEST_EMAIL_ID_FAILED',
};

// Cookie List
export const cookieConst = {
  coveoSearchToken: 'coveo-search-token',
  customerGroupName: 'CUSTOMER_GROUP_NAME',
  authToken: 'AUTH_TOKEN',
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN',
  recentlyViewCookie: 'LGGP1_RecentlyView',
  cardId: 'LGGP1_CartID',
  rememberAcc: `LGGP1_RememberAccount_${document.documentElement?.dataset?.localeCode || ''}`,
  compare: 'LGGP1_CompareCart',
  compareB2B: 'LGGP1_B2B_CompareCart',
  recentSearch: 'LGGP1_SearchResult',
  selectShop: 'LGGP1_SelectShop',
  // packageDeal: 'LGGP1_PackageDeal',
};

export default {};
