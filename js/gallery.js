'use strict';

(function () {
  // Контейнер для фотографий других пользователей
  var picturesBlock = document.querySelector('.pictures');

  var addListeners = function () {
    var picturesList = document.querySelectorAll('.picture');
    for (var j = 0; j < picturesList.length; j++) {
      picturesList[j].addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.tagName === 'IMG') {
          window.bigPicture.bigPictureOpen(evt);
        }
      }, true);

      picturesList[j].addEventListener('keydown', window.bigPicture.onEnterPress);
    }
  };

  // Отрисовываем фото, загруженные с сервера (в случае успешно-обработанного запроса)
  window.renderPictures = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pictures.createPicture(array[i]));
    }
    picturesBlock.appendChild(fragment);
    addListeners();
  };

  window.load.load(window.renderPictures, window.data.onError);

})();

