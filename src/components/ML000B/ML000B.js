// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import runBVStaticPLP from '../../assets/js/common/bv.js';
import share from '../../assets/js/common/share.js';
import { review } from '../../assets/js/common/constant.js';

// component
function init() {
  const component = document.querySelectorAll('.ML000B');
  if (beforeLaunch(component)) return false;

  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);

  component.forEach(el => {
    const tabpanels = el.querySelectorAll('.cmp-tabs__tabpanel');
    if (tabpanels.length > 0) {
      tabpanels.forEach(tab => {
        if (review.type === 'BV1') runBVStaticPLP(tab);
      });
    } else if (review.type === 'BV1') runBVStaticPLP(el);
    // share
    const productItems = el.querySelectorAll('.c-product-item');
    productItems.forEach(product => {
      if (!config) return false;
      share(product, config);
    });
  });
}
init();
// export default
