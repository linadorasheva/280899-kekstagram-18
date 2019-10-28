'use strict';

(function () {
  var PICTURE_DEFAULT_SIZE = 100;
  var DEFAULT_CLASS = 'img-upload__preview';
  var INPUT_DEFAULT_VALUE = 'none';

  var form = document.querySelector('.img-upload__form');
  var uploadOverlay = form.querySelector('.img-upload__overlay');

  var imgUpload = uploadOverlay.querySelector('.img-upload__preview');
  var sizeValue = uploadOverlay.querySelector('.scale__control--value');

  var uploadBtn = form.querySelector('#upload-file');
  var uploadClose = uploadOverlay.querySelector('#upload-cancel');
  var uploadSend = uploadOverlay.querySelector('#upload-submit');
  var filterSlider = uploadOverlay.querySelector('.img-upload__effect-level');
  var sliderLine = form.querySelector('.effect-level__line');
  var sliderPin = sliderLine.querySelector('.effect-level__pin');

  // Функция, задающая редактируемому фото класс по умолчанию и сброс фильтра
  var resetEffect = function () {
    imgUpload.className = DEFAULT_CLASS;
    imgUpload.style.filter = '';
  };

  // Закрыть оверлей по escape
  var onEscPress = function (evt) {
    if (window.data.isEscPress(evt)) {
      uploadOverlayClose();
    }
  };

  // Открыть оверлей редактора фото
  var uploadOverlayOpen = function () {
    uploadOverlay.classList.remove('hidden');
    filterSlider.classList.add('hidden');

    window.zoom.plusListenerAdd();
    window.zoom.minusListenerAdd();

    window.validation.hashTagsInputListenerChangeAdd();
    window.validation.hashTagsInputListenerKeydownAdd();
    window.validation.uploadCommentFieldListenerKeydownAdd();

    window.intensity.onFiltersListenersAdd();

    window.slider.sliderPinListenerAdd();

    uploadSend.addEventListener('click', onFormSuccessUpload, window.data.onError);
    uploadSend.addEventListener('keydown', onEnterPress, window.data.onError);

    uploadClose.addEventListener('click', onClickBtnClose);
    document.addEventListener('keydown', onEscPress);
    resetEffect();
  };

  // Закрыть оверлей редактора фото
  var uploadOverlayClose = function () {
    uploadOverlay.classList.add('hidden');

    window.zoom.plusListenerRemove();
    window.zoom.minusListenerRemove();

    window.validation.hashTagsInputListenerChangeRemove();
    window.validation.hashTagsInputListenerKeydownRemove();
    window.validation.uploadCommentFieldListenerKeydownRemove();

    window.intensity.onFiltersListenersRemove();

    window.slider.sliderPinListenerRemove();

    uploadSend.removeEventListener('click', onFormSuccessUpload, window.data.onError);
    uploadSend.removeEventListener('keydown', onEnterPress, window.data.onError);

    uploadClose.removeEventListener('click', onClickBtnClose);
    document.removeEventListener('keydown', onEscPress);
    uploadBtn.value = '';
    form.reset();
  };

  // Устанавливаем размер по дефолту (100%)
  var setDefaultSize = function () {
    sizeValue.value = PICTURE_DEFAULT_SIZE + '%';
    imgUpload.style.transform = 'scale(' + parseInt(sizeValue.value, 10) / window.data.PERCENT + ')';
  };

  // Открыть форму редактирования фото при изменении значения поля загрузки файла
  uploadBtn.addEventListener('change', function () {
    uploadOverlayOpen();
    setDefaultSize();
  });

  // Закрыть форму редактирования фото по клику на крестик
  var onClickBtnClose = function () {
    uploadOverlayClose();
  };

  // Отправить форму по энтеру на кнопку "Опубликовать"
  var onEnterPress = function (evt) {
    if (window.data.isEnterPress(evt)) {
      onFormSuccessUpload(evt);
    }
  };

  // Отправить форму
  var onFormSuccessUpload = function (evt) {
    if (window.validation.textErrorOnHashtag.length === 0) {
      evt.preventDefault();
      window.load.makeRequest(true, window.load.Url.URL_UPLOAD, 'POST', uploadOverlayClose, window.data.onError, new FormData(form));
    }
  };

  window.formBlock = {
    form: form,
    uploadBtn: uploadBtn,
    uploadOverlay: uploadOverlay,
    imgUpload: imgUpload,
    sizeValue: sizeValue,
    filterSlider: filterSlider,
    sliderPin: sliderPin,
    sliderLine: sliderLine,
    INPUT_DEFAULT_VALUE: INPUT_DEFAULT_VALUE,
    resetEffect: resetEffect,
    uploadOverlayClose: uploadOverlayClose
  };
})();
