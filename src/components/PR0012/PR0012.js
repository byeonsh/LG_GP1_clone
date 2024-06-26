// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import { popMsg } from '../../assets/js/common/popMsg.js';

const selectItems =
  () =>
  ({ currentTarget }) => {
    if (
      currentTarget.getAttribute('data-link-name') === 'add_to_package' ||
      currentTarget.getAttribute('data-link-name') === 'remove_from_package'
    ) {
      popMsg('#popSshopMove');
    }
  };

// component
function init() {
  const component = document.querySelectorAll('.PR0012');
  const btns = document.querySelectorAll('.c-button');
  if (beforeLaunch(component)) return false;

  btns.forEach(c => {
    c.addEventListener('click', selectItems());
  });
}
init();
// export default
