// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

const selectChangeText = component => {
  const sel = component.querySelectorAll('.my-com__sort-box select');
  const textEl = '.my-com__sort-box-text';
  sel.forEach(el => {
    // initial
    const targetText = el.closest('li').querySelector(textEl);
    targetText.classList.add('active');
    targetText.innerText = el.options[0].text;

    // change event
    el.addEventListener('change', () => {
      const selectValue = el.options[el.selectedIndex].text;
      targetText.innerText = selectValue;
    });
  });
};

// component
function init() {
  const component = document.querySelectorAll('.ML000U');
  if (beforeLaunch(component)) return false;
  selectChangeText(component);
}
// uncomment below for publishing repo and comment for AEM repo
init();
// uncomment below for AEM repo and comment for publishing repo
// export default init;
