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
    return newOfferDialog;
  }

  return function (evt, offersDescriptionList) {
    var index;
    for (var i = 0; i < offersDescriptionList.length; i++) {
      if (evt.currentTarget.querySelector('img').src.indexOf(offersDescriptionList[i].author.avatar) + 1) {
        index = i;
        break;
      }
    }
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanel.parentElement.replaceChild(createOfferDialog(window.offers[index]), dialogPanel);
    var avatar = offerDialog.querySelector('.dialog__title>img');
    avatar.src = offersDescriptionList[index].author.avatar;
  };
})();
