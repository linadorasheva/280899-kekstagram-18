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

  // Отрисовываем фото, загруженные с сервера (в случае успешно-обработанного запроса)
  var onSuccess = function (action, data) {
    if (data) {
      action(data);
    }

    action();
  };

  var onSuccessAlert = function () {
    mainBlock.appendChild(createAlert(successTemplate));
  };


  var addListenersOnBtn = function () {
    var errorMessage = document.querySelector('.error');
    var btnsError = document.querySelectorAll('.error__button');

    var successMessage = document.querySelector('.success');
    var btnSuccess = document.querySelector('.success__button');

    if (btnSuccess) {
      btnSuccess.addEventListener('click', function () {
        mainBlock.removeChild(successMessage);
      });

      successMessage.addEventListener('click', function () {
        mainBlock.removeChild(successMessage);
      });

      document.addEventListener('keydown', function (evt) {
        if (window.data.isEscPress(evt)) {
          mainBlock.removeChild(successMessage);
        }
      });
    } else {
      for (var i = 0; i < btnsError.length; i++) {
        btnsError[i].addEventListener('click', function () {
          mainBlock.removeChild(errorMessage);
        });
      }

      errorMessage.addEventListener('click', function () {
        mainBlock.removeChild(errorMessage);
      });

      document.addEventListener('keydown', function (evt) {
        if (window.data.isEscPress(evt)) {
          mainBlock.removeChild(errorMessage);
        }
      });
    }
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
    onSuccess: onSuccess,
    addListenersOnBtn: addListenersOnBtn,
    onSuccessAlert: onSuccessAlert
  };
})();
