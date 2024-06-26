/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
import { beforeLaunch, createParsingElement, lazyload } from './utils.js';

// variable
const typecase = {
  animation: 'static',
  video: 'dynamic',
};
const actioncase = {
  // static
  play: 'background play',
  pause: 'background pause',
  // dynamic
  element: 'element',
  modal: 'modal',
  close: 'close',
  // sound
  mute: 'sound mute',
  unmute: 'sound unmute',
};
const scriptSelector = {
  video: '.js-video',
  play: '.js-video-play',
  pause: '.js-video-pause',
  close: '.js-video-close',
  mute: '.js-video-mute',
  unmute: '.js-video-unmute',
};

// template
export const youtubeTemplate = ({ source }) => {
  let src;
  try {
    const url = new URL(source);
    if (!url.searchParams.has('enablejsapi')) {
      url.searchParams.set('enablejsapi', 1);
    }
    src = url.href;
  } catch {
    src = source;
  }

  return `<iframe class="youtube-embed-player" src="${src}"></iframe>`;
};

export const brightcoveTemplate = ({ videoId, accountId, playerId }) =>
  `<video-js class="brightcove-player" data-video-id="${videoId}" data-account="${accountId}" data-player="${playerId}" data-embed="default" data-application-id autoplay controls></video-js>`;

export const mediaTemplate = {
  modal({ hash, video, buttonText, languageAttribute }) {
    const buttonClass = scriptSelector.close.replace('.', '');
    return `
            <div class="c-media-dialog" id="${hash}">
                <div class="c-media-dialog__dimmed"></div>
                <span class="c-media-dialog__loop-start" tabindex="0" aria-hidden="true"></span>
                <button type="button" class="c-media-dialog__close-button ${buttonClass}" aria-controls="${hash}">
                    <span class="sr-only" ${languageAttribute}>${buttonText}</span>
                </button>
                <div class="c-media-dialog__container">
                    <div class="c-media-dialog__video c-render-video">
                        ${video}
                    </div>
                </div>
                <span class="c-media-dialog__loop-end" tabindex="0" aria-hidden="true"></span>
            </div>
        `.trim();
  },
  element({ hash, video, buttonText, languageAttribute }) {
    const buttonClass = scriptSelector.close.replace('.', '');
    return `
            <div class="c-render-video" id="${hash}">
                ${video}
                <button type="button" class="c-render-video__close-button ${buttonClass} aria-controls="${hash}">
                    <span class="sr-only" ${languageAttribute}>${buttonText}</span>
                </button>
                <svg width="1440" height="810" viewBox="0 0 1440 810" fill="white" style="display: none;" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="white"/>
                </svg>
            </div>
        `.trim();
  },
};

