export default teaser;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import youtobe from '../../images/youtube_64dp.png';

import { fetchTeaser } from './fetchApi';

let video;
let href;

async function teaser(id) {
  const videos = await fetchTeaser(id);
  video = videos.results.filter(
    video =>
      (video.name.includes('Official') || video.name.includes('Trailer')) &&
      video.site === 'YouTube',
  )[0];
  href = document.querySelector('.js-teaser');
  if (video) {
    href.style.position = 'relative';
    href.style.display = 'block';
    href.insertAdjacentHTML(
      'beforeend',
      `<div
    style="position:absolute;top:50%;left:50%; transform: translate(-50%,-50%);width:50px">
    <img class="modal__image" src="${youtobe}" alt="YouTobe" width="20 "/>
    </div>`,
    );
  }
  href.addEventListener('click', onCardClick);
}

function onCardClick() {
  event.preventDefault();
  if (!video) {
    Notify.failure('The official teaser is not yet available on YouTube.');
    return;
  }
  // this.href = `https://www.youtube.com/watch?v=${video.key}`;
  // this.target = '_blank';
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div class="backdrop js-youtube">
    <iframe style="position:absolute;top:50%;left:50%; transform: translate(-50%,-50%)"
    width="560"
    height="315"
    <iframe class="modal-iframe iframe" style="position:absolute;top:50%;left:50%; transform: translate(-50%,-50%)"
    // width="560"
    // height="315"
    src="https://www.youtube.com/embed/${video.key}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
  </div>
  `,
  );
  const div = document.querySelector('.js-youtube');
  div.addEventListener('click', onDivClick);
}

function onDivClick() {
  this.remove();
  this.removeEventListener('click', onDivClick);
}
