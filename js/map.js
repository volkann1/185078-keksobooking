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

var pins = pinMap.querySelectorAll('.pin');
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
