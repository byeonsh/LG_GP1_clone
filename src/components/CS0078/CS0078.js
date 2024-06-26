/* eslint-disable */
import { bp, isRTL } from '../../assets/js/common/constant.js';
import swiper from '../../assets/js/vendors/swiper.js';
import { beforeLaunch, getComponentConfigFromElem } from '../../assets/js/common/utils.js';
import accordion from '../../assets/js/common/accordion.js';

function accord() {
  const component = document.querySelectorAll('.type-accordion');
  if (beforeLaunch(component)) return false;
  component.forEach(el => accordion.run(el));
}
accord();
const printEvent = event => {
  // console.log(event);
  const printBtn = event.currentTarget;
  const component = printBtn.closest('.c-wrapper');
  // console.log(component)
  const cssURLs = printBtn.dataset.cssUrl.split(',');
  // console.log(printBtn);
  // console.log(cssURLs);
  let cssHtml = '';
  cssURLs.forEach(url => {
    cssHtml += `<link rel="stylesheet" href="${url}" type="text/css" />`;
  });
  const newWin = window.open('', '_blank');
  newWin.document.writeln(
    `<html dir=${isRTL}><head>${cssHtml}</head><body><div class="c-wrapper CS0078">${component.innerHTML}</div></body></html>`
  );
  newWin.document.querySelector('.c-print-area').remove();
  const isTabs = newWin.document.querySelector('.tabs');
  if (isTabs) {
    isTabs.querySelector('.swiper-wrapper').remove();
    // isTabs.closest('.cmp-container').querySelector('.c-text-contents').remove();
  }
  newWin.document.close();
  newWin.focus();
  newWin.print();
  setTimeout(function () {}, 100);
};
// print
const printSection = function () {
  const printBtn = document.querySelectorAll('.c-print');
  console.log(printBtn);
  const body = document.querySelector('body');
  const cloneBody = body.cloneNode(true);
  console.log(cloneBody);
  printBtn.forEach(el => {
    el.addEventListener('click', function () {
      cloneBody.style.zoom = '95%';
      window.print(cloneBody);
    });
  });
};
printSection();
const countryCode = document.querySelector('html').dataset.countrycode;
if (countryCode == 'GB') {
  const swiperFraction = document.querySelector('.c-carousel__pagination');
  const nextButton = document.querySelector('.js-carousel-next');
  const prevButton = document.querySelector('.js-carousel-prev');
  // const tabSwiper = new swiper('.c-tabs__inner.swiper', {
  //     slidesPerView: 'auto',
  //     preventClicks: true,
  //     preventClicksPropagation: true,
  //     observer: true,
  //     observeParents: true,
  //     pagination: {
  //         el: swiperFraction,
  //         type: 'fraction',
  //     },
  //     navigation: {
  //         nextEl: nextButton,
  //         prevEl: prevButton,
  //     },
  // });
  const swiperArrow = function () {
    const contentCount = document.querySelectorAll('.CS0078.c-tabs__double .c-tabs .swiper-slide').length;
    const swiperHandler = document.querySelector('.CS0078.c-tabs__double .c-tabs .c-carousel__handler');
    if (swiperHandler) {
      if (contentCount < 6) {
        swiperHandler.style.display = 'none';
      }
    }
  };
  swiperArrow();
  // tab center move event
  const tabCenterMove = function () {
    const tab = document.querySelectorAll('.c-tabs__inner.swiper');
    tab.forEach(tabElem => {
      const tabItem = tabElem.querySelectorAll('.swiper-slide');
      const tabCenter = function (target) {
        let pos;
        let listWidth = 0;
        const targetWidth = target.offsetWidth;
        const swiperWrapper = tabElem.querySelector('.swiper-wrapper');
        const targetPosLeft = target.offsetLeft;
        const swiperBox = tabElem.parentElement.parentElement.querySelector('.c-tabs__inner.swiper');
        const swiperBoxWidth = swiperBox.offsetWidth;
        const swiperBoxHalf = swiperBox.offsetWidth / 2;
        const selectTargetLeftPos = targetPosLeft + target.offsetWidth / 2;
        // RTL
        const targetPosRight = targetWidth + targetPosLeft - swiperBoxWidth;
        const selectTargetRightPos = Math.abs(targetPosRight) + target.offsetWidth / 2;
        tabItem.forEach(item => {
          listWidth += item.offsetWidth;
        });
        if (listWidth > swiperBoxWidth) {
          if (isRTL) {
            if (selectTargetRightPos <= swiperBoxHalf) {
              // right item
              pos = 0;
            } else if (listWidth - selectTargetRightPos <= swiperBoxHalf) {
              // left item
              pos = listWidth - swiperBox.offsetWidth;
            } else {
              // other centers
              pos = selectTargetRightPos - swiperBoxHalf;
            }
            swiperWrapper.style.transform = `translate3d(${pos * 1}px, 0, 0)`;
          } else {
            if (selectTargetLeftPos <= swiperBoxHalf) {
              // left item
              pos = 0;
            } else if (listWidth - selectTargetLeftPos <= swiperBoxHalf) {
              // right item
              pos = listWidth - swiperBox.offsetWidth;
            } else {
              // other centers
              pos = selectTargetLeftPos - swiperBoxHalf;
            }
            swiperWrapper.style.transform = `translate3d(${pos * -1}px, 0, 0)`;
          }
          swiperWrapper.style.transition = '500ms';
        }
      };
      tabItem.forEach(item => {
        item.addEventListener('click', () => {
          tabCenter(item);
        });
      });
      const tabMoveReset = function (breakpoint) {
        const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
        swiperWrapper.forEach(el => {
          if (breakpoint > bp.tablet) {
            el.style.transform = 'translate3d(0, 0, 0)';
          } else {
            const selectEl = tabElem.querySelector('.on');
            tabCenter(selectEl);
          }
        });
      };
      let timer;
      window.addEventListener('resize', () => {
        if (!timer) {
          timer = setTimeout(() => {
            const breakpoint = window.innerWidth;
            tabMoveReset(breakpoint);
            timer = null;
          }, 200);
        }
      });
    });
  };
  tabCenterMove();
  function init() {
    const component = document.querySelectorAll('.type-accordion2');
    if (beforeLaunch(component)) return false;
    component.forEach(el => accordion.run(el));
  }
  init();
  function fixedStyleChange(e) {
    const header = document.querySelector('.c-sticky__contents');
    // const sticky = header.offsetTop;
    const pcgnb = document.querySelector('.c-gnb__desktop .c-gnb__sticky');
    const mognb = document.querySelector('.c-gnb__mobile .c-gnb__sticky');
    const sticky = header.querySelector('.type-tabs .c-tabs__inner');
    const cookie = document.querySelector('.c-cookie-layer.active');
    if (pcgnb || mognb) {
      var pcgnbHeight = pcgnb.clientHeight;
      const mognbHeight = mognb.clientHeight;
      if (e.deltaY > 80) {
        header.classList.add('c-sticky');
        header.classList.remove('c-upsticky');
        if (cookie) {
          sticky.style.top = `${cookie.clientHeight}px`;
        } else {
          sticky.style.top = `${0}px`;
        }
      } else {
        header.classList.add('c-upsticky');
        header.classList.remove('c-sticky');
        if (cookie) {
          if (window.innerWidth > bp.tablet) {
            sticky.style.top = `${pcgnbHeight + cookie.clientHeight}px`;
          } else {
            sticky.style.top = `${mognbHeight + cookie.clientHeight}px`;
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if (window.innerWidth > bp.tablet) {
            sticky.style.top = `${pcgnbHeight}px`;
          } else {
            sticky.style.top = `${mognbHeight}px`;
          }
        }
      }
    }
  }
  window.addEventListener('mousewheel', e => {
    fixedStyleChange(e);
  });
  window.addEventListener('resize', e => {
    fixedStyleChange(e);
  });
  const tabScrollTop = function () {
    const tab = document.querySelector('.c-tabs');
    const scrollYPos = window.scrollY;
    // console.log(scrollYPos)
    const posFromTop = tab.getBoundingClientRect().top;
    const absolutePos = scrollYPos + posFromTop;
    const tabItem = document.querySelectorAll('.c-tabs__tablist li');
    tabItem.forEach(item => {
      item.addEventListener('click', () => {
        window.scrollTo({
          top: scrollYPos,
          // behavior: 'smooth',
        });
        // console.log(absolutePos);
      });
    });
  };
  tabScrollTop();
  // default active tab
  const tabDefault = function () {
    const tablist = document.querySelectorAll('.c-tabs__tablist')[0];
    const tablistItem = tablist.querySelectorAll('.swiper-slide');
    const doubleTabSlide = document.querySelectorAll('.c-tabs__double li'); // 하단텝(두번째텝)의 li(=swiper-slide)
    const doubleTabActive = document.querySelectorAll('.c-tabs__double .swiper-slide')[0];
    const doubleTabpannelActive = document.querySelectorAll('.c-tabs__double .c-tabs__tabpanel');
    tablistItem.forEach(el => {
      if (el.classList.contains('swiper-slide-active')) {
        el.addEventListener('click', function () {
          doubleTabpannelActive[0].classList.add('active');
          doubleTabActive.classList.add('active');
          doubleTabActive.parentElement.style.transform = 'translate3d(0, 0, 0)';
        });
      }
    });
    doubleTabSlide.forEach((el, index) => {
      el.addEventListener('click', () => {
        // console.log(el);
        if (index !== 0) {
          doubleTabActive.classList.remove('active');
          doubleTabpannelActive[0].classList.remove('active'); // 첫번째의 active 값 삭제
        }
      });
    });
  };
  tabDefault();
  const activeImg = function () {
    const cardTab = document.querySelector('.CS0078 .c-tabs__card');
    if (cardTab) {
      const cardBtn = cardTab.querySelectorAll('.cmp-tabs__tab');
      const selectImg = cardTab.querySelectorAll('.c-image__img');
      cardBtn.forEach((item, index) => {
        item.addEventListener('click', function () {
          const hasActive = item.classList.contains('cmp-tabs__tab--active');
          selectImg.forEach((elm, i) => {
            const norIconAttr = elm.getAttribute('src');
            let replaceIcon = norIconAttr.replace('_normal', '_active');
            if (index !== i) {
              replaceIcon = norIconAttr.replace('_active', '_normal');
            } else if (hasActive === false) {
              replaceIcon = norIconAttr.replace('_normal', '_active');
            }
            elm.setAttribute('src', replaceIcon);
          });
        });
      });
    }
  };
  activeImg();
  const noAccordBtn = function () {
    const emptyNote = document.querySelectorAll('.CS0078 .c-no-note');
    emptyNote.forEach(item => {
      const noNote = item.parentNode.parentNode.parentNode.parentElement.nextElementSibling;
      noNote.classList.remove('c-accordion__body');
    });
  };
  noAccordBtn();
} else {
  const swiperFraction = document.querySelector('.c-carousel__pagination');
  const nextButton = document.querySelector('.js-carousel-next');
  const prevButton = document.querySelector('.js-carousel-prev');
  const tabSwiper = new swiper('.csSwiper', {
    slidesPerView: 'auto',
    // preventClicks: true,
    // preventClicksPropagation: false,
    observer: true,
    observeParents: true,
    pagination: {
      el: swiperFraction,
      type: 'fraction',
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
  const swiperArrow = function () {
    const contentCount = document.querySelectorAll('.CS0078 .cs-second-tab .swiper-slide').length;
    const swiperHandler = document.querySelector('.CS0078 .cs-second-tab .c-carousel__handler');
    if (swiperHandler && window.innerWidth >= bp.mobile) {
      if (contentCount > 7) {
        swiperHandler.style.display = 'block';
      }
    }
  };
  swiperArrow();
  const tabCenterMove = function () {
    const tab = document.querySelectorAll('.csSwiper');
    tab.forEach(tabElem => {
      const tabItem = tabElem.querySelectorAll('.csSwiper .swiper-wrapper .swiper-slide');
      const tabCenter = function (target) {
        let pos;
        let listWidth = 0;
        const targetWidth = target.offsetWidth;
        const swiperWrapper = tabElem.querySelector('.swiper-wrapper');
        const targetPosLeft = target.offsetLeft;
        const swiperBox = tabElem.parentElement.parentElement.querySelector('.swiper');
        const swiperBoxWidth = swiperBox.offsetWidth;
        const swiperBoxHalf = swiperBox.offsetWidth / 2;
        const selectTargetLeftPos = targetPosLeft + target.offsetWidth / 2;
        // RTL
        const targetPosRight = targetWidth + targetPosLeft - swiperBoxWidth;
        const selectTargetRightPos = Math.abs(targetPosRight) + target.offsetWidth / 2;
        tabItem.forEach(item => {
          listWidth += item.offsetWidth;
        });
        if (listWidth > swiperBoxWidth) {
          if (isRTL) {
            if (selectTargetRightPos <= swiperBoxHalf) {
              // right item
              pos = 0;
            } else if (listWidth - selectTargetRightPos <= swiperBoxHalf) {
              // left item
              pos = listWidth - swiperBox.offsetWidth;
            } else {
              // other centers
              pos = selectTargetRightPos - swiperBoxHalf;
            }
            swiperWrapper.style.transform = `translate3d(${pos * 1}px, 0, 0)`;
          } else {
            if (selectTargetLeftPos <= swiperBoxHalf) {
              // left item
              pos = 0;
            } else if (listWidth - selectTargetLeftPos <= swiperBoxHalf) {
              // right item
              pos = listWidth - swiperBox.offsetWidth;
            } else {
              // other centers
              pos = selectTargetLeftPos - swiperBoxHalf;
            }
            swiperWrapper.style.transform = `translate3d(${pos * -1}px, 0, 0)`;
          }
          swiperWrapper.style.transition = '500ms';
        }
      };
      tabItem.forEach(el => {
        el.addEventListener('click', () => {
          tabCenter(el);
        });
      });
      const tabMoveReset = function (breakpoint) {
        const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
        swiperWrapper.forEach(el => {
          if (breakpoint > bp.tablet) {
            el.style.transform = 'translate3d(0, 0, 0)';
          } else {
            const selectEl = tabElem.querySelector('.on');
            tabCenter(selectEl);
          }
        });
      };
      let timer;
      window.addEventListener('resize', () => {
        if (!timer) {
          timer = setTimeout(() => {
            const breakpoint = window.innerWidth;
            tabMoveReset(breakpoint);
            timer = null;
          }, 150);
        }
      });
    });
  };
  tabCenterMove();
  const allTabs = document.querySelectorAll('.tabs');
  const notFirstTabs = [];
  if (allTabs.length > 1) {
    allTabs.forEach((el, index) => {
      if (index != 0) {
        notFirstTabs[index - 1] = el;
      }
    });
  }
  const imgTabs = new Array();
  allTabs.forEach(el => {
    const hasImgIcon = el.querySelectorAll('.c-image__img');
    if (hasImgIcon.length > 0) {
      imgTabs.push(el);
    }
  });
  const snbSwiperItem = allTabs[0].querySelectorAll('.swiper-slide');
  let firstActiveItem = 0;
  snbSwiperItem[0].classList.add('on');
  snbSwiperItem.forEach((item, index) => {
    item.addEventListener('click', function () {
      if (index != firstActiveItem) {
        snbSwiperItem[firstActiveItem].classList.remove('on');
        item.classList.add('on');
        firstActiveItem = index;
        resetSecondTab();
      }
      if (imgTabs.length > 0) {
        if (imgTabs.includes(item.closest('.tabs'))) {
          // imgChange(item.closest('.tabs'), index);
        }
      }
    });
  });
  if (notFirstTabs.length > 0) {
    notFirstTabs.forEach(el => {
      const secondTabItems = el.querySelectorAll('.swiper-slide');
      secondTabItems[0].classList.add('on');
      secondTabItems.forEach((item, index) => {
        item.addEventListener('click', function () {
          if (!item.classList.contains('on')) {
            item.classList.add('on');
            secondTabItems.forEach((nonSelectEl, elIndex) => {
              if (index != elIndex) {
                nonSelectEl.classList.remove('on');
              }
            });
          }
          if (imgTabs.length > 0) {
            if (imgTabs.includes(item.closest('.tabs'))) {
              // imgChange(item.closest('.tabs'), index);
            }
          }
        });
      });
    });
  }

  // 230818 ca_en, ca_fr issue fix
  // const resetSecondTab = function () {
  //     if (notFirstTabs.length > 0) {
  //         notFirstTabs.forEach(el => {
  //             const secondTabsFirstItem = el.querySelectorAll('.swiper-slide');
  //             secondTabsFirstItem[0].click();
  //         });
  //     }
  // };

  const imgChange = function (clickTab, imgIndex) {
    const tabImgs = clickTab.querySelectorAll('.c-image__img');
    tabImgs.forEach((item, index) => {
      const IconAttr = item.getAttribute('src');
      let replaceIcon = IconAttr.replace('_normal', '_active');
      if (imgIndex != index) {
        replaceIcon = IconAttr.replace('_active', '_normal');
      } else {
        replaceIcon = IconAttr.replace('_normal', '_active');
      }
      item.setAttribute('src', replaceIcon);
    });
  };
  window.onscroll = function () {
    fixedStyleChange();
  };

  const fixedStyleChange = () => {
    if (document.querySelectorAll('.c-gnb__desktop').length === 1) {
      // current scroll
      const lastScroll = document.documentElement.scrollTop || 0;
      // add
      const gnbDesktop = document.querySelector('.c-gnb__desktop');
      const firstTabSticky = document.querySelector('.csSwiper1');
      const tabHeight = firstTabSticky.querySelector('.tabs__items');
      const gnbCookieShow = document.querySelectorAll('.c-cookie-layer');
      const gnbCookieH = gnbCookieShow[0].clientHeight;
      // const gnbStickyH = document.querySelector('.c-gnb__sticky').clientHeight;
      const gnbStickyH = document.querySelectorAll('.c-gnb__sticky');
      const gnbStickyPcH = gnbStickyH[0].clientHeight;
      const gnbStickyMoH = gnbStickyH[1].clientHeight;
      const innerTab = document.querySelectorAll('.csSwiper2');
      const sticky = innerTab[0].offsetTop + tabHeight.offsetHeight;
      const firstTabH = firstTabSticky.clientHeight;
      // inner tab > sticky class add action
      if (window.pageYOffset > sticky) {
        innerTab[0].classList.add('c-sticky');
      } else {
        innerTab[0].classList.remove('c-sticky');
        innerTab[0].style.top = '0';
      }
      // action function
      // eslint-disable-next-line no-inner-declarations
      function scrollMovingPc() {
        const { scrollTop } = document.documentElement;
        if (scrollTop > lastScroll) {
          // if check cookie option
          if (getComputedStyle(gnbCookieShow[0]).display === 'none') {
            firstTabSticky.style.top = '0';
            if (innerTab.length === 1) {
              innerTab[0].style.top = `${firstTabH}px`;
            }
          } else {
            firstTabSticky.style.top = `${gnbCookieH}px`;

            if (innerTab.length === 1) {
              innerTab[0].style.top = `${gnbCookieH + firstTabH}px`;
            }
          }
        } else {
          // up scroll
          // eslint-disable-next-line no-lonely-if
          if (getComputedStyle(gnbCookieShow[0]).display === 'none') {
            firstTabSticky.style.top = `${gnbStickyPcH}px`;
            console.log(`${gnbStickyPcH}px`);
            if (innerTab.length === 1) {
              innerTab[0].style.top = `${gnbStickyPcH + firstTabH}px`;
            }
          } else {
            firstTabSticky.style.top = `${gnbCookieH + gnbStickyPcH}px`;
            if (innerTab.length === 1) {
              innerTab[0].style.top = `${firstTabH + gnbCookieH + gnbStickyPcH}px`;
            }
          }
        }
      }

      // eslint-disable-next-line no-inner-declarations

      function scrollMovingMo() {
        const { scrollTop } = document.documentElement;
        if (scrollTop > lastScroll) {
          // if check cookie option
          if (getComputedStyle(gnbCookieShow[0]).display === 'none') {
            firstTabSticky.style.top = '0';

            if (innerTab.length === 1) {
              innerTab[0].style.top = `${firstTabH}px`;
            }
          } else {
            firstTabSticky.style.top = `${gnbCookieH}px`;

            if (innerTab.length === 1) {
              innerTab[0].style.top = `${gnbCookieH + firstTabH}px`;
            }
          }
        } else {
          // up scroll

          // eslint-disable-next-line no-lonely-if

          if (getComputedStyle(gnbCookieShow[0]).display === 'none') {
            firstTabSticky.style.top = `${gnbStickyMoH}px`;

            if (innerTab.length === 1) {
              innerTab[0].style.top = `${gnbStickyMoH + firstTabH}px`;
            }
          } else {
            firstTabSticky.style.top = `${gnbCookieH + gnbStickyMoH}px`;

            if (innerTab.length === 1) {
              innerTab[0].style.top = `${firstTabH + gnbCookieH + gnbStickyMoH}px`;
            }
          }
        }
      }

      // scroll event pc /Mo

      document.addEventListener('scroll', function () {
        // stickt option

        if (getComputedStyle(gnbDesktop).display === 'none') {
          scrollMovingMo();
        } else {
          scrollMovingPc();
        }
      });
    } else {
      const secondTabSticky = document.querySelectorAll('.cs-second-tab');

      secondTabSticky.forEach(el => {
        if (el) {
          const tabHeight = el.querySelector('.tabs__items');

          const sticky = el.offsetTop + tabHeight.offsetHeight;

          if (window.pageYOffset > sticky) {
            el.querySelector('.csSwiper2').classList.add('c-sticky');
          } else {
            el.querySelector('.csSwiper2').classList.remove('c-sticky');
          }
        }
      });
    }
  };
  // tab scroll top
  const tabScrollTop = () => {
    const tab = document.querySelector('.csSwiper2');
    const secondSection = document.querySelector('.CS0078 .c-second-section');

    if (tab && secondSection) {
      const tabItem = tab.querySelectorAll('.swiper-slide');
      tabItem.forEach(item => {
        item.addEventListener('click', () => {
          const pos = tab.classList.contains('c-sticky') ? 150 : 300;
          window.scrollTo({
            top: secondSection.getBoundingClientRect().top + window.scrollY - pos,
          });
        });
      });
    }
  };

  tabScrollTop();
  // new accordion
  const accordionInTab = () => {
    const breakpoint = window.matchMedia(`(max-width:${bp.mobile}px)`);
    const tabSecond = document.querySelectorAll('.c-second-tab');
    tabSecond.forEach(el => {
      const accordionHeaders = el.querySelectorAll('.accordion__title');
      function toggleAccordion() {
        const accordionContent = this.nextElementSibling;
        if (accordionContent.style.display === 'block') {
          accordionContent.style.display = 'none';
          this.classList.remove('active');
        } else {
          accordionHeaders.forEach(header => {
            const content = header.nextElementSibling;
            content.style.display = 'none';
            header.classList.remove('active');
          });
          accordionContent.style.display = 'block';
          this.classList.add('active');
        }
      }
      const viewChangeHandler = mediaQueryList => {
        const onMobile = mediaQueryList.matches;
        // ~ 768
        if (onMobile) {
          // console.log('mobile');
          accordionHeaders.forEach((accordionHeader, index) => {
            if (index === 0) {
              accordionHeader.classList.add('active');
              accordionHeader.nextElementSibling.style.display = 'block';
            }
            accordionHeader.addEventListener('click', toggleAccordion);
          });
        }
        // 768 ~
        if (!onMobile) {
          // console.log('pc');
          accordionHeaders.forEach(accordionHeader => {
            accordionHeader.nextElementSibling.style.display = 'block';
          });
        }
      };
      viewChangeHandler(breakpoint);
      breakpoint.addEventListener('change', viewChangeHandler, false);
    });
  };
  accordionInTab();
  const MobileAccor = function (breakpoint) {
    const AccorWrap = document.querySelectorAll('.accordion');
    AccorWrap.forEach(accrEl => {
      const AccorHd = accrEl.querySelectorAll('.accordion__title');
      const AccorCt = accrEl.querySelectorAll('.accordion__content');
      if (breakpoint < bp.mobile) {
        AccorHd.forEach((el, index) => {
          if (index != 0) {
            el.classList.remove('active');
          }
        });
        AccorCt.forEach((el, index) => {
          if (index != 0) {
            el.style.display = 'none';
          }
        });
      } else {
        AccorHd.forEach((el, index) => {
          if (index != 0) {
            el.classList.add('active');
          }
        });
        AccorCt.forEach((el, index) => {
          if (index != 0) {
            el.style.display = 'block';
          }
        });
      }
    });
  };
  const chkWindowWidth = window.innerWidth;
  MobileAccor(chkWindowWidth);
  window.addEventListener('resize', () => {
    const breakpoint = window.innerWidth;
    MobileAccor(breakpoint);
  });
}
