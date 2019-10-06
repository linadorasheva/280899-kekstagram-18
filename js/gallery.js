'use strict';

(function () {
  // Контейнер для фотографий других пользователей
  var picturesBlock = document.querySelector('.pictures');
  var errorTemplate = document.querySelector('#error').content;
  var mainBlock = document.querySelector('main');

  // Отрисовываем фото, загруженные с сервера (в случае успешно-обработанного запроса)
  var onSuccess = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pictures.createPicture(array[i]));
    }
    picturesBlock.appendChild(fragment);
  };

  // Получаем сообщение об ошибке из шаблона
  var createError = function () {
    var element = errorTemplate.cloneNode(true);

    return element;
  };

  // Сообщение при ошибочно-обработанном запросе
  var onError = function (message) {
    mainBlock.appendChild(createError());
    document.querySelector('.error__title').textContent = message;
  };

  window.load(onSuccess, onError);
})();
