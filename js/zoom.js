'use strict';

(function () {
  var STEP = 25;
  var MIN_PICTURE_SIZE = 25;
  var MAX_PICTURE_SIZE = 100;

  var minus = window.formBlock.uploadOverlay.querySelector('.scale__control--smaller');
  var plus = window.formBlock.uploadOverlay.querySelector('.scale__control--bigger');

  // увеличить значение масштаба на 25 при каждом нажатии
  var onPlusPress = function () {
    if (parseInt(window.formBlock.sizeValue.value, 10) < MAX_PICTURE_SIZE) {
      window.formBlock.sizeValue.value = parseInt(window.formBlock.sizeValue.value, 10) + STEP + '%';
      window.formBlock.imgUpload.style.transform = 'scale(' + parseInt(window.formBlock.sizeValue.value, 10) / window.data.PERCENT + ')';
    }
  };

  // уменьшить значение масштаба на 25 при каждом нажатии
  var onMinusPress = function () {
    if (parseInt(window.formBlock.sizeValue.value, 10) > MIN_PICTURE_SIZE) {
      window.formBlock.sizeValue.value = parseInt(window.formBlock.sizeValue.value, 10) - STEP + '%';
      window.formBlock.imgUpload.style.transform = 'scale(' + parseInt(window.formBlock.sizeValue.value, 10) / window.data.PERCENT + ')';
    }
  };

  plus.addEventListener('click', onPlusPress);
  minus.addEventListener('click', onMinusPress);

})();
