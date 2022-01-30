import { fetchPhoto, fetchGenres,discoverGenres, fetchTrandingMovie, discoverAnotherGenres} from './fetchApi'
import { markupPages, addTestPaginationListeners, togglePaginationBtn, hideFirstPageBtn, hideLastPageBtn, onClickNumberPageBtn, onClickPrevPageBtn, onClickNextPageBtn, onClickLessPageBtn, onClickMorePageBtn } from './pagination'

import { options } from './fetchApi';
import galleryTpl from '../../template/gallery.hbs';
import { cloneDeep } from 'lodash';

export { currentFetch, ress, checkFetchLink, onLoadTranding, galleryArrayMarkup, genresMarkup, toggleGenres, removeAllChekedGenres }
const throttle = require('lodash.throttle');
let searchYears = []


const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery-list'),
    btnLoadMore: document.querySelector('.load-more'),
    genres: document.querySelector('.genres'),
    anotherGenres: document.querySelector('.anotherGenres'),
    prevPage: document.querySelector("[data-page='prev']"),
    nextPage: document.querySelector("[data-page='next']"),
    lessPage: document.querySelector("[data-page='less']"),
    morePage: document.querySelector("[data-page='more']"),
    pages: document.querySelector('.pages'),
  textError: document.querySelector('.js-header__text-error'),
   
}
let currentFetch = 'tranding'
let currentPage = 1
console.log(refs.gallery)
genresMarkup()
const formInput = refs.form.elements.query;
console.log(formInput)
refs.form.addEventListener('submit', checkFetchLink)
refs.genres.addEventListener('click', throttle(checkFetchLink, 200))
refs.anotherGenres.addEventListener('click', throttle(checkFetchLink, 200))


let ress = ''
onLoadTranding()
addTestPaginationListeners()

async function checkFetchLink(e) {

  if (e.target === refs.genres){
    return
  }
  e.preventDefault();
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  options.pageNumber = 1;
  options.query = formInput.value
  try {
  toggleTrands(e.target.id)
  // ==== chech input ====
  if (e.currentTarget === refs.form) {
      if (options.query.trim() === '') {
      //  return Notify.failure("Please enter film name")
      refs.textError.classList.remove('is-hidden');
    }
      removeAllChekedGenres()
      options.genresId = []
      options.query = formInput.value
      currentFetch = 'search'
      ress =  await fetchPhoto()
      console.log('search', ress)
      console.log('currentFetch ', currentFetch)
      console.log('oq ', options.query)
      
    }
  // ===== chek genres ===== 

    if (e.currentTarget === refs.genres) {
      
      currentFetch = 'genres'
      formInput.value = ''
      e.target.classList.toggle('btn_active')
      options.pageNumber = 1
      toggleGenres(e.target.id)    
      ress = await discoverGenres()
      console.log('genres', ress)
      console.log('currentFetch ',currentFetch)

    }
    //==============anotherGenres =================
    if (e.target.id === 'topDay') {
      removeAllChekedGenres()
      e.target.classList.toggle('btn_active')
      toggleTrands(e.target.id)
      options.trand = 'day'
      options.genresId = []
      currentFetch = 'topDay'
      console.log('topDay', options.trand)
      
      
      ress = await fetchTrandingMovie()
      console.log('topDay', ress)
      console.log('currentFetch ', currentFetch)
      
    }
    if (e.target.id === 'topWeek') {
      removeAllChekedGenres()
      e.target.classList.toggle('btn_active')
      options.trand = 'week'
      console.log('topWeek', options.trand)
      currentFetch = 'topWeek'

      ress = await fetchTrandingMovie()
      console.log('topWeek', ress)
      console.log('currentFetch ',currentFetch)
    }
    //================ year =============== пока не трогать =============
    if (e.target.id == '2022') {
      e.target.classList.toggle('btn_active')
      options.year = e.target.id
      options.genresId = []
      console.log('2022', options.year)

      ress = await discoverAnotherGenres()
      console.log('2022', ress)
    }
    if (e.target.id == '2021') {
      e.target.classList.toggle('btn_active')
      options.year = e.target.id
      options.genresId = []
      console.log('2021', options.year)
      
      ress = await discoverAnotherGenres()
      console.log('2021', ress)
    }
    if (e.target.id == '2020') {

      e.target.classList.toggle('btn_active')
      options.year = e.target.id
      options.genresId = []
      console.log('2020', options.year)
      
      ress = await discoverAnotherGenres()
      console.log('2020', ress)
    }
    
    
    options.maxPage = ress.total_pages
    galleryArrayMarkup(ress)
    markupPages(ress)
    ratingAddIshidden()
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()
    
    
  } catch (e) {
    
  }
  
}
// ================== tranding Startpage ==================
async function onLoadTranding() {
  ress = await fetchTrandingMovie()
  const resp = await fetchTrandingMovie()
  
  options.maxPage = resp.total_pages
    galleryArrayMarkup(resp)
    ratingAddIshidden()
    markupPages(resp)
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()
    removeAllChekedGenres()
  options.pageNumber += 1
  
    return await fetchTrandingMovie()
}

