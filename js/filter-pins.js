'use strict';
(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinElements = pinMap.querySelectorAll('.pin:not(.pin__main)');
  var filteredPins;
  var filterProperties = {
    rooms: 'any',
    type: 'any',
    price: 'middle',
    guests: 'any',
    wifi: 'any',
    dishwasher: 'any',
    parking: 'any',
    washer: 'any',
    elevator: 'any',
    conditioner: 'any'
  };

  var filtersElement = document.querySelector('.tokyo__filters-container');
  var typeFilter = filtersElement.querySelector('#housing_type');
  var priceFilter = filtersElement.querySelector('#housing_price');
  var guestsFilter = filtersElement.querySelector('#housing_guests-number');
  var roomsFilter = filtersElement.querySelector('#housing_room-number');
  var wifiFilter = filtersElement.querySelector('.tokyo__filter-set input[value="wifi"]');
  var dishwasherFilter = filtersElement.querySelector('.tokyo__filter-set input[value="dishwasher"]');
  var parkingFilter = filtersElement.querySelector('.tokyo__filter-set input[value="parking"]');
  var washerFilter = filtersElement.querySelector('.tokyo__filter-set input[value="washer"]');
  var elevatorFilter = filtersElement.querySelector('.tokyo__filter-set input[value="elevator"]');
  var conditionerFilter = filtersElement.querySelector('.tokyo__filter-set input[value = "conditioner"]');

  var selectElements = {
    type: typeFilter,
    price: priceFilter,
    guests: guestsFilter,
    rooms: roomsFilter
  };

  var checkboxElements = {
    wifi: wifiFilter,
    dishwasher: dishwasherFilter,
    parking: parkingFilter,
    washer: washerFilter,
    elevator: elevatorFilter,
    conditioner: conditionerFilter
  };

  var updatePins = function () {
    [].forEach.call(pinElements, function (it) {
      it.classList.add('hidden');
    });
    filteredPins.forEach(function (it) {
      it.classList.remove('hidden');
    });
  };

  var filterBySelectChange = function (selectElement, key) {
    selectElement.addEventListener('change', function () {
      window.debounce(function () {
        for (var i = 0; i < selectElement.options.length; i++) {
          var option = selectElement.options[i];
          if (option.selected) {
            filterProperties[key] = option.value;
            break;
          }
        }
        window.filterAndUpdatePins();
      });
    });
  };

  var filterByCheckboxChange = function (checkboxElement, key) {
    checkboxElement.addEventListener('change', function () {
      window.debounce(function () {
        if (checkboxElement.checked) {
          filterProperties[key] = 'true';
        } else {
          filterProperties[key] = 'any';
        }
        window.filterAndUpdatePins();
      });
    });
  };

  window.filterAndUpdatePins = function () {
    filterPinsByAllFeatures();
    updatePins();
    window.hideOfferDialog();
  };

  for (var propertyName in selectElements) {
    if (selectElements.hasOwnProperty(propertyName)) {
      filterBySelectChange(selectElements[propertyName], propertyName);
    }
  }

  for (var propName in checkboxElements) {
    if (checkboxElements.hasOwnProperty(propName)) {
      filterByCheckboxChange(checkboxElements[propName], propName);
    }
  }

  function filterPinsByOneFeature(key) {
    if (!(filterProperties[key] === 'any')) {
      filteredPins = filteredPins.filter(function (it) {
        return it.dataset[key] === filterProperties[key];
      });
    }
    return filteredPins;
  }

  function filterPinsByAllFeatures() {
    pinElements = pinMap.querySelectorAll('.pin:not(.pin__main)');
    filteredPins = [].slice.call(pinElements);
    for (var key in filterProperties) {
      if (filterProperties.hasOwnProperty(key)) {
        filterPinsByOneFeature(key);
      }
    }
    return filteredPins;
  }
})();
