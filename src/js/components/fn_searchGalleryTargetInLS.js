export { getGalleryTargetMovieFromLS, currentFilm };

import { cloneDeep } from 'lodash';
import { modalWindowMarkup } from './fn_dataMovietoModal';
import { data } from './library';
import teaser from './teaser';

const refs = {
  gallery: document.querySelector('.gallery-list'),
  modal: document.querySelector('.modal__wrapper'),
  modalButtons: document.querySelector('.modal__buttons'),
};
// console.log(refs.gallery)
console.log(refs.modal);
let currentFilm;

function getGalleryTargetMovieFromLS() {
  const lsKey = localStorage.getItem('isActive');
  console.log(lsKey);
  const galeryofFilms = [...refs.gallery.children];
  let arrayofFilms;
  if (lsKey === 'home') {
    arrayofFilms = JSON.parse(localStorage.getItem('MoviesOnPage'));
    console.log('home', arrayofFilms);
  }
  if (lsKey === 'watched') {
    arrayofFilms = JSON.parse(localStorage.getItem('watched'));
    console.log('home', arrayofFilms);
  }
  if (lsKey === 'queue') {
    arrayofFilms = JSON.parse(localStorage.getItem('queue'));
    console.log('home', arrayofFilms);
  }
  // const arrayofFilms = JSON.parse(localStorage.getItem('MoviesOnPage'))
  arrayofFilms.results.forEach((film, idxA) => {
    // console.log(film, idxA)
    galeryofFilms.forEach((li, idxB) => {
      if (li === event.currentTarget) {
        if (idxA === idxB) {
          currentFilm = film;
          // console.log('era', film)
          teaser(film.id);
          modalWindowMarkup(film);
        }
      }
    });
  });
}
