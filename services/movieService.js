const API_KEY = '76ce53ee93cbb0078f0baf1e1ce7a5f7';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTopRatedMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch top-rated movies');
  }
  return response.json();
};