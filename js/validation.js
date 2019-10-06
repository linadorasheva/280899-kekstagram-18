'use strict';

(function () {

  var uploadCommentField = window.formBlock.form.querySelector('.text__description');
  var hashTagsInput = window.formBlock.form.querySelector('.text__hashtags');
  var MAX_TEGS_LENGTH = 20;
  var MIN_TEGS_LENGTH = 1;
  var MAX_TEGS = 5;

  var HASHTAG_FIRST_CHARACTER = 'Хэш-тег начинается с символа # (решётка)';
  var HASHTAG_MAX_LENGTH = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
  var HASHTAG_MIN_LENGTH = 'Хеш-тег не может состоять только из одной решётки';
  var HASHTAG_NO_SPACE = 'Хэш-теги разделяются пробелами';
  var HASHTAG_REPEAT = 'Один и тот же хэш-тег не может быть использован дважды';
  var HASHTAGS_LENGTH = 'Нельзя указать больше пяти хэш-тегов';
  var HASHTAGS_TRUE = '';

  var checkHashtags = function (target, value) {
    var hashtags = value.split(' ');
    var textError = '';

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      switch (true) {
        case hashtag[0] !== '#':
          textError = HASHTAG_FIRST_CHARACTER;
          break;
        case hashtag.length === MIN_TEGS_LENGTH:
          textError = HASHTAG_MIN_LENGTH;
          break;
        case hashtags.indexOf(hashtag) !== i:
          textError = HASHTAG_REPEAT;
          break;
        case hashtags.length > MAX_TEGS:
          textError = HASHTAGS_LENGTH;
          break;
        case hashtag.length > MAX_TEGS_LENGTH:
          textError = HASHTAG_MAX_LENGTH;
          break;
        case hashtag.match(/#/g).length > 1:
          textError = HASHTAG_NO_SPACE;
          break;
        default:
          textError = HASHTAGS_TRUE;
      }
    }

    return target.setCustomValidity(textError);
  };

  hashTagsInput.addEventListener('change', function (evt) {
    var hashtagValue = hashTagsInput.value.trim().toLowerCase();
    var target = evt.target;

    checkHashtags(target, hashtagValue);
  });

  // Не закрывать форму по escape если фокус в поле комментария
  uploadCommentField.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });

  // Не закрывать форму по escape если фокус в поле hashtag
  hashTagsInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });
})();
