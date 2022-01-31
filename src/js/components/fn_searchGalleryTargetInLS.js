export { getGalleryTargetMovieFromLS }



import { modalWindowMarkup } from './fn_dataMovietoModal'




const refs = {
    gallery: document.querySelector('.gallery-list'),
    modal: document.querySelector('.modal__wrapper'),
}
// console.log(refs.gallery)
console.log(refs.modal)
let currentFilm 

function getGalleryTargetMovieFromLS() {
    const galeryofFilms = [...refs.gallery.children]
    const arrayofFilms = JSON.parse(localStorage.getItem('MoviesOnPage'))
    arrayofFilms.results.forEach((film, idxA) => {
            // console.log(film, idxA)
            galeryofFilms.forEach((li, idxB) => {
                if (li === event.currentTarget) {
                    if (idxA === idxB) {
                        currentFilm = film
                        console.log('era', film)
                        // console.log('era', li)
                        modalWindowMarkup(film)
                    }
                }
            })
            
        })
}


