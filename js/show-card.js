'use strict';
window.showCard = (function () {
  return function (elementToInteract, elementToShow, callback) {
    elementToInteract.addEventListener('click', function (evt) {
      elementToShow.classList.remove('hidden');
      if (typeof callback === 'function') {
        callback(evt);
      }
    });
    elementToInteract.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterKeyDown(evt)) {
        elementToShow.classList.remove('hidden');
        callback(evt);
      }
    });
  };
})();
