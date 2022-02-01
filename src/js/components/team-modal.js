const refs = {
      footerLink: document.querySelector('.footer__link'),
      closeModalBtn: document.querySelector('.btn-modal-close'),
      modal: document.querySelector('.modal-team'),
      body: document.querySelector('body'),
    };
    refs.footerLink.addEventListener('click', openModal);

function closeModal(e){
  modalAddHidden()
    refs.closeModalBtn.removeEventListener('click', closeModal);
    refs.modal.removeEventListener('click', onBackdropClick);
    refs.body.removeEventListener('keydown' ,onEscClick);
    scroll()
} 
function openModal (){
modalRemoveHidden ()
scroll()
refs.modal.addEventListener('click', onBackdropClick);
refs.body.addEventListener('keydown', onEscClick);
refs.closeModalBtn.addEventListener('click', closeModal);
}
function onBackdropClick (e){
  if(e.currentTarget !== e.target) {
    return;
  }
  closeModal();
}
function onEscClick (e){
  modalIsClose = refs.modal.classList.contains('visually-hidden');
  if(modalIsClose){
    return
    } 
    if (e.key === 'Escape') {
      closeModal();
    }
  }
function modalRemoveHidden (){
  refs.modal.classList.remove('visually-hidden');
}
function modalAddHidden (){
  refs.modal.classList.add('visually-hidden');
}
//===================================================================блокировка скрола
function scroll (){
  const modalIsClose = refs.modal.classList.contains('visually-hidden')
  const scrollLockMethod = !modalIsClose
  ? 'disableBodyScroll'
  : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
}