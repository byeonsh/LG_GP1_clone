import { beforeLaunch } from './utils.js';

function myComponent() {
  const component = document.querySelector('.my-component--sub-menu');
  if (beforeLaunch(component)) return false;

  // const eventBtn = component.querySelector('.c-button button');
  const headline = component.querySelector('.c-text-contents__headline');
  const currentdim = document.querySelector('.my-component--sub-menu-dim');
  const arrEvent = [headline, currentdim];
  const layerSubMenu = evevt => {
    evevt.forEach(e => {
      e.addEventListener('click', () => {
        const isCheck = e.closest('.my-component--sub-menu').classList.contains('active');
        if (isCheck) {
          e.closest('.my-component--sub-menu').classList.remove('active');
        } else {
          e.closest('.my-component--sub-menu').classList.add('active');
        }
      });
    });
  };
  layerSubMenu(arrEvent);
}
export default myComponent;
