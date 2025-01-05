import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { fetchTopRatedMovies } from '../services/movieService';

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await fetchTopRatedMovies(page);
      if (data.results.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more movies to load
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.rating}>Rating: {item.vote_average}</Text>
          </View>
        )}
        onEndReached={loadMovies} // Load more movies when reaching the end
        onEndReachedThreshold={0.5} // Trigger when 50% of the list is scrolled
        ListFooterComponent={renderFooter} // Show loading indicator at the bottom
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  movieItem: {
    marginBottom: 20,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: '#888',
  },
});

export default TopRatedMovies;