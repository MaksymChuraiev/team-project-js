import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

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
  console.log(slider)