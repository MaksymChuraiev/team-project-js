export default filtersShown

const refs = {
    filterBtn: document.querySelector('.filter_button'),
    genresSection: document.querySelector('.section-genres')
}

refs.filterBtn.addEventListener('click', filtersShown)

function filtersShown(event) { 
    event.preventDefault()
    refs.genresSection.classList.toggle('visually-hidden');
    refs.filterBtn.classList.toggle('button-active')
}
