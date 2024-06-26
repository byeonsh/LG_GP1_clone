// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

const printQnABV1 = el => {
  const model = el.dataset.modelid;
  // eslint-disable-next-line no-undef
  $BV.configure('global', {
    productId: model, // Use relevant ExternalId from product feed
  });
  // eslint-disable-next-line no-undef
  $BV.ui('qa', 'show_questions', {});
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      printQnABV1(entry.target);
      observer.disconnect();
    }
  });
}, {});

// init
function init() {
  const component = document.querySelectorAll('.PD0010');
  if (beforeLaunch(component)) return false;

  // for BV v1
  const qnaArea = document.getElementById('BVQAContainer');
  if (qnaArea) {
    observer.observe(qnaArea);
  }
}
init();
// export default
