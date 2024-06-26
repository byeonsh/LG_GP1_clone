// import module
import { beforeLaunch } from '../../assets/js/common/utils.js';

// component
function init() {
  const component = document.querySelectorAll('.ML000V');
  if (beforeLaunch(component)) return false;

  // coupon 'view detail' button toggle
  component.forEach(coupon => {
    const couponBtn = coupon.querySelectorAll('.my-coupons__aside .cmp-button:not(.initialized)');
    const couponParent = '.my-coupons__item';
    const toggleTarget = '.my-coupons .c-text-contents__bottom';
    couponBtn.forEach(el => {
      el.addEventListener('click', () => {
        el.classList.add('initialized');
        const target = el.closest(couponParent).querySelector(toggleTarget);
        if (target.classList.contains('open')) {
          el.classList.remove('active');
          target.classList.remove('open');
          target.classList.add('close');
          target.setAttribute('aria-expanded', 'false');
        } else {
          el.classList.add('active');
          target.classList.remove('close');
          target.classList.add('open');
          target.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  // coupon copy clipboard
  component.forEach(coupon => {
    const CopyBtn = coupon.querySelectorAll('.c-text-contents__code .cmp-button');
    const couponParent = '.c-text-contents__code';
    const codeEl = '.my-coupons__code';
    CopyBtn.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.closest(couponParent).querySelector(codeEl);
        const code = target.innerText;
        window.navigator.clipboard.writeText(code);
      });
    });
  });
}
init();
// export default

const selectChangeText = () => {
  const sel = document.querySelectorAll('.my-com__sort-box select');
  const textEl = '.my-com__sort-box-text';
  sel.forEach(el => {
    // initial
    const targetText = el.closest('li').querySelector(textEl);
    targetText.classList.add('active');
    targetText.innerText = el.options[0].text;

    // change event
    el.addEventListener('change', () => {
      const selectValue = el.options[el.selectedIndex].text;
      targetText.innerText = selectValue;
    });
  });
};
selectChangeText();
