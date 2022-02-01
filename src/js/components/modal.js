// const refs = {
//     galleryCard: document.querySelector('.gallery-list__item'),
//     modal: document.querySelector('[data-modal]'),
// };

// refs.galleryCard.addEventListener('click', toggleModal);

// function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
// };
export { modalOpenOnClick }

import {getGalleryTargetMovieFromLS} from './fn_searchGalleryTargetInLS'

const refs = {
    gallery: document.querySelector('.gallery-list'),
}
console.log(refs.gallery)
console.dir(refs.gallery)
function modalOpenOnClick() {
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

    // event.preventDefault()
    modalCloseBtn.addEventListener('click', onClickCloseModal)
        console.log(event.currentTarget);
        console.dir(event.currentTarget);
    
        mainBody.addEventListener('keydown', onEscapeBtnClick)

    // console.log(event.key)
    
    // const modal = document.querySelector('[data-modal]');
    modal.classList.toggle('is-hidden');
  
    }   
    function onClickCloseModal(event) {
    // event.preventDefault()

    // console.log(event.currentTarget);
    
    
        modal.classList.toggle('is-hidden');
        modalCloseBtn.removeEventListener('click', onClickCloseModal)
        mainBody.removeEventListener('keydown', onEscapeBtnClick)
  
    }

    function onEscapeBtnClick(event) {
        if (event.key === 'Escape') {
            onClickCloseModal();
        }
        console.log(event.key)
    }
}


