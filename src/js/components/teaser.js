export default teaser;

import { fetchTeaser } from './fetchApi';

async function teaser(params) {
  const arrayIds = params.results.map(arr => arr.id);
  const fetches = await Promise.all(
    arrayIds.map(id => {
      return fetchTeaser(id);
    }),
  );

  localStorage.setItem('teasers', JSON.stringify(fetches));
}