// Call library api
export const api = {
  brightcove(_mediaElementId, { accountId, playerId }, _callback = null) {
    const done = 'shown';
    const element = document.getElementById(_mediaElementId);
    const brightcovePlayer = element.querySelector('.brightcove-player');
    // escape : already has
    const alreadyHas = document.getElementById('brightcove-api');
    if (alreadyHas) {
      // eslint-disable-next-line no-undef
      if (typeof bc === 'function') bc(brightcovePlayer);
      brightcovePlayer.parentElement.classList.add(done);
      return brightcovePlayer.parentElement;
    }
    // call api
    const script = document.createElement('script');
    const ref = `https://players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
    script.setAttribute('id', 'brightcove-api');
    script.setAttribute('src', ref);
    document.body.appendChild(script);
    // load api
    const loader = function (event) {
      // eslint-disable-next-line no-undef
      bc(brightcovePlayer);
      brightcovePlayer.parentElement.classList.add(done);
      if (null != _callback) {
        const dispatchParam = {
          player: brightcovePlayer,
          video: brightcovePlayer.querySelector('video'),
        };
        return _callback(event, dispatchParam);
      }
    };
    script.addEventListener('load', loader, false);
    // return brightcovePlayer.parentElement;
  },
  youtube() {
    // console.log('.......');
  },
};
const afterApi = () => {};

// tagging
// const tagging = {
//   backgroundPlay() {},
//   backgroundPause() {},
//   brightcove() {},
//   youtube() {},
// };

// Proto object
export const Media = function (_root) {
  // = common
  let mount;
  let unmount;
  let param;
  let video;
  const type = _root.dataset.media;
  const button = {
    play: null,
    pause: null,
    close: null,
    mute: null,
    unmute: null,
  };
  const appendTarget = {
    modal: document.body,
    element: _root.querySelector('.c-media__container'),
  };
  // render
  const render = {
    brightcove({ videoId, accountId, playerId }, _appendTarget, _template) {
      const info = {
        hash: `e-id-${new Date().getTime()}`,
        video: brightcoveTemplate({ videoId, accountId, playerId }),
        buttonText: (button.play && button.play.dataset?.srText) || 'close',
      };
      // this code was giving error when it's minified. removed self executing function and Refactored.
      info.languageAttribute =
        'en' !== document.documentElement.getAttribute('lang') && 'close video' === info.buttonText ? 'lang="en"' : '';
      // render element
      const parsingElement = createParsingElement();
      parsingElement.innerHTML = _template(info);
      const insertNode = parsingElement.children[0];
      const beforeAt = button.play;
      if (beforeAt) {
        if (_appendTarget !== beforeAt.parentElement) {
          if (_appendTarget.firstChild) {
            _appendTarget.removeChild(_appendTarget.firstChild);
          }
          _appendTarget.appendChild(insertNode);
          return info.hash;
        }
      }
      // empty
      if (_root.closest('.c-pop-msg') || _root.closest('.c-summary-gallery-expand')) {
        while (_appendTarget.firstChild) {
          _appendTarget.removeChild(_appendTarget.firstChild);
        }
      }
      // append
      _appendTarget.insertBefore(insertNode, beforeAt);
      return info.hash;
    },
    youtube({ src: source }, _appendTarget, _template) {
      const info = {
        hash: `e-id-${new Date().getTime()}`,
        video: youtubeTemplate({ source }),
        buttonText: (button.play && button.play.dataset?.srText) || 'close',
      };
      // this code was giving error when it's minified. removed self executing function and Refactored.
      info.languageAttribute =
        'en' !== document.documentElement.getAttribute('lang') && 'close' === info.buttonText ? 'lang="en"' : '';
      // render element
      const parsingElement = createParsingElement();
      parsingElement.innerHTML = _template(info);
      const insertNode = parsingElement.children[0];
      const beforeAt = button.play;
      if (beforeAt) {
        if (_appendTarget !== beforeAt.parentElement) {
          if (_appendTarget.firstChild) {
            _appendTarget.removeChild(_appendTarget.firstChild);
          }
          _appendTarget.appendChild(insertNode);
          return info.hash;
        }
      }
      // empty
      if (_root.closest('.c-pop-msg') || _root.closest('.c-summary-gallery-expand')) {
        while (_appendTarget.firstChild) {
          _appendTarget.removeChild(_appendTarget.firstChild);
        }
      }
      // append
      _appendTarget.insertBefore(insertNode, beforeAt);
      return info.hash;
    },
  };
  // event listening
  const registry = {
    brightcove(_mediaElementId) {
      const floatingContent = button.play && button.play.closest('.c-floating-contents');
      const toHide = floatingContent ? floatingContent.querySelector('.c-floating-contents__floating') : null;
      if (toHide) toHide.style.zIndex = -1;
      const element = document.getElementById(_mediaElementId);

      // close button
      button.close = element.querySelector(scriptSelector.close);
      if (button.close) {
        const layerCloseBtn = button.close.closest('[data-can-ajax-video="true"]');
        if (layerCloseBtn) button.close = layerCloseBtn;
      }
      const handler = {
        close(event) {
          element.remove();
          event.currentTarget.removeEventListener('click', handler);
          if (button.play) button.play.removeAttribute('disabled');
          if (toHide) toHide.removeAttribute('style');
          if (button.play) button.play.focus();
        },
      };
      button['close'].addEventListener('click', handler.close, false);

      // dimmed
      const dimArea = element.querySelector('.c-media-dialog__dimmed');
      if (dimArea) dimArea.addEventListener('click', handler.close, false);
      window.addEventListener('keyup', function (event) {
        if (event.key === 'Escape' && dimArea) {
          element.remove();
          if (button.play) button.play.removeAttribute('disabled');
          if (toHide) toHide.removeAttribute('style');
          if (button.play) button.play.focus();
        }
      });
      // management focus
    },
    youtube(_mediaElementId) {
      const floatingContent = button.play && button.play.closest('.c-floating-contents');
      const toHide = floatingContent ? floatingContent.querySelector('.c-floating-contents__floating') : null;
      if (toHide) toHide.style.zIndex = -1;
      const element = document.getElementById(_mediaElementId);

      // close button
      button.close = element.querySelector(scriptSelector.close);
      const handler = {
        close(event) {
          element.remove();
          event.currentTarget.removeEventListener('click', handler);
          button.play.removeAttribute('disabled');
          if (toHide) toHide.removeAttribute('style');
          if (button.play) button.play.focus();
        },
      };
      button['close'].addEventListener('click', handler.close, false);

      // dimmed
      const dimArea = element.querySelector('.c-media-dialog__dimmed');
      if (dimArea) dimArea.addEventListener('click', handler.close, false);
      window.addEventListener('keyup', function (event) {
        if (event.key === 'Escape' && dimArea) {
          element.remove();
          if (button.play) button.play.removeAttribute('disabled');
          if (toHide) toHide.removeAttribute('style');
          if (button.play) button.play.focus();
        }
      });
      // management focus
    },
  };

  // control ui by actioncase
  const controller = function (_action, _dataset = {}) {
    let mediaElementId = null;

    const { type: libraryType = '' } = _dataset;

    switch (_action) {
      case actioncase.pause:
        [video] = [..._root.querySelectorAll(scriptSelector.video)].filter(
          v => window.getComputedStyle(v, null).getPropertyValue('display') !== 'none'
        );
        video.pause();
        button.pause.setAttribute('disabled', '');
        button.play.removeAttribute('disabled');
        button.play.focus();
        return;
      case actioncase.play:
        [video] = [..._root.querySelectorAll(scriptSelector.video)].filter(
          v => window.getComputedStyle(v, null).getPropertyValue('display') !== 'none'
        );
        video.play();
        button.play.setAttribute('disabled', '');
        button.pause.removeAttribute('disabled');
        button.pause.focus();
        return;
      case actioncase.modal:
        button.play.setAttribute('disabled', '');
        mediaElementId = render[libraryType](_dataset, appendTarget[actioncase.modal], mediaTemplate[actioncase.modal]);
        api[libraryType](mediaElementId, _dataset, afterApi);
        registry[libraryType](mediaElementId, _dataset);
        button.close?.focus();
        return;
      case actioncase.element:
        if (!_root.closest('.c-pop-msg') && !_root.closest('.c-summary-gallery-expand')) {
          button.play.setAttribute('disabled', '');
        }
        // console.log(libraryType);
        mediaElementId = render[libraryType](
          _dataset,
          appendTarget[actioncase.element],
          mediaTemplate[actioncase.element]
        );
        api[libraryType](mediaElementId, _dataset, afterApi);
        registry[libraryType](mediaElementId, _dataset);
        return;
      case actioncase.mute:
        [video] = [..._root.querySelectorAll(scriptSelector.video)].filter(
          v => window.getComputedStyle(v, null).getPropertyValue('display') !== 'none'
        );
        video.muted = true;
        button.mute.setAttribute('disabled', '');
        button.unmute.removeAttribute('disabled');
        button.unmute.focus();
        return;
      case actioncase.unmute:
        [video] = [..._root.querySelectorAll(scriptSelector.video)].filter(
          v => window.getComputedStyle(v, null).getPropertyValue('display') !== 'none'
        );
        video.muted = false;
        button.unmute.setAttribute('disabled', '');
        button.mute.removeAttribute('disabled');
        button.mute.focus();
        return;
      default:
        return new Error(`Action is not defined`);
    }
  };

  // "animation"
  // type check...
  if (type === typecase.animation) {
    // DOM select.
    video = _root.querySelectorAll(scriptSelector.video);
    button.play = _root.querySelector(scriptSelector.play);
    button.pause = _root.querySelector(scriptSelector.pause);
    button.mute = _root.querySelector(scriptSelector.mute);
    button.unmute = _root.querySelector(scriptSelector.unmute);
    // event listening.
    const handler = {
      play() {
        const action = actioncase.play;
        controller(action);
        // tagging
      },
      pause() {
        const action = actioncase.pause;
        const carouselObject =
          Object.prototype.hasOwnProperty.call(_root.closest('.swiper') || {}, 'swiper') &&
          _root.closest('.swiper').swiper;
        const loopFlag = carouselObject && _root.closest('.swiper').swiper.originalParams.loop;

        if (!loopFlag) return controller(action);

        const cloneElement = carouselObject.slides
          .filter(s => _root.closest('.swiper-slide').dataset.swiperSlideIndex === s.dataset.swiperSlideIndex)
          .filter(s => _root.closest('.swiper-slide') !== s)
          .forEach(s => ({
            // video: s.querySelector('.js-video'),
            button: {
              play: s.querySelector('.js-video-play'),
              pause: s.querySelector('.js-video-pause'),
            },
          }));
        // console.log('cloneElement :', cloneElement);
        controller(action, cloneElement);
        // tagging
      },
      mute() {
        const action = actioncase.mute;
        controller(action);
        // tagging
      },
      unmute() {
        const action = actioncase.unmute;
        const carouselObject =
          Object.prototype.hasOwnProperty.call(_root.closest('.swiper') || {}, 'swiper') &&
          _root.closest('.swiper').swiper;
        const loopFlag = carouselObject && _root.closest('.swiper').swiper.originalParams.loop;

        if (!loopFlag) return controller(action);

        const cloneElement = carouselObject.slides
          .filter(s => _root.closest('.swiper-slide').dataset.swiperSlideIndex === s.dataset.swiperSlideIndex)
          .filter(s => _root.closest('.swiper-slide') !== s)
          .forEach(s => ({
            // video: s.querySelector('.js-video'),
            button: {
              mute: s.querySelector('.js-video-mute'),
              unmute: s.querySelector('.js-video-unmute'),
            },
          }));
        // console.log('cloneElement :', cloneElement);
        controller(action, cloneElement);
        // tagging
      },
    };
    param = {
      type: typecase.animation,
      video,
      button,
      custom: false,
      handler,
      lazyloader: null, // use default loader
      lazyoption: {
        button,
      },
      passive: false,
    };
    mount = function (callback = null) {
      // chance of custom
      if (null != callback) callback(param);
      if (param.custom) return false;
      // event listening
      button.play.addEventListener('click', param.handler.play, param.passive);
      button.pause.addEventListener('click', param.handler.pause, param.passive);
      if (button.mute) button.mute.addEventListener('click', param.handler.mute, param.passive);
      if (button.unmute) button.unmute.addEventListener('click', param.handler.unmute, param.passive);
      // launch lazyload
      video.forEach(v => lazyload(v, param.lazyoption, param.lazyloader));
    };
    unmount = function (callback = null) {
      button.play.removeEventListener('click', param.handler.play, param.passive);
      button.pause.removeEventListener('click', param.handler.pause, param.passive);
      if (button.mute) button.mute.removeEventListener('click', param.handler.mute, param.passive);
      if (button.unmute) button.unmute.removeEventListener('click', param.handler.unmute, param.passive);
      if (null != callback) callback(param);
    };
    mount();
    return {
      mount,
      unmount,
    };
  }
  // "video"
  // type check...

  if (type === typecase.video) {
    // DOM select... dynamic media only registry 'play button'
    // event listening
    const dynamicActionCreator = ({ passed, forceType }) => {
      if (passed) return forceType;
      // const dividedItem = 1440 * 1 >= _root.offsetWidth;
      // const matchMobileBreakpoint = bp.mobile >= window.innerWidth;
      // if (dividedItem || matchMobileBreakpoint) return actioncase.modal;
      //
      if (_root.closest('.c-pop-msg') || _root.closest('.c-summary-gallery-expand')) {
        return actioncase.element;
      }
      return actioncase.modal;
    };
    const handler = {
      play(event) {
        event.preventDefault();
        // const { dataset } = button.play;
        const { dataset } = event.currentTarget;
        const action = dynamicActionCreator({ passed: false, forceType: null });
        controller(action, dataset);
        // tagging
      },
    };
    const playBtns = _root.querySelectorAll(scriptSelector.play);
    if (playBtns.length === 1) {
      button.play = _root.querySelector(scriptSelector.play);
      button.play.addEventListener('click', handler.play, false);
    } else if (playBtns.length > 0) {
      // for pd0003
      playBtns.forEach(play => {
        play.addEventListener('click', handler.play, false);
      });
    }
    // after flow... handle on 'controller'
    return {
      mount,
      unmount,
    };
  }
};
function media(component) {
  const [...target] = component ? component.querySelectorAll('.c-media') : document.querySelectorAll('.c-media');
  if (beforeLaunch(target)) return;

  // execute
  const map = target.map(element => Media(element));
  return map;
}

export default media;
