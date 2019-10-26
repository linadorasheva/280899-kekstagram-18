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
    var textErrors = '';

    hashtags.forEach(function (element, i, array) {
      switch (true) {
        case element.length > 0 && element[0] !== '#':
          textErrors = Hashtag.FIRST_CHARACTER;
          break;
        case element.length === MIN_TEGS_LENGTH:
          textErrors = Hashtag.MIN_LENGTH;
          break;
        case array.indexOf(element) !== i:
          textErrors = Hashtag.REPEAT;
          break;
        case array.length > MAX_TEGS:
          textErrors = Hashtag.LENGTH;
          break;
        case element.length > MAX_TEGS_LENGTH:
          textErrors = Hashtag.MAX_LENGTH;
          break;
        case element.length > 0 && element.match(/#/g).length > MAX_QUANTITY_SHARP_SYMBOL:
          textErrors = Hashtag.NO_SPACE;
          break;
      }
    });

    return textErrors;
  };

  var onHashtagChange = function () {
    var hashtagValue = hashTagsInput.value.trim().toLowerCase();
    window.validation.textErrorOnHashtag = checkHashtags(hashtagValue);
    hashTagsInput.setCustomValidity(checkHashtags(hashtagValue));
  };

  // Не закрывать форму по escape если фокус в поле
  var onFieldFocus = function (evt) {
    if (window.data.isEscPress(evt)) {
      evt.stopPropagation();
    }
  }

  window.validation = {
    textErrorOnHashtag: Hashtag.TRUE,

    hashTagsInputListenerChangeAdd: function () {
      return hashTagsInput.addEventListener('change', onHashtagChange);
    },

    hashTagsInputListenerChangeRemove: function () {
      return hashTagsInput.removeEventListener('change', onHashtagChange);
    },

    hashTagsInputListenerKeydownAdd: function () {
      return hashTagsInput.addEventListener('keydown', onFieldFocus);
    },

    hashTagsInputListenerKeydownRemove: function () {
      return hashTagsInput.removeEventListener('keydown', onFieldFocus);
    },

    uploadCommentFieldListenerKeydownAdd: function () {
      return uploadCommentField.addEventListener('keydown', onFieldFocus);
    },

    uploadCommentFieldListenerKeydownRemove: function () {
      return uploadCommentField.removeEventListener('keydown', onFieldFocus);
    }

  };
})();
