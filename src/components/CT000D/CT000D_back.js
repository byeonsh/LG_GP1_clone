const klarnaRemove = () => {
  const klarnaRemoveBtn = document.querySelector('.buy-klarna-banner__closebtn');
  klarnaRemoveBtn.addEventListener('click', el => {
    el.target.closest('.my-component').remove();
  });
};
const showFeedback = () => {
  const btnFeedback = document.querySelectorAll('.buy-feed-back__list .buy-feed-back__item .buy-feed-back__input');
  const bannerFeedback = document.querySelector('.c-checkout-thank--feedback');
  btnFeedback.forEach(el => {
    el.addEventListener('click', () => {
      bannerFeedback.classList.remove('c-checkout-thank--feedback--hidden');
    });
  });
};
klarnaRemove();
showFeedback();
