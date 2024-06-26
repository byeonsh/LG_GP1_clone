// import module
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import runBVStaticPLP from '../../assets/js/common/bv.js';
import runSPStaticPLP from '../../assets/js/common/sp.js';
import share from '../../assets/js/common/share.js';
import { review } from '../../assets/js/common/constant.js';

// Wa SelectTab Check
const selectTab = () => {
  const Tab = document.querySelectorAll('.cmp-tabs__tab');
  Tab?.forEach(c => {
    c.addEventListener('click', () => {
      const currentPrents = c.closest('.cmp-tabs__tablist');
      if (c.getAttribute('role') === 'tab' && currentPrents.getAttribute('role') === 'tablist') {
        Tab.forEach(el => {
          el.setAttribute('aria-selected', 'false');
          el.classList.remove('active');
        });
        c.classList.add('active');
        c.setAttribute('aria-selected', 'true');
      }
    });
  });
};

// component
function init() {
  const component = document.querySelectorAll('.PD0002');
  if (beforeLaunch(component)) return false;

  const configElem = document.querySelector('[data-component-config="snsShare"]');
  const config = getComponentConfigFromElem(configElem);

  component.forEach(el => {
    const tabpanels = el.querySelectorAll('.cmp-tabs__tabpanel');
    if (tabpanels.length > 0) {
      tabpanels.forEach(tab => {
        if (review.type === 'BV1') runBVStaticPLP(tab);
        else if (review.type === 'SP') runSPStaticPLP(tab);
      });
    } else if (review.type === 'BV1') runBVStaticPLP(el);
    else if (review.type === 'SP') runSPStaticPLP(el);
    // share
    const productItems = el.querySelectorAll('.c-product-item');
    productItems.forEach(product => {
      if (!config) return false;
      share(product, config);
    });
  });
  selectTab();
}
init();
// export default
