'use strict';
(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');

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

  function showOfferDialog() {
    offerDialog.classList.remove('hidden');
  }

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

  function activatePinAndShowOfferDialog(evt) {
    setActivePin(evt);
    window.renderDialog(evt, window.offers);
    showOfferDialog();
    addHandlersOnOfferDialog(evt);
  }

  var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', function (evt) {
      activatePinAndShowOfferDialog(evt);
    });
    pins[i].addEventListener('keydown', function (evt) {
      if (window.utils.isEnterKeyDown(evt)) {
        activatePinAndShowOfferDialog(evt);
      }
    });
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
})();
