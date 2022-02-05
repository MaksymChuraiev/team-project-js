import axios from 'axios';

export const options = {
  queryTest: '',
  query: '',
  pageNumberTest: 1,
  pageNumber: 1,
  pageNumberSlider: 1,
  pageItemCount: 20,
  allGenresList: [],
  genresId: [],
  yearId: [],
  maxPage: 0,
  trand: 'day',
  listofFilmforSlider:[]
};

async function fetchPhoto() {
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?`;
  const params = {
    params: {
      api_key: '6dae1a863e182d2e5c972909bcd1e575',
      language: `en-US`,
      query: options.query,
      page: options.pageNumber,
    },

  };
  const { data } = await axios.get(SEARCH_URL, params);
  return data;

}

async function fetchGenres() {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=6dae1a863e182d2e5c972909bcd1e575&language=en-US`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchTrandingMovie() {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${options.trand}?api_key=6dae1a863e182d2e5c972909bcd1e575&&page=${options.pageNumber}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}


async function fetchTrandingMovieForSlider() {
  try {
    for (let pageNum = 0; pageNum <= 5, pageNum += 1;) {
      if (options.pageNumberSlider >= 5) {
        options.pageNumberSlider = 1
        return
      }
      options.pageNumberSlider +=1
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${options.trand}?api_key=6dae1a863e182d2e5c972909bcd1e575&&page=${options.pageNumberSlider}`,
      );
      
      options.listofFilmforSlider = [...options.listofFilmforSlider, ...data.results]
      localStorage.setItem('listofFilmforSliderLS', JSON.stringify(options.listofFilmforSlider))
      
      // console.log('pageNum',pageNum)
      // console.log('options.pageNumber',options.pageNumber)
      // console.log('options.listofFilmforSlider',options.listofFilmforSlider)
       
    }
   return data;
  } catch (error) {
    console.log(error);
  }
}


// ===================old discover year =================
async function discoverGenres() {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=6dae1a863e182d2e5c972909bcd1e575&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${options.pageNumber}&primary_release_year=${options.yearId}&with_genres=${options.genresId}&with_watch_monetization_types=flatrate`,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function fetchTeaser(idMovie) {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=6dae1a863e182d2e5c972909bcd1e575`,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchPhoto, fetchGenres, discoverGenres, fetchTrandingMovie,fetchTrandingMovieForSlider, fetchTeaser,fetchPhotoTest};


async function fetchPhotoTest() {
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?`;
  const params = {
    params: {
      api_key: '6dae1a863e182d2e5c972909bcd1e575',
      language: `en-US`,
      query: options.queryTest,
      page: options.pageNumber,
    },

  };
  const { data } = await axios.get(SEARCH_URL, params);
  return data;

}