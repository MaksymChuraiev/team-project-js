export { hideErrorText, showErrorText }

const refs = {
    textError: document.querySelector('.js-header__text-error'),
}

function hideErrorText (){
refs.textError.classList.add('is-hidden');
}

function showErrorText (){
    refs.textError.classList.remove('is-hidden');
}