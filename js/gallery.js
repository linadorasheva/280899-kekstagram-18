'use strict';

(function () {
  // Контейнер для фотографий других пользователей
  var picturesBlock = document.querySelector('.pictures');

  // Функция заполнения блока DOM-элементами на основе массива JS-объектов
  var renderPictures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pictures.createPicture(array[i]));
    }
    picturesBlock.appendChild(fragment);
  };

  renderPictures(window.pictures.pictures);

  var picturesList = document.querySelectorAll('.picture');

  for (var j = 0; j < window.pictures.QUANTITY_OBJECTS; j++) {
    picturesList[j].addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.tagName === 'IMG') {
        window.bigPicture.bigPictureOpen(evt);
      }
    }, true);

    picturesList[j].addEventListener('keydown', window.bigPicture.onEnterPress);
  }
})();
