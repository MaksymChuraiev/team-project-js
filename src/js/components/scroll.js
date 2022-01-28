const scrollBtn = document.querySelector('.js-scroll');

scrollBtn.addEventListener('click', () => window.scroll(0, 0));
window.addEventListener('scroll', onScrollClick);

function onScrollClick(e) {
  e.preventDefault();
  if (window.scrollY < 320) {
    scrollBtn.classList.remove('scroll--isShown');
  } else {
    scrollBtn.classList.add('scroll--isShown');
  }
}
