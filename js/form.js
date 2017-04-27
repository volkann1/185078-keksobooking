'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var inputOfferTitle = noticeForm.querySelector('#title');
  var inputOfferPrice = noticeForm.querySelector('#price');
  var inputOfferType = noticeForm.querySelector('#type');
  var inputOfferTimeOut = noticeForm.querySelector('#timeout');
  var inputOfferTimeIn = noticeForm.querySelector('#time');
  var inputOfferRoomsNumber = noticeForm.querySelector('#room_number');
  var inputOfferCapacity = noticeForm.querySelector('#capacity');
  var inputOfferAdress = noticeForm.querySelector('#address');
  var submitButtonInputOffer = noticeForm.querySelector('.form__submit');
  var mainPin = document.querySelector('.pin__main');

  var MAX_HEIGHT = 580;
  var MAX_WIDTH = 1200 - Math.round(mainPin.offsetWidth / 2);

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  inputOfferTitle.required = true;
  inputOfferTitle.maxLength = 100;
  inputOfferTitle.minLength = 30;

  inputOfferPrice.required = true;
  inputOfferPrice.min = MIN_PRICE;
  inputOfferPrice.max = MAX_PRICE;

  var PRICE = [
    1000,
    0,
    10000
  ];

  var TYPE_OF_OFFER = [
    'apartment',
    'shack',
    'palace'
  ];

  var TIME_OUT = [
    '12',
    '13',
    '14'
  ];

  var TIME_IN = [
    '12',
    '13',
    '14'
  ];

  var ROOMS = [
    '1',
    '2',
    '100'
  ];

  var GUESTS = [
    '0',
    '3',
    '3'
  ];

  var checkedElements = [
    inputOfferTitle,
    inputOfferPrice
  ];

  var onMouseMove = function () {
    changeInputOfferAdress(mainPin);
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var isYCord = getSubstringAfterSymbols(inputOfferAdress.value, 'y: ');
  var isXCord = getSubstringAfterSymbols(inputOfferAdress.value, 'x: ');

  var isYCordGreater = getTopPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'y: '), 10)) > MAX_HEIGHT;
  var isYCordLess = parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'y: '), 10) < 100;

  var isYCordOutOfRange = isYCordGreater || isYCordLess;

  var isXCordGreater = getLeftPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'x: '), 10)) > MAX_WIDTH;

  var isXCordLess = parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'x: '), 10) < 0;

  var isXCordOutOfRange = isXCordGreater || isXCordLess;

  inputOfferAdress.addEventListener('change', function () {
    changeMainPinPosition();
    if (!isYCord || isYCordOutOfRange || !isXCord || isXCordOutOfRange) {
      changeInputOfferAdress(mainPin);
    }
  });

  window.synchronizeFields(inputOfferType, inputOfferPrice, TYPE_OF_OFFER, PRICE, syncValueWithMin);
  window.synchronizeFields(inputOfferTimeIn, inputOfferTimeOut, TIME_IN, TIME_OUT, syncValues);
  window.synchronizeFields(inputOfferTimeOut, inputOfferTimeIn, TIME_OUT, TIME_IN, syncValues);
  window.synchronizeFields(inputOfferCapacity, inputOfferRoomsNumber, GUESTS, ROOMS, syncValues);
  window.synchronizeFields(inputOfferRoomsNumber, inputOfferCapacity, ROOMS, GUESTS, syncValues);

  submitButtonInputOffer.addEventListener('click', function (evt) {
    if (showAllInvalid(checkedElements)) {
      noticeForm.submit();
      return;
    }
    showAllInvalid(checkedElements);
  });

  submitButtonInputOffer.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterKeyDown(evt)) {
      if (showAllInvalid(checkedElements)) {
        noticeForm.submit();
        return;
      }
      showAllInvalid(checkedElements);
    }
  });

  inputOfferTitle.addEventListener('change', function () {
    recolerExInvalid(inputOfferTitle);
  });

  inputOfferPrice.addEventListener('change', function () {
    recolerExInvalid(inputOfferPrice);
  });

  changeInputOfferAdress(mainPin);

  mainPin.addEventListener('mousedown', function () {
    mainPin.addEventListener('mousemove', onMouseMove);
  });

  mainPin.addEventListener('mouseup', function () {
    mainPin.removeEventListener('mousemove', onMouseMove);
  });

  function changeInputOfferAdress(draggedElement) {
    inputOfferAdress.value = 'x: ' + (draggedElement.offsetLeft + Math.round(draggedElement.offsetWidth / 2)) + ', y: ' + (draggedElement.offsetTop + draggedElement.offsetHeight);
  }

  function getSubstringAfterSymbols(str, stringTosearch) {
    if (str.indexOf(stringTosearch) + 1) {
      var index = str.indexOf(stringTosearch) + stringTosearch.length;
      var substring = str.slice(index);
      return substring;
    } else {
      return false;
    }
  }

  function getTopPositionValue(elementToPosition, coords) {
    return coords - elementToPosition.offsetHeight;
  }

  function getLeftPositionValue(elementToPosition, coords) {
    return coords - Math.round(elementToPosition.offsetWidth / 2);
  }

  function changeMainPinPosition() {
    if (getSubstringAfterSymbols(inputOfferAdress.value, 'y: ') && getTopPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'y: '), 10)) < MAX_HEIGHT && parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'y: '), 10) > 100) {
      mainPin.style.top = getTopPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'y: '), 10)) + 'px';
    }
    if (getSubstringAfterSymbols(inputOfferAdress.value, 'x: ') && getLeftPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'x: '), 10)) < MAX_WIDTH && parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'x: '), 10) > 0) {
      mainPin.style.left = getLeftPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'x: '), 10)) + 'px';
    }
  }

  function showInvalid(checkedElement) {
    if (!checkedElement.validity.valid) {
      checkedElement.classList.add('invalid');
    }
  }

  function showAllInvalid(elemetsToCheck) {
    var isValid = true;
    for (var i = 0; i < elemetsToCheck.length; i++) {
      showInvalid(elemetsToCheck[i]);
      if (!elemetsToCheck[i].validity.valid) {
        isValid = false;
      }
    }
    return isValid;
  }

  function recolerExInvalid(exInvalid) {
    if (exInvalid.validity.valid) {
      exInvalid.classList.remove('invalid');
    }
  }
})();
