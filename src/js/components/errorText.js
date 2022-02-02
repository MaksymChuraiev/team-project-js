export { hideErrorText, showErrorText }

const refs = {
    textError: document.querySelector('.js-header__text-error'),
}

function hideErrorText (){
refs.textError.classList.add('visually-hidden');
}

function showErrorText (){
    refs.textError.classList.remove('visually-hidden');
}