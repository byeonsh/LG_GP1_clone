// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
// component
function init() {
  const component = document.querySelectorAll('.ML000L');
  if (beforeLaunch(component)) return false;
  component.forEach(() => {
    const selectChangeText = () => {
      const sel = document.querySelectorAll('.my-com__sort-box select');
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
    selectChangeText();
  });
}
init();
// export default
