// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import runBVStaticPLP from '../../assets/js/common/bv.js';
import runSPStaticPLP from '../../assets/js/common/sp.js';
import { review } from '../../assets/js/common/constant.js';

// init
function init() {
  const component = document.querySelectorAll('.PD0007');
  if (beforeLaunch(component)) return false;

  component.forEach(el => {
    const tabpanels = el.querySelectorAll('.cmp-tabs__tabpanel');
    if (tabpanels.length > 0) {
      tabpanels.forEach(tab => {
        if (review.type === 'BV1') runBVStaticPLP(tab);
        else if (review.type === 'SP') runSPStaticPLP(tab);
      });
    } else if (review.type === 'BV1') runBVStaticPLP(el);
    else if (review.type === 'SP') runSPStaticPLP(el);
  });
}
init();
// export default
