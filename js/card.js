'use strict';

window.renderDialog = (function () {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('#offer-dialog');

  var OFFER_TYPE_OBJECT = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  function createOfferDialog(offerObject) {
    var newOfferDialog = lodgeTemplate.cloneNode(true);
    var lodgeFeatures = newOfferDialog.querySelector('.lodge__features');
    var fragment = document.createDocumentFragment();
    var photosBlock = newOfferDialog.querySelector('.lodge__photos');
    newOfferDialog.querySelector('.lodge__title').textContent = offerObject.offer.title;
    newOfferDialog.querySelector('.lodge__address').textContent = offerObject.offer.address;
    newOfferDialog.querySelector('.lodge__price').textContent = offerObject.offer.price + '₽/ночь';
    newOfferDialog.querySelector('.lodge__type').textContent = OFFER_TYPE_OBJECT[offerObject.offer.type];
    newOfferDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offerObject.offer.guests + ' гостей в ' + offerObject.offer.rooms + ' комнатах';
    newOfferDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;

    for (var i = 0; i < offerObject.offer.features.length; i++) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + offerObject.offer.features[i]);
      lodgeFeatures.appendChild(feature);
    }
    newOfferDialog.querySelector('.lodge__description').textContent = offerObject.offer.description;
    for (i = 0; i < offerObject.offer.photos.length; i++) {
      var link = document.createElement('a');
      link.href = offerObject.offer.photos[i];
      var image = document.createElement('img');
      image.src = offerObject.offer.photos[i];
      image.width = 52;
      image.height = 42;
      link.appendChild(image);
      fragment.appendChild(link);
    }
    photosBlock.appendChild(fragment);
    return newOfferDialog;
  }

  return function (evt, offersDescriptionList) {
    var currentPin = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;
    if (!currentPin.classList.contains('pin__main')) {
      var index = currentPin.dataset.index;
      var dialogPanel = document.querySelector('.dialog__panel');
      dialogPanel.parentElement.replaceChild(createOfferDialog(offersDescriptionList[index]), dialogPanel);
      var avatar = offerDialog.querySelector('.dialog__title>img');
      avatar.src = offersDescriptionList[index].author.avatar;
    }
  };
})();
