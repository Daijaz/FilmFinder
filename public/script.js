const tmdbKey = 'bd9f67545bc40444dfcb1976305cb108';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// Fetches and populates the genre dropdown menu
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlTofetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlTofetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    } else {
      showAlert("Error", "Failed to fetch genres!", "error");
    }
  } catch (error) {
    showAlert("Error", "Unable to load genres. Try again later!", "error");
    console.log(error);
  }
};

// Fetches movies based on the selected genre
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlTofetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlTofetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    } else {
      showAlert("Error", "Failed to fetch movies!", "error");
    }
  } catch (error) {
    showAlert("Error", "Unable to load movies. Try again later!", "error");
    console.log(error);
  }
};

// Fetches detailed info of a specific movie
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    } else {
      showAlert("Error", "Failed to fetch movie details!", "error");
    }
  } catch (error) {
    showAlert("Error", "Unable to load movie details. Try again later!", "error");
    console.log(error);
  }
};

// Gets a list of movies and displays the info of a random movie
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  try {
    const movies = await getMovies();
    if (!movies || movies.length === 0) {
      showAlert("No Movies Found", "Please try another genre!", "error");
      return;
    }
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
  } catch (error) {
    showAlert("Error", "Something went wrong. Try again!", "error");
  }
};

// Populate the genre dropdown and set up event listeners
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
