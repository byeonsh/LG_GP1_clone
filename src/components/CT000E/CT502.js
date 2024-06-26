const expandEvent = (target, btn) => {
  const getAriaExpand = btn.getAttribute('aria-expanded');
  if (getAriaExpand === 'true') {
    btn.setAttribute('aria-expanded', 'false');
    target.classList.remove('expanded');
  } else {
    btn.setAttribute('aria-expanded', 'true');
    target.classList.add('expanded');
  }
};
// RO SG,ES
const moreText = btn => {
  const targetId = btn.getAttribute('aria-controls');
  const target = document.querySelector(`#${targetId}`);
  if (target.length < 1400) {
    btn.classList.add('hidden');
  } else {
    btn.classList.remove('hidden');
  }
  btn.addEventListener('click', () => {
    expandEvent(target, btn);
  });
};

function init() {
  // RO SG.ES
  const component = document.querySelector('.MB000A');
  const moreBtn = component.querySelectorAll('.js-more-text-trigger');
  moreBtn.forEach(btn => {
    moreText(btn);
  });
}
init();
