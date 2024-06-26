function videoToggle() {
  // const video = document.querySelectorAll('.c-video-box');
  const videoButton = document.querySelectorAll('.c-video-box__button');
  const videoContent = document.querySelectorAll('.c-video-box__content');

  videoButton.forEach((buttonEl, buttonIndex) => {
    buttonEl.addEventListener('click', () => {
      videoContent.forEach((videoEl, videoIndex) => {
        if (buttonIndex === videoIndex) {
          if (videoEl.paused) {
            videoEl.play();
            buttonEl.classList.add('c-video-box__button--pause');
            setTimeout(() => {
              buttonEl.classList.add('c-video-box__button--hidden');
            }, 1500);
          } else {
            videoEl.pause();
            buttonEl.classList.remove('c-video-box__button--pause');
            buttonEl.classList.remove('c-video-box__button--hidden');
          }
        }
      });
    });
    videoContent.forEach((videoEl2, videoIndex2) => {
      videoEl2.addEventListener('click', () => {
        if (buttonIndex === videoIndex2) {
          videoEl2.addEventListener('play', () => {
            videoEl2.play();
            buttonEl.classList.add('c-video-box__button--pause');
            setTimeout(() => {
              buttonEl.classList.add('c-video-box__button--hidden');
            }, 1500);
          });
          videoEl2.addEventListener('pause', () => {
            videoEl2.pause();
            buttonEl.classList.remove('c-video-box__button--pause');
            buttonEl.classList.remove('c-video-box__button--hidden');
          });
        }
      });
    });
  });
}
videoToggle();
