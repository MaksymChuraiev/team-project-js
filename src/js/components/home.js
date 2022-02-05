import { galleryArrayMarkup, ratingAddIshidden } from './gallery';
import { modalOpenOnClick } from './modal'

import {
  markupPages,
  hideFirstPageBtn,
  hideLastPageBtn,
  togglePaginationBtn,
  togglePainationAllButtons,
} from './pagination';

galleryArrayMarkup;

const refs = {
  gallery: document.querySelector('.gallery-list'),
  pages: document.querySelector('.pages'),
  genres: document.querySelector('.genres'),
  paginationList: document.querySelector('.pagination'),
  topTrands: document.querySelector('.top-trands'),
  filterEl: document.querySelector('.filter'),
  slider: document.querySelector('.slider__section')
};

function homeMarkup() {
  refs.gallery.innerHTML = '';
  refs.pages.innerHTML = '';
  refs.paginationList.style.display = 'flex';
  refs.genres.style.display = 'flex';
  refs.topTrands.style.display = 'flex';
  refs.filterEl.classList.remove('hidden')
  refs.slider.classList.remove('visually-hidden')
  try {
    const ress = JSON.parse(localStorage.getItem('MoviesOnPage'));
    console.log(ress)
    galleryArrayMarkup(ress);
    markupPages(ress);
    ratingAddIshidden();
    hideFirstPageBtn();
    hideLastPageBtn();
    togglePaginationBtn();
    togglePainationAllButtons(ress);
    modalOpenOnClick()
    localStorage.setItem('isActive', 'home');

  } catch (e) {
    console.log(e);
  }
}

export { homeMarkup };
