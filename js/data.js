'use strict';

(function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var PERCENT = 100;

  window.data = {
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    PERCENT: PERCENT,

    getRandomArrElement: function (arr) {
      var randomArrElement = Math.floor(Math.random() * arr.length);

      return randomArrElement;
    },

    getRandomInteger: function (min, max) {
      var randomInteger = min - 0.5 + Math.random() * (max - min + 1);
      randomInteger = Math.round(randomInteger);
      return randomInteger;
    },

    getProportion: function (paramOne, paramTwo) {
      return (paramOne / paramTwo).toFixed(1);
    }
  };
})();
