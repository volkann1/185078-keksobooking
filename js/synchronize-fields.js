'use strict';

window.synchronizeFields = function (changingElement, elementToSynchronize, changingElementValues, elementToSynchronizeValues, callback) {
  if (typeof callback === 'function') {
    changingElement.addEventListener('change', function () {
      changingElementValues.forEach(function (it, index) {
        if (changingElement.value === it) {
          callback(elementToSynchronize, elementToSynchronizeValues[index]);
        }
      });
    });
  }
};
