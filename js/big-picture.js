'use strict';

(function () {

  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 10;
  var MIN_PHOTO_AVATAR = 1;
  var MAX_PHOTO_AVATAR = 6;

  var mockNames = [
    'Шелдон',
    'Говард',
    'Леонард',
    'Радж',
    'Стюарт',
    'Барри'
  ];

  var mockComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда  вы  делаете  фотографию,  хорошо  бы  убирать  палец  из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // Функция, генерирующая текст комментария
  var getMessage = function () {
    var messageArray = [];
    for (var i = 0; i < window.data.getRandomInteger(1, 2); i++) {
      messageArray[i] = mockComments[window.data.getRandomArrElement(mockComments)];
    }
    var message = messageArray.join(' ');
    return message;
  };

  // Функция, возвращающая массив объектов-комментариев к фото
  window.getComments = function () {
    var comments = [];
    var quantityComments = window.data.getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
    for (var j = 0; j <= quantityComments; j++) {
      comments[j] = {
        avatar: 'img/avatar-' + window.data.getRandomInteger(MIN_PHOTO_AVATAR, MAX_PHOTO_AVATAR) + '.svg',
        message: getMessage(),
        name: mockNames[window.data.getRandomArrElement(mockNames)]
      };
    }
    return comments;
  };
})();
