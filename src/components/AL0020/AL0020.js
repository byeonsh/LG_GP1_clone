/**
 * A function to handle toggling the Popups present in AL0020 component
 * It also adds a event listener on document to listener for `Escape` key press to close the popup.
 */
const togglePopup = () => {
  // get all popup open buttons
  const popupOpenButtons = document.querySelectorAll('.AL0018 button.js-pop-open');
  // get all popup close buttons
  const popupCloseButtons = document.querySelectorAll('.AL0020__modal button.js-pop-close');

  /**
   * Iterate over each popup open button and add a click event listener, which
   * looks for a specific popup associated with current button and adds "active" class to show the popup
   */
  popupOpenButtons.forEach(button => {
    button.addEventListener('click', event => {
      const target = event.currentTarget;
      if (target.dataset.popupId) {
        const popup = document.querySelector(`#${target.dataset.popupId}`);
        if (popup) {
          popup.classList.add('active');
        }
      }
    });
  });

  /**
   * Iterate over each popup close button and add a click event listener, which
   * looks for its closest modal parent and removes "active" class to hide the popup
   */
  popupCloseButtons.forEach(button => {
    button.addEventListener('click', event => {
      const parent = event.target.closest('.AL0020__modal.active');
      if (parent) {
        parent.classList.remove('active');
      }
    });
  });

  /**
   * A keydown event listener to listener for `Escape` key, once pressed
   * it gets all AL0020 open popups and remove `active` class from them to hide them.
   */
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const activeModals = document.querySelectorAll('.AL0020 .AL0020__modal.active');
      activeModals.forEach(activeModal => activeModal.classList.remove('active'));
    }
  });
};

togglePopup();
