'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
  var fileChooser = document.querySelector('#upload-file');
  var photoBox = document.querySelector('.img-upload__preview').querySelector('img');
  var filterIconsColl = document.querySelectorAll('.effects__preview');

  var filterIconsArr = Array.from(filterIconsColl);

  var installBackground = function (value) {
    filterIconsArr.forEach(function (element) {
      element.style.backgroundImage = 'url(' + value + ')';
    });
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          photoBox.src = reader.result;

          installBackground(reader.result);

        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
