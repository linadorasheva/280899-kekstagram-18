'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);

      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(window.formBlock.uploadOverlayClose);
        window.data.onSuccessAlert();
        window.data.addListenersOnBtn();
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
        window.data.addListenersOnBtn();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);

  };

  window.load = {
    load: load,
    upload: upload
  };
})();
