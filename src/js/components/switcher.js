const checkboxBtn = document.querySelector('#theme-switch-toggle');
console.log(checkboxBtn);
const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const footer = document.querySelector('.footer');
const pagination = document.querySelector('.pagination-theme');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const { LIGHT, DARK } = Theme;

checkboxBtn.addEventListener('change', changeTheme);

function changeTheme(e) {
  const theme = e.target.checked;
  if (theme) {
    gallery.classList.add(DARK);
    pagination.classList.add(DARK);

    footer.classList.add(DARK);

    gallery.classList.remove(LIGHT);
    pagination.classList.remove(LIGHT);

    footer.classList.remove(LIGHT);

    localStorage.setItem('theme', DARK);
  } else {
    gallery.classList.add(LIGHT);
    pagination.classList.add(LIGHT);

    footer.classList.add(LIGHT);

    gallery.classList.remove(DARK);
    pagination.classList.remove(DARK);

    footer.classList.remove(DARK);

    localStorage.setItem('theme', LIGHT);
  }
}

let theme = localStorage.getItem('theme');

if (!theme) {
  theme = LIGHT;
  localStorage.setItem('theme', theme);
}
gallery.classList.add(theme);
pagination.classList.add(theme);

footer.classList.add(theme);

checkboxBtn.checked = theme === LIGHT ? false : true;
