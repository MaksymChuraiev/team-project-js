export { onLoadMainPageShowSlider } 
import { options, fetchTrandingMovieForSlider } from './fetchApi';
import { galleryGenresMarkup, modalGenresMarkup } from './genres';
import folder from '../../images/placeholder.bmp'

import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';





const refs = {
  gallery: document.querySelector('.gallery-list'),
  modal: document.querySelector('.modal__wrapper'),
};

const sliderOptions = {
    type: 'carousel',
    startAt: 0,
    perView: 6,
    autoplay: 1500,
    gap: 10,
    hoverpause: true,
    bound: true,
  }

async function sliderMarkup() {
  const sliderList = document.querySelector('.glide__slides');
  let indexOfallUl=0
  sliderList.innerHTML = ''
  

  const sliderMarkup = options.listofFilmforSlider.map(({ poster_path, vote_average,id }) => {
    if (vote_average > 8) {
      indexOfallUl +=1
      return `<li class="glide__slide" style="width: 136px; margin-left: 10px; margin-right: 10px;" data-idx="${id}">
        <img class='slider-image' src="${poster_path?'https://image.tmdb.org/t/p/w500'+poster_path:folder}"/>
      </li>`
    }
  }).join('');
  console.log('sliderMarkup до' ,indexOfallUl);
  console.log('sliderOptions.perView до',sliderOptions.perView);
  
  sliderList.insertAdjacentHTML('beforeend', sliderMarkup);
  // if (indexOfallUl <= sliderOptions.perView) {
  //   if (indexOfallUl === 1) {
  //     sliderOptions.perView = indexOfallUl
  //   }
  //   sliderOptions.perView = 1
  // }
  // console.log(sliderOptions.perView);
  // console.log('sliderMarkup после ',indexOfallUl);
  // console.log('sliderOptions.perView после',sliderOptions.perView);
  new Glide('.glide', sliderOptions).mount()
    // console.log(sliderMarkup)
}
async function onLoadMainPageShowSlider() {
  if (window.innerWidth < 768) {
  return
  }
  await fetchTrandingMovieForSlider()
  console.log('options.pageNumber', options.pageNumber)
  console.log('options.listofFilmforSlider', options.listofFilmforSlider)
  await sliderMarkup()
  onClickSlide()
}


