'use strict';

(function () {
  // Контейнер для фотографий других пользователей
  var picturesBlock = document.querySelector('.pictures');

  var addListeners = function () {
    var picturesList = document.querySelectorAll('.picture');

    picturesList.forEach(function (element) {
      element.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.tagName === 'IMG') {
          window.bigPicture.bigPictureOpen(evt);
        }
      }, true);

      element.addEventListener('keydown', window.bigPicture.onEnterPress);
    });
  };

  // Отрисовываем фото, загруженные с сервера (в случае успешно-обработанного запроса)
  window.renderPictures = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (element) {
      fragment.appendChild(window.pictures.createPicture(element));
    });

    picturesBlock.appendChild(fragment);
    addListeners();
  };

  window.load.load(window.renderPictures, window.data.onError);

})();

