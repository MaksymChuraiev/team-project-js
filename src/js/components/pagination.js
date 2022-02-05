export { markupPages, togglePainationAllButtons, addTestPaginationListeners, togglePaginationBtn, hideFirstPageBtn, hideLastPageBtn, onClickPrevPageBtn, onClickNextPageBtn, onClickNumberPageBtn, onClickLessPageBtn, onClickMorePageBtn, }

import {modalOpenOnClick,addListenersOnEachGalleryCard} from './modal'

import { currentFetch, ress, checkFetchLink, onLoadTranding, galleryArrayMarkup, genresMarkup, toggleGenres, removeAllChekedGenres, ratingAddIshidden } from './gallery'

import { fetchPhoto, discoverYear, discoverGenres, fetchTrandingMovie } from './fetchApi'

import { options } from './fetchApi';



var throttle = require('lodash.throttle');

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery-list'),
    btnLoadMore: document.querySelector('.load-more'),
    genres: document.querySelector('.genres'),
    prevPage: document.querySelector("[data-page='prev']"),
    nextPage: document.querySelector("[data-page='next']"),
    lessPage: document.querySelector("[data-page='less']"),
    morePage: document.querySelector("[data-page='more']"),
    pages: document.querySelector('.pages'),
    paginationList: document.querySelector('.pagination'), 
    startPage:document.querySelector('[data-page="start"]'),
    endPage: document.querySelector('[data-page="end"]'),
    
}
console.log(refs);
console.log(options);
// console.log(refs.endCollectionText);
function markupPages(array) {
  let pagesBtnMarkup =`     <div class="page_item">
        <a href="#" class="page_link pagination_btn" data-page=${array.page - 2}>${array.page - 2}</a>
      </div>
      <div class="page_item ${(array.page - 1 <= 0) ?'visually-hidden':'' }">
        <a href="#" class="page_link pagination_btn" data-page=${array.page - 1}>${array.page - 1}</a>
      </div>
      <div class="page_item disabled">
        <a href="#" class="page_link pagination_btn btn_active btn_disabled" data-page=${array.page}>${array.page}</a>
      </div>
      <div class="page_item">
        <a href="#" class="page_link pagination_btn" data-page=${array.page + 1}>${array.page + 1}</a>
      </div>
      <div class="page_item">
        <a href="#" class="page_link pagination_btn" data-page=${array.page + 2}>${array.page + 2}</a>
      </div>`
  
  if(window.innerWidth >767) {
    pagesBtnMarkup = `
      <li class="page_item"><a href="#" class="page_link pagination_btn" data-page=${array.page - 1}>${array.page - 1}</a></li>
              <li class="page_item disabled"><a href="#" class="page_link pagination_btn btn_active btn_disabled" data-page=${array.page}>${array.page}</a></li>
              <li class="page_item"><a href="#" class="page_link pagination_btn" data-page=${array.page + 1}>${array.page + 1}</a>
              </li>`
  
    markupStartEndPages(array)
    refs.pages.insertAdjacentHTML('beforeend', pagesBtnMarkup)
    return
  }
  refs.pages.insertAdjacentHTML('beforeend', pagesBtnMarkup)
}


async function togglePainationAllButtons(array) {
  refs.paginationList.classList.remove('visually-hidden')
  if (array.total_pages <= 1) {
    // refs.paginationList.classList.add('visually-hidden')
    // console.log(array.results.length)
    console.log(refs.paginationList)
  }
}

async function addTestPaginationListeners() {
  refs.prevPage.addEventListener('click', onClickPrevPageBtn)
  refs.nextPage.addEventListener('click', onClickNextPageBtn)
  refs.morePage.addEventListener('click', onClickMorePageBtn)
  refs.lessPage.addEventListener('click', onClickLessPageBtn)
  refs.pages.addEventListener('click', onClickNumberPageBtn)
  refs.startPage.addEventListener('click', onClickStartPageBtn)
  refs.endPage.addEventListener('click', onClickEndPageBtn)
  window.addEventListener('resize',throttle(togglePaginationBtn,300))
}

