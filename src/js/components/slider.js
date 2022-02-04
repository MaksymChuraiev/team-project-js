import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

import {fetchTrandingMovie } from './fetchApi';


new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    autoplay: 1500,
    gap: 20,
    hoverpause: true,
    bound: true,
  }).mount()

  const slider = document.querySelector('.glide');
  const sliderList = document.querySelector('.glide__slides');
  console.log(sliderList)
  console.log(slider)


export default async function sliderMarkup (){
const ress = await fetchTrandingMovie();
    // console.log('RESS', ress)

    const sliderMarkup = ress.results
    .map( ({ poster_path, vote_average }) => {
        return `<li class="glide__slide">
        <img class='slider-image' src="${poster_path}" width="200" height="280" />
      </li>`
    }).join('');
    sliderList.insertAdjacentHTML('beforeend', sliderMarkup);

    console.log(sliderMarkup)

}

sliderMarkup()