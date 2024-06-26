import FullCalendar from '../vendors/fullCalendar.js';
import { beforeLaunch } from './utils.js';

const isDateDisabled = (date, validDates) => {
  const index = validDates.indexOf(date);
  return index === -1;
};

const handleDateClick = (info, onDateClick) => {
  if (info.dayEl.classList.contains('fc-day-other')) {
    return;
  }
  if (info.dayEl.classList.contains('fc-day-future') && !info.dayEl.classList.contains('selected')) {
    const prevEl = document.querySelectorAll('.fc-day-future.selected');
    if (prevEl) {
      prevEl.forEach(el => el.classList.remove('selected'));
    }
    info.dayEl.classList.add('selected');
    if (onDateClick) {
      onDateClick(info);
    }
  }
};

/**
 * This method renders the calender on popup
 * @param {Object} validRange  This will contain start and end date
 * @param {Function} onDateClick  this handles date click
 * @returns
 */
export const renderCalendar = options => {
  const calendarEl = document.querySelector('.Buy-calendar__box');
  const { validDates, onDateClick, selectedDate } = options || {};
  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: document.documentElement?.lang || 'en-GB',
    headerToolbar: {
      left: '',
      center: 'prev,title,next',
      right: '',
    },
    // eslint-disable-next-line no-shadow
    dayCellDidMount(options) {
      if (!validDates) {
        return;
      }
      const table = options.el.closest('table');
      if (selectedDate) {
        const dayEl = table.querySelector(`[data-date='${selectedDate}']`);
        if (dayEl) {
          handleDateClick({ dayEl });
        }
      }
      table.querySelectorAll('.fc-day').forEach(el => {
        const { date } = el.dataset;
        if (isDateDisabled(date, validDates)) {
          el.classList.add('fc-day-other');
        } else {
          el.classList.remove('fc-day-other');
        }
      });
    },
    dateClick(info) {
      handleDateClick(info, onDateClick);
    },
  });

  calendar.render();
  return calendar;
};

function calendarPop() {
  // calendar
  const callButtons = document.querySelectorAll('.js-calendar-pop');
  if (beforeLaunch(callButtons)) return false;

  let autoFlag = true;
  const handler = ({ currentTarget }) => {
    const { renderType } = currentTarget.dataset;
    if (autoFlag) renderCalendar();
    if ('onetime' === renderType) autoFlag = false;
  };

  callButtons.forEach(button => button.addEventListener('click', handler, false));
}

export default calendarPop;
