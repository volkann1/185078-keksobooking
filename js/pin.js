'use strict';
window.createPins = (function () {
  function createPin(offer) {
    var pin = document.createElement('div');
    pin.innerHTML = '<img src="' + offer.author.avatar + '" style = "max-width:38px;">';
    pin.classList.add('pin');
    pin.tabIndex = '0';
    pin.style.left = offer.location.x + pin.offsetWidth / 2 + 'px';
    pin.style.top = offer.location.y + pin.offsetHeight + 'px';
    return pin;
  }
  return function (offersList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offersList.length; i++) {
      var newPin = createPin(offersList[i]);
      newPin.dataset.index = i;
      fragment.appendChild(newPin);
    }
    return fragment;
  };
})();
