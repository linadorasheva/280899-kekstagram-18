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

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;
var PICTURE_DEFAULT_SIZE = 100;
var STEP = 25;
var MIN_PICTURE_SIZE = 25;
var MAX_PICTURE_SIZE = 100;
var PERCENT = 100;
var form = document.querySelector('.img-upload__form');
var uploadBtn = form.querySelector('#upload-file');
var uploadOverlay = form.querySelector('.img-upload__overlay');
var uploadClose = uploadOverlay.querySelector('#upload-cancel');
var uploadSend = uploadOverlay.querySelector('#upload-submit');
var uploadCommentField = uploadOverlay.querySelector('.text__description');

var sizeValue = uploadOverlay.querySelector('.scale__control--value');
var minus = uploadOverlay.querySelector('.scale__control--smaller');
var plus = uploadOverlay.querySelector('.scale__control--bigger');
var imgUpload = uploadOverlay.querySelector('.img-upload__preview');


// Закрыть оверлей по escape
var onUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    uploadOverlayClose();
  }
};

// Открыть оверлей редактора фото
var uploadOverlayOpen = function () {
  uploadOverlay.classList.remove('hidden');
  effectSlider.classList.add('hidden');
  document.addEventListener('keydown', onUploadEscPress);
};

// Закрыть оверлей редактора фото
var uploadOverlayClose = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
  uploadBtn.value = '';
  resetEffect();
};

// Открыть форму редактирования фото при изменении значения поля загрузки файла
uploadBtn.addEventListener('change', function () {
  uploadOverlayOpen();
  sizeValue.value = PICTURE_DEFAULT_SIZE + '%';
  imgUpload.style.transform = 'scale(' + parseInt(sizeValue.value / PERCENT, 10) + ')';
});

// Закрыть форму редактирования фото по клику на крестик
uploadClose.addEventListener('click', function () {
  uploadOverlayClose();
});

// Не закрывать форму по escape если фокус в поле комментария
uploadCommentField.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.stopPropagation();
  }
});

// Отправить форму по нажатию на enter, если он в фокусе
uploadSend.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    form.submit();
  }
});

// увеличить значение масштаба на 25 при каждом нажатии
var onPlusPress = function () {
  if (parseInt(sizeValue.value, 10) < MAX_PICTURE_SIZE) {
    sizeValue.value = parseInt(sizeValue.value, 10) + STEP + '%';
    imgUpload.style.transform = 'scale(' + parseInt(sizeValue.value / PERCENT, 10) + ')';
  }
};

// уменьшить значение масштаба на 25 при каждом нажатии
var onMinusPress = function () {
  if (parseInt(sizeValue.value, 10) > MIN_PICTURE_SIZE) {
    sizeValue.value = parseInt(sizeValue.value, 10) - STEP + '%';
    imgUpload.style.transform = 'scale(' + parseInt(sizeValue.value / PERCENT, 10) + ')';
  }
};

plus.addEventListener('click', onPlusPress);
minus.addEventListener('click', onMinusPress);

var DEFAULT_CLASS = 'img-upload__preview';
var DEFAULT_CLASS_PREFIX = 'effects__preview--';
var INPUT_DEFAULT_VALUE = 'none';
var effectSlider = uploadOverlay.querySelector('.img-upload__effect-level');
var effectInputs = uploadOverlay.querySelectorAll('input[name="effect"]');
var FILTERS = [];

// Функция, задающая редактируемому фото класс по умолчанию
var resetEffect = function () {
  imgUpload.className = DEFAULT_CLASS;
};

// Функция, возвращающая название класса для редактируемого фото
var getClassName = function (evt) {
  return DEFAULT_CLASS_PREFIX + evt.target.value;
};

// Функция, скрывающая шкалу фильтра
var filterHidden = function (evt) {
  effectSlider.classList.add('hidden');
  if (evt.target.value !== INPUT_DEFAULT_VALUE) {
    effectSlider.classList.remove('hidden');
  }
};

// Получаем массив фильтров из значения input'ов
effectInputs.forEach(function (effectInput) {
  FILTERS.push(effectInput.value);
  effectInput.addEventListener('click', function (evt) {
    resetEffect();
    // Добавляем фото класс, соответствующий выбранному фильтру
    imgUpload.classList.add(getClassName(evt));
    filterHidden(evt);
  });
});

// var pin = effectSlider.querySelector('.effect-level__pin');

// pin.addEventListener('mouseUp', function () {

// });

var hashTagsInput = document.querySelector('.text__hashtags');
var MAX_TEGS_LENGTH = 20;
var MIN_TEGS_LENGTH = 1;
var MAX_TEGS = 5;

var HASHTAG_FIRST_CHARACTER = 'Хэш-тег начинается с символа # (решётка)';
var HASHTAG_MAX_LENGTH = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
var HASHTAG_MIN_LENGTH = 'Хеш-тег не может состоять только из одной решётки';

var HASHTAG_REPEAT = 'Один и тот же хэш-тег не может быть использован дважды';
var HASHTAGS_LENGTH = 'Нельзя указать больше пяти хэш-тегов';
var HASHTAGS_TRUE = '';

var checkHashtags = function (target, value) {
  var hashtags = value.split(' ');
  var textError = '';

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (hashtag[0] !== '#') {
      textError = HASHTAG_FIRST_CHARACTER;
      break;
    } else if (hashtag.length === MIN_TEGS_LENGTH) {
      textError = HASHTAG_MIN_LENGTH;
      break;
    } else if (hashtags.indexOf(hashtag) !== i) {
      textError = HASHTAG_REPEAT;
      break;
    } else if (hashtags.length > MAX_TEGS) {
      textError = HASHTAGS_LENGTH;
      break;
    } else if (hashtag.length > MAX_TEGS_LENGTH) {
      textError = HASHTAG_MAX_LENGTH;
      break;
    } else {
      textError = HASHTAGS_TRUE;
    }
  }

  return target.setCustomValidity(textError);
};

hashTagsInput.addEventListener('input', function (evt) {
  var hashtagValue = hashTagsInput.value.trim().toLowerCase();
  var target = evt.target;

  checkHashtags(target, hashtagValue);
});
