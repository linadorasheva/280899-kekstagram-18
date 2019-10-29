'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var Url = {
    URL_LOAD: 'https://js.dump.academy/kekstagram/data',
    URL_UPLOAD: 'https://js.dump.academy/kekstagram'
  };

  var makeRequest = function (flag, url, method, onSuccess, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function (evt) {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
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

    if (flag) {
      upload(xhr);
    } else {
      load(xhr);
    }

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var upload = function (xhr) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        window.data.onSuccessAlert();
        window.data.addListenersOnBtnsSuccess();
      } else {
        window.formBlock.uploadOverlayClose();
      }
    });

    xhr.addEventListener('error', function () {
      window.formBlock.uploadOverlayClose();
    });

    xhr.addEventListener('timeout', function () {
      window.formBlock.uploadOverlayClose();
    });
  };

  var load = function (xhr) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        window.load.responseArray = xhr.response;
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      }
    });
  };

  window.load = {
    makeRequest: makeRequest,
    Url: Url
  };
})();
