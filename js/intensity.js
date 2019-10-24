'use strict';

(function () {
  var Filter_value = {
    CHROME: 1,
    SEPIA: 1,
    MARVIN: 100,
    PHOBOS: 3,
    HEAT_MIN_VALUE: 1,
    HEAT: 3
  };
  var DEPTH_EFFECT_MAX = 100;
  var DEFAULT_CLASS_PREFIX = 'effects__preview--';
  var filterInputs = window.formBlock.uploadOverlay.querySelectorAll('input[name="effect"]');

  var inputFilterValue = window.formBlock.form.querySelector('.effect-level__value');
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
    inputFilterValue.value = DEPTH_EFFECT_MAX;
  };

  // Устанавливаем интенсивность по дефолту на максимальные значения
  var setDefaultFilterValue = function () {
    switch (true) {
      case window.formBlock.imgUpload.classList.contains('effects__preview--chrome'):
        window.formBlock.imgUpload.style.filter = 'grayscale(' + Filter_value.CHROME + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--sepia'):
        window.formBlock.imgUpload.style.filter = 'sepia(' + Filter_value.SEPIA + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--marvin'):
        window.formBlock.imgUpload.style.filter = 'invert(' + Filter_value.MARVIN + '%)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--phobos'):
        window.formBlock.imgUpload.style.filter = 'blur(' + Filter_value.PHOBOS + 'px)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--heat'):
        window.formBlock.imgUpload.style.filter = 'brightness(' + Filter_value.HEAT + ')';
        break;

      default: window.formBlock.imgUpload.style.filter = '';
    }
  };

  var setIntensity = function (coefficient) {
    switch (true) {
      case window.formBlock.imgUpload.classList.contains('effects__preview--chrome'):
        inputFilterValue.value = coefficient * Filter_value.CHROME;
        window.formBlock.imgUpload.style.filter = 'grayscale(' + inputFilterValue.value + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--sepia'):
        inputFilterValue.value = coefficient * Filter_value.SEPIA;
        window.formBlock.imgUpload.style.filter = 'sepia(' + inputFilterValue.value + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--marvin'):
        inputFilterValue.value = coefficient * Filter_value.MARVIN;
        window.formBlock.imgUpload.style.filter = 'invert(' + inputFilterValue.value + '%)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--phobos'):
        inputFilterValue.value = coefficient * Filter_value.PHOBOS;
        window.formBlock.imgUpload.style.filter = 'blur(' + inputFilterValue.value + 'px)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--heat'):
        inputFilterValue.value = coefficient * (Filter_value.HEAT - HEAT_MIN_VALUE) + HEAT_MIN_VALUE;
        window.formBlock.imgUpload.style.filter = 'brightness(' + inputFilterValue.value + ')';
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
    array.forEach(function (element) {
      element.addEventListener('click', function (evt) {
        window.formBlock.resetEffect();
        setDefaultIntensity();

        // Добавляем фото класс, соответствующий выбранному фильтру
        window.formBlock.imgUpload.classList.add(getClassName(evt));
        setDefaultFilterValue();
        filterHidden(evt);
      });
    });
  };

  window.formBlock.uploadBtn.addEventListener('change', function (evt) {
    installFilter(filterInputs, evt);
  });

  window.intensity = {
    changeIntensity: changeIntensity,
    sliderDepth: sliderDepth
  };
})();
