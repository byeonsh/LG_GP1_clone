// import module
import accordion from '../../assets/js/common/accordion.js';
import { beforeLaunch, togglePasswordField } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelectorAll('.my-infoBox__accordion');
  if (beforeLaunch(component)) return false;

  component.forEach(el => accordion.run(el));
}
init();
togglePasswordField('.ML000O .my-form__eye');
togglePasswordField('.ML000O_2 .my-form__eye');
// export default

const allowedKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Escape'];

(function () {
  // input 요소 가져오기
  const inputElements = document.querySelectorAll('.input-format');
  const setCaretPosition = (element, position) => {
    element.focus();
    element.setSelectionRange(position, position);
  };
  const formatTelNumber = (digitsOnly, format) => {
    let formattedValue = '';
    let digitIndex = 0;

    for (let i = 0; i < format.length; i++) {
      if (format[i] === '_' && digitIndex < digitsOnly.length) {
        formattedValue += digitsOnly[digitIndex++];
      } else {
        formattedValue += format[i];
      }
    }

    return formattedValue;
  };

  const getCaretPosition = element => {
    let caretPos = 0;

    if (element.selectionStart || element.selectionStart === 0) {
      caretPos = element.selectionStart;
    }

    return caretPos;
  };

  // 각 input 요소에 대해 처리
  inputElements.forEach(function (inputElement) {
    const dataFormat = inputElement.getAttribute('data-format');

    // 이벤트 리스너 등록
    inputElement.addEventListener('focus', function () {
      if (inputElement.value === '') {
        this.value = dataFormat;
        setCaretPosition(this, dataFormat.indexOf('_'));
      }
    });

    inputElement.addEventListener('click', function () {
      if (inputElement.value === '') {
        this.value = dataFormat;
        setCaretPosition(inputElement, dataFormat.indexOf('_'));
      } else {
        const caretPos = inputElement.value.indexOf('_');
        setCaretPosition(inputElement, caretPos !== -1 ? caretPos : inputElement.value.length);
      }
    });

    inputElement.addEventListener('input', function (e) {
      const inputValue = inputElement.value;
      const digitsOnly = inputValue.replace(/\D/g, '');
      const formattedValue = formatTelNumber(digitsOnly, dataFormat);
      const caretPos = getCaretPosition(inputElement);

      e.target.value = formattedValue;
      setCaretPosition(inputElement, caretPos);
    });

    inputElement.addEventListener('keydown', function (e) {
      if (allowedKeys.includes(e.key) || Number.isFinite(parseInt(e.key, 10))) {
        let caretPos = getCaretPosition(inputElement);
        const isForwardMovement = e.key !== 'Backspace' && e.key !== 'Delete';

        if (isForwardMovement) {
          while (caretPos < dataFormat.length && dataFormat[caretPos] !== '_') {
            setCaretPosition(inputElement, caretPos + 1);
            caretPos = getCaretPosition(inputElement);
          }
        }
      } else {
        e.preventDefault();
      }
    });
  });
})();

const aBtn = document.getElementById('NaturalPerson');
const bBtn = document.getElementById('LegalEntity');
const input1 = document.getElementById('CPF');
const input2 = document.getElementById('CNPJ');
const input3 = document.getElementById('StateRegistration');

if (aBtn) {
  aBtn.addEventListener('click', function () {
    input3.readOnly = false;
    input2.readOnly = false;
    input1.readOnly = true;
  });
}
if (bBtn) {
  bBtn.addEventListener('click', function () {
    input1.readOnly = false;
    input2.readOnly = true;
    input3.readOnly = true;
  });
}
