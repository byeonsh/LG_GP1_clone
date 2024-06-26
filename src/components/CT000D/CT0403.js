const showFeedback = () => {
  const btnFeedback = document.querySelectorAll(
    '.CT0403 .buy-feed-back__list .buy-feed-back__item .buy-feed-back__input'
  );
  const bannerFeedback = document.querySelector('.CT0403 .c-checkout-thank--feedback');
  btnFeedback.forEach(el => {
    el.addEventListener('click', () => {
      bannerFeedback.classList.remove('c-checkout-thank--feedback--hidden');
    });
  });
};

showFeedback();
