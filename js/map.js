'use strict';
var arrCopy = [];
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];

var NUMBER_OF_OFFERS = makeArrayOfNumbers(8);

var OFFER_TYPE = [
  'flat',
  'house',
  'bungalo'
];

var OFFER_TYPE_OBJECT = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var HOURS = ['12:00', '13:00', '14:00'];

var offers = makeOffersDescriptions(8);
var fragment = document.createDocumentFragment();
var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');

var onButtonClickCloseOfferDialog = function (evt) {
  evt.preventDefault();
  hideOfferDialog();
  deactivatePins();
  removeHandlersOnOfferDialog();
};

var onEscKeydownCloseOfferDialog = function (evt) {
  if (isCertainKeyDown(evt, ESC_KEY_CODE)) {
    hideOfferDialog();
    deactivatePins();
    removeHandlersOnOfferDialog();
  }
};

var onEnterKeydownCloseOfferDialog = function (evt) {
  if (isCertainKeyDown(evt, ENTER_KEY_CODE)) {
    evt.preventDefault();
    hideOfferDialog();
    deactivatePins();
    removeHandlersOnOfferDialog();
  }
};

function deactivatePins() {
  for (var i = 0; i < pins.length; i++) {
    if (pins[i].classList.contains('pin--active')) {
      pins[i].classList.remove('pin--active');
    }
  }
}

function showOfferDialog() {
  offerDialog.classList.remove('hidden');
}

function hideOfferDialog() {
  offerDialog.classList.add('hidden');
}

function getObjectPropertyByKey(obj, key) {
  return obj[key];
}

function makeArrayOfNumbers(number) {
  var arr = [];
  for (var i = 0; i < number; i++) {
    arr[i] = i + 1;
  }
  return arr;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomProperty(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

function getAndDeleteRandomProperty(arr) {
  var index = getRandomNumber(0, arr.length - 1);
  var item = arr[index];
  arr.splice(index, 1);
  return item;
}

function generateArray(arr, minLength, maxLength) {
  var newArray = [];
  arrCopy = arr.slice();
  for (var i = 0; i < getRandomNumber(minLength, maxLength); i++) {
    var index = getRandomNumber(0, arrCopy.length - 1);
    newArray[i] = arrCopy[index];
    arrCopy.splice(index, 1);
  }
  return newArray;
}

function makeOffersDescriptions(numberOfOffers) {
  var offerDescriptionList = [];
  for (var i = 0; i < numberOfOffers; i++) {
    var offerDescription = {};
    offerDescription.author = {};
    offerDescription.author.avatar = 'img/avatars/user0' + getAndDeleteRandomProperty(NUMBER_OF_OFFERS) + '.png';
    offerDescription.location = {};
    offerDescription.location.x = getRandomNumber(300, 900);
    offerDescription.location.y = getRandomNumber(100, 500);
    offerDescription.offer = {};
    offerDescription.offer.title = getAndDeleteRandomProperty(TITLE);
    offerDescription.offer.address = offerDescription.location.x + ', ' + offerDescription.location.y;
    offerDescription.offer.price = getRandomNumber(10, 10000) * 100;
    offerDescription.offer.type = getRandomProperty(OFFER_TYPE);
    offerDescription.offer.rooms = getRandomNumber(1, 5);
    offerDescription.offer.guests = getRandomNumber(1, 5);
    offerDescription.offer.checkin = getRandomProperty(HOURS);
    offerDescription.offer.checkout = getRandomProperty(HOURS);
    offerDescription.offer.features = generateArray(FEATURES, 1, 6);
    offerDescription.offer.description = '';
    offerDescription.offer.photos = [];
    offerDescriptionList[i] = offerDescription;
  }
  return offerDescriptionList;
}

function createPin(offer) {
  var pin = document.createElement('div');
  pin.innerHTML = '<img src="' + offer.author.avatar + '" style = "max-width:38px;">';
  pin.classList.add('pin');
  pin.tabIndex = '0';
  pin.style.left = offer.location.x + 28 + 'px';
  pin.style.top = offer.location.y + 75 + 'px';
  return pin;
}

function createOfferDialog(offerObject) {
  var newOfferDialog = lodgeTemplate.cloneNode(true);
  var lodgeFeatures = newOfferDialog.querySelector('.lodge__features');
  newOfferDialog.querySelector('.lodge__title').textContent = offerObject.offer.title;
  newOfferDialog.querySelector('.lodge__address').textContent = offerObject.offer.address;
  newOfferDialog.querySelector('.lodge__price').textContent = offerObject.offer.price + '₽/ночь';
  newOfferDialog.querySelector('.lodge__type').textContent = getObjectPropertyByKey(OFFER_TYPE_OBJECT, offerObject.offer.type);
  newOfferDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offerObject.offer.guests + ' гостей в ' + offerObject.offer.rooms + ' комнатах';
  newOfferDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;

  for (i = 0; i < offerObject.offer.features.length; i++) {
    var feature = document.createElement('span');
    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + offerObject.offer.features[i]);
    lodgeFeatures.appendChild(feature);
  }
  newOfferDialog.querySelector('.lodge__description').textContent = offerObject.offer.description;
  return newOfferDialog;
}

function setActivePin(evt) {
  deactivatePins();
  evt.currentTarget.classList.add('pin--active');
}

function renderDialog(evt, offersDescriptionList) {
  var index;
  for (var i = 0; i < offersDescriptionList.length; i++) {
    if (evt.currentTarget.querySelector('img').src.indexOf(offersDescriptionList[i].author.avatar) + 1) {
      index = i;
      break;
    }
  }
  var dialogPanel = document.querySelector('.dialog__panel');
  dialogPanel.parentElement.replaceChild(createOfferDialog(offers[index]), dialogPanel);
  var avatar = offerDialog.querySelector('.dialog__title>img');
  avatar.src = offersDescriptionList[index].author.avatar;
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

function isCertainKeyDown(evt, certainKeyCode) {
  return evt.keyCode === certainKeyCode;
}

function activatePinAndShowOfferDialog(evt) {
  setActivePin(evt);
  renderDialog(evt, offers);
  showOfferDialog();
  addHandlersOnOfferDialog(evt);
}

for (var i = 0; i < offers.length; i++) {
  fragment.appendChild(createPin(offers[i]));
}

pinMap.appendChild(fragment);

var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
for (i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', function (evt) {
    activatePinAndShowOfferDialog(evt);
  });
  pins[i].addEventListener('keydown', function (evt) {
    if (isCertainKeyDown(evt, ENTER_KEY_CODE)) {
      activatePinAndShowOfferDialog(evt);
    }
  });
}

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
  for (i = 0; i < selectElement.options.length; i++) {
    if (isNecessaryOption(selectElement.options[i], textToSelect)) {
      selectElement.options[i].selected = true;
      selectElement.options[i].disabled = false;
      break;
    }
  }
}

function disableAllOptions(selectElement) {
  for (i = 0; i < selectElement.options.length; i++) {
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
  for (i = 0; i < elemetsToCheck.length; i++) {
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
  if (isCertainKeyDown(evt, ENTER_KEY_CODE)) {
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
