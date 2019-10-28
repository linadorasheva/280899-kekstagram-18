'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var Url = {
    URL_LOAD: 'https://js.dump.academy/kekstagram/data',
    URL_UPLOAD: 'https://js.dump.academy/kekstagram'
  };

  var makeRequest = function (flag, url, metod, onSuccess, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function (evt) {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
        if (flag) {
          window.data.onSuccessAlert();
          window.data.addListenersOnBtnsSuccess();
        } else {
          window.load.responseArray = xhr.response;
          document.querySelector('.img-filters').classList.remove('img-filters--inactive');
        }
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
        window.data.addListenersOnBtnsError(evt);
        if (flag) {
          window.formBlock.uploadOverlayClose();
        }
      }
    });

    xhr.addEventListener('error', function (evt) {
      onError('Произошла ошибка соединения');
      window.data.addListenersOnBtnsError(evt);
      if (flag) {
        window.formBlock.uploadOverlayClose();
      }
    });

    xhr.addEventListener('timeout', function (evt) {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      window.data.addListenersOnBtnsError(evt);
      if (flag) {
        window.formBlock.uploadOverlayClose();
      }
    });

    xhr.timeout = TIMEOUT;
    xhr.open(metod, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.load = {
    makeRequest: makeRequest,
    Url: Url
  };
})();
