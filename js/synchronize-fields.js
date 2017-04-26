'use strict';

window.synchronizeFields = function (changingElement, elementToSynchronize, changingElementValues, elementToSynchronizeValues, callback) {
  if (typeof callback === 'function') {
    changingElement.addEventListener('change', function () {
      for (var i = 0; i < changingElementValues.length; i++) {
        if (changingElement.value === changingElementValues[i]) {
          callback(elementToSynchronize, elementToSynchronizeValues[i]);
          break;
        }
      }
    });
  }
};
