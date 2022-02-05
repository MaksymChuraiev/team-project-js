// const refs = {
//     galleryCard: document.querySelector('.gallery-list__item'),
//     modal: document.querySelector('[data-modal]'),
// };

// refs.galleryCard.addEventListener('click', toggleModal);

// function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
// };
export { modalOpenOnClick}

import {currentFilm, getGalleryTargetMovieFromLS} from './fn_searchGalleryTargetInLS'

import { markup } from "./library";

import { onClickMovieCard } from './fn_dataMovietoModal'


const refs = {
    gallery: document.querySelector('.gallery-list'),

}

console.log(refs.modal)

console.log(refs.gallery)
console.dir(refs.gallery)
function modalOpenOnClick() {
    const watchedArray = JSON.parse(localStorage.getItem('watched'))
    const queueArray = JSON.parse(localStorage.getItem('queue'))
    const clickedMovieCard = document.querySelectorAll(".gallery-list__item");
    const modalCloseBtn = document.querySelector('[data-modal-close]');
    const modal = document.querySelector('[data-modal]');

    const mainBody = document.querySelector('body');

    // const galeryofFilms = [...refs.gallery.children]
    // const arrayofFilms = JSON.parse(localStorage.getItem('MoviesOnPage'))
    // console.log(arrayofFilms)
    
    clickedMovieCard.forEach(button => button.addEventListener("click", onClickMovieCard));

  
    
    function onClickMovieCard(event) {
        getGalleryTargetMovieFromLS()
        console.log('exports currentfFilm', currentFilm)
        
        

        event.preventDefault()
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
                if (movieWatched.id === currentFilm.id) {

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
                if (movieQueue.id === currentFilm.id) {
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
                    deleteFromWatchW(currentFilm);
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
                    deleteFromWatchQ(currentFilm)
                    console.log('удалили Queue', queueArray.results)
                    localStorage.setItem('queue', JSON.stringify(queueArray))
                    console.log(lsKey);

                };
                modalButtonWatched.textContent = 'DELETE FROM WATCHED'
                modalButtonWatched.classList.add('cheked')
                    console.log('watchedIdx',watchedIdx);
                    console.log('мы пушим Watched');
                    watchedArray.results.push(currentFilm)
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
                    deleteFromWatchQ(currentFilm)
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
                    queueArray.results.push(currentFilm)
                    console.log('queueArray.results', queueArray.results);
                localStorage.setItem('queue', JSON.stringify(queueArray))  
                if (watchedIdx !== -1 && watchedIdx !== undefined) {
                    // console.log('не пушим', www);
                    modalButtonWatched.textContent = 'ADD TO WATCHED'
                    modalButtonWatched.classList.remove('cheked')
                    deleteFromWatchW(currentFilm)
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
  
    };
    

    function deleteFromWatchW(currentFilm) {
        watchedArray.results.forEach(elem => {
            // console.log(elem.id)
            // console.log(currentFilm.id)
            if (elem.id === currentFilm.id) {
                const idx = watchedArray.results.indexOf(elem)
                console.log(idx)
                watchedArray.results.splice(idx, 1);
                return;
            };
        });
    };
    function deleteFromWatchQ(currentFilm) {
        queueArray.results.forEach(elem => {
            // console.log(elem.id)
            // console.log(currentFilm.id)
            if (elem.id === currentFilm.id) {
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

    

};





