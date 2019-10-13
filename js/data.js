'use strict';

(function () {
  var KeyCode = {
    ENTER_KEY_CODE: 13,
    ESC_KEY_CODE: 27
  };

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

  var errorTemplate = document.querySelector('#error').content;
  var mainBlock = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content;

  // Получаем сообщение об ошибке из шаблона
  var createAlert = function (template) {
    var element = template.cloneNode(true);

    return element;
  };

  // Сообщение при ошибочно-обработанном запросе
  var onError = function (message) {
    mainBlock.appendChild(createAlert(errorTemplate));
    document.querySelector('.error__title').textContent = message;
  };

  // Сообщение при успешном запросе
  var onSuccessAlert = function () {
    mainBlock.appendChild(createAlert(successTemplate));
  };

  var destroyAll = function(message, state) {
    var messageDelete = function (message) {
      mainBlock.removeChild(message);
      document.removeEventListener('keydown', onAlertClose);
      message.removeEventListener('click', onAlertClose);
    };

    var onAlertClose = function (evt) {
      if (isEscPress(evt) || evt.target.className === state || evt.target.className === state + '__button') {
        messageDelete(message);
      } else {
        evt.stopPropagation();
      }
    };
    message.addEventListener('click', onAlertClose);
    document.addEventListener('keydown', onAlertClose);
  };

  // Обработчики на сообщение ошибки
  var addListenersOnBtnsError = function () {
    var errorMessage = document.querySelector('.error');

    destroyAll(errorMessage, 'error');
  };

  // Обработчики на сообщение успеха
  var addListenersOnBtnsSuccess = function () {
    var successMessage = document.querySelector('.success');

    destroyAll(successMessage, 'success');
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
    onError: onError,
    addListenersOnBtnsSuccess: addListenersOnBtnsSuccess,
    addListenersOnBtnsError: addListenersOnBtnsError,
    onSuccessAlert: onSuccessAlert
  };
})();
