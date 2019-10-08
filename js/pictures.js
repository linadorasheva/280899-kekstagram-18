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
        description: 'описание фотографии ' + i,
        likes: window.data.getRandomInteger(MIN_LIKES, MAX_LIKES),
        comments: window.bigPicture.getComments(),
        quantityComments: (window.bigPicture.getComments()).length
      };
    }
    return pictures;
  };

  var createPicture = function (object) {
    var element = templatePicture.cloneNode(true);

    element.querySelector('.picture__img').src = object.url;
    element.querySelector('.picture__img').alt = object.description;
    element.querySelector('.picture__likes').textContent = object.likes;
    element.querySelector('.picture__comments').textContent = object.quantityComments;

    return element;
  };

  window.pictures = {
    QUANTITY_OBJECTS: QUANTITY_OBJECTS,

    createPicture: createPicture,

    pictures: getPictures(QUANTITY_OBJECTS)
  };
})();
