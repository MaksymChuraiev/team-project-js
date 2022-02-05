import { fetchPhoto, fetchGenres, discoverGenres, fetchTrandingMovie,fetchTrandingMovieForSlider,fetchPhotoTest } from './fetchApi';

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

import {
  genresMarkup,
  galleryGenresMarkup,
  toggleGenres,
  toggleYear,
  removeAllChekedGenres,
  toggleTrands,
} from './genres';

import { modalOpenOnClick } from './modal';

import { options } from './fetchApi';
import galleryTpl from '../../template/gallery.hbs';
import { cloneDeep } from 'lodash';
import teaser from './teaser';

import { showErrorText, hideErrorText } from './errorText';
import { hidePagination, showPagination } from './hidePagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { sliderMarkup,onLoadMainPageShowSlider} from './slider';
import {showFetchLoader,hideFetchLoader} from './fetchLoader'
import folder from '../../images/placeholder.bmp'


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
  posterFolder
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
  clickedMovieCard: document.querySelectorAll('.gallery-list__item'),
  modalCloseBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  textError: document.querySelector('.js-header__text-error'),
  endCollectionText: document.querySelector('.end-collection-text'),
  slider: document.querySelector('.slider__section'),
};
let currentFetch = 'tranding';
let currentFetchTest = 'tranding';
// let previousFetch = JSON.parse(localStorage.getItem('MoviesOnPage'));

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
let data = {
  page: 1,
  results: [],
};
localStorage.setItem('isActive', 'home');
if (!localStorage.getItem('watched')) {
  localStorage.setItem('watched', JSON.stringify(data));
}
if (!localStorage.getItem('queue')) {
  localStorage.setItem('queue', JSON.stringify(data));
}

onLoadTranding();

addTestPaginationListeners();
onLoadMainPageShowSlider()



async function checkFetchLink(e) {
  
  if (e.target === refs.genres) {
    return;
  }
  if (e.target === refs.topTrands) {
    return;
  }
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.pages.innerHTML = '';
  // options.pageNumber = 1;
  
  try {
    // toggleTrands(e.target.id);
    // ==== chech input ====
    await showFetchLoader()
    if (e.currentTarget === refs.form) {
      if (formInput.value.trim() === '') {
        console.log('options.pageNumber',options.pageNumber);
        console.log('options.pageNumberTest',options.pageNumberTest);
        options.pageNumber = options.pageNumberTest
        console.log(options.genresId);
        console.log('после options.pageNumber',options.pageNumber);
        console.log('после options.pageNumberTest',options.pageNumberTest);
        showErrorText();
        console.log(('пусто'));
        setTimeout(hideErrorText, 2000)
        if (currentFetch === 'genres') {
        ress= await discoverGenres()
        }
        if (currentFetch === 'tranding') {
        ress= await fetchTrandingMovie()
        }
        if (currentFetch === 'year') {
        ress= await discoverYear()
        }
        
      } else {
       
        options.queryTest = formInput.value;
        options.pageNumber = 1
      
      await onClickSearchSubmit(e);
      // togglePainationAllButtons(ress);
      }
    
    }
    // ===== chek genres =====
    if (e.currentTarget === refs.genres) {
      options.pageNumber = 1;
      options.pageNumberTest = 1
      // await showFetchLoader();
      toggleTrands(e.target.id);
      await onClickGenres(e);
    }
    //==============topTrands =================
    if (e.target.id === 'topDay') {
      options.pageNumber = 1;
      options.pageNumberTest = 1
      // await showFetchLoader()
      removeAllChekedGenres();
      toggleTrands(e.target.id);
      await onClickTopDayTrands(e);
    }

    if (e.target.id === 'topWeek') {
      options.pageNumber = 1;
      options.pageNumberTest = 1;
      // await showFetchLoader()
      removeAllChekedGenres();
      toggleTrands(e.target.id);
      await onClickTopWeekTrands(e);
    }
    
    options.maxPage = ress.total_pages;
    if (ress.results.length !== 0) {
      localStorage.setItem('MoviesOnPage', JSON.stringify(ress));
    }
    galleryArrayMarkup(ress);
    markupPages(ress);
    ratingAddIshidden();
    hideFirstPageBtn();
    hideLastPageBtn();
    togglePaginationBtn();
    togglePainationAllButtons(ress);
    modalOpenOnClick();
    await hideFetchLoader()
    
  } catch (e) {
    console.log(e);
  }
}


