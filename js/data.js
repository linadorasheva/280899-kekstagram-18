'use strict';

(function () {
  var PERCENT = 100;
  var KeyCode = {
    ENTER_KEY_CODE: 13,
    ESC_KEY_CODE: 27
  };

  var errorTemplate = document.querySelector('#error').content;
  var mainBlock = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content;
  var errorMessage;
  var successMessage;

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
    return evt.keyCode === KeyCode.ESC_KEY_CODE;
  };

  // Открыть по enter
  var isEnterPress = function (evt) {
    return evt.keyCode === KeyCode.ENTER_KEY_CODE;
  };

  // Получаем сообщение об ошибке из шаблона
  var createAlert = function (template) {
    var element = template.cloneNode(true);

    return element;
  };

  // Сообщение при ошибочно-обработанном запросе
  var onErrorAlert = function (message) {
    mainBlock.appendChild(createAlert(errorTemplate));
    document.querySelector('.error__title').textContent = message;
  };

  // Сообщение при успешном запросе
  var onSuccessAlert = function () {
    mainBlock.appendChild(createAlert(successTemplate));
  };

  var messageDelete = function (message, cb) {
    document.removeEventListener('keydown', onOverlayKeydown);
    message.removeEventListener('click', cb);
    mainBlock.removeChild(message);
  };

  var onOverlayClickSuccess = function (evt) {
    if (evt.target.className === 'success' || evt.target.className === 'success__button') {
      checkMessage();
    }
  };

  var onOverlayClickError = function (evt) {
    if (evt.target.className === 'error' || evt.target.className === 'error__button') {
      checkMessage();
    }
  };

  var onOverlayKeydown = function (evt) {
    if (isEscPress(evt)) {
      checkMessage();
    }
  };

  var checkMessage = function () {
    if (document.querySelector('.error')) {
      errorMessage = document.querySelector('.error');
      messageDelete(errorMessage, onOverlayClickError);
    }

    if (document.querySelector('.success')) {
      successMessage = document.querySelector('.success');
      messageDelete(successMessage, onOverlayClickSuccess);
    }
  };

  var destroyAll = function (message, cb) {
    message.addEventListener('click', cb);
    document.addEventListener('keydown', onOverlayKeydown);
  };

  // Обработчики на сообщение ошибки
  var addListenersOnBtnsError = function () {
    errorMessage = document.querySelector('.error');

    destroyAll(errorMessage, onOverlayClickError);
  };

  // Обработчики на сообщение успеха
  var addListenersOnBtnsSuccess = function () {
    successMessage = document.querySelector('.success');

    destroyAll(successMessage, onOverlayClickSuccess);
  };

  window.data = {
    ENTER_KEY_CODE: KeyCode.ENTER_KEY_CODE,
    ESC_KEY_CODE: KeyCode.ESC_KEY_CODE,
    PERCENT: PERCENT,
    getRandomArrElement: getRandomArrElement,
    getRandomInteger: getRandomInteger,
    getProportion: getProportion,
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    onError: onErrorAlert,
    addListenersOnBtnsSuccess: addListenersOnBtnsSuccess,
    addListenersOnBtnsError: addListenersOnBtnsError,
    onSuccessAlert: onSuccessAlert
  };
})();
