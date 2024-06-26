// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import runBVStaticPLP from '../../assets/js/common/bv.js';
import runSPStaticPLP from '../../assets/js/common/sp.js';
import accordion from '../../assets/js/common/accordion.js';
import share from '../../assets/js/common/share.js';
import { review } from '../../assets/js/common/constant.js';

// component
function init() {
  const component = document.querySelectorAll('.CS0091');
  if (beforeLaunch(component)) return false;

  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);

  component.forEach(el => {
    // bv
    if (review.type === 'BV1') runBVStaticPLP(el);
    else if (review.type === 'SP') runSPStaticPLP(el);

    // filter accordion
    accordion.run(el);

    // share
    const productItems = el.querySelectorAll('.c-product-item');
    productItems.forEach(product => {
      if (!config) return false;
      share(product, config);
    });
  });
}
init();
