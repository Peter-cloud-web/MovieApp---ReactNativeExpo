import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MovieList from '../components/MovieList';
import { fetchTopRatedMovies, fetchPopularMovies, fetchUpcomingMovies } from '../services/movieService';

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [topRated, popular, upcoming] = await Promise.all([
          fetchTopRatedMovies(),
          fetchPopularMovies(),
          fetchUpcomingMovies(),
        ]);
        setTopRatedMovies(topRated.results);
        setPopularMovies(popular.results);
        setUpcomingMovies(upcoming.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
      />
      <MovieList
        title="Popular Movies"
        data={popularMovies}
        onPressMovie={handlePressMovie}
      />
      <MovieList
        title="Upcoming Movies"
        data={upcomingMovies}
        onPressMovie={handlePressMovie}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;