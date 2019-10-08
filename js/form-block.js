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
    window.data.escPress(evt, uploadOverlayClose);
  };

  // Открыть оверлей редактора фото
  var uploadOverlayOpen = function () {
    uploadOverlay.classList.remove('hidden');
    filterSlider.classList.add('hidden');
    document.addEventListener('keydown', onEscPress);
    resetEffect();
  };

  // Закрыть оверлей редактора фото
  var uploadOverlayClose = function () {
    uploadOverlay.classList.add('hidden');
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
  uploadClose.addEventListener('click', function () {
    uploadOverlayClose();
  });

  // Отправить форму по нажатию на enter, если кнопка отправки в фокусе
  uploadSend.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEY_CODE) {
      form.submit();
    }
  });

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
    resetEffect: resetEffect
  };
})();
