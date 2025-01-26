import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { fetchMovieDetails, fetchMovieCredits } from '../services/movieService';

const MovieDetails = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = Dimensions.get('window');
  const isWeb = width > 768;

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        const credits = await fetchMovieCredits(movieId);
        setMovieDetails(details);
        setMovieCredits(credits);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!movieDetails || !movieCredits) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No movie details or credits available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={isWeb ? styles.detailsContainerWeb : styles.detailsContainer}>
        <Image
          source={{
            uri: movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
              : 'https://via.placeholder.com/150',
          }}
          style={isWeb ? styles.posterWeb : styles.poster}
        />
        <View style={styles.detailsText}>
          <Text style={styles.title}>{movieDetails.title}</Text>
          <Text style={styles.subtitle}>Release Date: {movieDetails.release_date}</Text>
          <Text style={styles.overview}>{movieDetails.overview}</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Cast</Text>
      <View style={isWeb ? styles.castContainerWeb : styles.castContainer}>
        {movieCredits.cast.slice(0, 10).map((actor) => (
          <View key={actor.id} style={isWeb ? styles.castItemWeb : styles.castItem}>
            <Image
              source={{
                uri: actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://via.placeholder.com/150',
              }}
              style={isWeb ? styles.castImageWeb : styles.castImage}
            />
            <Text style={styles.castName}>{actor.name}</Text>
            <Text style={styles.castCharacter}>{actor.character}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  detailsContainer: {
    flexDirection: 'column',
  },
  detailsContainerWeb: {
    flexDirection: 'row',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },
  posterWeb: {
    width: '40%',
    height: 500,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  overview: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  castContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  castContainerWeb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  castItem: {
    width: '48%',
    marginBottom: 16,
  },
  castItemWeb: {
    width: '23%',
    marginBottom: 16,
    marginRight: 10,
  },
  castImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  castImageWeb: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  castName: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  castCharacter: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
});

export default MovieDetails;