// import module
import { getCookie } from '../../assets/js/common/cookie.js';
import { beforeLaunch, jwtDecode } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelector('.CM0012');
  if (beforeLaunch(component)) return false;

  const accessToken = getCookie('ACCESS_TOKEN');
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    if (Date.now() <= decodedToken.exp * 1000) {
      component.remove();
      return false;
    }
  }
}

init();
// export default
