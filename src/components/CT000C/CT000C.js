// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { cartPriceTotal } from '../../assets/js/common/cartPriceTotal.js';
import { orderSummary } from '../../assets/js/common/orderSummary.js';

function init() {
  const component = document.querySelectorAll('.CT000C');
  if (beforeLaunch(component)) return false;
  // Total Area
  cartPriceTotal('.CT000C');
  orderSummary('.CT000C');
}

init();
