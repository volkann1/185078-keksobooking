'use strict';

(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var mainPin = pinMap.querySelector('.pin__main');
  var tokyo = document.querySelector('.tokyo');
  var mapImageTop = 100; // px
  var filtersElement = tokyo.querySelector('.tokyo__filters-container');
  var PINS = [];
  var activePin;

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var node = document.createElement('div');
  node.classList.add('error-message');
  node.classList.add('hidden');
  document.body.insertAdjacentElement('afterbegin', node);

  var onButtonClickCloseOfferDialog = function (evt) {
    evt.preventDefault();
    hideOfferDialog();
    deactivatePin();
    removeHandlersOnOfferDialog();
  };

  var onEscKeydownCloseOfferDialog = function (evt) {
    if (window.utils.isEscKeyDown(evt)) {
      hideOfferDialog();
      deactivatePin();
      removeHandlersOnOfferDialog();
    }
  };

  var onEnterKeydownCloseOfferDialog = function (evt) {
    if (window.utils.isEnterKeyDown(evt)) {
      evt.preventDefault();
      hideOfferDialog();
      deactivatePin();
      removeHandlersOnOfferDialog();
    }
  };

  var successHandler = function (data) {
    PINS = data;
    pinMap.appendChild(window.createPins(PINS));
    window.showCard(pinMap, 'pin', 'pin__main', offerDialog, activatePinAndOfferDialog);
    var pinElements = pinMap.querySelectorAll('.pin:not(.pin__main)');
    [].slice.call(pinElements, 3).forEach(function (it) {
      it.classList.add('hidden');
    });
  };

  var errorHandler = function (massage) {
    node.textContent = massage;
    node.classList.remove('hidden');
  };

  window.hideOfferDialog = function () {
    hideOfferDialog();
    deactivatePin();
    removeHandlersOnOfferDialog();
  };

  window.load(URL, successHandler, errorHandler);

  dragAndDrop(mainPin, tokyo, filtersElement.offsetHeight, mapImageTop);

  function hideOfferDialog() {
    offerDialog.classList.add('hidden');
  }

  function addHandlersOnOfferDialog() {
    dialogClose.addEventListener('click', onButtonClickCloseOfferDialog);
    dialogClose.addEventListener('keydown', onEnterKeydownCloseOfferDialog);
    document.addEventListener('keydown', onEscKeydownCloseOfferDialog);
  }

  function removeHandlersOnOfferDialog() {
    dialogClose.removeEventListener('click', onButtonClickCloseOfferDialog);
    dialogClose.removeEventListener('keydown', onEnterKeydownCloseOfferDialog);
    document.removeEventListener('keydown', onEscKeydownCloseOfferDialog);
  }

  function activatePinAndOfferDialog(evt, pinToActivate) {
    window.renderDialog(evt, PINS);
    setActivePin(evt, pinToActivate);
    addHandlersOnOfferDialog(evt);
  }

  function deactivatePin() {
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
  }

  function setActivePin(evt, pinToActivate) {
    deactivatePin();
    pinToActivate.classList.add('pin--active');
    activePin = pinToActivate;
  }

  function dragAndDrop(draggedElement, parentElement, minBottom, maxTop) {
    draggedElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMousemove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        if (draggedElement.offsetTop - shift.y + draggedElement.offsetHeight < parentElement.offsetHeight - minBottom && draggedElement.offsetTop - shift.y > maxTop) {
          draggedElement.style.top = (draggedElement.offsetTop - shift.y) + 'px';
        }
        if (draggedElement.offsetLeft - shift.x + draggedElement.offsetWidth < parentElement.offsetWidth && draggedElement.offsetLeft - shift.x > 0) {
          draggedElement.style.left = (draggedElement.offsetLeft - shift.x) + 'px';
        }
      };
      var onMouseup = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMousemove);
        document.removeEventListener('mouseup', onMouseup);
      };
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', onMouseup);
    });
  }
})();
