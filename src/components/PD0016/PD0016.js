// import module
import { beforeLaunch, lazyloadJS } from '../../assets/js/common/utils.js';
import { bp } from '../../assets/js/common/constant.js';

const toggleFilter = function (event) {
  const filterContainer = event.target.closest('.c-map-search');
  if (filterContainer.classList.contains('is-hide')) {
    // collapse
    filterContainer.classList.remove('is-hide');
    this.setAttribute('aria-expanded', 'false');
  } else {
    // expand
    filterContainer.classList.add('is-hide');
    this.setAttribute('aria-expanded', 'true');
  }
};

const toggleBrand = function (event) {
  const filterContainer = event.target.closest('.c-brand-detail__product');
  if (filterContainer.classList.contains('is-active')) {
    // collapse
    filterContainer.classList.remove('is-active');
    this.setAttribute('aria-expanded', 'false');
  } else {
    // expand
    filterContainer.classList.add('is-active');
    this.setAttribute('aria-expanded', 'true');
  }
};

const addFocusClass = function (event) {
  const boxFinderSearch = event.target.closest('.c-map-search__box-inner');
  boxFinderSearch.classList.add('is-focus');
};
const removeFocusClass = function (event) {
  const boxFinderSearch = event.target.closest('.c-map-search__box-inner');
  boxFinderSearch.classList.remove('is-focus');
};

const setCitySelectDisabled = function (event) {
  const $this = event.target;
  const selected = $this.options[$this.selectedIndex].value;
  const city = $this.closest('.c-search-box__form').querySelector('.c-search-box__city');

  if (selected === '') {
    city.setAttribute('disabled', 'disabled');
  } else {
    city.removeAttribute('disabled');
  }
};

const run3rdParty = cont => {
  const jsfiles = cont.querySelectorAll('.js-eprivacy-load-inline:not(.load-complete)');
  const commerceConnector = cont.querySelector('.js-commerce-connector:not(.load-complete)');
  const iframes = cont.querySelector('.js-iframe-load:not(.load-complete)');
  const observerLoadJS = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const { url } = entry.target.dataset;
        lazyloadJS(url);
        entry.target.classList.add('load-complete');
        if (cont.querySelectorAll('.js-eprivacy-load-inline:not(.load-complete)').length === 0) {
          observerLoadJS.disconnect();
        }
      }
    });
  }, {});
  const observerCommerceConnector = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const dataList = entry.target.dataset;
        const jsLink = dataList.src;
        const tmpJS = document.createElement('script');
        tmpJS.src = jsLink;
        // eslint-disable-next-line no-restricted-syntax
        for (const key in dataList) {
          if (key !== 'src') {
            tmpJS.setAttribute(`data-${key}`, dataList[key]);
          }
        }
        entry.target.parentElement.appendChild(tmpJS);
        entry.target.classList.add('load-complete');
        if (cont.querySelectorAll('.js-commerce-connector:not(.load-complete)').length === 0) {
          observerCommerceConnector.disconnect();
        }
      }
    });
  }, {});
  const observerIframes = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const iframeUrl = entry.target.dataset.src;
        // eslint-disable-next-line no-param-reassign
        entry.target.src = iframeUrl;
        entry.target.classList.add('load-complete');
        if (cont.querySelectorAll('.js-iframe-load:not(.load-complete)').length === 0) {
          observerIframes.disconnect();
        }
      }
    });
  }, {});
  // include js
  if (jsfiles) {
    jsfiles.forEach(file => {
      observerLoadJS.observe(file);
    });
  }
  // commerce connector
  if (commerceConnector) {
    observerCommerceConnector.observe(commerceConnector);
  }
  // iframe
  if (iframes) {
    observerIframes.observe(iframes);
  }
};

/**
 * function initLoadMore to display loadmore button in mobile only and display results
 */