async function onClickSearchSubmit(e) { 

  hideErrorText();
  //проверка отправка респонса с тестовым значением инпута
  const ressTest = await fetchPhotoTest();
  // console.log('resstest,', ressTest);
  
  //проверка респонса на длинну массива
  if (ressTest.results.length === 0) {
      showErrorText();
      console.log(('пусто'));
      setTimeout(hideErrorText, 2000)
      options.pageNumber = options.pageNumberTest
      currentFetchTest = 'search';
      console.log('restest = 0')
      formInput.value = ''
      console.log('options.query',options.query)
      console.log('options.queryTest',options.queryTest)
      // options.query === ''
      // console.log(options.query === '')
    //проверка респонса на длинну массива с пустым инпутом
      if (options.query === '') {
        console.log('query pysto aaaaaa')
        console.log('currentFetchTest',currentFetchTest)
        console.log('currentFetch', currentFetch)
        if (currentFetch === 'genres') {
          ress= await discoverGenres()
        }
        if (currentFetch === 'tranding') {
          ress= await fetchTrandingMovie()
        }
        if (currentFetch === 'year') {
          ress= await discoverYear()
        }
      
      } else {
        if (currentFetch === 'search') {
          ress = await fetchPhoto()
        }
        // ress = await fetchPhoto()
        if (currentFetch === 'genres') {
          ress= await discoverGenres()
        }
        if (currentFetch === 'tranding') {
          ress= await fetchTrandingMovie()
        }
        if (currentFetch === 'year') {
          ress= await discoverYear()
        }
        // options.queryTest = ''
      }
     
    
  } else {
    // если все ок то записываем значение queryTest в query 
    console.log('currentFetchДо',currentFetch);
    console.log('currentFetchTestДо',currentFetchTest);
    
      currentFetch = 'search'
      options.genresId = []
      options.query = options.queryTest
      removeAllChekedGenres();
    ress = await fetchPhoto()
    console.log(options.genresId);
    console.log('currentFetchПосле',currentFetch);
    console.log('currentFetchTestПосле',currentFetchTest);
      
  }
  
  console.log('search', ress);
  console.log('currentFetch ', currentFetch);
  console.log('query ', options.query);
}


async function onClickGenres(e) {
  hideErrorText();
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
  showFetchLoader()
  ress = await fetchTrandingMovie();
  options.maxPage = ress.total_pages;
  galleryArrayMarkup(ress);
  markupPages(ress);
  ratingAddIshidden();
  modalOpenOnClick();
  hideFirstPageBtn();
  hideLastPageBtn();
  togglePaginationBtn();
  removeAllChekedGenres();
  togglePainationAllButtons(ress);
  
  if (ress.results.length !== 0) {
    localStorage.setItem('MoviesOnPage', JSON.stringify(ress));
  }

  // options.pageNumber += 1;
  console.log(options.allGenresList);
  await hideFetchLoader()
  return await fetchTrandingMovie();
}

//=========================== разметкa Галереи фильмов ====================
function galleryArrayMarkup(array) {
  const galleryMarkup = array.results
    .map(({ poster_path, original_title, vote_average, release_date, genre_ids }) => {
      return `<li class="gallery-list__item">


                <a class="gallery-list__card">
                    <div class="gallery-list__poster">
                        <img class="gallery-list__img" src="${poster_path?'https://image.tmdb.org/t/p/w500'+poster_path:folder}" alt="${original_title}"  loading="lazy" />
                    </div>
                    </div>
                    <div class="gallery-list__description">
                    <h2 class="gallery-list__titel">${original_title}</h2>
                    <div class="gallery-list__statics">

                        <p class="gallery-list__text">${galleryGenresMarkup(genre_ids)?galleryGenresMarkup(genre_ids):'no information'} | <span class="gallery-list__text-aftertext">${new Date(
        release_date,
      ).getFullYear()?new Date(
        release_date,
      ).getFullYear():'no information'}</span> </p>

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

console.log('genresId', options.genresId);
{/* <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}" width = "396" onError="this.src='../../images/folder.jpg'/> */}
function posterFolder(poster) {
  if (poster === null) {
    return `https://via.placeholder.com/550`
    // return `https://via.placeholder.com/550`
    // return `https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg`
  }
  return `https://image.tmdb.org/t/p/w500${poster}`
}
// =====================================Работаем с рейтингами ======================================================

function ratingAddIshidden() {
  const ratings = document.querySelectorAll('.gallery-list__rating');
  ratings.forEach(rating => rating.classList.add('visually-hidden'));
}

const ratings = document.querySelector('.gallery-list');
console.log(ratings);
