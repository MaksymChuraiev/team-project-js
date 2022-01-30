function onFooterLinkClick (){
    const refs = {
        footerLink: document.querySelector('.footer__link'),
        
        
        closeModalBtn: document.querySelector('.btn-modal-close'),
        modal: document.querySelector('.modal-team '),
      };
    console.log(refs.footerLink);
    console.log(refs.closeModalBtn)
      refs.footerLink.addEventListener('click', toggleModal);
      refs.closeModalBtn.addEventListener('click', toggleModal);
    
      function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
      }

}
onFooterLinkClick();