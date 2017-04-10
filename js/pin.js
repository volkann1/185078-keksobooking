'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var pinMap = document.querySelector('.tokyo__pin-map');

  function createPin(offer) {
    var pin = document.createElement('div');
    pin.innerHTML = '<img src="' + offer.author.avatar + '" style = "max-width:38px;">';
    pin.classList.add('pin');
    pin.tabIndex = '0';
    pin.style.left = offer.location.x + 28 + 'px';
    pin.style.top = offer.location.y + 75 + 'px';
    return pin;
  }

  for (var i = 0; i < window.offers.length; i++) {
    fragment.appendChild(createPin(window.offers[i]));
  }

  pinMap.appendChild(fragment);
})();
