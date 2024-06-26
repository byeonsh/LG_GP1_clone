// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch } from '../../assets/js/common/utils.js';

// Helpful toggle Method
const toggleHelpful = el => {
  const btnElement = el.querySelectorAll('.c-icon-button--helpful');
  const toggleMethod = elements => elements.target.closest('.c-icon-button').classList.toggle('is-active');
  if (btnElement) {
    btnElement.forEach(elements => elements.addEventListener('click', e => toggleMethod(e)));
  }
};

// Ellipsis toggle Method
const toggleTextView = el => {
  const elements = {
    mostItem: '.c-review__item--most',
    underlineBtn: '.c-button--text-underline',
    userContent: '.c-review__user-content',
    bodycopyText: '.c-text-contents__bodycopy .cmp-text',
  };
  const parent = el.querySelectorAll(elements.mostItem);
  let expanded = false;
  if (beforeLaunch(parent)) return false;

  const clickMethod = (clickElement, parentElement) => {
    expanded = !expanded;
    clickElement.target.closest(elements.underlineBtn).setAttribute('aria-expanded', expanded);
    clickElement.target.closest(elements.userContent).classList.toggle('is-active');
    parentElement.querySelector(`${elements.userContent} ${elements.bodycopyText}`).classList.toggle('is-ellipsis');
  };

  const setMethod = parentElement => {
    const maxHeight =
      parentElement.querySelector(`${elements.userContent} ${elements.bodycopyText}`).offsetHeight > 109;

    if (maxHeight) {
      parentElement.querySelector(elements.underlineBtn).classList.remove('is-hide');
      parentElement.querySelector(`${elements.userContent} ${elements.bodycopyText}`).classList.add('is-ellipsis');
    }
  };

  document.querySelectorAll('.c-review__edit').forEach(i => {
    i.addEventListener('click', e => {
      if (e.target.closest('.c-comment__list').classList.contains('is-del-show')) {
        e.target.closest('.c-comment__list').classList.remove('is-del-show');
      } else {
        e.target.closest('.c-comment__list').classList.add('is-del-show');
      }
    });
  });

  parent.forEach(i => {
    setMethod(i);
    i.querySelector(elements.underlineBtn).addEventListener('click', e => clickMethod(e, i));
  });
};

// Comment Write Method
const commentWrite = el => {
  const openEelment = el.querySelectorAll('.c-review__comment-button .c-button');
  const closeElement = el.querySelectorAll('.js-close');
  openEelment.forEach(i => {
    i.addEventListener('click', e => {
      e.target.closest('.c-button').classList.add('is-hide');
      e.target.closest('.c-review__item').querySelector('.c-review__write-form').classList.remove('is-hide');
    });
  });
  closeElement.forEach(i => {
    i.addEventListener('click', e => {
      e.target.closest('.c-review__write-form').classList.add('is-hide');
      e.target
        .closest('.c-review__item')
        .querySelector('.c-review__comment-button .c-button')
        .classList.remove('is-hide');
      console.log(e.target.closest('.c-review__item').querySelector('.c-review__comment-button .c-button'));
    });
  });
};

// component
function init() {
  const component = document.querySelectorAll('.PD0045');
  if (beforeLaunch(component)) return false;

  component.forEach(el => toggleHelpful(el));
  component.forEach(el => accordion.run(el));
  component.forEach(el => toggleTextView(el));
  component.forEach(el => commentWrite(el));
}
init();
// export default
