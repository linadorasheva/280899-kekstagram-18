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


  var errorTemplate = document.querySelector('#error').content;
  var mainBlock = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content;

  // Получаем сообщение об ошибке из шаблона
  var createAlert = function (template) {
    var element = template.cloneNode(true);

    return element;
  };

  // Сообщение при ошибочно-обработанном запросе
  var onError = function (message, action) {
    mainBlock.appendChild(createAlert(errorTemplate));
    document.querySelector('.error__title').textContent = message;
    if (action) {
      action();
    }
  };

  // Сообщение при успешном запросе
  var onSuccessAlert = function () {
    mainBlock.appendChild(createAlert(successTemplate));
  };

  // Обработчики на сообщение ошибки
  var addListenersOnBtnsError = function () {
    var errorMessage = document.querySelector('.error');

    var onAlertClose = function (evt) {
      switch (true) {
        case window.data.isEscPress(evt):
          mainBlock.removeChild(errorMessage);
          document.removeEventListener('keydown', onAlertClose);
          errorMessage.removeEventListener('click', onAlertClose);
          break;
        case evt.target.className === 'error':
          mainBlock.removeChild(errorMessage);
          document.removeEventListener('keydown', onAlertClose);
          errorMessage.removeEventListener('click', onAlertClose);
          break;
        case evt.target.className === 'error__button':
          mainBlock.removeChild(errorMessage);
          document.removeEventListener('keydown', onAlertClose);
          errorMessage.removeEventListener('click', onAlertClose);
          break;
        default: evt.stopPropagation();
      }
    };

    errorMessage.addEventListener('click', onAlertClose);
    document.addEventListener('keydown', onAlertClose);
  };

  // Обработчики на сообщение успеха
  var addListenersOnBtnsSuccess = function () {
    var successMessage = document.querySelector('.success');

    var onAlertClose = function (evt) {
      switch (true) {
        case isEscPress(evt):
          mainBlock.removeChild(successMessage);
          document.removeEventListener('keydown', onAlertClose);
          successMessage.removeEventListener('click', onAlertClose);
          break;
        case evt.target.className === 'success':
          mainBlock.removeChild(successMessage);
          document.removeEventListener('keydown', onAlertClose);
          successMessage.removeEventListener('click', onAlertClose);
          break;
        case evt.target.className === 'success__button':
          mainBlock.removeChild(successMessage);
          document.removeEventListener('keydown', onAlertClose);
          successMessage.removeEventListener('click', onAlertClose);
          break;
        default: evt.stopPropagation();
      }
    };

    successMessage.addEventListener('click', onAlertClose);
    document.addEventListener('keydown', onAlertClose);
  };

  window.data = {
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
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
