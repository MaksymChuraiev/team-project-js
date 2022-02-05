export {showFetchLoader,hideFetchLoader}

const headerForm = document.querySelector('#search-form')
const headerbtn = document.querySelector('.header__button--search')
const headerIcon = document.querySelector('.header__icon')
console.log(headerForm);
console.dir(headerbtn);
// console.log(123);


async function showFetchLoader() {
    console.log(headerForm);
    console.dir(headerForm.elements[1]);
    headerbtn.classList.add('fetchLoader')
    headerIcon.classList.add('visually-hidden')
    // headerForm.insertAdjacentHTML('beforeend',`<div class="fetchLoader"></div>`)
}
async function hideFetchLoader() {
    // const r = document.querySelector('.fetchLoader')
    headerbtn.classList.remove('fetchLoader')
    headerIcon.classList.remove('visually-hidden')
    // console.log(headerForm);
    // console.dir(headerForm);
    // r.outerHTML=''
}
// showFetchLoader()