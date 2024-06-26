/* eslint-disable no-underscore-dangle */
// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { review } from '../../assets/js/common/constant.js';

const printReviewBV1 = el => {
  const model = el.dataset.modelid;
  // eslint-disable-next-line no-undef
  $BV.configure('global', {
    productId: model, // Use relevant ExternalId from product feed
  });
  // eslint-disable-next-line no-undef
  $BV.ui('rr', 'show_reviews', {});
};

const printReviewSP = el => {
  const model = el.dataset?.modelName?.toLowerCase();
  // console.log(window._shoppilot);
  window._shoppilot.push(['_setProductId', model]);
  window._shoppilot.push(['_addProductWidget', 'product-reviews', '#shoppilot-product-reviews-container']);
  window._shoppilot.push(['_addProductWidget', 'inline-rating', '#shoppilot-inline-rating-container']);
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      if (review.type === 'BV1') printReviewBV1(entry.target);
      observer.disconnect();
    }
  });
}, {});

// init
function init() {
  const component = document.querySelectorAll('.PD0004');
  const PD0003 = document.querySelector('.PD0003');
  if (beforeLaunch(component)) return false;

  // for RU
  if (review.type === 'SP') window._shoppilot.push(['_addStyles', 'widgets']);

  if (review.type === 'BV1') {
    // for BV v1
    const reviewArea = document.getElementById('BVRRContainer');
    if (reviewArea) {
      if (PD0003) printReviewBV1(reviewArea);
      else observer.observe(reviewArea);
    }
  } else if (review.type === 'SP') {
    // for RU
    const reviewArea2 = document.getElementById('shoppilot-product-reviews-container');
    if (reviewArea2) {
      // In case of SP type, do not use observe
      // observer.observe(reviewArea2);
      printReviewSP(reviewArea2);
    }
  }
}
init();
