import { popMsg } from './popMsg.js';

export const writeReview = (btn, reviewType, pid, options) => {
  if (!pid || !reviewType) return false;
  if (reviewType === 'BV') {
    if (!options.campaign) {
      // eslint-disable-next-line no-undef
      $BV.ui('rr', 'submit_review', { productId: pid });
    } else {
      // eslint-disable-next-line no-undef
      $BV.ui('rr', 'submit_review', { productId: pid, campaignId: options.campaign });
    }
  } else if (reviewType === 'LGCOM') {
    popMsg('popPostReview', btn);
  }
};

export default {};
