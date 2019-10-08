'use strict';

(function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var PERCENT = 100;

  var getRandomArrElement = function (arr) {
    var randomArrElement = Math.floor(Math.random() * arr.length);

    return randomArrElement;
  };

  var getRandomInteger = function (min, max) {
    var randomInteger = min - 0.5 + Math.random() * (max - min + 1);
    randomInteger = Math.round(randomInteger);
    return randomInteger;
  };

  var getProportion = function (paramOne, paramTwo) {
    return (paramOne / paramTwo).toFixed(1);
  };

  // Закрыть по escape
  var isEscPress = function (evt) {
    return evt.keyCode === window.data.ESC_KEY_CODE;
  };

  // Открыть по enter
  var isEnterPress = function (evt) {
    return evt.keyCode === window.data.ENTER_KEY_CODE;
  };

  window.data = {
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    PERCENT: PERCENT,
    getRandomArrElement: getRandomArrElement,
    getRandomInteger: getRandomInteger,
    getProportion: getProportion,
    isEscPress: isEscPress,
    isEnterPress: isEnterPress
  };
})();
