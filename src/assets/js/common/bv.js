import { review } from './constant.js';
// BV v1 only
// The runBVStaticPLP function runs normally only when different products exist.
// Therefore, each component or tab panel should be executed individually,
// and should be executed after Ajax.
const runBVStaticPLP = function (component) {
  let bvContainerCount = document.documentElement.dataset.bvContainerCount || 0;
  if (bvContainerCount > 0) bvContainerCount = parseInt(bvContainerCount, 10);

  // console.log('runBVStaticPLP');
  if (!component) return false;

  const runEach = function (obj) {
    const ratingAll = obj.querySelectorAll('.rating[data-modelid]');
    const ratingTarget = [...ratingAll].filter(rating => !rating.classList.contains('loaded'));

    // console.group("BV");
    if (ratingTarget.length > 0) {
      const sctxt = {};
      ratingTarget.forEach(t => {
        const pid = t.dataset.modelid;
        const url = t.querySelector('a').getAttribute('href');
        sctxt[pid] = { url };
        t.classList.add('loaded');
        t.removeAttribute('itemprop');
        t.removeAttribute('itemscope');
        t.removeAttribute('itemtype');
        t.setAttribute('id', `BVRRInlineRating-${bvContainerCount}-${pid}`);
      });
      // console.log('object : ', sctxt);

      // 3rd party js
      // eslint-disable-next-line no-undef
      if (typeof $BV.ui === 'function') {
        // console.log('run', `count:${bvContainerCount}`, `length:${ratingTarget.length}`);
        // eslint-disable-next-line no-undef
        $BV.ui('rr', 'inline_ratings', {
          productIds: { ...sctxt },
          containerPrefix: `BVRRInlineRating-${bvContainerCount}`,
        });
        bvContainerCount += 1;
        document.documentElement.dataset.bvContainerCount = bvContainerCount;
      }
    }
  };

  const run = function () {
    // console.log('run bv...');
    if (component.length) {
      component.forEach(el => {
        runEach(el);
      });
    } else {
      runEach(component);
    }
  };

  const check = function (condition, count) {
    if (0 === count && condition) return run();
    setTimeout(() => {
      if (condition) return run();
      // eslint-disable-next-line no-param-reassign
      check(condition, (count += 1));
    }, 300);
  };

  if (review.type === 'BV1') {
    const condition = typeof $BV === 'object';
    const start = 0;
    check(condition, start);
  }
};

export default runBVStaticPLP;
