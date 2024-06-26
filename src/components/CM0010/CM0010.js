// import module
import { beforeLaunch, isTokenExpired } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelector('.CM0010');
  if (beforeLaunch(component)) return false;
  document.addEventListener('SESSION_HANDLER_LOADED', () => {
    // if token not expired remove
    if (!isTokenExpired()) {
      component.remove();
    }
  });
}
init();
// export default
