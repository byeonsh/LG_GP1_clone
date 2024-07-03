/* eslint-disable no-restricted-syntax */
// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';
import FullCalendar from '../CT000C/index-global.js';

function init() {
  const component = document.querySelectorAll('.CT0019 .buy-find-address');
  const componentWrap = document.querySelectorAll('.CT0019');
  const findAdressRadios = document.querySelectorAll('.buy-find-address .c-radio-item [type="radio"]');
  if (beforeLaunch(component)) return false;
  componentWrap.forEach(el => accordion.run(el));
  component.forEach(() => {
    for (const input of findAdressRadios) {
      input.addEventListener('change', () => {
        const saveBtn = input.closest('.buy-find-address__form').nextElementSibling.querySelector('.c-button');
        saveBtn.classList.remove('disabled');
        saveBtn.removeAttribute('disabled');
      });
    }
  });

  const componentCalendar = document.querySelectorAll('.Buy-calendar');
  if (beforeLaunch(componentCalendar)) return false;
  const popupBtn = document.querySelectorAll('.js-pop-open');
  const calendarBtn = [];
  popupBtn.forEach(el => {
    if (el.getAttribute('href') === '#BNPPPaymentPopup01') {
      calendarBtn.push(el);
    }
  });
  calendarBtn.forEach(element => {
    element.addEventListener('click', function () {
      const calendarEl = document.querySelector('.Buy-calendar__box');

      const dateActive = targetEl => {
        if (
          targetEl.closest('.fc-day').classList.contains('fc-day-future') &&
          !targetEl.closest('.fc-day').classList.contains('selected')
        ) {
          const prevEl = document.querySelectorAll('.fc-day-future.selected');
          if (prevEl) {
            prevEl.forEach(el => el.classList.remove('selected'));
          }
          targetEl.closest('.fc-day').classList.add('selected');
        }
      };

      const calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
          left: '',
          center: 'prev,title,next',
          right: '',
        },
        dayCellDidMount(options) {
          if (!options.el.classList.contains('fc-day-other') && options.el.classList.contains('fc-day-future')) {
            options.el.querySelector('a').setAttribute('tabindex', '0');
          }
        },
      });
      calendar.render();

      const date = calendarEl.querySelectorAll('.fc-daygrid-day-number');
      date.forEach(targetEl => {
        targetEl.addEventListener('click', e => {
          e.preventDefault();
          dateActive(targetEl);
        });
        targetEl.addEventListener('keyup', e => {
          if (e.keyCode === 13 || e.which === 13) {
            dateActive(targetEl);
          }
        });
      });
    });
  });

  const autoHyphen = target => {
    // eslint-disable-next-line no-param-reassign
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,5})(\d{0,3})$/g, '$1-$2')
      // eslint-disable-next-line no-useless-escape
      .replace(/(\-{1,2})$/g, '')
      .replace(/\b\d{8,}\b/g, '');
  };
  const CEP = document.querySelectorAll('.js-CEP-keyup');
  CEP.forEach(el => {
    if (beforeLaunch(el)) return false;
    el.addEventListener('keyup', () => {
      autoHyphen(el);
    });
  });

  const autoHyphenTinNum = targetItem => {
    // eslint-disable-next-line no-param-reassign
    targetItem.value = targetItem.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,5})$/, '$1-$2-$3-$4')
      // eslint-disable-next-line no-useless-escape
      .replace(/(\-{1,2})$/g, '')
      .replace(/\b\d{14,}\b/g, '');
  };
  const TINNumber = document.querySelectorAll('.js-TINNumber-keyup');
  TINNumber.forEach(el => {
    if (beforeLaunch(el)) return false;
    el.addEventListener('keyup', () => {
      autoHyphenTinNum(el);
    });
  });
}

init();
