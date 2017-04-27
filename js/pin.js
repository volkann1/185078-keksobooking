'use strict';

window.createPins = (function () {
  function createPin(offer) {
    var pin = document.createElement('div');
    pin.innerHTML = '<img src="' + offer.author.avatar + '" style = "max-width:38px;">';
    pin.classList.add('pin');
    pin.dataset.type = offer.offer.type;
    pin.dataset.rooms = offer.offer.rooms;
    pin.dataset.guests = offer.offer.guests;
    pin.dataset.wifi = offer.offer.features.indexOf('wifi') !== -1;
    pin.dataset.dishwasher = offer.offer.features.indexOf('dishwasher') !== -1;
    pin.dataset.parking = offer.offer.features.indexOf('parking') !== -1;
    pin.dataset.washer = offer.offer.features.indexOf('washer') !== -1;
    pin.dataset.elevator = offer.offer.features.indexOf('elevator') !== -1;
    pin.dataset.conditioner = offer.offer.features.indexOf('conditioner') !== -1;
    if (offer.offer.price < 10000) {
      pin.dataset.price = 'low';
    } else if (offer.offer.price > 50000) {
      pin.dataset.price = 'high';
    } else {
      pin.dataset.price = 'middle';
    }
    pin.tabIndex = '0';
    pin.style.left = offer.location.x + pin.offsetWidth / 2 + 'px';
    pin.style.top = offer.location.y + pin.offsetHeight + 'px';
    return pin;
  }
  return function (offersList) {
    var fragment = document.createDocumentFragment();
    offersList.forEach(function (it, index) {
      var newPin = createPin(it);
      newPin.dataset.index = index;
      fragment.appendChild(newPin);
    });
    return fragment;
  };
})();
