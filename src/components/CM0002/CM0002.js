// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

const toggleBtn = event => {
  const btn = event.target;
  const control = btn.getAttribute('aria-controls');
  const target = document.getElementById(control);
  const expanded = !target.classList.toggle('folded');
  btn.setAttribute('aria-expanded', expanded);
};

const moreBtn = event => {
  const btn = event.target;
  btn.parentElement.querySelector('.c-footer__text--more').classList.remove('folded');
  btn.remove();
};

const moreFocus = event => {
  const btn = event.target;
  btn.closest('.c-footer__text--more').classList.remove('c-footer__text--more');
};

const needFold = () => {
  const textMoreBtn = document.querySelectorAll('.CM0002 .c-footer__text button.more');
  textMoreBtn.forEach(btn => {
    const textArea = btn.parentElement.querySelector('.c-footer__text--more');
    if (textArea.classList.contains('folded')) textArea.classList.remove('folded');
    const h = textArea.offsetHeight;
    // line height x 2
    if (h >= 40) {
      textArea.classList.add('folded');
    }
  });
};

// component
function init() {
  const component = document.querySelectorAll('.CM0002');
  if (beforeLaunch(component)) return false;

  // Clicking the toggle button in the footer navigation area of the mobile view expands or collapses the area.
  const mobileToggleBtn = component[0].querySelectorAll('.c-footer__navigation .c-footer__name button');
  mobileToggleBtn.forEach(btn => {
    btn.addEventListener('click', toggleBtn);
  });

  // When the more button is clicked, the collapsed content area is shown.
  const textMoreBtn = component[0].querySelectorAll('.c-footer__text button.more');
  textMoreBtn.forEach(btn => {
    btn.addEventListener('click', moreBtn);
  });

  // Forces expansion when focus is on an anchor within a collapsed content area
  const textFocus = component[0].querySelectorAll('.c-footer__text--more a');
  textFocus.forEach(text => {
    text.addEventListener('focus', moreFocus);
  });

  // When the browser is resized, the more button is displayed or hidden.
  const delay = 300;
  let timer = null;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(needFold, delay);
  });
  needFold();
}
init();