function initLoadMore(numItemsPerPage) {
  const component = document.querySelector('.PD0016');
  const moreLink = component.querySelector('.c-online-shop-bottom button');
  const retailerList = [...component.querySelectorAll('.c-online-shop-list a')];
  const retailersTotal = retailerList.length;
  // defaulting to ten if numItemsPerPage is null
  const itemsPerPage = numItemsPerPage || 10;
  const numPages = Math.ceil(retailersTotal / itemsPerPage);

  let currentPage = 0;
  // loadMore
  const viewMore = function (e) {
    if (e) {
      e.preventDefault();
    }
    const nextPage = currentPage + 1;
    // to handle edge case
    if (nextPage > numPages) {
      moreLink.classList.add('hidden');
      return false;
    }
    // To show/hide retailers based on page num
    retailerList.forEach((retailerNode, i) => {
      if (i < nextPage * itemsPerPage) {
        retailerNode.classList.remove('hidden');
      } else {
        retailerNode.classList.add('hidden');
      }
    });
    // to hide more link on last page
    if (nextPage === numPages) {
      moreLink.classList.add('hidden');
    }
    currentPage = nextPage;
  };
  // Loads only for Mobile View on screen-resize
  const viewChangeHandler = function () {
    retailerList.forEach(retailerNode => {
      retailerNode.classList.remove('hidden');
    });
    moreLink.classList.remove('hidden');
    const ww = window.innerWidth;
    const mobileSize = ww <= bp.mobile + 1;
    if (mobileSize) {
      currentPage = 0;
      viewMore();
    }
  };
  // to render in mobile only
  viewChangeHandler();
  moreLink.addEventListener('click', viewMore, true);
  window.addEventListener('resize', viewChangeHandler, false);
}

// component
function init() {
  const component = document.querySelectorAll('.PD0016');
  if (beforeLaunch(component)) return false;

  component.forEach(el => {
    // Finder Map Toggle Button
    const btnCollapse = el.querySelectorAll('.c-map-search__toggle');
    btnCollapse.forEach(target => {
      target.addEventListener('click', toggleFilter);
    });

    // Brand Detail Product Toggle Button
    const btnBrandToggle = el.querySelectorAll('.c-brand-detail__product-toggle');
    btnBrandToggle.forEach(target => {
      target.addEventListener('click', toggleBrand);
    });

    // Finder Search Input
    const inputFinderSearch = el.querySelectorAll('.c-map-search__box-input');
    inputFinderSearch.forEach(target => {
      target.addEventListener('focus', addFocusClass);
      target.addEventListener('blur', removeFocusClass);
    });

    // Set City Select box disabled
    const searchSelectState = el.querySelectorAll('.c-search-box__state');
    searchSelectState.forEach(target => {
      target.addEventListener('change', setCitySelectDisabled);
    });

    // 3rd party
    const obj3rdParty = el.querySelectorAll('.c-box-3rd-party');
    obj3rdParty.forEach(cont => {
      run3rdParty(cont);
    });
  });
}
init();
export default initLoadMore;

// if ($cont.find('.box-3rd-party').length > 0) {f
//     $cont.find('.box-3rd-party').each(function () {
//         var obj = $(this);
//         } else if ($cont.find('.lazyload-iframe').length > 0) {
//             $cont.find('.lazyload-iframe').each(function () {
//                 var obj2 = $(this);
//                 if (typeof ePrivacyCookies == 'undefined' || ePrivacyCookies.get('LGCOM_ANALYSIS_OF_SITE')) {
//                     var mapFlag = false;
//                     $(window).scroll(function () {
//                         var t = obj2.eq(0).offset().top;
//                         var b = t + obj2.eq(0).height();
//                         if (isInScreen(t, b)) {
//                             if (!mapFlag) {
//                                 mapFlag = true;
//                                 obj2.attr('src', obj2.attr('data-src')).removeAttr('data-src');
//                             }
//                         }
//                     });
//                 } else {
//                     ePrivacyCookies.view('load', '', obj);
//                 }
//             });
//         } else if ($cont.find('.lazyLoadedIframe').length > 0) {
//             $cont.find('.lazyLoadedIframe').each(function () {
//                 var obj3 = $(this);
//                 if (typeof ePrivacyCookies == 'undefined' || ePrivacyCookies.get('LGCOM_ANALYSIS_OF_SITE')) {
//                     $(window).scroll(function () {
//                         var t = obj3.eq(0).offset().top;
//                         var b = t + obj3.eq(0).height();
//                         if (isInScreen(t, b)) {
//                             if (!mapFlag) {
//                                 mapFlag = true;
//                                 obj3.attr('src', obj3.attr('data-src')).removeAttr('data-src');
//                             }
//                         }
//                     });
//                 } else {
//                     ePrivacyCookies.view('load', '', obj);
//                 }
//             });
//         }
//     });
// }
