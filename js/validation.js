'use strict';

(function () {

  var uploadCommentField = document.querySelector('.text__description');
  var hashTagsInput = document.querySelector('.text__hashtags');
  var MAX_TEGS_LENGTH = 20;
  var MIN_TEGS_LENGTH = 1;
  var MAX_TEGS = 5;
  var MAX_QUANTITY_SHARP_SYMBOL = 1;

  var Hashtag = {
    FIRST_CHARACTER: 'Хэш-тег начинается с символа # (решётка)',
    MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
    MIN_LENGTH: 'Хеш-тег не может состоять только из одной решётки',
    NO_SPACE: 'Хэш-теги разделяются пробелами',
    REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    LENGTH: 'Нельзя указать больше пяти хэш-тегов',
    TRUE: ''
  };

  var checkHashtags = function (value) {
    var hashtags = value.split(' ');
    var textError = '';

    hashtags.forEach(function (element, i, array) {
      switch (true) {
        case element.length > 0 && element[0] !== '#':
          textError = Hashtag.FIRST_CHARACTER;
          console.log(Hashtag.FIRST_CHARACTER);
          break;
        case element.length === MIN_TEGS_LENGTH:
          textError = Hashtag.MIN_LENGTH;
          console.log(Hashtag.MIN_LENGTH);
          break;
        case array.indexOf(element) !== i:
          textError = Hashtag.REPEAT;
          console.log(Hashtag.REPEAT);
          break;
        case array.length > MAX_TEGS:
          textError = Hashtag.LENGTH;
          console.log(Hashtag.LENGTH);
          break;
        case element.length > MAX_TEGS_LENGTH:
          textError = Hashtag.MAX_LENGTH;
          console.log(Hashtag.MAX_LENGTH);
          break;
        case element.length > 0 && element.match(/#/g).length > MAX_QUANTITY_SHARP_SYMBOL:
          textError = Hashtag.NO_SPACE;
          console.log(Hashtag.NO_SPACE);
          break;
        default:
          textError = Hashtag.TRUE;
          console.log('default');
      }
    });

    return textError;
  };

  hashTagsInput.addEventListener('change', function () {
    var hashtagValue = hashTagsInput.value.trim().toLowerCase();
    window.textErrorOnHashtag = checkHashtags(hashtagValue);
    console.log(checkHashtags(hashtagValue), ' - сообщение ошибки');
    console.log(hashTagsInput.value, ' - хештеги');
    hashTagsInput.setCustomValidity(checkHashtags(hashtagValue));
  });

  // Не закрывать форму по escape если фокус в поле комментария
  uploadCommentField.addEventListener('keydown', function (evt) {
    if (window.data.isEscPress(evt)) {
      evt.stopPropagation();
    }
  });

  // Не закрывать форму по escape если фокус в поле hashtag
  hashTagsInput.addEventListener('keydown', function (evt) {
    if (window.data.isEscPress(evt)) {
      evt.stopPropagation();
    }
  });
})();
