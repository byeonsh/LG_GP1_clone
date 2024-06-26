import { beforeLaunch, convertTZ } from './utils.js';

// countDown
const formatter = x => (x < 10 && x >= 0 ? `0${x}` : x);

export function countDownTimer(_this, timeZone, countDownCallback) {
  const countDate = _this.dataset.countdownDate;
  const isEmptyResponseDate = countDate == null || countDate === '';
  if (isEmptyResponseDate) return new Error('No date data');
  if (_this.querySelectorAll('.c-countdown__amount').length < 4) return new Error('Not fill all amount element');
  const [daysBox, hoursBox, minutesBox, secondsBox] = _this.querySelectorAll('.c-countdown__amount');

  let days;
  let hours;
  let minutes;
  let seconds;

  function updateTime() {
    const nowDate = convertTZ(new Date(), timeZone);
    const countDownDate = new Date(countDate);
    const distance = countDownDate.getTime() - nowDate.getTime();

    if (distance < 0) {
      if (typeof countDownCallback === 'function') {
        countDownCallback();
      }
      return;
    }

    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    window.requestAnimationFrame(updateTime);

    daysBox.innerHTML = formatter(days);
    hoursBox.innerHTML = formatter(hours);
    minutesBox.innerHTML = formatter(minutes);
    secondsBox.innerHTML = formatter(seconds);
  }
  window.requestAnimationFrame(updateTime);
}

function countDown() {
  const countdownBox = document.querySelectorAll('.c-countdown');
  if (beforeLaunch(countdownBox)) return false;
  countdownBox.forEach(item => {
    if (item.closest('.ST0001')) {
      // count down is in ST0001 component - send timezone
      countDownTimer(item, Intl.DateTimeFormat().resolvedOptions().timeZone);
    } else {
      countDownTimer(item);
    }
  });
}

export default countDown;
