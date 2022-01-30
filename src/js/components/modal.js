// const refs = {
//     galleryCard: document.querySelector('.gallery-list__item'),
//     modal: document.querySelector('[data-modal]'),
// };

// refs.galleryCard.addEventListener('click', toggleModal);

// function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
// };
export {modalOpenOnClick}

function modalOpenOnClick() {
    const clickedMovieCard = document.querySelectorAll(".gallery-list__item");
    const modalCloseBtn = document.querySelector('[data-modal-close]');
  
    clickedMovieCard.forEach(button => button.addEventListener("click", onClickMovieCard));
    modalCloseBtn.addEventListener('click', onClickCloseModal)

    function onClickMovieCard(event) {
    event.preventDefault()
    modalCloseBtn.addEventListener('click', onClickCloseModal)
    console.log(event.currentTarget);
    
    const modal = document.querySelector('[data-modal]');
    modal.classList.toggle('is-hidden');
  
    }   
    function onClickCloseModal(event) {
    event.preventDefault()

    console.log(event.currentTarget);
    
    const modal = document.querySelector('[data-modal]');
        modal.classList.toggle('is-hidden');
        modalCloseBtn.removeEventListener('click', onClickCloseModal)
  
    }
}
