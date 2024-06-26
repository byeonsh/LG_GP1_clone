const tabScroll = elements => {
  const tabScrollCont = elements;
  if (tabScrollCont.length === 0) return false;
  const tabScrollEvent = el => {
    const target = el.querySelector('.js-tab-scroll__target');
    const btnLeft = el.querySelector('.js-tab-scroll__left');
    const btnRight = el.querySelector('.js-tab-scroll__right');
    const dir = document.documentElement.getAttribute('dir') === 'ltr' ? 1 : -1;
    let val;
    let maxValue;
    const { distance = null } = el.dataset;
    const oneClickDistance = distance || 200;
    const resizeHandler = () => {
      const scrollW = target.scrollWidth;
      const targetW = target.clientWidth;
      const maxVal = scrollW - targetW;
      val = target.scrollLeft;
      maxValue = maxVal * dir + 1;
      if (maxVal === 0) {
        // when there is no scroll
        btnLeft.setAttribute('disabled', 'true');
        btnRight.setAttribute('disabled', 'true');
      } else if (val === 0) {
        // before scroll
        btnLeft.setAttribute('disabled', 'true');
        btnRight.removeAttribute('disabled');
      } else {
        // maximum scroll
        btnLeft.removeAttribute('disabled');
        btnRight.removeAttribute('disabled');
      }
      return [val, maxValue];
    };
    resizeHandler();
    const setBtn = () => {
      val = target.scrollLeft;
      // Add or condition for chrome rtl
      if (val === 0 || val === 1) {
        btnLeft.setAttribute('disabled', 'true');
      } else if (val === maxValue || val === maxValue - 1) {
        btnRight.setAttribute('disabled', 'true');
      } else {
        btnLeft.removeAttribute('disabled');
        btnRight.removeAttribute('disabled');
      }
    };
    const move = direction => {
      val = target.scrollLeft;
      if (direction === 'left') {
        target.scroll({ left: val - oneClickDistance * dir, behavior: 'smooth' });
      } else {
        target.scroll({ left: val + oneClickDistance * dir, behavior: 'smooth' });
      }
      setBtn();
    };
    btnLeft.addEventListener('click', () => move('left'), false);
    btnRight.addEventListener('click', () => move('right'), false);
    target.addEventListener('scroll', () => setBtn(), false);
    window.addEventListener('resize', resizeHandler, false);
  };
  tabScrollCont.forEach(el => tabScrollEvent(el));
};
export default tabScroll;
