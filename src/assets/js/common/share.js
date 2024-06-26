/* eslint-disable max-len */
// import module
import { popMsg } from './popMsg.js';
import { convertDataToJson } from './utils.js';

const share = function (shareObj, config) {
  if (shareObj.classList.contains('share-ready')) return false;
  shareObj.classList.add('share-ready');
  const shareEmail = shareObj.querySelectorAll('.c-sns-button--email');
  const shareLink = shareObj.querySelectorAll('.c-sns-button--link');
  const shareFB = shareObj.querySelector('.c-sns-button--facebook');
  const shareTW = shareObj.querySelector('.c-sns-button--twitter-X');
  const sharePI = shareObj.querySelector('.c-sns-button--pinterest');
  const shareVK = shareObj.querySelector('.c-sns-button--vk');
  const shareOK = shareObj.querySelector('.c-sns-button--ok');
  const shareLI = shareObj.querySelector('.c-sns-button--linkedin');
  const shareWB = shareObj.querySelector('.c-sns-button--weibo');
  const shareWE = shareObj.querySelector('.c-sns-button--wechat');
  const shareWEAll = shareObj.querySelectorAll('.c-sns-button--wechat');
  // const shareWA = shareObj.querySelector('.c-sns-button--whatsapp');

  // for touch device
  if ('ontouchstart' in document.documentElement) {
    shareObj.querySelector('.c-list .mobile-only')?.classList.remove('mobile-only');
  }

  // Popup
  function openSns(url) {
    // let winObj;
    const popupX = window.screen.width / 2 - 600 / 2;
    const popupY = window.screen.height / 2 - 800 / 2;
    window.open(url, 'New Window', `width=600, height=800,scrollbars=yes, left=${popupX}, top=${popupY}`);
  }
  // Facebook
  function sendShareFb(url) {
    const shareurl = url || document.location.href;
    // url = `http://www.facebook.com/sharer/sharer.php?u=${shareurl}`;
    // openSns(url);
    const urlTo = config.facebook.replace('{shareurl}', shareurl);
    openSns(urlTo);
  }
  // Twitter
  function sendShareTw(url, title, via) {
    const shareurl = url || document.location.href;
    const text = title || document.querySelector('head title').text;
    const via2 = via || 'LGUS';
    // url = `https://twitter.com/intent/tweet?url=${shareurl}&text=${encodeURIComponent(text)}&via=${via2}`;
    // openSns(url);
    const urlTo = config.twitter
      .replace('{shareurl}', shareurl)
      .replace('{text}', encodeURIComponent(text))
      .replace('{via}', via2);
    openSns(urlTo);
  }
  // Pinterest
  function sendSharePi(url, title, image) {
    const shareurl = url || document.location.href;
    const text = title || document.querySelector('head title').text;
    const img = image || document.querySelector("meta[property='og:image']").getAttribute('content');
    // url = `http://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    //     shareurl
    // )}&media=${encodeURIComponent(img)}&description=${encodeURIComponent(text)}`;
    openSns(url);
    const urlTo = config.pinterest
      .replace('{shareurl}', encodeURIComponent(shareurl))
      .replace('{img}', encodeURIComponent(img))
      .replace('{text}', encodeURIComponent(text));
    openSns(urlTo);
  }
  // Vk
  function sendShareVk(url, title) {
    const shareurl = url || document.location.href;
    const text = title || document.querySelector('head title').text;
    // url = `https://share.yandex.net/go.xml?service=vkontakte&url=${shareurl}&title=${encodeURIComponent(text)}`;
    // openSns(url);
    const urlTo = config.vk.replace('{shareurl}', shareurl).replace('{text}', encodeURIComponent(text));
    openSns(urlTo);
  }
  // Ok
  function sendShareOk(url) {
    const shareurl = url || document.location.href;
    // url = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${shareurl}&feature=share`;
    // openSns(url);
    const urlTo = config.ok.replace('{shareurl}', shareurl);
    openSns(urlTo);
  }

  // linkedin
  function sendShareLi(url) {
    const shareurl = url || document.location.href;
    // url = `https://www.linkedin.com/shareArticle?url=${shareurl}`;
    // openSns(url);
    const urlTo = config.linkedin.replace('{shareurl}', shareurl);
    openSns(urlTo);
  }
  // weibo
  function sendShareWb(url, title, image) {
    const shareurl = url || document.location.href;
    const text = title || document.querySelector('head title').text;
    const img = image || document.querySelector("meta[property='og:image']").getAttribute('content');
    // url = `http://service.weibo.com/share/share.php?title=${text}&url=${shareurl}&pic=${img}`;
    // openSns(url);
    const urlTo = config.weibo.replace('{text}', text).replace('{shareurl}', shareurl).replace('{img}', img);
    openSns(urlTo);
  }

  // Clipboard
  window.Clipboard = (function (window, document, navigator) {
    let textArea;
    // let copy;

    // LGEBR-914 Start
    // iOS check bug fixed
    function isOS() {
      const iOS = navigator.userAgent.match(/ipad|iphone|mac/i) !== null;
      return iOS;
    }
    // LGEBR-914 Start

    function createTextArea(text) {
      textArea = document.createElement('textArea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0.0001';
      textArea.style.width = '100%';
      textArea.style.height = '100%';
      textArea.style.padding = '0';
      textArea.style.pointerEvents = 'none';
      textArea.style.fontSize = '16px';

      document.body.appendChild(textArea);
    }

    function selectText() {
      let range;
      let selection;

      if (isOS()) {
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }
    }

    function copyToClipboard() {
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    function closeFocus() {
      var closeBtn = document.querySelectorAll('#popCopyComplete .js-pop-close');
      closeBtn.forEach(el => {
        el.addEventListener('click', () => {
          const shareCheck = document.querySelector('.c-icon-button--share');
          if (shareCheck) {
            setTimeout(function () {
              shareCheck.focus();
            }, 100);
          }
        });
      });
    }

    const copy = function (text) {
      createTextArea(text);
      selectText();
      copyToClipboard();
      closeFocus();
    };
    return {
      copy,
    };
  })(window, document, navigator);

  // for wechat
  if (shareWEAll.length > 0) {
    // eslint-disable-next-line no-use-before-define
    const domEle = document.getElementsByTagName('head')[0] || document.body;
    const createJs = document.createElement('script');
    const appendChild = domEle.appendChild(createJs);
    // appendChild.src = '/assets/baidumap/baiduShare-master/static/api/js/share.js?v=89860593.js';
    appendChild.src = config.wechat;
    // eslint-disable-next-line no-underscore-dangle
    window._bd_share_config = {
      common: {
        bdSnsKey: {},
        bdText: shareWE.getAttribute('data-text'),
        bdMiniList: !1,
        bdUrl: shareWE.getAttribute('data-url'),
        bdPic: '',
        bdSize: '32',
      },
      share: {},
    };
  }

  // Email
  if (shareEmail) {
    shareEmail.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const currElemData = e.target?.dataset || {};
        let url = currElemData.url || window.location.href;
        const title = currElemData.title || encodeURIComponent(document.title);
        const hashCheck = /#$/g;
        if (hashCheck.test(window.location.href)) {
          url = encodeURIComponent(url.replace(/#$/g, ''));
        } else {
          url = encodeURIComponent(url);
        }
        // if (this.closest('.modal').length > 0 && this.closest().querySelector('.article-link').length > 0) {
        //     // help library in modal (ex. symptoms)
        //     url = this.closest().querySelector('.article-link').getAttribute('data-url');
        // }
        const mailto = `mailto:?subject=${title} &body=${url}`;
        window.location.href = mailto;
      });
    });
  }

  // Copy Link
  if (shareLink) {
    shareLink.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        // const dataText = this.getAttribute('data-text');
        // copyUrl:pdp/plp, url:support/product-help-detailView
        // const url =
        //     this.getAttribute('data-copyUrl') !== null
        //         ? this.getAttribute('data-copyUrl')
        //         : this.getAttribute('data-url'); // LGEBR-914, LGESA-349
        const url = window.location.href;
        window.Clipboard.copy(url);
        popMsg(href);
      });
    });
  }

  // Facebook
  if (shareFB) {
    shareFB.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('data-url');
      sendShareFb(url);
    });
  }

  // Twitter
  if (shareTW) {
    shareTW.addEventListener('click', async function (e) {
      e.preventDefault();
      const $this = e.currentTarget;
      const url = this.getAttribute('data-url') || window.location.href;
      const title = this.getAttribute('data-title');
      const via = this.getAttribute('data-via');

      // converting short Url script
      const shortUrl = e.currentTarget.getAttribute('data-short-url');
      if (shortUrl && shortUrl != null) {
        sendShareTw(shortUrl, title, via);
      } else {
        // get short URL via fetch call and update it in `data-short-url` to reuse the data.
        let getShortURL = '';
        try {
          const res = await fetch(config.shortUrlApi.replace('{url}', url));
          if (res.ok) {
            // If response type is JSONP, get raw response using `text()`
            const rawResp = await res.text();
            if (rawResp) {
              // extract JSON data from response string `jQuery360034XXXX_123XXXX({"shortUrl":"http://lge.to/8yDmAA"})`
              const extractJSON = rawResp.substring(rawResp.indexOf('{'), rawResp.lastIndexOf('}') + 1);
              // convert to object
              const data = convertDataToJson(extractJSON);
              // get the short url
              if (data?.shortUrl) {
                getShortURL = data.shortUrl;
                $this.setAttribute('data-short-url', getShortURL);
              }
            }
            // if response type is JSON, uncomment this code.
            // const data = await res.JSON();
            // if (data.status === 'success') {
            //   getShortURL = data.shortUrl;
            //   $this.setAttribute('data-short-url', getShortURL);
            // }
          }
        } catch (err) {
          console.error(err);
        }
        // if short url is not there then fallback to original url.
        sendShareTw(getShortURL || url, title, via);
      }
    });
  }

  // Pinterest
  if (sharePI) {
    sharePI.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('data-url');
      const title = this.getAttribute('data-title');
      const image = this.getAttribute('data-image');
      sendSharePi(url, title, image);
    });
  }

  // Vk
  if (shareVK) {
    shareVK.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('data-url');
      const title = this.getAttribute('data-title');
      sendShareVk(url, title);
    });
  }

  // Ok
  if (shareOK) {
    shareOK.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('data-url');
      sendShareOk(url);
    });
  }

  // linkedin
  if (shareLI) {
    shareLI.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('data-url');
      sendShareLi(url);
    });
  }

  // weibo
  if (shareWB) {
    shareWB.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('data-url');
      const title = this.getAttribute('data-title');
      const image = this.getAttribute('data-image');
      sendShareWb(url, title, image);
    });
  }

  // wechat
  if (shareWE) {
    // let nIntervId = false;
    shareWE.addEventListener('click', function (e) {
      // Only CN
      e.preventDefault();

      // const url = this.getAttribute('data-url');
      // const text = this.getAttribute('data-text');
      // $('body').trigger('ajaxLoadBefore');

      // const newWindow = function (isFirst) {
      //     document.getElementById('bdshare_weixin_qrcode_dialog').querySelector('.bd_weixin_popup_close').hide();
      //     if (isFirst) {
      //         document
      //             .getElementById('bdshare_weixin_qrcode_dialog')
      //             .css({
      //                 position: 'static',
      //                 left: 0,
      //                 top: 0,
      //                 width: 'auto',
      //                 height: 'auto',
      //             })
      //             .wrapAll('<div />');
      //     }
      //     let myWindow;
      //     let htmlTag = '';
      //     if ('ontouchstart' in window) {
      //         myWindow = window.open('', '_blank');
      //         htmlTag +=
      //             '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, minimal-ui">';
      //     } else {
      //         const popupX = window.screen.width / 2 - 300 / 2;
      //         const popupY = window.screen.height / 2 - 330 / 2;
      //         myWindow = window.open(
      //             '',
      //             'wechat',
      //             `directories=no, menubar=no, status=no, location=no, toolbar=no, width=300, height=330, left=${popupX}, top=${popupY}`
      //         );
      //     }
      //     myWindow.document.getElementsByTagName('html')[0].innerHTML = '';

      //     htmlTag += '<title>Wechat</title>';
      //     htmlTag +=
      //         '<link rel="stylesheet" type="text/css" href="http://bdimg.share.baidu.com/static/api/css/weixin_popup.css"></head>';
      //     htmlTag += document.getElementById('bdshare_weixin_qrcode_dialog').closest('div').innerHTML;

      //     myWindow.document.getElementsByTagName('html')[0].innerHTML = htmlTag;

      //     setTimeout(function () {
      //         document.getElementById('bdshare_weixin_qrcode_dialog').classList.add('hide');
      //         // $('body').trigger('ajaxLoadEnd');
      //     }, 300);
      // };

      // const loadDOM = function () {
      //     if (document.querySelector('#bdshare_weixin_qrcode_dialog')) {
      //         clearInterval(nIntervId);
      //         newWindow(true);
      //     }
      // };
      // if (!document.querySelector('#bdshare_weixin_qrcode_dialog') && !nIntervId) {
      //     // eslint-disable-next-line no-underscore-dangle
      //     if (typeof window._bd_share_main === 'object') {
      //         nIntervId = setInterval(loadDOM, 1000);
      //     } else {
      //         console.log('Error : Failed to load share.js.');
      //         // $('body').trigger('ajaxLoadEnd');
      //     }
      // } else {
      //     newWindow(false);
      // }
    });
  }
};
export default share;
