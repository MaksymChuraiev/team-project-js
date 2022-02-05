export { sliderMarkup} 
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';


import {options, } from './fetchApi';

const sliderOptions = {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    autoplay: 1500,
    gap: 10,
    hoverpause: true,
    bound: true,
  }

async function sliderMarkup() {
  const sliderList = document.querySelector('.glide__slides');
  let indexOfallUl=0
  sliderList.innerHTML = ''
  

  const sliderMarkup = options.listofFilmforSlider.map(({ poster_path, vote_average },idx) => {
    if (vote_average > 8) {
      indexOfallUl +=1
      return `<li class="glide__slide" style="width: 136px; margin-left: 10px; margin-right: 10px;" data-idx="${idx}">
        <img class='slider-image' src="https://image.tmdb.org/t/p/w500${poster_path}"/>
      </li>`
    }
  }).join('');
  console.log('sliderMarkup',indexOfallUl);
  
  sliderList.insertAdjacentHTML('beforeend', sliderMarkup);
  if (indexOfallUl <= sliderOptions.perView) {
    if (indexOfallUl === 1) {
      sliderOptions.perView = indexOfallUl
    }
    sliderOptions.perView = indexOfallUl -1
  }
  console.log(sliderOptions.perView);
  new Glide('.glide', sliderOptions).mount()
    // console.log(sliderMarkup)

}
