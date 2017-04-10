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
  var submitButtonInputOffer = noticeForm.querySelector('.form__submit');

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
        selectElement.options[i].disabled = false;
        break;
      }
    }
  }

  function disableAllOptions(selectElement) {
    for (var i = 0; i < selectElement.options.length; i++) {
      selectElement.options[i].disabled = true;
    }
  }

  function changeInputOfferType() {
    disableAllOptions(inputOfferType);
    if (inputOfferPrice.value < 1000) {
      changelOptionSelected(inputOfferType, TYPE_OF_OFFER.hovel);
    } else if (inputOfferPrice.value < 10000) {
      changelOptionSelected(inputOfferType, TYPE_OF_OFFER.flat);
    } else {
      changelOptionSelected(inputOfferType, TYPE_OF_OFFER.palace);
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
})();
