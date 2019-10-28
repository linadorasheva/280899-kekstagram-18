'use strict';

(function () {
  var STEP = 25;
  var MIN_PICTURE_SIZE = 25;
  var MAX_PICTURE_SIZE = 100;

  var minus = window.formBlock.uploadOverlay.querySelector('.scale__control--smaller');
  var plus = window.formBlock.uploadOverlay.querySelector('.scale__control--bigger');

  var changeSize = function (evt) {
    if (evt.target.classList.contains('scale__control--bigger') && parseInt(window.formBlock.sizeValue.value, 10) < MAX_PICTURE_SIZE) {
      window.formBlock.sizeValue.value = parseInt(window.formBlock.sizeValue.value, 10) + STEP + '%';
    }
    if (evt.target.classList.contains('scale__control--smaller') && parseInt(window.formBlock.sizeValue.value, 10) > MIN_PICTURE_SIZE) {
      window.formBlock.sizeValue.value = parseInt(window.formBlock.sizeValue.value, 10) - STEP + '%';
    }
    window.formBlock.imgUpload.style.transform = 'scale(' + parseInt(window.formBlock.sizeValue.value, 10) / window.data.PERCENT + ')';
  };

  var onBtnSizeClick = function (evt) {
    changeSize(evt);
  };

  var plusListenerAdd = function () {
    return plus.addEventListener('click', onBtnSizeClick);
  };

  var plusListenerRemove = function () {
    return plus.removeEventListener('click', onBtnSizeClick);
  };

  var minusListenerAdd = function () {
    return minus.addEventListener('click',onBtnSizeClick);
  };

  var minusListenerRemove = function () {
    return minus.removeEventListener('click', onBtnSizeClick);
  };

  window.zoom = {
    plusListenerAdd: plusListenerAdd,
    plusListenerRemove: plusListenerRemove,
    minusListenerAdd: minusListenerAdd,
    minusListenerRemove: minusListenerRemove
  };

})();
