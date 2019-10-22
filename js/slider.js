'use strict';

(function () {

  // Обработчик перемещения ползунка интенсивности эффекта
  window.formBlock.sliderPin.addEventListener('mousedown', function (evt) {

    var sliderPinRadius = window.formBlock.sliderPin.offsetWidth / 2;


    evt.preventDefault();

    // захват mouseDown
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // движение mouseMove
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.formBlock.sliderPin.style.left = window.formBlock.sliderPin.offsetLeft - shift.x + 'px';
      window.intensity.sliderDepth.style.width = window.formBlock.sliderPin.offsetLeft - shift.x + 'px';

      if (window.formBlock.sliderPin.offsetLeft <= 0) {
        window.formBlock.sliderPin.style.left = 0 + sliderPinRadius + 'px';
        window.intensity.sliderDepth.style.width = 0 + sliderPinRadius + 'px';
      } else if (window.formBlock.sliderPin.offsetLeft + shift.x > window.formBlock.sliderLine.offsetWidth) {
        window.formBlock.sliderPin.style.left = window.formBlock.sliderLine.offsetWidth - sliderPinRadius + 'px';
        window.intensity.sliderDepth.style.width = window.formBlock.sliderLine.offsetWidth - sliderPinRadius + 'px';
      }

      // Функция для смены интенсивности фильтра
      window.intensity.changeIntensity();
    };

    // Остановка mouseUp
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.formBlock.form.removeEventListener('mousemove', onMouseMove);
      window.formBlock.form.removeEventListener('mouseup', onMouseUp);
    };

    window.formBlock.form.addEventListener('mousemove', onMouseMove);
    window.formBlock.form.addEventListener('mouseup', onMouseUp);

  });
})();