function togglePaginationBtn() {

    refs.prevPage.parentNode.classList.remove('btn_disabled')
    refs.prevPage.parentNode.classList.remove('visually-hidden')
    refs.lessPage.parentNode.classList.remove('btn_disabled')
    refs.lessPage.parentNode.classList.remove('visually-hidden')
    refs.nextPage.parentNode.classList.remove('btn_disabled')
    refs.nextPage.parentNode.classList.remove('visually-hidden')
    refs.morePage.parentNode.classList.remove('btn_disabled')
    refs.morePage.parentNode.classList.remove('visually-hidden')
    refs.startPage.parentNode.classList.remove('btn_disabled')
    refs.startPage.parentNode.classList.remove('visually-hidden')
    refs.endPage.parentNode.classList.remove('btn_disabled')
    refs.endPage.parentNode.classList.remove('visually-hidden')
  

  
  if (options.pageNumber <= 1) {
    console.log('options.pageNumber paginator',options.pageNumber)
    refs.prevPage.parentNode.classList.add('btn_disabled')
    refs.prevPage.parentNode.classList.add('visually-hidden')
    refs.lessPage.parentNode.classList.add('btn_disabled')
    refs.lessPage.parentNode.classList.add('visually-hidden')
    refs.startPage.parentNode.classList.add('btn_disabled')
    refs.startPage.parentNode.classList.add('visually-hidden')
  }
  if (options.pageNumber >= options.maxPage) {
    refs.nextPage.parentNode.classList.add('btn_disabled')
    refs.nextPage.parentNode.classList.add('visually-hidden')
    refs.morePage.parentNode.classList.add('btn_disabled')
    refs.morePage.parentNode.classList.add('visually-hidden')
    refs.endPage.parentNode.classList.add('btn_disabled')
    refs.endPage.parentNode.classList.add('visually-hidden')
    // refs.endCollectionText.classList.add('visually-hidden');
  }
  if (window.innerWidth < 768) {
      refs.paginationList.children[1].classList.add('visually-hidden')
      refs.paginationList.children[2].classList.add('visually-hidden')
      refs.paginationList.children[4].classList.add('visually-hidden')
      refs.paginationList.children[5].classList.add('visually-hidden')

  }
}


function hideFirstPageBtn() {
  if (refs.pages.firstElementChild.firstElementChild.dataset.page <= 1) {
    refs.pages.firstElementChild.classList.add('visually-hidden');
  }
  // refs.paginationList.children[0].classList.add('visually-hidden')
  // refs.paginationList.children[1].classList.add('visually-hidden')
  // refs.paginationList.children[2].classList.add('visually-hidden')

}

function hideLastPageBtn() {
  if (refs.pages.lastElementChild.firstElementChild.dataset.page-1 >= options.maxPage) {
    refs.pages.lastElementChild.classList.add('visually-hidden');
    // refs.paginationList.children[4].classList.add('visually-hidden')
    // refs.paginationList.children[5].classList.add('visually-hidden')
    // refs.paginationList.children[6].classList.add('visually-hidden')  
    // ===================================== скрываю текст конец коллекции
      // refs.endCollectionText.classList.remove('visually-hidden');
  }
}
// function hideEndCollectionText (){
//   refs.endCollectionText.classList.add('is-hidden');
// }
// function showEndCollectionText (){
//   refs.endCollectionText.classList.remove('is-hidden');
// }

