'use strict';

(function () {
  var templatePicture = document.querySelector('#picture').content;

  var QUANTITY_OBJECTS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  // Функция, возвращающая массив объектов-фотографий
  var getPictures = function () {
    var pictures = [];
    for (var i = 0; i < QUANTITY_OBJECTS; i++) {
      pictures[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'описание' + i,
        likes: window.data.getRandomInteger(MIN_LIKES, MAX_LIKES),
        comments: window.getComments(),
        quantityComments: (window.getComments()).length
      };
    }
    return pictures;
  };

  window.pictures = {

    createPicture: function (object) {
      var element = templatePicture.cloneNode(true);

      element.querySelector('.picture__img').src = object.url;
      element.querySelector('.picture__likes').textContent = object.likes;
      element.querySelector('.picture__comments').textContent = object.quantityComments;

      return element;
    },

    pictures: getPictures(QUANTITY_OBJECTS)
  };
})();
