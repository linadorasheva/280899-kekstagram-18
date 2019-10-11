'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var comments = [];

  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function (evt) {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
        comments = xhr.response.forEach(function (element) {
          comments.push(element.comments);
        });
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
        window.data.addListenersOnBtnsError(evt);
      }
    });

    xhr.addEventListener('error', function (evt) {
      onError('Произошла ошибка соединения');
      window.data.addListenersOnBtnsError(evt);
    });

    xhr.addEventListener('timeout', function (evt) {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      window.data.addListenersOnBtnsError(evt);
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function (evt) {
      if (xhr.status === STATUS_OK) {
        onSuccess(window.formBlock.uploadOverlayClose);
        window.data.onSuccessAlert();
        window.data.addListenersOnBtnsSuccess();
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText, window.formBlock.uploadOverlayClose);
        window.data.addListenersOnBtnsError(evt);
      }
    });

    xhr.addEventListener('error', function (evt) {
      onError('Произошла ошибка соединения', window.formBlock.uploadOverlayClose);
      window.data.addListenersOnBtnsError(evt);
    });

    xhr.addEventListener('timeout', function (evt) {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', window.formBlock.uploadOverlayClose);
      window.data.addListenersOnBtnsError(evt);
    });

    xhr.timeout = TIMEOUT;
    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };

  window.load = {
    load: load,
    upload: upload,
    comments: comments
  };
})();
