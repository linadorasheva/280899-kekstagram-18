'use strict';

(function () {
  var templatePicture = document.querySelector('#picture').content;

  var createPicture = function (object) {
    var element = templatePicture.cloneNode(true);

    element.querySelector('.picture__img').src = object.url;
    element.querySelector('.picture__img').alt = object.description;
    element.querySelector('.picture__likes').textContent = object.likes;
    element.querySelector('.picture__comments').textContent = object.comments.length;

    return element;
  };

  window.pictures = {
    createPicture: createPicture
  };
})();
