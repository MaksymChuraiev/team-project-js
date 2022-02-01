export { hidePagination, showPagination }

const refs = {
    paginationList: document.querySelector('.pagination'),
}
function hidePagination () {
    refs.paginationList.classList.add('visually-hidden');
}

function showPagination () {
    refs.paginationList.classList.remove('visually-hidden');
}
