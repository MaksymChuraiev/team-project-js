export default teaser;

import { fetchTeaser } from './fetchApi';

async function teaser(id) {
  const videos = await fetchTeaser(id);

  const teaser = videos.results.filter(
    video => video.name.includes('Official') && video.site === 'YouTube',
  )[0];
  const href = document.querySelector('.js-teaser');

  await href.addEventListener('click', onCardClick(event, teaser, href));
}

function onCardClick(e, teaser, href) {
  e.preventDefault();
  if (!teaser) {
    href.removeEventListener('click', onCardClick);
    return;
  }
  href.href = `https://www.youtube.com/watch?v=${teaser.key}`;
  href.target = '_blank';
}
