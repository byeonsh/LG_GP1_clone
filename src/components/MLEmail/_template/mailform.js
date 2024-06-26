/* This script for only Test !!!!!! Don't use other page */
// Checking for UI layout & font-style
(function () {
  window.addEventListener('keydown', function (e) {
    if (e.key === 'F9') {
      // rtl change control
      let currentPageUrl = window.location.href;

      if (currentPageUrl.endsWith('-rtl.html')) {
        currentPageUrl = currentPageUrl.replace('-rtl.html', '.html');
      } else {
        currentPageUrl = currentPageUrl.replace('.html', '-rtl.html');
      }

      window.location.href = currentPageUrl;
    }
  });
})();
