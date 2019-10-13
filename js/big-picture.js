'use strict';

(function () {

  var WIDTH_IMG = '35px';
  var HEIGHT_IMG = '35px';

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureComment = bigPicture.querySelector('.social__footer-text');

  // Разметка одного комментария
  var createComment = function (arrayEl) {
    var elementLi = document.createElement('li');
    elementLi.classList.add('social__comment');

    var elementImg = document.createElement('img');
    elementImg.classList.add('social__picture');
    elementImg.src = arrayEl.avatar;
    elementImg.alt = arrayEl.name;
    elementImg.style.width = WIDTH_IMG;
    elementImg.style.height = HEIGHT_IMG;
    elementLi.appendChild(elementImg);

    var elementP = document.createElement('p');
    elementP.classList.add('social__text');
    elementP.textContent = arrayEl.message;
    elementLi.appendChild(elementP);

    return elementLi;
  };

  // Массив комментариев
  var getArrayComments = function (evt) {
    var fragment = document.createDocumentFragment();
    var num;

    if (evt.target.tagName === 'A') {
      num = evt.target.getAttribute('data-num');
    } else {
      num = evt.target.parentNode.getAttribute('data-num');
    }

    var elementAr = window.load.responseArray[num].comments;

    for (var i = 0; i < elementAr.length; i++) {
      var comment = createComment(elementAr[i]);
      if (i > 4) {
        hideBlock(comment);
      }

      fragment.appendChild(comment);
    }

    return fragment;
  };

  var hideBlock = function (block) {
    block.classList.add('visually-hidden');
  };

  var openBlock = function (block) {
    block.classList.remove('visually-hidden');
  };

  var checkAvailability = function (evt, comments) {
    var commentsLength = comments.length;
    if (commentsLength <= 5) {
      hideBlock(commentsCount);
      hideBlock(commentsLoader);
    } else {
      openBlock(commentsLoader);
      openBlock(commentsCount);
    }
  };

  // var onDownloadMore = function(array) {
  //   for(var i = 5; i < array.length; i++) {
  //     array[i].classList.remove('visually-hidden');

  //   }
  // }

  // Функция создания fullscreen - фото
  var createBigPicture = function (evt) {
    var comments = document.querySelectorAll('.social__comment');
    if (evt.target.tagName === 'A') {
      bigPicture.querySelector('img').src = evt.target.children[0].src;
      bigPicture.querySelector('.social__caption').textContent = evt.target.children[0].alt;
    } else {
      bigPicture.querySelector('img').src = evt.target.src;
      bigPicture.querySelector('.social__caption').textContent = evt.target.alt;
    }
    bigPicture.querySelector('.likes-count').textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPicture.querySelector('.social__comments').innerHTML = '';

    bigPicture.querySelector('.social__comments').appendChild(getArrayComments(evt));
    checkAvailability(evt, comments);

    // commentsLoader.addEventListener('click', function(){
    //   onDownloadMore(comments);
    // });

    return bigPicture;
  };

  // Функция открытия fullscreen - фото
  var bigPictureOpen = function (evt) {
    bigPicture.classList.remove('hidden');
    createBigPicture(evt);

    document.addEventListener('keydown', onEscPress);
  };

  // Открытие fullscreen - фото по enter
  var onEnterPress = function (evt) {
    if (window.data.isEnterPress(evt)) {
      bigPictureOpen(evt);
    }
  };

  // Функция закрытия fullscreen - фото по клику на крестик
  var bigPictureClose = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  // Закрытие по нажатию escape
  var onEscPress = function (evt) {
    if (window.data.isEscPress(evt)) {
      bigPictureClose();
    }
  };

  // Запрет закрытия окна, если коммент в фокусе
  bigPictureComment.addEventListener('keydown', function (evt) {
    if (window.data.isEscPress(evt)) {
      evt.stopPropagation();
    }
  });

  window.bigPicture = {
    bigPictureOpen: bigPictureOpen,
    bigPictureClose: bigPictureClose,
    onEnterPress: onEnterPress,
    createBigPicture: createBigPicture
  };
})();
