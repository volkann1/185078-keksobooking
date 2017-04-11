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

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  inputOfferTitle.required = true;
  inputOfferTitle.maxLength = 100;
  inputOfferTitle.minLength = 30;

  inputOfferPrice.required = true;
  inputOfferPrice.min = MIN_PRICE;
  inputOfferPrice.max = MAX_PRICE;
  inputOfferPrice.value = 1000;

  var TYPE_OF_OFFER = {
    flat: 'квартира',
    hovel: 'лачуга',
    palace: 'дворец'
  };

  var TIME_OUT = {
    twelve: 'выезд до 12',
    thirteen: 'выезд до 13',
    fourteen: 'выезд до 14'
  };

  var TIME_IN = {
    twelve: 'после 12',
    thirteen: 'после 13',
    fourteen: 'после 14'
  };

  var ROOMS = {
    one: '1 комната',
    two: '2 комнаты',
    hundred: '100 комнат'
  };

  var GUESTS = {
    no: 'не для гостей',
    three: 'для 3 гостей'
  };

  var checkedElements = [
    inputOfferTitle,
    inputOfferPrice
  ];

  var onMouseMove = function () {
    changeInputOfferAdress(mainPin);
  };

  inputOfferAdress.addEventListener('change', function () {
    changeMainPinPosition();
  });

  inputOfferPrice.addEventListener('change', function () {
    changeInputOfferType();
  });

  inputOfferTimeIn.addEventListener('change', function () {
    changeInputOfferTimeOut();
  });

  inputOfferTimeOut.addEventListener('change', function () {
    changeInputOfferTimeIn();
  });

  inputOfferRoomsNumber.addEventListener('change', function () {
    changeInputOfferCapacity();
  });

  inputOfferCapacity.addEventListener('change', function () {
    changeInputOfferRoomsNumber();
  });

  inputOfferType.addEventListener('change', function () {
    changeInputOfferPice();
  });

  submitButtonInputOffer.addEventListener('click', function (evt) {
    if (showAllInvalid(checkedElements)) {
      noticeForm.submit();
    } else {
      showAllInvalid(checkedElements);
    }
  });

  submitButtonInputOffer.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterKeyDown(evt)) {
      if (showAllInvalid(checkedElements)) {
        noticeForm.submit();
      } else {
        showAllInvalid(checkedElements);
      }
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

  function isNecessaryOption(selectOption, textToCompare) {
    return selectOption.text.toLowerCase() === textToCompare;
  }

  function isOptionSelected(selectElement, valueOfOptionSelected) {
    return selectElement.value.toLowerCase() === valueOfOptionSelected;
  }

  function changelOptionSelected(selectElement, textToSelect) {
    for (var i = 0; i < selectElement.options.length; i++) {
      if (isNecessaryOption(selectElement.options[i], textToSelect)) {
        selectElement.options[i].selected = true;
        break;
      }
    }
  }

  function changeInputOfferType() {
    if (inputOfferPrice.value < 1000) {
      changelOptionSelected(inputOfferType, TYPE_OF_OFFER.hovel);
    } else if (inputOfferPrice.value < 10000) {
      changelOptionSelected(inputOfferType, TYPE_OF_OFFER.flat);
    } else {
      changelOptionSelected(inputOfferType, TYPE_OF_OFFER.palace);
    }
  }

  function changeInputOfferPice() {
    if (isOptionSelected(inputOfferType, TYPE_OF_OFFER.flat)) {
      inputOfferPrice.value = 1000;
    } else if (isOptionSelected(inputOfferType, TYPE_OF_OFFER.hovel)) {
      inputOfferPrice.value = 1;
    } else if (isOptionSelected(inputOfferType, TYPE_OF_OFFER.palace)) {
      inputOfferPrice.value = 10000;
    }
  }

  function changeInputOfferTimeOut() {
    if (isOptionSelected(inputOfferTimeIn, TIME_IN.twelve)) {
      changelOptionSelected(inputOfferTimeOut, TIME_OUT.twelve);
    } else if (isOptionSelected(inputOfferTimeIn, TIME_IN.thirteen)) {
      changelOptionSelected(inputOfferTimeOut, TIME_OUT.thirteen);
    } else if (isOptionSelected(inputOfferTimeIn, TIME_IN.fourteen)) {
      changelOptionSelected(inputOfferTimeOut, TIME_OUT.fourteen);
    }
  }

  function changeInputOfferTimeIn() {
    if (isOptionSelected(inputOfferTimeOut, TIME_OUT.twelve)) {
      changelOptionSelected(inputOfferTimeIn, TIME_IN.twelve);
    } else if (isOptionSelected(inputOfferTimeOut, TIME_OUT.thirteen)) {
      changelOptionSelected(inputOfferTimeIn, TIME_IN.thirteen);
    } else if (isOptionSelected(inputOfferTimeOut, TIME_OUT.fourteen)) {
      changelOptionSelected(inputOfferTimeIn, TIME_IN.fourteen);
    }
  }

  function changeInputOfferCapacity() {
    if (isOptionSelected(inputOfferRoomsNumber, ROOMS.one)) {
      changelOptionSelected(inputOfferCapacity, GUESTS.no);
    } else if (isOptionSelected(inputOfferRoomsNumber, ROOMS.two) || isOptionSelected(inputOfferRoomsNumber, ROOMS.hundred)) {
      changelOptionSelected(inputOfferCapacity, GUESTS.three);
    }
  }

  function changeInputOfferRoomsNumber() {
    if (isOptionSelected(inputOfferCapacity, GUESTS.no)) {
      changelOptionSelected(inputOfferRoomsNumber, ROOMS.one);
    } else if (isOptionSelected(inputOfferCapacity, GUESTS.three)) {
      changelOptionSelected(inputOfferRoomsNumber, ROOMS.two);
    }
  }

  function changeInputOfferAdress(draggedElement) {
    inputOfferAdress.value = 'x: ' + (draggedElement.offsetLeft + draggedElement.offsetWidth / 2) + ', y: ' + (draggedElement.offsetTop + draggedElement.offsetHeight);
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
    return coords - elementToPosition.offsetWidth / 2;
  }

  function changeMainPinPosition() {
    if (getSubstringAfterSymbols(inputOfferAdress.value, 'y: ') && getTopPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'y: '), 10))) {
      mainPin.style.top = getTopPositionValue(mainPin, parseInt(getSubstringAfterSymbols(inputOfferAdress.value, 'y: '), 10)) + 'px';
    }
    if (getSubstringAfterSymbols(inputOfferAdress.value, 'x: ')) {
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
