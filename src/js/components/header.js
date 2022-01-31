import { libraryMarkup } from './library';
import { homeMarkup } from './home';

const refs = {
  header: document.querySelector('.js-header'),
  home: document.querySelector('.js-home'),
  library: document.querySelector('.js-library'),
  form: document.querySelector('.js-header-form'),
  thumb: document.querySelector('.js-header-thumb'),
  watched: document.querySelector('.js-button-watched'),
  queue: document.querySelector('.js-button-queue'),
  textError: document.querySelector('.js-header__text-error'),
};

refs.home.addEventListener('click', onHomeClick);
refs.library.addEventListener('click', onLibraryClick);

function onHomeClick(e) {
  e.preventDefault();
  refs.home.classList.add('is-current');
  refs.library.classList.remove('is-current');
  refs.header.classList.add('header__home');
  refs.header.classList.remove('header__library');
  refs.form.style.display = 'flex';
  refs.thumb.style.display = 'none';
  homeMarkup();
}

function onLibraryClick(e) {
  e.preventDefault();
  refs.home.classList.remove('is-current');
  refs.library.classList.add('is-current');
  refs.header.classList.add('header__library');
  refs.header.classList.remove('header__home');
  refs.form.style.display = 'none';
  refs.thumb.style.display = 'flex';
  libraryMarkup();
}
