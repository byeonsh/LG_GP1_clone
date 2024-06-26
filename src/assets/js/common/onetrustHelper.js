/**
 * checks one trust enabled in page level
 * @returns {bool}
 */
export const isOneTrustEnabled = () => {
  return document.documentElement.dataset.onetrustenabled === 'true';
};

/**
 * checks functional cookie group is enabled
 * @returns {bool}
 */
export const checkFunctionalCookieEnabled = () => {
  if (!isOneTrustEnabled() || !window.OptanonActiveGroups) return true;
  return window.OptanonActiveGroups.includes('C0003');
};

/**
 * checks analytics cookie group is enabled
 * @returns {bool}
 */
export const checkAnalyticsCookieEnabled = () => {
  if (!isOneTrustEnabled() || !window.OptanonActiveGroups) return true;
  return window.OptanonActiveGroups.includes('C0002');
};

/**
 * opens onetrust cookie popup
 */
export const showOneTrustCookiePopup = () => {
  if (!window.Optanon) return false;
  window.Optanon.ToggleInfoDisplay();
};
