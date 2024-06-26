import { beforeLaunch } from '../../assets/js/common/utils.js';

const toggleTextView = () => {
  const elements = {
    mostItem: '.c-review__item ',
    cmpButton: '.cmp-button',
    userContent: '.review__item-content__bodycopy',
  };

  const parent = document.querySelectorAll(elements.mostItem);
  if (beforeLaunch(parent)) return false;

  parent.forEach(el => {
    el.querySelector(elements.cmpButton).addEventListener('click', e => {
      if (e.target.classList.contains === 'cmp-button') {
        if (e.target.querySelector('.cmp-button__text').innerText === 'View More') {
          e.target.querySelector('.cmp-button__text').innerText = 'Close';
          e.target.closest('.cmp-button').classList.add('up');
        } else {
          e.target.querySelector('.cmp-button__text').innerText = 'View More';
          e.target.closest('.cmp-button').classList.remove('up');
        }
      } else if (e.target.innerText === 'View More') {
        e.target.innerText = 'Close';
        e.target.closest('.cmp-button').classList.add('up');
      } else {
        e.target.innerText = 'View More';
        e.target.closest('.cmp-button').classList.remove('up');
      }

      e.target.closest('.c-review__item').querySelector(elements.userContent).classList.toggle('is-ellipsis');
    });
  });
};

// component
function init() {
  toggleTextView();
}
init();
