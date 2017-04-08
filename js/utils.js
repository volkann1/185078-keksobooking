'use strict';
window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var arrCopy = [];

  return {
    makeArrayOfNumbers: function (number) {
      var arr = [];
      for (var i = 0; i < number; i++) {
        arr[i] = i + 1;
      }
      return arr;
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomProperty: function (arr) {
      return arr[window.utils.getRandomNumber(0, arr.length - 1)];
    },

    getAndDeleteRandomProperty: function (arr) {
      var index = window.utils.getRandomNumber(0, arr.length - 1);
      var item = arr[index];
      arr.splice(index, 1);
      return item;
    },

    generateArray: function (arr, minLength, maxLength) {
      var newArray = [];
      arrCopy = arr.slice();
      for (var i = 0; i < window.utils.getRandomNumber(minLength, maxLength); i++) {
        var index = window.utils.getRandomNumber(0, arrCopy.length - 1);
        newArray[i] = arrCopy[index];
        arrCopy.splice(index, 1);
      }
      return newArray;
    },

    isCertainKeyDown: function (evt, certainKeyCode) {
      return evt.keyCode === certainKeyCode;
    },

    isEnterKeyDown: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },

    isEscKeyDown: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    }
  };
})();