// ============ descriptionButtonListener ============
async function onClickNumberPageBtn(e) {

  if (e.target.nodeName === 'UL' || e.target.nodeName === 'LI') {
    return
  }
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  e.preventDefault();
  console.log(e.target)
  console.log(e.target.dataset.page)
  console.dir(refs.pages)
  options.pageNumber = +e.target.dataset.page
  console.log(refs.pages)
  console.log(refs.pages.firstElementChild)

  let response
  if (currentFetch === 'tranding') {
    response = await fetchTrandingMovie()
    console.log('tranding',response)
  }
  if (currentFetch === 'search') {
    response = await fetchPhoto()
    console.log('search',response)
  }
  if (currentFetch === 'genres') {
    response = await discoverGenres()
    console.log('genres',response)
  }
  if (currentFetch === 'year') {
    response = await discoverYear()
    console.log('genres',response)
  }  

  if (currentFetch === 'error') {
    console.log('eror my eror')
    return 
  }
  options.pageNumberTest = options.pageNumber
  localStorage.setItem('MoviesOnPage', JSON.stringify(response));
  galleryArrayMarkup(response)
  markupPages(response)
  modalOpenOnClick()
  ratingAddIshidden()
  hideFirstPageBtn()
  hideLastPageBtn()
  togglePaginationBtn()
  scrollUp(e)
  markupStartEndPages(response)
  
  console.log(e.target)
  
  
}

async function onClickPrevPageBtn(e) {
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  e.preventDefault();
  console.log('prev')
  console.log(e.target)
  refs.nextPage.parentNode.classList.remove('disabled')
  
  if (options.pageNumber > 1) {
    options.pageNumber -= 1;
    
    let response
  if (currentFetch === 'tranding') {
    response = await fetchTrandingMovie()
    console.log('tranding',response)
  }
  if (currentFetch === 'search') {
    response = await fetchPhoto()
    console.log('search',response)
  }
  if (currentFetch === 'genres') {
    response = await discoverGenres()
    console.log('genres',response)
  }
  if (currentFetch === 'year') {
    response = await discoverYear()
    console.log('genres',response)
    }  
    options.pageNumberTest = options.pageNumber
    localStorage.setItem('MoviesOnPage', JSON.stringify(response));
    galleryArrayMarkup(response)
    markupPages(response)
    modalOpenOnClick()
    ratingAddIshidden()
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()  
    scrollUp(e)
    
    markupStartEndPages(response)

  }
}
async function onClickNextPageBtn(e) {
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  e.preventDefault();
  console.log('next')
  console.log(e.target)
  console.log(e.currentTarget)
  console.log(options.maxPage,'maxPage')
  console.log(options.pageNumber,'pageNumber')
  
  
    if (options.pageNumber < options.maxPage) {
      refs.prevPage.parentNode.classList.remove('disabled')
      options.pageNumber += 1;     
let response
  if (currentFetch === 'tranding') {
    response = await fetchTrandingMovie()
    console.log('tranding',response)
  }
  if (currentFetch === 'search') {
    response = await fetchPhoto()
    console.log('search',response)
  }
  if (currentFetch === 'genres') {
    response = await discoverGenres()
    console.log('genres',response)
      }
  if (currentFetch === 'year') {
    response = await discoverYear()
    console.log('genres',response)
      }
      options.pageNumberTest = options.pageNumber
      localStorage.setItem('MoviesOnPage', JSON.stringify(response));
      galleryArrayMarkup(response)
      markupPages(response)
      modalOpenOnClick()
      ratingAddIshidden()
      console.dir(refs.pages.lastElementChild.firstElementChild.dataset.page,'dataset')
      hideFirstPageBtn()
      hideLastPageBtn()
      togglePaginationBtn()
      scrollUp(e)
     
      markupStartEndPages(response)

    }
}
console.log('options.pageNumber:',options.pageNumber)
console.log('options.maxPage:',options.maxPage)

async function onClickMorePageBtn(e) {
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  e.preventDefault();
  console.log('more')
  console.log(e.target)
  console.log(options.pageNumber)
  console.log(options.maxPage)
  if (options.pageNumber <= options.maxPage) {
    if (options.pageNumber+3 >= options.maxPage) {
      options.pageNumber = options.maxPage
    } else {
      options.pageNumber += 3;
      options.pageNumberTest = options.pageNumber
    }
let response
  if (currentFetch === 'tranding') {
    response = await fetchTrandingMovie()
    console.log('tranding',response)
  }
  if (currentFetch === 'search') {
    response = await fetchPhoto()
    console.log('search',response)
  }
  if (currentFetch === 'genres') {
    response = await discoverGenres()
    console.log('genres',response)
  }
  if (currentFetch === 'year') {
    response = await discoverYear()
    console.log('genres',response)
    }
    
    localStorage.setItem('MoviesOnPage', JSON.stringify(response));
    galleryArrayMarkup(response)
    markupPages(response)
    modalOpenOnClick()
    ratingAddIshidden()
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()
    scrollUp(e)
    
    markupStartEndPages(response)

  }
}

