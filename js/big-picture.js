'use strict';

(function () {
  var QUANTITY_OPENED_COMMENTS = 5;

  var Slice = {
    MIN: 0,
    MAX: 5
  };

  var textToQuantityComments = {
    'one': 'комментария',
    'other': 'комментариев'
  };

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

  // Массив комментариев для выбранной фото-миниатюры с сервера
  var getServerComments = function (evt) {
    var targetSrc = evt.target.getAttribute('src');

    var object = window.load.responseArray.filter(function (element) {
      return element.url === targetSrc;
    });

    return object[0].comments;
  };

  // скрыть блок
  var hideBlock = function (block) {
    block.classList.add('visually-hidden');
  };
  // Открыть блок
  var openBlock = function (block) {
    block.classList.remove('visually-hidden');
  };

  // Добавить комментарии во фрагмент
  var addComments = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (element, i) {
      var comment = createComment(array[i]);

      if (i >= QUANTITY_OPENED_COMMENTS) {
        hideBlock(comment);
      }

      fragment.appendChild(comment);
    });

    return fragment;
  };

  // Проверяем кол-во комментов и в зависимости от него скрываем кнопку "Загрузить еще"
  var checkComments = function (flag) {
    var commentsLength = document.querySelectorAll('.social__comment').length;
    if (commentsLength <= QUANTITY_OPENED_COMMENTS) {
      hideBlock(commentsLoader);
    }
    // Проверяем остались ли не отображенные комменты, если их нет - скрываем кнопку "Загрузить еще"
    if (flag && flag.length === 0) {
      hideBlock(commentsLoader);
    }
  };

  // Отрисовка дополнительных 5 комментов
  var renderMoreComments = function () {
    var commentsHiddenColl = bigPicture.querySelectorAll('.social__comment.visually-hidden');
    var commentsHiddenArr = [];

    [].forEach.call(commentsHiddenColl, function (element) {
      commentsHiddenArr.push(element);
    });

    commentsHiddenArr.slice(Slice.MIN, Slice.MAX).forEach(function (element) {
      openBlock(element);
    });

    checkComments(bigPicture.querySelectorAll('.social__comment.visually-hidden'));
    renderCommentsCount(bigPicture.querySelectorAll('.social__comment:not(.visually-hidden)').length, bigPicture.querySelectorAll('.social__comment').length);
  };

  // Отрисовка счетчика количества открытых комментов из общего числа комментариев, загруженных с сервера
  var renderCommentsCount = function (openedComments, allComments) {
    commentsCount.innerHTML = openedComments + ' из ' + '<span class="comments-count">' + allComments + '</span> ' + ' комментариев';
  };

  // Функция создания fullscreen - фото
  var createBigPicture = function (evt) {
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

    bigPicture.querySelector('.social__comments').appendChild(addComments(getServerComments(evt)));
    bigPictureComment.value = '';

    renderCommentsCount(bigPicture.querySelectorAll('.social__comment:not(.visually-hidden)').length, bigPicture.querySelectorAll('.social__comment').length);
    openBlock(commentsLoader);

    return bigPicture;
  };

  // Функция открытия fullscreen - фото
  var bigPictureOpen = function (evt) {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', onClickBtnClose);
    bigPictureComment.addEventListener('keydown', onFieldFocus);
    createBigPicture(evt);
    checkComments();
    document.addEventListener('keydown', onEscPress);
    commentsLoader.addEventListener('click', renderMoreComments);
  };

  // Открытие fullscreen - фото по enter
  var onEnterPress = function (evt) {
    if (window.data.isEnterPress(evt)) {
      bigPictureOpen(evt);
    }
  };

  // Функция закрытия fullscreen - фото по клику на крестик
  var bigPictureClose = function () {
    commentsLoader.removeEventListener('click', renderMoreComments);
    bigPictureComment.removeEventListener('keydown', onFieldFocus);
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    bigPictureCancel.removeEventListener('click', onClickBtnClose);
  };

  var onClickBtnClose = function () {
    bigPictureClose();
  };

  // Закрытие по нажатию escape
  var onEscPress = function (evt) {
    if (window.data.isEscPress(evt)) {
      bigPictureClose();
    }
  };

  // Запрет закрытия окна, если коммент в фокусе
  var onFieldFocus = function (evt) {
    if (window.data.isEscPress(evt)) {
      evt.stopPropagation();
    }
  };

  window.bigPicture = {
    bigPictureOpen: bigPictureOpen,
    bigPictureClose: bigPictureClose,
    onEnterPress: onEnterPress,
    createBigPicture: createBigPicture
  };
})();