function onClickSlide() {
  const listOfSlides = document.querySelectorAll('.glide__slide')
  console.log('listOfSlides',listOfSlides);
  console.dir(listOfSlides);
  listOfSlides.forEach(slide => slide.addEventListener('click',async () => {

    const sliderFilm = options.listofFilmforSlider.find(trandingFilm => trandingFilm.id == slide.dataset.idx )
    console.log(sliderFilm);
    console.log(slide.dataset.idx)
    //=====================================================
    const modal = document.querySelector('[data-modal]');
    const watchedArray = JSON.parse(localStorage.getItem('watched'))
    const queueArray = JSON.parse(localStorage.getItem('queue'))
    // const clickedMovieCard = document.querySelectorAll(".gallery-list__item");
    const modalCloseBtn = document.querySelector('[data-modal-close]');

    const mainBody = document.querySelector('body');
    sliderModal(sliderFilm)
    // event.preventDefault()
        modalCloseBtn.addEventListener('click', onClickCloseModal)
        console.log(event.currentTarget);
        console.dir(event.currentTarget);
        
        modal.classList.toggle('visually-hidden');
        
        
        
        // =========================================================================
        
        const modalButtons = document.querySelectorAll('.modal__button')
        const modalButtonWatched = document.querySelector('.js-button-add-watched')
        const modalButtonQueue = document.querySelector('.js-button-add-queue')
        modal.addEventListener('click', onClickBacrdropModalClose)
        modalButtons.forEach(eachButton => {
        eachButton.addEventListener('click',onClickDataMovieAddLibrary )           
        });


        renderFromLibraryWatched()
        renderFromLibraryQueue()
    
        function renderFromLibraryWatched() {
            if (watchedArray.results.length === 0) {
                modalButtonWatched.textContent = 'ADD TO WATCHED' 
                
            };
            const indexWatchedMovieOnLS = watchedArray.results.findIndex(movieWatched => {
                if (movieWatched.id === sliderFilm.id) {

                    console.log('renderFromLibrary estb');
                    modalButtonWatched.textContent = 'DELETE FROM WATCHED'
                    modalButtonQueue.textContent = 'ADD TO WATCHED'
                    modalButtonWatched.classList.add('cheked')
                    return movieWatched
                };
                modalButtonWatched.textContent = 'ADD TO WATCHED'

            });
            return indexWatchedMovieOnLS
        };
        function renderFromLibraryQueue() {
            if (queueArray.results.length === 0) {
                modalButtonQueue.textContent = 'ADD TO QUEUE';
            };
            const indexQueueMovieOnLS = queueArray.results.findIndex(movieQueue => {
                if (movieQueue.id === sliderFilm.id) {
                    console.log('renderFromLibrary estb');
                    modalButtonQueue.textContent = 'DELETE FROM QUEUE'
                    modalButtonWatched.textContent = 'ADD TO WATCHED'
                    modalButtonQueue.classList.add('cheked')
                    return movieQueue
                };
                modalButtonQueue.textContent = 'ADD TO QUEUE'
               
            });
            return indexQueueMovieOnLS;
        }
        
        function onClickDataMovieAddLibrary(e) {
            

            const watchedIdx= renderFromLibraryWatched()
            const queueIdx = renderFromLibraryQueue()
            const lsKey = localStorage.getItem('isActive')
            console.log('watchedIdx', watchedIdx);
            console.log('queueIdx', queueIdx);
    
            if (e.currentTarget === modalButtonWatched) {
                
                if (watchedIdx !== -1 && watchedIdx !== undefined) {
                    // console.log('не пушим', www);
                    modalButtonWatched.textContent = 'ADD TO WATCHED';
                    modalButtonWatched.classList.remove('cheked');
                    deleteFromWatchW(sliderFilm);
                    console.log('удалили Wtched', watchedArray.results);
                    localStorage.setItem('watched', JSON.stringify(watchedArray));
                    console.log(lsKey);
                    
                    if (lsKey === 'watched') {
                        markup(watchedArray)
                    };
                    if (lsKey === 'queue') {
                        markup(queueArray)
                    };
                    return 
                };

                
                if (queueIdx !== -1 && queueIdx !== undefined) {
                    
                    modalButtonQueue.textContent = 'ADD TO QUEUE'
                    modalButtonQueue.classList.remove('cheked')
                    deleteFromWatchQ(sliderFilm)
                    console.log('удалили Queue', queueArray.results)
                    localStorage.setItem('queue', JSON.stringify(queueArray))
                    console.log(lsKey);

                };
                modalButtonWatched.textContent = 'DELETE FROM WATCHED'
                modalButtonWatched.classList.add('cheked')
                    console.log('watchedIdx',watchedIdx);
                    console.log('мы пушим Watched');
                    watchedArray.results.push(sliderFilm)
                console.log('watchedArray.results', watchedArray.results);
                localStorage.setItem('watched', JSON.stringify(watchedArray))
                if (lsKey === 'watched') {
                        markup(watchedArray)
                };
                if (lsKey === 'queue') {
                        markup(queueArray)
                };
              
            };
            if (e.currentTarget === modalButtonQueue) {
                if (queueIdx !== -1 && queueIdx !== undefined) {
                    
                    modalButtonQueue.textContent = 'ADD TO QUEUE'
                    modalButtonQueue.classList.remove('cheked')
                    deleteFromWatchQ(sliderFilm)
                    console.log('удалили Queue', queueArray.results)
                    localStorage.setItem('queue', JSON.stringify(queueArray))
                    console.log(lsKey);
                    if (lsKey === 'queue') {
                        markup(queueArray)
                    };
                    if (lsKey === 'watched') {
                        markup(watchedArray)
                    };
                    return 
                };
                
                modalButtonQueue.textContent = 'DELETE FROM QUEUE'
                modalButtonQueue.classList.add('cheked')
                    console.log('queueIdx ',queueIdx);
                    console.log('мы пушим Queue');
                    queueArray.results.push(sliderFilm)
                    console.log('queueArray.results', queueArray.results);
                localStorage.setItem('queue', JSON.stringify(queueArray))  
                if (watchedIdx !== -1 && watchedIdx !== undefined) {
                    // console.log('не пушим', www);
                    modalButtonWatched.textContent = 'ADD TO WATCHED'
                    modalButtonWatched.classList.remove('cheked')
                    deleteFromWatchW(sliderFilm)
                    console.log('удалили Wtched', watchedArray.results)
                    localStorage.setItem('watched', JSON.stringify(watchedArray))
                    console.log(lsKey);

                };
                
                if (lsKey === 'queue') {
                        markup(queueArray)
                };
                if (lsKey === 'watched') {
                        markup(watchedArray)
                };
                            
            };
            
        }   
    
        mainBody.addEventListener('keydown', onEscapeBtnClick)


    bodyScroll()
    
     function deleteFromWatchW(sliderFilm) {
        watchedArray.results.forEach(elem => {
            // console.log(elem.id)
            // console.log(currentFilm.id)
            if (elem.id === sliderFilm.id) {
                const idx = watchedArray.results.indexOf(elem)
                console.log(idx)
                watchedArray.results.splice(idx, 1);
                return;
            };
        });
    };
    function deleteFromWatchQ(sliderFilm) {
        queueArray.results.forEach(elem => {
            // console.log(elem.id)
            // console.log(currentFilm.id)
            if (elem.id === sliderFilm.id) {
                const idx = queueArray.results.indexOf(elem)
                console.log(idx)
                queueArray.results.splice(idx, 1);
                return;
            };
        });
    };
    
    

    

    // ==========================================================
    function onClickCloseModal(event) {
    
    
    
        modal.classList.toggle('visually-hidden');
        modalCloseBtn.removeEventListener('click', onClickCloseModal)
        mainBody.removeEventListener('keydown', onEscapeBtnClick)
        modal.removeEventListener('click', onClickBacrdropModalClose)

        bodyScroll();
  
    };



    function onEscapeBtnClick(event) {
        if (event.key === 'Escape') {
            onClickCloseModal();
        };
        console.log(event.key)
    };


    

    function onClickBacrdropModalClose(e) {
   
          if (e.target === e.currentTarget) {
            onClickCloseModal();
        };
    };
    
    

    function bodyScroll() {
        const modalClose = modal.classList.contains('visually-hidden')
        const scrollLockMethod = !modalClose
            ? 'disableBodyScroll'
            : 'enableBodyScroll';
        bodyScrollLock[scrollLockMethod](document.body);
    };

    
  
  }))

  
}