async function onClickLessPageBtn(e) {
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  e.preventDefault();
  console.log('less')
  console.log(e.target)
  if (options.pageNumber <= options.maxPage) {
    if (options.pageNumber <= 3) {
      options.pageNumber = 1
      options.pageNumberTest = options.pageNumber
    } else {
      options.pageNumber -= 3;
      options.pageNumberTest = options.pageNumber
    }
let response
  if (currentFetch === 'tranding') {
    response = await fetchTrandingMovie()
    console.log('tranding',response)
  }
  if (currentFetch === 'search') {
    response = await fetchPhoto()
    console.log('search',response)
  }
  if (currentFetch === 'genres') {
    response = await discoverGenres()
    console.log('genres',response)
  }
  if (currentFetch === 'year') {
    response = await discoverYear()
    console.log('genres',response)
    }
    
    localStorage.setItem('MoviesOnPage', JSON.stringify(response));
    galleryArrayMarkup(response)
    markupPages(response)
    modalOpenOnClick()
    ratingAddIshidden()
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()
    scrollUp(e)
    
    markupStartEndPages(response)

  }
}

function scrollUp(e) {
    e.preventDefault();
    window.scroll(0, 0)
}
  
async function onClickStartPageBtn(e) {
  console.log('start');
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  e.preventDefault();
  console.log('more')
  console.log(e.target)
  console.log(options.pageNumber)
  console.log(options.maxPage)
  options.pageNumber = 1
  options.pageNumberTest = options.pageNumber
  let response
  if (currentFetch === 'tranding') {
    response = await fetchTrandingMovie()
    console.log('tranding',response)
  }
  if (currentFetch === 'search') {
    response = await fetchPhoto()
    console.log('search',response)
  }
  if (currentFetch === 'genres') {
    response = await discoverGenres()
    console.log('genres',response)
  }
  if (currentFetch === 'year') {
    response = await discoverYear()
    console.log('genres',response)
    }
    
    localStorage.setItem('MoviesOnPage', JSON.stringify(response));
    galleryArrayMarkup(response)
    markupPages(response)
    modalOpenOnClick()
    ratingAddIshidden()
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()
    scrollUp(e)
    
    markupStartEndPages(response)

}
  
async function onClickEndPageBtn(e) {
  console.log('end');
  refs.gallery.innerHTML = ''
  refs.pages.innerHTML = ''
  e.preventDefault();
  console.log('more')
  console.log(e.target)
  console.log(options.pageNumber)
  console.log(options.maxPage)
  options.pageNumber = options.maxPage
  options.pageNumberTest = options.pageNumber
  let response
  if (currentFetch === 'tranding') {
    response = await fetchTrandingMovie()
    console.log('tranding',response)
  }
  if (currentFetch === 'search') {
    response = await fetchPhoto()
    console.log('search',response)
  }
  if (currentFetch === 'genres') {
    response = await discoverGenres()
    console.log('genres',response)
  }
  if (currentFetch === 'year') {
    response = await discoverYear()
    console.log('genres',response)
    }
    
    localStorage.setItem('MoviesOnPage', JSON.stringify(response));
    galleryArrayMarkup(response)
    markupPages(response)
    modalOpenOnClick()
    ratingAddIshidden()
    hideFirstPageBtn()
    hideLastPageBtn()
    togglePaginationBtn()
    scrollUp(e)
    
    markupStartEndPages(response)

}

function markupStartEndPages(array) {
  refs.startPage.textContent=1
  refs.endPage.textContent=array.total_pages
}
