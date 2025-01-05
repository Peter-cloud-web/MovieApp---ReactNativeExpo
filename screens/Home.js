import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MovieList from '../components/MovieList';
import { fetchTopRatedMovies, fetchPopularMovies, fetchUpcomingMovies } from '../services/movieService';

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreTopRated, setHasMoreTopRated] = useState(true);
  const [hasMorePopular, setHasMorePopular] = useState(true);
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState(true);

  const loadMovies = async (category, page) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      let data;
      switch (category) {
        case 'topRated':
          data = await fetchTopRatedMovies(page);
          setTopRatedMovies((prev) => [...prev, ...data.results]);
          setHasMoreTopRated(data.results.length > 0);
          break;
        case 'popular':
          data = await fetchPopularMovies(page);
          setPopularMovies((prev) => [...prev, ...data.results]);
          setHasMorePopular(data.results.length > 0);
          break;
        case 'upcoming':
          data = await fetchUpcomingMovies(page);
          setUpcomingMovies((prev) => [...prev, ...data.results]);
          setHasMoreUpcoming(data.results.length > 0);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies('topRated', topRatedPage);
    loadMovies('popular', popularPage);
    loadMovies('upcoming', upcomingPage);
  }, [topRatedPage, popularPage, upcomingPage]);

  const handlePressMovie = (movie) => {
    console.log('Pressed movie:', movie.title);
    // Navigate to movie details screen (to be implemented)
  };

  return (
    <View style={styles.container}>
      <MovieList
        title="Top Rated Movies"
        data={topRatedMovies}
        onPressMovie={handlePressMovie}
        loadMore={() => hasMoreTopRated && setTopRatedPage((prev) => prev + 1)}
        isLoading={isLoading}
      />
      <MovieList
        title="Popular Movies"
        data={popularMovies}
        onPressMovie={handlePressMovie}
        loadMore={() => hasMorePopular && setPopularPage((prev) => prev + 1)}
        isLoading={isLoading}
      />
      <MovieList
        title="Upcoming Movies"
        data={upcomingMovies}
        onPressMovie={handlePressMovie}
        loadMore={() => hasMoreUpcoming && setUpcomingPage((prev) => prev + 1)}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default Home;