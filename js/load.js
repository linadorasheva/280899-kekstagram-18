'use strict';

(function () {
  var Url = {
    URL_LOAD: 'https://js.dump.academy/kekstagram/data',
    URL_UPLOAD: 'https://js.dump.academy/kekstagram'
  };

  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function (evt) {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
        window.load.responseArray = xhr.response;
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
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
    xhr.open('GET', Url.URL_LOAD);
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
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
        window.formBlock.uploadOverlayClose();
        window.data.addListenersOnBtnsError(evt);
      }
    });

    xhr.addEventListener('error', function (evt) {
      onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      window.formBlock.uploadOverlayClose();
      window.data.addListenersOnBtnsError(evt);
    });

    xhr.addEventListener('timeout', function (evt) {
      onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      window.formBlock.uploadOverlayClose();
      window.data.addListenersOnBtnsError(evt);
    });

    xhr.timeout = TIMEOUT;
    xhr.open('POST', Url.URL_UPLOAD);
    xhr.send(data);
  };

  window.load = {
    load: load,
    upload: upload
  };
})();
