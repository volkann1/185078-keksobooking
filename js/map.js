'use strict';
var arrayCopy = [];
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

var HOURS = ['12:00', '13:00', '14:00'];

var offers = makeOffersDescriptions(8);
var fragment = document.createDocumentFragment();
var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');
var newOfferDialogElement = createOfferDialog(offers[0]);

function makeArrayOfNumbers(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array[i] = i + 1;
  }
  return array;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomProperty(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function getAndDeleteRandomProperty(array) {
  var index = getRandomNumber(0, array.length - 1);
  var item = array[index];
  array.splice(index, 1);
  return item;
}

function generateArray(array) {
  var newArray = [];
  arrayCopy = array.slice();
  for (var i = 0; i < getRandomNumber(0, arrayCopy.length); i++) {
    var index = getRandomNumber(0, arrayCopy.length - 1);
    newArray[i] = arrayCopy[index];
    arrayCopy.splice(index, 1);
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
    offerDescription.offer.price = getRandomNumber(1000, 1000000);
    offerDescription.offer.type = getRandomProperty(OFFER_TYPE);
    offerDescription.offer.rooms = getRandomNumber(1, 5);
    offerDescription.offer.guests = getRandomNumber(1, 5);
    offerDescription.offer.checkin = getRandomProperty(HOURS);
    offerDescription.offer.checkout = getRandomProperty(HOURS);
    offerDescription.offer.features = generateArray(FEATURES);
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
  if (offerObject.offer.type === 'flat') {
    newOfferDialog.querySelector('.lodge__type').textContent = 'Квартира';
  } else
  if (offerObject.offer.type === 'bungalo') {
    newOfferDialog.querySelector('.lodge__type').textContent = 'Бунгало';
  } else {
    newOfferDialog.querySelector('.lodge__type').textContent = 'Дом';
  }
  newOfferDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offerObject.offer.guests + ' гостей в ' + offerObject.offer.rooms + ' комнатах';
  newOfferDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;

  for (i = 0; i < offerObject.offer.features.length; i++) {
    var feature = document.createElement('span');
    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + offerObject.offer.features[i]);
    lodgeFeatures.appendChild(feature);
  }
  newOfferDialog.querySelector('.lodge__description').textContent = offerObject.offer.description;
  newOfferDialog.querySelector('.dialog__panel').classList.add('dialog');
  return newOfferDialog;
}


for (var i = 0; i < offers.length; i++) {
  fragment.appendChild(createPin(offers[i]));
}

pinMap.appendChild(fragment);

offerDialog.parentElement.replaceChild(newOfferDialogElement, offerDialog);
