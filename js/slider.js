'use strict';

(function () {
  // Обработчик перемещения ползунка интенсивности эффекта
  window.formBlock.sliderPin.addEventListener('mousedown', function (evt) {
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

      window.formBlock.sliderPin.style.left = (window.formBlock.sliderPin.offsetLeft - shift.x) + 'px';
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