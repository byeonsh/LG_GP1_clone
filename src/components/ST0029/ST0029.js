import { beforeLaunch } from '../../assets/js/common/utils.js';

function runEventBanner(_this) {
  const { startDate, endDate } = _this.dataset;

  const isEmptyResponseDate = startDate == null || startDate === '' || endDate == null || endDate === '';
  if (isEmptyResponseDate) return new Error('No date data');

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const nowDate = new Date().getTime();
  const isEventDuration = nowDate >= start && nowDate <= end;

  // If it is not during the event period, the element will be deleted.
  if (!isEventDuration) _this.remove();
}
// init
function init() {
  const component = document.querySelectorAll('.ST0029');
  if (beforeLaunch(component)) return false;

  component.forEach(el => {
    runEventBanner(el);
  });
}

init();
