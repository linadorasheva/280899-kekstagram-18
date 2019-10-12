'use strict';

(function () {
  var FILTER_VALUE = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: 3
  };
  var DEPTH_EFFECT_MAX = 100;
  var DEFAULT_CLASS_PREFIX = 'effects__preview--';
  var filterInputs = window.formBlock.uploadOverlay.querySelectorAll('input[name="effect"]');

  var filterValue = window.formBlock.form.querySelector('.effect-level__value');
  var sliderDepth = window.formBlock.sliderLine.querySelector('.effect-level__depth');

  // Функция, возвращающая название класса для редактируемого фото
  var getClassName = function (evt) {
    return DEFAULT_CLASS_PREFIX + evt.target.value;
  };

  // Функция, скрывающая шкалу фильтра
  var filterHidden = function (evt) {
    window.formBlock.filterSlider.classList.add('hidden');
    if (evt.target.value !== window.formBlock.INPUT_DEFAULT_VALUE) {
      window.formBlock.filterSlider.classList.remove('hidden');
    }
  };

  // Сбрасываем шкалу на дефолтные 100%
  var setDefaultIntensity = function () {
    window.formBlock.sliderPin.style.left = DEPTH_EFFECT_MAX + '%';
    sliderDepth.style.width = DEPTH_EFFECT_MAX + '%';
    filterValue.value = DEPTH_EFFECT_MAX;
  };

  // Устанавливаем интенсивность по дефолту на максимальные значения
  var setDefaultFilterValue = function () {
    switch (true) {
      case window.formBlock.imgUpload.classList.contains('effects__preview--chrome'):
        window.formBlock.imgUpload.style.filter = 'grayscale(' + window.intensity.FILTER_VALUE.chrome + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--sepia'):
        window.formBlock.imgUpload.style.filter = 'sepia(' + window.intensity.FILTER_VALUE.sepia + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--marvin'):
        window.formBlock.imgUpload.style.filter = 'invert(' + window.intensity.FILTER_VALUE.marvin + '%)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--phobos'):
        window.formBlock.imgUpload.style.filter = 'blur(' + window.intensity.FILTER_VALUE.phobos + 'px)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--heat'):
        window.formBlock.imgUpload.style.filter = 'brightness(' + window.intensity.FILTER_VALUE.heat + ')';
        break;

      default: window.formBlock.imgUpload.style.filter = '';
    }
  };

  var setIntensity = function (coefficient) {
    switch (true) {
      case window.formBlock.imgUpload.classList.contains('effects__preview--chrome'):
        filterValue.value = coefficient * window.intensity.FILTER_VALUE.chrome;
        window.formBlock.imgUpload.style.filter = 'grayscale(' + filterValue.value + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--sepia'):
        filterValue.value = coefficient * window.intensity.FILTER_VALUE.sepia;
        window.formBlock.imgUpload.style.filter = 'sepia(' + filterValue.value + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--marvin'):
        filterValue.value = coefficient * window.intensity.FILTER_VALUE.marvin;
        window.formBlock.imgUpload.style.filter = 'invert(' + filterValue.value + '%)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--phobos'):
        filterValue.value = coefficient * window.intensity.FILTER_VALUE.phobos;
        window.formBlock.imgUpload.style.filter = 'blur(' + filterValue.value + 'px)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--heat'):
        filterValue.value = coefficient * window.intensity.FILTER_VALUE.heat;
        window.formBlock.imgUpload.style.filter = 'brightness(' + filterValue.value + ')';
        break;

      default: window.formBlock.imgUpload.style.filter = '';
    }
  };

  // Функция для установки интенсивности
  var changeIntensity = function () {

    var sliderPinRadius = window.formBlock.sliderPin.offsetWidth / 2;
    var sliderPinPosition = window.formBlock.sliderPin.offsetLeft - sliderPinRadius;
    var sliderLineWidth = window.formBlock.sliderLine.offsetWidth;

    // Находим коэффициэнт изменения интенсивности
    var coefficientFilter = window.data.getProportion(sliderPinPosition, sliderLineWidth);
    setIntensity(coefficientFilter);
  };

  // Вешаем обработчик на каждый инпут-фильтр
  var installFilter = function (array) {
    for (var i = 0; i < array.length; i++) {

      // Вешаем обработчик для смены вида фильтра
      array[i].addEventListener('click', function (evt) {
        window.formBlock.resetEffect();
        setDefaultIntensity();

        // Добавляем фото класс, соответствующий выбранному фильтру
        window.formBlock.imgUpload.classList.add(getClassName(evt));
        setDefaultFilterValue();
        filterHidden(evt);
      });
    }
  };

  window.formBlock.uploadBtn.addEventListener('change', function (evt) {
    installFilter(filterInputs, evt);
  });

  window.intensity = {
    FILTER_VALUE: FILTER_VALUE,

    changeIntensity: changeIntensity
  };
})();
