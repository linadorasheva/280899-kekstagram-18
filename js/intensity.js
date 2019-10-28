'use strict';

(function () {
  var DEPTH_EFFECT_MAX = 100;
  var DEFAULT_CLASS_PREFIX = 'effects__preview--';

  var FilterValue = {
    CHROME_MIN_VALUE: 0,
    CHROME_MAX_VALUE: 1,
    SEPIA_MIN_VALUE: 0,
    SEPIA_MAX_VALUE: 1,
    MARVIN_MIN_VALUE: 0,
    MARVIN_MAX_VALUE: 100,
    PHOBOS_MIN_VALUE: 0,
    PHOBOS_MAX_VALUE: 3,
    HEAT_MIN_VALUE: 1,
    HEAT_MAX_VALUE: 3
  };
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
        window.formBlock.imgUpload.style.filter = 'grayscale(' + FilterValue.CHROME_MAX_VALUE + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--sepia'):
        window.formBlock.imgUpload.style.filter = 'sepia(' + FilterValue.SEPIA_MAX_VALUE + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--marvin'):
        window.formBlock.imgUpload.style.filter = 'invert(' + FilterValue.MARVIN_MAX_VALUE + '%)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--phobos'):
        window.formBlock.imgUpload.style.filter = 'blur(' + FilterValue.PHOBOS_MAX_VALUE + 'px)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--heat'):
        window.formBlock.imgUpload.style.filter = 'brightness(' + FilterValue.HEAT_MAX_VALUE + ')';
        break;

      default: window.formBlock.imgUpload.style.filter = '';
    }
  };

  var setIntensity = function (coefficient) {
    switch (true) {
      case window.formBlock.imgUpload.classList.contains('effects__preview--chrome'):
        inputFilterValue.value = coefficient * (FilterValue.CHROME_MAX_VALUE - FilterValue.CHROME_MIN_VALUE) + FilterValue.CHROME_MIN_VALUE;
        window.formBlock.imgUpload.style.filter = 'grayscale(' + inputFilterValue.value + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--sepia'):
        inputFilterValue.value = coefficient * (FilterValue.SEPIA_MAX_VALUE - FilterValue.SEPIA_MIN_VALUE) + FilterValue.SEPIA_MIN_VALUE;
        window.formBlock.imgUpload.style.filter = 'sepia(' + inputFilterValue.value + ')';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--marvin'):
        inputFilterValue.value = coefficient * (FilterValue.MARVIN_MAX_VALUE - FilterValue.MARVIN_MIN_VALUE) + FilterValue.MARVIN_MIN_VALUE;
        window.formBlock.imgUpload.style.filter = 'invert(' + inputFilterValue.value + '%)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--phobos'):
        inputFilterValue.value = coefficient * (FilterValue.PHOBOS_MAX_VALUE - FilterValue.PHOBOS_MIN_VALUE) + FilterValue.PHOBOS_MIN_VALUE;
        window.formBlock.imgUpload.style.filter = 'blur(' + inputFilterValue.value + 'px)';
        break;
      case window.formBlock.imgUpload.classList.contains('effects__preview--heat'):
        inputFilterValue.value = coefficient * (FilterValue.HEAT_MAX_VALUE - FilterValue.HEAT_MIN_VALUE) + FilterValue.HEAT_MIN_VALUE;
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
  var onUploadBtnChange = function (evt) {
    window.formBlock.resetEffect();
    setDefaultIntensity();

    // Добавляем фото класс, соответствующий выбранному фильтру
    window.formBlock.imgUpload.classList.add(getClassName(evt));
    setDefaultFilterValue();
    filterHidden(evt);
  };

  var onFiltersListenersAdd = function () {
    return filterInputs.forEach(function (element) {
      element.addEventListener('click', onUploadBtnChange);
    });
  };

  var onFiltersListenersRemove = function () {
    return filterInputs.forEach(function (element) {
      element.removeEventListener('click', onUploadBtnChange);
    });
  };

  window.intensity = {
    changeIntensity: changeIntensity,
    sliderDepth: sliderDepth,
    onFiltersListenersAdd: onFiltersListenersAdd,
    onFiltersListenersRemove: onFiltersListenersRemove
  };
})();
