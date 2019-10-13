'use strict';

(function () {
    var Color = {
      RED: '#ff4e4e',
      WHITE: '#ffffff',
      BLACK: '#232321'
    };

    var filterBtns = document.querySelectorAll('.img-filters__button');
    var imgFiltersForm = document.querySelector('.img-filters__form');
    var imgFilterPopularBtn = imgFiltersForm.querySelector('#filter-popular');
    var imgFilterRandomBtn = imgFiltersForm.querySelector('#filter-random');
    var imgFilterDiscussedBtn = imgFiltersForm.querySelector('#filter-discussed');

    // Сортировка - 10 случайных фото
    var sortingImgRandom = function (array) {
      var arrayCopy = array.slice();

      var shuffleArray = function (arrayCopy) {
        for (var i = arrayCopy.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = arrayCopy[i];
          arrayCopy[i] = arrayCopy[j];
          arrayCopy[j] = temp;
        }

        return arrayCopy;
      };

      return shuffleArray(arrayCopy).slice(0, 10);
    }

    // Сортировка - самые обсуждаемые
    var sortingImgMostDiscussed = function (array) {
      var arrayCopy = array.slice();
      var commentsLengthArray = [];

      arrayCopy.forEach(function (element, index) {
        commentsLengthArray.push(element.comments.length);
        element.index = commentsLengthArray[index];
      });

      // Получаем число комментариев
      var getQuantityComments = function(element) {
        return element.index;
      };

      var namesComparator = function (a, b) {
        switch (true) {
          case b > a:
            return 1;
          case b < a:
            return -1;
          default: return 0;
        }
      };

      var arrayMostDiscussed = arrayCopy.sort(function(a, b) {
        var indexDiff = getQuantityComments(b) - getQuantityComments(a);
        if (indexDiff === 0) {
          indexDiff = namesComparator(a.likes, b.likes);
        }
        return indexDiff;
      });

      return arrayMostDiscussed;
    };

    // Стили для кнопок фильтра
    var setStyleBtn = function(evt) {
      for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].style.backgroundColor = Color.BLACK;
        filterBtns[i].style.color = Color.WHITE;
      }
      evt.target.style.backgroundColor = Color.WHITE;
      evt.target.style.color = Color.RED ;
    };

    var deleteNode = function (elements) {
      for (var j = 0; j < elements.length; j++) {
        elements[j].remove();
      }
    };

    var renderSortingPictures = window.debounce(function (evt, elements, array) {
      setStyleBtn(evt);
      deleteNode(elements);
      window.renderPictures(array);
    });

    imgFiltersForm.addEventListener('click', function(evt) {
      var pictures = document.querySelectorAll('.picture');

      switch (true) {
        case evt.target.id === 'filter-popular':
          renderSortingPictures(evt, pictures, window.load.responseArray);
          break;
        case evt.target.id === 'filter-random':
          renderSortingPictures(evt, pictures, sortingImgRandom(window.load.responseArray));
          break;
        case evt.target.id === 'filter-discussed':
          renderSortingPictures(evt, pictures, sortingImgMostDiscussed(window.load.responseArray));
          break;
        default: evt.stopPropagation();
      }
    });

})();