function posterFolder(poster) {
  if (poster === null) {
    return `https://via.placeholder.com/550`
    // return `https://via.placeholder.com/550`
    // return `https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg`
  }
  return `https://image.tmdb.org/t/p/w500${poster}`
}


function sliderModal({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genre_ids,
  overview,
})
  {
  const markupFilm = `
            <div class="modal__image-wrapper">
                <a class="js-teaser" href="#">
                    <img class="modal__image" src="${posterFolder(poster_path)}" alt="original_title" width="394"/>
                </a>
            </div>
            <div class="modal__info-wrapper">
                <h2 class="modal__film-titel">${original_title}</h2>
                <table>
                    <tr class="modal__param">
                        <td class="modal__param-titel">Vote / Votes</td>
                        <td class="modal__param-value">
                            <div class="modal__film-votes"><span class="param__value-vote">${vote_average?vote_average:'&#129335;&#8205;&#9794;&#65039;'}</span> / <span
                                    class="param__value-votes">${vote_count?vote_count:'&#129335;&#8205;&#9792;&#65039;'}</span></div>
                        </td>
                    </tr>

                    <tr class="modal__param">
                        <td class="modal__param-titel">Popularity</td>
                        <td class="modal__param-value">${popularity?popularity:'no information'}</td>
                    </tr>
                    <tr class="modal__param">
                        <td class="modal__param-titel">Original Title</td>
                        <td class="modal__param-value ">${original_title?original_title:'no information'}</td>
                    </tr>
                    <tr class="modal__param">
                        <td class="modal__param-titel">Genre</td>
                        <td class="modal__param-value">${modalGenresMarkup(genre_ids)?modalGenresMarkup(genre_ids):'no information'}</td>
                    </tr>
                </table>
                <span class="modal__film-owervier">ABOUT</span>
                <div class="film__owervier">
                    <p class="modal__film-owervier-text">${overview?overview:'no information'}</p>
                </div>

                <div class="modal__buttons">
                    <button type="submit" class="modal__button watched js-button-add-watched"><span class="add-button-watched-text"></span></button>
                    <button type="submit" class="modal__button queue js-button-add-queue"><span
                            class="add-button-queue-text"></span></button>
                </div>
            </div>
        </div>`;
  refs.modal.innerHTML = '';
  refs.modal.insertAdjacentHTML('beforeend', markupFilm);

}