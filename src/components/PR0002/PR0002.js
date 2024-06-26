// import module
import { bp } from '../../assets/js/common/constant.js';
import { beforeLaunch, getElementRenderStyle } from '../../assets/js/common/utils.js';

let memoListWidth = null;
const layoutType = {
  // type1: 'type1',
  type2: 'type2',
  type3: 'type3',
};
const selector = {
  root: '.c-explore-list',
  item: '.c-explore-list__item',
  itemContainer: '.c-explore-list__item-container',
  image: '.c-explore-list__image',
};

const masonry = {
  reposition({ target, padding, trackingData = null }) {
    target.removeAttribute('style');

    const { top } = target.getBoundingClientRect();
    const trackingLine =
      trackingData ||
      [...target.parentElement.children]
        .filter(item => item !== target)
        .map(item => item.getBoundingClientRect().bottom)
        .sort((a, b) => a - b)[0];
    const distance = trackingLine - top + padding;

    target.setAttribute('style', `margin-top:${Math.round(distance)}px`);
  },
  type2(root) {
    const item6Nth = root.querySelector('.repeat-order6');
    const paddingItemNth6 = window.innerWidth > bp.mobile ? 100 : 30;
    const group3Nth = root.children[3];
    const paddingGroup4Nth = window.innerWidth > bp.mobile ? 80 : 30;

    // item6 * nth
    this.reposition({ target: item6Nth, padding: paddingItemNth6 });

    // group3 * nth
    if (window.innerWidth > bp.mobile) {
      this.reposition({ target: group3Nth, padding: paddingGroup4Nth });
    } else if (window.innerWidth <= bp.mobile) {
      if (group3Nth.getAttribute('style')) {
        group3Nth.removeAttribute('style');
      }
    }
  },
  type3(root) {
    const rowGap = Number(getElementRenderStyle(root, 'row-gap').replace('px', ''));
    const autoRows = Number(getElementRenderStyle(root, 'grid-auto-rows').replace('px', ''));
    root
      .querySelectorAll(selector.item)
      .forEach(item =>
        item.setAttribute(
          'style',
          `grid-row-end:span ${Math.ceil(
            item.querySelector(selector.itemContainer).offsetHeight / (autoRows + rowGap)
          )}`
        )
      );
  },
};

// eslint-disable-next-line no-unused-vars
const resizeWatcher = type => (entries, observer) =>
  entries.forEach(entry => {
    masonry[type](entry.target);

    const { width } = entry.contentRect;
    if (layoutType.type2 === type && width !== memoListWidth) {
      memoListWidth = width;
    }
  });

const imageOnLoad = type => event => {
  const img = event.composedPath()[0];
  masonry[type](img.closest(selector.root));
};

// component
function init() {
  const component = document.querySelectorAll('.PR0002');
  if (beforeLaunch(component)) return false;
  component.forEach(c => {
    // check component type.
    const [currentType = null] = Object.keys(layoutType).filter(key => [...c.classList].includes(key));

    // escape :
    // when component missing "type{n}" class or
    // no matched one of them in "layoutType" object.
    if (!currentType) return;

    // collect DOM.
    const watchTarget = c.querySelectorAll(selector.root);
    // initialize to type3
    if (layoutType.type3 === currentType) {
      watchTarget.forEach(t => t.classList.remove('preset'));
    }
    // registry observer n activate layout function.
    const resizeObserver = new ResizeObserver(resizeWatcher(currentType));
    watchTarget.forEach(t => resizeObserver.observe(t));

    // adjust item size by lazyload on type3.
    if (layoutType.type3 === currentType) {
      const [list] = watchTarget;
      const images = list.querySelectorAll(`${selector.image} img`);
      images.forEach(img => img.addEventListener('load', imageOnLoad(currentType), false));
    }
  });
}
init();
// export default
