'use strict';

window.showCard = (function () {
  return function (elementToInteractParent, elementToInteractClass, elementToInteractExcludedClass, elementToShow, callback) {
    var elementToInteract;

    elementToInteractParent.addEventListener('click', function (evt) {
      if (evt.target.classList.contains(elementToInteractClass) && !evt.target.classList.contains(elementToInteractExcludedClass)) {
        elementToInteract = evt.target;
      } else if (evt.target.parentElement.classList.contains(elementToInteractClass) && !evt.target.parentElement.classList.contains(elementToInteractExcludedClass)) {
        elementToInteract = evt.target.parentElement;
      }
      if (elementToInteract) {
        elementToShow.classList.remove('hidden');
        if (typeof callback === 'function') {
          callback(evt, elementToInteract);
        }
        elementToInteract = null;
      }
    });

    elementToInteractParent.addEventListener('keydown', function (evt) {
      if (evt.target.classList.contains(elementToInteractClass) && !evt.target.classList.contains(elementToInteractExcludedClass)) {
        elementToInteract = evt.target;
      } else if (evt.target.parentElement.classList.contains(elementToInteractClass) && !evt.target.parentElement.classList.contains(elementToInteractExcludedClass)) {
        elementToInteract = evt.target.parentElement;
      }
      if (window.utils.isEnterKeyDown(evt) && elementToInteract) {
        elementToShow.classList.remove('hidden');
        if (typeof callback === 'function') {
          callback(evt, elementToInteract);
        }
      }
    });
  };
})();
