'use strict';

(function () {

  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 10;
  var MIN_PHOTO_AVATAR = 1;
  var MAX_PHOTO_AVATAR = 6;

  var MOCK_NAMES = [
    'Шелдон',
    'Говард',
    'Леонард',
    'Радж',
    'Стюарт',
    'Барри'
  ];

  var MOCK_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда  вы  делаете  фотографию,  хорошо  бы  убирать  палец  из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var WIDTH_IMG = '35px';
  var HEIGHT_IMG = '35px';

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  // Функция, генерирующая текст комментария
  var getMessage = function () {
    var messageArray = [];
    for (var i = 0; i < window.data.getRandomInteger(1, 2); i++) {
      messageArray[i] = MOCK_COMMENTS[window.data.getRandomArrElement(MOCK_COMMENTS)];
    }
    var message = messageArray.join(' ');
    return message;
  };

  // Функция, возвращающая массив объектов-комментариев к фото
  var getComments = function () {
    var comments = [];
    var quantityComments = window.data.getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
    for (var j = 0; j <= quantityComments; j++) {
      comments[j] = {
        avatar: 'img/avatar-' + window.data.getRandomInteger(MIN_PHOTO_AVATAR, MAX_PHOTO_AVATAR) + '.svg',
        message: getMessage(),
        name: MOCK_NAMES[window.data.getRandomArrElement(MOCK_NAMES)]
      };
    }
    return comments;
  };

  // Разметка одного комментария
  var createComment = function (arrayEl) {
    var elementLi = document.createElement('li');
    elementLi.classList.add('social__comment');

    var elementImg = document.createElement('img');
    elementImg.classList.add('social__picture');
    elementImg.src = arrayEl.avatar;
    elementImg.alt = arrayEl.name;
    elementImg.style.width = WIDTH_IMG;
    elementImg.style.height = HEIGHT_IMG;
    elementLi.appendChild(elementImg);

    var elementP = document.createElement('p');
    elementP.classList.add('social__text');
    elementP.textContent = arrayEl.message;
    elementLi.appendChild(elementP);

    return elementLi;
  };

  // Массив комментариев
  var getArrayComments = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createComment(array[i]));
    }
    return fragment;
  };

  var hiddenBlock = function (block) {
    block.classList.add('visually-hidden');
  };

  // Функция создания fullscreen - фото
  var createBigPicture = function (evt) {
    if (evt.target.tagName === 'A') {
      bigPicture.querySelector('img').src = evt.target.children[0].src;
      bigPicture.querySelector('.social__caption').textContent = evt.target.children[0].alt;
    } else {
      bigPicture.querySelector('img').src = evt.target.src;
      bigPicture.querySelector('.social__caption').textContent = evt.target.alt;
    }
    bigPicture.querySelector('.likes-count').textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPicture.querySelector('.social__comments').appendChild(getArrayComments(getComments()));
    return bigPicture;
  };

  // Функция открытия fullscreen - фото
  var bigPictureOpen = function (evt) {
    bigPicture.classList.remove('hidden');
    createBigPicture(evt);
    hiddenBlock(commentsCount);
    hiddenBlock(commentsLoader);
  };

  // Открытие fullscreen - фото по enter
  var onEnterPressOnPhoto = function (evt) {
    window.data.enterPress(evt, bigPictureOpen);
  };

  // Функция закрытия fullscreen - фото по клику на крестик
  var bigPictureClose = function () {
    bigPicture.classList.add('hidden');
  };
  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  // Закрытие по нажатию escape
  var onEscPressClose = function (evt) {
    window.data.escPress(evt, bigPictureClose);
  };
  document.addEventListener('keydown', onEscPressClose);

  window.bigPicture = {
    getComments: getComments,
    bigPictureOpen: bigPictureOpen,
    bigPictureClose: bigPictureClose,
    onEnterPressOnPhoto: onEnterPressOnPhoto
  };
})();
