import {
  fetchPhoto,
  fetchGenres,
  discoverGenres,
  fetchTrandingMovie,
} from './fetchApi';

import {
  markupPages,
  togglePainationAllButtons,
  addTestPaginationListeners,
  togglePaginationBtn,
  hideFirstPageBtn,
  hideLastPageBtn,
  onClickNumberPageBtn,
  onClickPrevPageBtn,
  onClickNextPageBtn,
  onClickLessPageBtn,
  onClickMorePageBtn,
} from './pagination';

import { genresMarkup,galleryGenresMarkup,toggleGenres,toggleYear,removeAllChekedGenres,toggleTrands } from './genres'

import {modalOpenOnClick} from './modal'

import { options } from './fetchApi';
import galleryTpl from '../../template/gallery.hbs';
import { cloneDeep } from 'lodash';
import teaser from './teaser';

export {
  currentFetch,
  ress,
  checkFetchLink,
  onLoadTranding,
  galleryArrayMarkup,
  genresMarkup,
  toggleGenres,
  removeAllChekedGenres,
  ratingAddIshidden,
  
};
const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery-list'),
  btnLoadMore: document.querySelector('.load-more'),
  genres: document.querySelector('.genres'),
  topTrands: document.querySelector('.top-trands'),
  prevPage: document.querySelector("[data-page='prev']"),
  nextPage: document.querySelector("[data-page='next']"),
  lessPage: document.querySelector("[data-page='less']"),
  morePage: document.querySelector("[data-page='more']"),
  pages: document.querySelector('.pages'),
  paginationList: document.querySelector('.pagination'),
  clickedMovieCard: document.querySelectorAll(".gallery-list__item"),
  modalCloseBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  textError: document.querySelector('.js-header__text-error'),
};
let currentFetch = 'tranding';

genresMarkup();
const formInput = refs.form.elements.query;

refs.form.addEventListener('submit', checkFetchLink);
refs.genres.addEventListener('click', throttle(checkFetchLink, 200));
refs.topTrands.addEventListener('click', throttle(checkFetchLink, 200));

let ress = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

onLoadTranding();

addTestPaginationListeners();

async function checkFetchLink(e) {
  if (e.target === refs.genres) {
    return;
  }
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.pages.innerHTML = '';
  options.pageNumber = 1;
  options.query = formInput.value;
  try {
    toggleTrands(e.target.id);
    // ==== chech input ====
    if (e.currentTarget === refs.form) {
      removeAllChekedGenres();
      await onClickSearchSubmit(e);
      togglePainationAllButtons(ress);
    }
    // ===== chek genres =====
    if (e.currentTarget === refs.genres) {
      await onClickGenres(e)
    }    
    //==============topTrands =================
    if (e.target.id === 'topDay') {
      removeAllChekedGenres();
      toggleTrands(e.target.id);
      await onClickTopDayTrands(e)
    }

    if (e.target.id === 'topWeek') {
      removeAllChekedGenres();
      await onClickTopWeekTrands(e)
    }
  
    options.maxPage = ress.total_pages;
    localStorage.setItem('MoviesOnPage', JSON.stringify(ress));
    galleryArrayMarkup(ress);
    markupPages(ress);
    ratingAddIshidden();
    hideFirstPageBtn();
    hideLastPageBtn();
    togglePaginationBtn();
    togglePainationAllButtons(ress);
    
    modalOpenOnClick()
  } catch (e) {
    console.log(e);
  }
}

async function onClickSearchSubmit(e) { 
    if (options.query.trim() === '') {
        refs.textError.classList.remove('is-hidden');
        refs.paginationList.classList.add('visually-hidden');
        return;
      }

      options.genresId = [];
      options.query = formInput.value;
      currentFetch = 'search';
      ress = await fetchPhoto();
      console.log('search', ress);
      console.log('currentFetch ', currentFetch);
      console.log('query ', options.query);
  }
async function onClickGenres(e) {
  
      currentFetch = 'genres';
      formInput.value = '';
      e.target.classList.toggle('btn_active');
      options.pageNumber = 1;
      toggleGenres(e.target.id);
      if (e.target.dataset.year) {
        toggleYear(e.target.dataset.year);
      }
        ress = await discoverGenres();
        console.log('genres', ress);
        console.log('currentFetch ', currentFetch);
        console.dir(e.target.dataset.year);
        console.log(options.genresId);
        console.log(options.yearId);
      }

async function onClickTopDayTrands(e) {
      e.target.classList.toggle('btn_active');
      // toggleTrands(e.target.id);
      options.trand = 'day';
      options.genresId = [];
      currentFetch = 'tranding';
      console.log('topDay', options.trand);

      ress = await fetchTrandingMovie();
      console.log('topDay', ress);
      console.log('currentFetch ', currentFetch);
    }
async function onClickTopWeekTrands(e) {
   e.target.classList.toggle('btn_active');
      options.trand = 'week';
      console.log('topWeek', options.trand);
      currentFetch = 'tranding';

      ress = await fetchTrandingMovie();
      console.log('topWeek', ress);
      console.log('currentFetch ', currentFetch);
    }
// ================== tranding Startpage ==================
async function onLoadTranding() {

  ress = await fetchTrandingMovie()  
  options.maxPage = ress.total_pages
    galleryArrayMarkup(ress)
    markupPages(ress)
    ratingAddIshidden()
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()
    removeAllChekedGenres()
    modalOpenOnClick()
    togglePainationAllButtons(ress)
    localStorage.setItem('MoviesOnPage', JSON.stringify(ress));

    options.pageNumber += 1
    console.log(options.allGenresList);
    return await fetchTrandingMovie()

}

//=========================== разметкa Галереи фильмов ====================
function galleryArrayMarkup(array) {

  teaser(array);

    const galleryMarkup = array.results.map(({poster_path,original_title,vote_average,release_date,genre_ids}) =>
    {
      return `<li class="gallery-list__item">


                <a class="gallery-list__card">
                    <div class="gallery-list__poster" href="https://image.tmdb.org/t/p/w500/${poster_path}">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}" width = "298" height = "398"/>
                    </div>
                    <div class="gallery-list__description">
                    <h2 class="gallery-list__titel">${original_title}</h2>
                    <div class="gallery-list__statics">

                        <p class="gallery-list__text">${galleryGenresMarkup(genre_ids)} | <span class="gallery-list__text-aftertext">${new Date(
        release_date,
      ).getFullYear()}</span> </p>

                        <span class="gallery-list__rating">${vote_average}</span>
                    </div>
                </div>
                </a>
            </li>
`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}
console.log('genresId', options.genresId);

// =====================================Работаем с рейтингами ======================================================

function ratingAddIshidden() {
  const ratings = document.querySelectorAll('.gallery-list__rating');
  ratings.forEach(rating => rating.classList.add('visually-hidden'));
}


//=====================================Запуск модалки===============================================================

// function modalOpenOnClick() {
//   const clickedMovieCard = document.querySelectorAll(".gallery-list__item");
//   clickedMovieCard.forEach(button => button.addEventListener("click", onClick));

//   const modalCloseBtn = document.querySelector('[data-modal-close]');
//   modalCloseBtn.addEventListener('click', onClick)

//   function onClick(event) {
//     event.preventDefault()

//     console.log(event.currentTarget);
    
//     const modal = document.querySelector('[data-modal]');
//     modal.classList.toggle('is-hidden');
  
//   }
// }

// =========================================================================================================

const ratings = document.querySelector('.gallery-list');
console.log(ratings);
// // ratings.classList.add('visually-hidden')

// const children = ratings.children;

// console.log(children)
