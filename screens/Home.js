import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MovieList from '../components/MovieList';
import { fetchTopRatedMovies, fetchPopularMovies, fetchUpcomingMovies } from '../services/movieService';

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { width } = Dimensions.get('window');
  const isWeb = width > 768; // Check if the screen is wide enough for web layout

  useEffect(() => {
    const loadMovies = async () => {
      if (isLoading) return;

      setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={isWeb ? styles.contentWeb : styles.contentMobile}>
        <MovieList
          title="Top Rated Movies"
          data={topRatedMovies}
          isLoading={isLoading}
          isWeb={isWeb}
        />
        <MovieList
          title="Popular Movies"
          data={popularMovies}
          isLoading={isLoading}
          isWeb={isWeb}
        />
        <MovieList
          title="Upcoming Movies"
          data={upcomingMovies}
          isLoading={isLoading}
          isWeb={isWeb}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingVertical: 16,
  },
  contentMobile: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentWeb: {
    flex: 1,
    maxWidth: 1200, // Limit the width for web
    width: '100%',
    alignSelf: 'center', // Center the content on web
    paddingHorizontal: 16,
  },
});

export default Home;