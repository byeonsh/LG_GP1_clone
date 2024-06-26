import { review } from './constant.js';
// Shoppilot only
// The runSPStaticPLP function runs normally only when different products exist.
// Therefore, each component or tab panel should be executed individually,
// and should be executed after Ajax.
const runSPStaticPLP = function (component) {
  const ruProductList = [];
  let ruProductListIdx = 0;
  const getProductsNameRU = () => {
    const obj = component.querySelectorAll('.rating[data-shoppilot]');
    obj.forEach(el => {
      const product = el.dataset.shoppilot.replace(/ /g, '-').toLowerCase() || '';
      console.log(product);
      if (ruProductList.join(',').indexOf(product) === -1) {
        ruProductList[ruProductListIdx] = product;
        ruProductListIdx += 1;
      }
    });
    return ruProductList || null;
  };
  const productIds = getProductsNameRU();

  const renderListingInlineRatingsRU = products => {
    const run = () => {
      console.log('run', window.Shoppilot);
      if (products != null) {
        if (typeof window.Shoppilot === 'object') {
          const MultiWidget = window.Shoppilot.require('multi_widget');
          const ProductWidget = window.Shoppilot.require('product_widget');
          const widgets = products.map(function (productId) {
            return new ProductWidget({
              name: 'listing-inline-rating',
              container: `.rating[data-shoppilot=${productId}] a`,
              product_id: productId,
            });
          });
          MultiWidget.render(widgets);
        } else {
          setTimeout(run, 500);
        }
      }
    };
    run();
  };
  if (review.type === 'SP') renderListingInlineRatingsRU(productIds);
};

export default runSPStaticPLP;
