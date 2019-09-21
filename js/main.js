'use strict';

var templatePicture = document.querySelector('#picture').content;
var fragment = document.createDocumentFragment();

var mockComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда  вы  делаете  фотографию,  хорошо  бы  убирать  палец  из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var quantityObjects = 25;
var minLikes = 15;
var maxLikes = 200;
var minComments = 1;
var maxComments = 10;

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

// Функция, возвращающая массив объектов
var getPictures = function (quantity) {
  var pictures = [];
  for (var i = 0; i < quantity; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'описание' + i,
      likes: getRandomInteger(minLikes, maxLikes),
      comments: getRandomArrElement(mockComments),
      quantityComments: getRandomInteger(minComments, maxComments)
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
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPicture(array[i]));
  }
  picturesBlock.appendChild(fragment);
};

var pictures = getPictures(quantityObjects);
renderPictures(pictures);
