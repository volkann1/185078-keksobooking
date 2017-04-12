'use strict';
(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var mainPin = pinMap.querySelector('.pin__main');
  var tokyo = document.querySelector('.tokyo');
  var mapImageTop = 100;
  var filtersElement = tokyo.querySelector('.tokyo__filters-container');

  var onButtonClickCloseOfferDialog = function (evt) {
    evt.preventDefault();
    hideOfferDialog();
    deactivatePins();
    removeHandlersOnOfferDialog();
  };

  var onEscKeydownCloseOfferDialog = function (evt) {
    if (window.utils.isEscKeyDown(evt)) {
      hideOfferDialog();
      deactivatePins();
      removeHandlersOnOfferDialog();
    }
  };

  var onEnterKeydownCloseOfferDialog = function (evt) {
    if (window.utils.isEnterKeyDown(evt)) {
      evt.preventDefault();
      hideOfferDialog();
      deactivatePins();
      removeHandlersOnOfferDialog();
    }
  };

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

  function activatePinAndOfferDialog(evt) {
    setActivePin(evt);
    window.renderDialog(evt, window.offers);
    addHandlersOnOfferDialog(evt);
  }

  var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');


  for (var i = 0; i < pins.length; i++) {
    window.showCard(pins[i], offerDialog, activatePinAndOfferDialog);
  }

  function deactivatePins() {
    for (i = 0; i < pins.length; i++) {
      if (pins[i].classList.contains('pin--active')) {
        pins[i].classList.remove('pin--active');
      }
    }
  }

  function setActivePin(evt) {
    deactivatePins();
    evt.currentTarget.classList.add('pin--active');
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