//=========================== разметкa Галереи фильмов ====================
function galleryArrayMarkup(array) {
    const galleryMarkup = array.results.map(({poster_path,original_title,vote_average,release_date,genre_ids}) =>
    {
      // console.log(largeImageURL)
      return `<li class="gallery-list__item">
                <div class="gallery-list__card">
                    <a class="gallery-list__poster" href="https://image.tmdb.org/t/p/w500/${poster_path}">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}" width = "298" height = "398"/>
                    </a>
                </div>
                <!-- <div class="gallery-list__description"> -->
                    <h2 class="gallery-list__titel">${original_title}</h2>
                    <div class="gallery-list__statics">
                        <p class="gallery-list__text">${genre_ids} | <span class="gallery-list__text-aftertext">${new Date(release_date).getFullYear()}</span> </p>
                        <span class="gallery-list__rating">${vote_average}</span>
                    </div>
                <!-- </div> -->
            </li>
`
    }).join("")
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup)
}
console.log('genresId', options.genresId)

// =====================================Работаем с рейтингами ======================================================

function ratingAddIshidden() {
    const ratings = document.querySelectorAll('.gallery-list__rating');
    ratings.forEach(rating => rating.classList.add('visually-hidden'))
  }


// ===================== пока не трогаем ==============
// ================ фетч всехЖанров с АПИ и маркап их ========================

async function genresMarkup() {
  const r = await fetchGenres()
  
  const genres = r.genres.map(({ id, name }) => {
    return `
    <button class="genres-btn btn"  id="${id}">${name}</button>`
  }).join("")
  refs.genres.insertAdjacentHTML('afterbegin', genres)
}

// ===================== выбор и удаление жанра со страницы, добавление в массив ======
function toggleGenres(id) {
  if (options.genresId.includes(id)) {
    const genresIdx = options.genresId.indexOf(id)
    options.genresId.splice(genresIdx, 1)
    return
  }
  options.genresId.push(id)
}

// ==================== удаление всех выбраных жанров ======================
async function removeAllChekedGenres() {
    const allRenderGenresButton = [...refs.genres.children]
   return allRenderGenresButton.forEach(eachBtn=>eachBtn.classList.remove('btn_active'))
}
async function toggleTrands(id) {
  const allAnoterGenresButton = [...refs.anotherGenres.children]
  for (const btn of allAnoterGenresButton) {
    if (btn.id !== id) {
      btn.classList.remove('btn_active')
    }
    continue
  }
}




const ratings = document.querySelector('.gallery-list');
console.log(ratings)
// // ratings.classList.add('visually-hidden')

// const children = ratings.children;

// console.log(children)

