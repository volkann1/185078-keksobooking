'use strict';
window.offers = (function () {
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

  var NUMBER_OF_OFFERS = window.utils.makeArrayOfNumbers(8);

  var OFFER_TYPE = [
    'flat',
    'house',
    'bungalo'
  ];

  var HOURS = ['12:00', '13:00', '14:00'];

  function makeOffersDescriptions(numberOfOffers) {
    var offerDescriptionList = [];
    for (var i = 0; i < numberOfOffers; i++) {
      var offerDescription = {};
      offerDescription.author = {};
      offerDescription.author.avatar = 'img/avatars/user0' + window.utils.getAndDeleteRandomProperty(NUMBER_OF_OFFERS) + '.png';
      offerDescription.location = {};
      offerDescription.location.x = window.utils.getRandomNumber(300, 900);
      offerDescription.location.y = window.utils.getRandomNumber(100, 500);
      offerDescription.offer = {};
      offerDescription.offer.title = window.utils.getAndDeleteRandomProperty(TITLE);
      offerDescription.offer.address = offerDescription.location.x + ', ' + offerDescription.location.y;
      offerDescription.offer.price = window.utils.getRandomNumber(10, 10000) * 100;
      offerDescription.offer.type = window.utils.getRandomProperty(OFFER_TYPE);
      offerDescription.offer.rooms = window.utils.getRandomNumber(1, 5);
      offerDescription.offer.guests = window.utils.getRandomNumber(1, 5);
      offerDescription.offer.checkin = window.utils.getRandomProperty(HOURS);
      offerDescription.offer.checkout = window.utils.getRandomProperty(HOURS);
      offerDescription.offer.features = window.utils.generateArray(FEATURES, 1, 6);
      offerDescription.offer.description = '';
      offerDescription.offer.photos = [];
      offerDescriptionList[i] = offerDescription;
    }
    return offerDescriptionList;
  }
  return makeOffersDescriptions(8);
})();
