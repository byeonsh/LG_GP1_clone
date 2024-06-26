import { convertDataToJson, injectDataInText } from '../../assets/js/common/utils.js';

/**
 *
 * @param {Array} noticationItem
 * @returns notification carousel item
 */
const notificationItemMarkup = noticationItem => {
  const color = noticationItem.notificationType === 'Y' ? 'red' : 'black';
  const itemTemplate = document.querySelector('#notification-item-template')?.innerHTML ?? '';
  const { notificationMessage = '', buttonLinkUrl = '', buttonLinkTarget = '', buttonName = '' } = noticationItem;
  let updatedTemplate = injectDataInText(itemTemplate, {
    color,
    notificationMessage,
    buttonLinkTarget,
    buttonName,
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(updatedTemplate, 'text/html');
  const anchorTag = doc.querySelector('.c-notification-banner__link');
  if (!buttonLinkUrl) {
    // delete hyperlink if link not available
    anchorTag?.remove();
  } else if (anchorTag) {
    // set href for anchor,
    anchorTag.href = buttonLinkUrl;
  }
  updatedTemplate = doc.body.innerHTML;
  return updatedTemplate;
};

/**
 *
 * @param {Array} notificationList
 * @returns Notification banner markup
 */
const notificationBannerMarkup = notificationList => {
  const bannerTemplate = document.querySelector('#notification-banner-template')?.innerHTML ?? '';
  const itemTemplates = notificationList.map(noticationItem => notificationItemMarkup(noticationItem)).join('');
  return bannerTemplate.replace('{carouselHtml}', itemTemplates) ?? '';
};

/**
 * function to get adobe target offers for notification bar
 * @returns {Promise<Object>} JSON data
 */
const getATOffers = () => {
  return new Promise((resolve, reject) => {
    try {
      window.adobe.target.getOffer({
        mbox: 'ET_NotificationBar',
        success(offer) {
          // get JSON object from AT
          resolve(offer[0]?.content[0]?.notificationBarList ?? []);
        },
        error(status, error) {
          reject(new Error(error));
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * a function to try get AT notifications once and then after .5 secs
 * @param {Object} config
 * @returns notification list
 */
const tryGetOffers = async config => {
  try {
    const result = await getATOffers();
    return result;
  } catch {
    // if error, wait .5 secs and getOffers again
    return new Promise(resolve => {
      setTimeout(() => {
        getATOffers()
          .then(result => resolve(result))
          .catch(() => resolve([]));
      }, config?.timer);
    });
  }
};

/**
 * fetches adobe target notifications and insert to existing notification or insert new notification banner
 */
export const checkAndInsertATNotification = async () => {
  const notificationBanner = document.querySelector('.c-notification-banner');
  const configElem = document.querySelector('.notificationBanner__config');
  const config = configElem ? convertDataToJson(configElem.dataset?.notificationConfig) : {};
  if (config?.enableATNotification) {
    // fetch adobe target offers
    const notificationList = await tryGetOffers(config);
    if (!notificationList?.length) {
      return false;
    }
    if (notificationBanner) {
      // if there is existing banner from backend, insert into it
      const notificationItems = notificationList
        .map(notification => notificationItemMarkup(notification, config))
        .join('');
      const allUrgentNotifications = notificationBanner.querySelectorAll('.cmp-carousel__item[data-bg-color="red"]');
      if (allUrgentNotifications?.length) {
        // insert AT notification after existing urgent notification
        const lastUrgentItem = allUrgentNotifications[allUrgentNotifications.length - 1];
        lastUrgentItem.insertAdjacentHTML('afterend', notificationItems);
      } else {
        // insert AT notification at first
        const firstItem = notificationBanner.querySelector('.cmp-carousel__item');
        firstItem.insertAdjacentHTML('beforebegin', notificationItems);
      }
    } else {
      // no existing notification banner markup from backend, insert AT notification banner above header
      const header = document.querySelector('.CM0001 #header');
      const notificationBannerAT = notificationBannerMarkup(notificationList, config);
      header?.insertAdjacentHTML('beforebegin', notificationBannerAT);
    }
  }
};

export default {};
