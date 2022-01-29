const refs = {
  header: document.querySelector('.js-header'),
  home: document.querySelector('.js-home'),
  library: document.querySelector('.js-library'),
  form: document.querySelector('.js-header-form'),
  thumb: document.querySelector('.js-header-thumb'),
  watched: document.querySelector('.js-button-watched'),
  queue: document.querySelector('.js-button-queue'),
};

refs.home.addEventListener('click', onHomeClick);
refs.library.addEventListener('click', onLibraryClick);
refs.watched.addEventListener('click', onWatchedClick);
refs.queue.addEventListener('click', onQueueClick);

function onHomeClick(e) {
  e.preventDefault();
  refs.home.classList.add('is-current');
  refs.library.classList.remove('is-current');
  refs.header.classList.add('header__home');
  refs.header.classList.remove('header__library');
  refs.form.style.display = 'flex';
  refs.thumb.style.display = 'none';
}

function onLibraryClick(e) {
  e.preventDefault();
  refs.home.classList.remove('is-current');
  refs.library.classList.add('is-current');
  refs.header.classList.add('header__library');
  refs.header.classList.remove('header__home');
  refs.form.style.display = 'none';
  refs.thumb.style.display = 'flex';
}

function onWatchedClick(e) {
  e.preventDefault();
  refs.watched.classList.add('header__button--active');
  refs.queue.classList.remove('header__button--active');
}

function onQueueClick(e) {
  e.preventDefault();
  refs.queue.classList.add('header__button--active');
  refs.watched.classList.remove('header__button--active');
}



