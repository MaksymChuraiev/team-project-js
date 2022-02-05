import {
  fetchGenres,
} from './fetchApi';
import { options } from './fetchApi';


export { genresMarkup, galleryGenresMarkup,modalGenresMarkup, toggleGenres, toggleYear, removeAllChekedGenres, toggleTrands }

const refs = {
  genres: document.querySelector('.genres'),
  topTrands: document.querySelector('.top-trands'),
};

async function genresMarkup() {

  const r = await fetchGenres()
  
  const genres = r.genres.map(({ id, name }) => {
    options.allGenresList.push({ id, name })
    return `<button class="genres-btn btn"  id="${id}">${name}</button>`}).join("")
  refs.genres.insertAdjacentHTML('afterbegin', genres)

}
// ========================= отрисовка имен жанров в галерее =================
function galleryGenresMarkup(array) {
//   console.log(array)
  let ress = array.map(elem => {
    for (const el of options.allGenresList) {
      if (elem === el.id) {
        // console.log('name ', el.name)
        return el.name
      }
    }
  })
  if (ress.length > 3) {
   const ressult = ress.slice(0,2)
   ressult.push('Other')
  return ressult.join(', ')
  }
  return ress.join(', ')
}
//======================= жанры на модалке ===================================
function modalGenresMarkup(array) {
//   console.log(array)
  let ress = array.map(elem => {
    for (const el of options.allGenresList) {
      if (elem === el.id) {
        // console.log('name ', el.name)
        return el.name
      }
    }
  })
  return ress.join(', ')
}

// ===================== выбор и удаление жанра со страницы, добавление в массив ======
async function toggleGenres(id) {
  if (options.genresId.includes(id)) {
    const genresIdx = options.genresId.indexOf(id);
    options.genresId.splice(genresIdx, 1);
    return;
    }
  options.genresId.push(id);
}
async function toggleYear(data) {
  if (options.yearId.includes(data)) {
    const yearIdx = options.yearId.indexOf(data);
    options.yearId.splice(yearIdx, 1);
    return;
  }
  options.yearId.push(data);
}

// ==================== удаление всех выбраных жанров ======================
async function removeAllChekedGenres() {
  const allRenderGenresButton = [...refs.genres.children];
  return allRenderGenresButton.forEach(eachBtn => eachBtn.classList.remove('btn_active'));
}
async function toggleTrands(id) {
  const allAnoterGenresButton = [...refs.topTrands.children];
  for (const btn of allAnoterGenresButton) {
    if (btn.id !== id) {
      btn.classList.remove('btn_active');
    }
    continue;
  }
}