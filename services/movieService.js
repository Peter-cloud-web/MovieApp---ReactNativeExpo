export const API_KEY = '76ce53ee93cbb0078f0baf1e1ce7a5f7'; // Replace with your TMDB API key
export const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTopRatedMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch top-rated movies');
  }
  return response.json();
};

export const fetchPopularMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const fetchUpcomingMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  return response.json();
};

export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

export const fetchMovieCredits = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  return response.json();
};