'use strict';

var templatePicture = document.querySelector('#picture').content;

var mockComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда  вы  делаете  фотографию,  хорошо  бы  убирать  палец  из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var mockNames = [
  'Шелдон',
  'Говард',
  'Леонард',
  'Радж',
  'Стюарт',
  'Барри'
];

var QUANTITY_OBJECTS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 10;
var MIN_PHOTO_AVATAR = 1;
var MAX_PHOTO_AVATAR = 6;

// Контейнер для фотографий других пользователей
var picturesBlock = document.querySelector('.pictures');

// Функция, возвращающая случайный элемент массива
var getRandomArrElement = function (arr) {
  var randomArrElement = Math.floor(Math.random() * arr.length);

  return randomArrElement;
};

// Функция, возвращающая случайное число
var getRandomInteger = function (min, max) {
  var randomInteger = min - 0.5 + Math.random() * (max - min + 1);
  randomInteger = Math.round(randomInteger);
  return randomInteger;
};

// Функция, генерирующая текст комментария
var getMessage = function () {
  var messageArray = [];
  for (var i = 0; i < getRandomInteger(1, 2); i++) {
    messageArray[i] = mockComments[getRandomArrElement(mockComments)];
  }
  var message = messageArray.join(' ');
  return message;
};

// Функция, возвращающая массив объектов-комментариев к фото
var getComments = function () {
  var comments = [];
  var quantityComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  for (var j = 0; j <= quantityComments; j++) {
    comments[j] = {
      avatar: 'img/avatar-' + getRandomInteger(MIN_PHOTO_AVATAR, MAX_PHOTO_AVATAR) + '.svg',
      message: getMessage(),
      name: mockNames[getRandomArrElement(mockNames)]
    };
  }
  return comments;
};

// Функция, возвращающая массив объектов-фотографий
var getPictures = function () {
  var pictures = [];
  for (var i = 0; i < QUANTITY_OBJECTS; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'описание' + i,
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getComments(),
      quantityComments: (getComments()).length
    };
  }
  return pictures;
};

// Функция создания DOM-элемента на основе JS-объекта
var createPicture = function (object) {
  var element = templatePicture.cloneNode(true);

  element.querySelector('.picture__img').src = object.url;
  element.querySelector('.picture__likes').textContent = object.likes;
  element.querySelector('.picture__comments').textContent = object.quantityComments;

  return element;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPicture(array[i]));
  }
  picturesBlock.appendChild(fragment);
};

var pictures = getPictures(QUANTITY_OBJECTS);
renderPictures(pictures);
